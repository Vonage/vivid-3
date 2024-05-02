import childProcess from 'child_process';
import chokidar from 'chokidar';
import { resolve } from 'path';

const projects = {
  "styles": {
    script: "npx nx run styles:build",
    dependencies: ["build"],
		watchPaths: ["./libs/styles/**/*.scss"]
  },
  "build": {
    script: "npx nx run components:build",
    dependencies: ["bundle"],
		watchPaths: ["libs/components/src/**/*.(ts|scss)"]
  },
  "bundle": {
    script: "npx esbuild ./dist/libs/components/index.js --bundle --outfile=./dist/libs/components-bundle/index.js --format=esm",
    dependencies: [],
		watchPaths: [
			"./apps/docs/**/*.(html|md|njk|ts)",
			"libs/components/src/lib/**/README.md"
		]
  }
};

export function watchDependencies(projects) {
	const runningProcesses = {}; // Track child processes

function startProject(projectName) {

  console.log(`Starting ${projectName}...`);
  const process = childProcess.spawn('sh', ['-c', projects[projectName].script]);

  process.stdout.on('data', (data) => {
    console.log(`${projectName}: ${data.toString()}`);
  });

  process.stderr.on('data', (data) => {
    console.error(`${projectName}: ${data.toString()}`);
  });

  process.on('close', (code) => {
    console.log(`${projectName} exited with code: ${code}`);
    delete runningProcesses[projectName];
    checkDependencies(projectName);
  });

  runningProcesses[projectName] = process;
}

function stopProject(projectName) {
  if (!runningProcesses[projectName]) {
    console.log(`${projectName} not running. Skipping stop.`);
    return;
  }

  console.log(`Stopping ${projectName}...`);
  runningProcesses[projectName].kill();
  delete runningProcesses[projectName];
}

function killDependencies(projectName) {
	const dependencies = projects[projectName].dependencies;
	if (!dependencies || !dependencies.length) {
		return;
	}
  dependencies.forEach((dependency) => {
    if (runningProcesses[dependency]) {
      stopProject(dependency);
    }
  });
}

function checkDependencies(projectName) {
  const dependencies = projects[projectName].dependencies;
	if (!dependencies || !dependencies.length) {
		return;
	}
  killDependencies(projectName);
  startProject(dependencies[0]);
}

const watcher = chokidar.watch(Object.values(projects).map(x => x.watchPaths), {
  ignored: /node_modules/,
  persistent: true,
});

watcher.on('change', (changedFilePath, stats) => {
	const path = resolve(changedFilePath);
  const projectName = Object.keys(projects).find(
    (project) => projects[project].watchPaths.some(x => path.startsWith(resolve(x.split('**')[0])))
	);

	if (projectName) {
    console.log(`Changes detected in ${projectName}`);
		stopProject(projectName);
		killDependencies(projectName);
		startProject(projectName);
  } else {
    console.log(`Change detected in an unmonitored file: ${changedFilePath}`);
  }
});

console.log("Monitoring project watch files...");
}

// watchDependencies(projects);

