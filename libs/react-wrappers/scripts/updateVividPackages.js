import ora from 'ora';
import { EOL } from 'os';
import { spawn } from 'child_process';
import { createRequire } from 'module';
const { dependencies } = createRequire(import.meta.url)('../package.json');

const spinner = ora();

const spawnPromise = (...args) =>
	new Promise((resolve, reject) => {
		const cmd = spawn(...args);
		const stdout = [];
		const stderr = [];
		cmd.stdout.on('data', (data) => stdout.push(data));
		cmd.stderr.on('data', (data) => stderr.push(data));
		cmd.on('close', (status) =>
			status ? reject(stderr.join('')) : resolve(stdout.join(''))
		);
		cmd.on('error', () => reject(stderr.join('')));
	});

// TODO: find a better way to load complete search results when searching NPM
// naive way to force paging when doing NPM search
// NPM limits the number of packages it returns and drops some versions and packages all together
const forcePaging = (pattern = '') =>
	'abcdefghijklmnopqrstuvwxyz'
		.split('')
		.map((letter) => `${pattern}-${letter}`);

const ignoredPackages = [
	'@vonage/vwc-angular-forms',
	'@vonage/vwc-angular-dialog',
	'@vonage/vwc-toggle-buttons-group',
	'@vonage/vwc-relative-time',
];

const defaultPatterns = [
	'vonage/vvd-context',
	'vonage/vvd-core',
	'vonage/vvd-fonts',
	...forcePaging('vonage/vwc'),
];

const removeIgnoredPackages = ({ name }) => !ignoredPackages.includes(name);

const keepOnlyChangedPackages = ({ name, version }) =>
	dependencies[name] !== `^${version}`;

const getPackages = async (patterns = defaultPatterns) => {
	const packages = [];
	spinner.start('');
	for (const pattern of patterns) {
		spinner.text = `Searching for Vivid packages to update. [found: ${packages.length}]`;
		try {
			const stdout = await spawnPromise(
				'npm',
				['search', '--json', '--no-description', pattern],
				{ encoding: 'utf8' }
			);
			packages.push(
				...JSON.parse(stdout)
					.filter(removeIgnoredPackages)
					.filter(keepOnlyChangedPackages)
			);
		} catch {}
	}
	spinner.clear();
	return packages;
};

const updatePackageJson = async () => {
	const packages = await getPackages();
	if (!packages.length) {
		spinner.info('Nothing to update. All packages already in latest versions.');
		return;
	}
	let updated = 0;
	spinner.succeed(`Found ${packages.length} packages needing update.`);
	spinner.start();
	for (const { name, version } of packages) {
		const versionedPackage = `${name}@^${version}`;
		spinner.text = `Updating '${name}@${dependencies[name]}' to '^${version}'. [updated: ${updated}/${packages.length}]`;
		try {
			await spawnPromise('yarn', ['add', versionedPackage], {
				encoding: 'utf8',
			});
			updated++;
		} catch (errorMessage) {
			spinner.fail();
			spinner.fail(errorMessage.trim(EOL));
			spinner.start();
		}
	}
	spinner.info(`Updated ${updated} of ${packages.length}`);
};

updatePackageJson();
