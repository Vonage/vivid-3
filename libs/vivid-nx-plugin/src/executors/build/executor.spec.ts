import {BuildExecutorSchema} from './schema';
import {ExecutorContext, runExecutor} from '@nrwl/devkit';
import multiServeExecutor from './executor';
import {ProjectConfiguration} from '@nrwl/tao/src/shared/workspace';

const ASYNC_EXECUTOR_TRIGGER = 'asyncExecutor';

jest.mock('@nrwl/devkit', () => ({
  runExecutor: jest.fn(async (params, options, context) => {
    if (params.project === ASYNC_EXECUTOR_TRIGGER) {
      return new Promise(res => setTimeout(() => res('async'), 10));
    }
    return 'sync';
  })
}));

const options: BuildExecutorSchema = {};

function generateContext(implicitDependencies?: string[]): ExecutorContext {
  return {
    projectName: 'test1',
    cwd: '',
    isVerbose: false,
    root: '',
    workspace: {
      npmScope: 'scope',
      version: 1,
      projects: {
        'test1': {
          implicitDependencies,
          root: ''
        }
      }
    }
  };
}

describe('Build Executor', () => {
  it('can run', async () => {
    const output = await multiServeExecutor(options, generateContext());
    expect(output.success)
      .toBe(true);
  });

  it(`should run serve of the implicit dependencies`, async function () {
    const implicitDependency = 'implicit1';
    const context = generateContext([implicitDependency]);
    await multiServeExecutor(options, context);
    expect(runExecutor)
      .toHaveBeenCalledWith({project: implicitDependency, target: "serve"}, {}, context);
  });

  it(`should run serve of all the implicit dependencies`, async function () {
    const implicitDependency1 = 'implicit1';
    const implicitDependency2 = 'implicit2';
    const context = generateContext([implicitDependency1, implicitDependency2]);
    await multiServeExecutor(options, context);
    expect(runExecutor)
      .toHaveBeenCalledWith({project: implicitDependency1, target: "serve"}, {}, context);
    expect(runExecutor)
      .toHaveBeenCalledWith({project: implicitDependency2, target: "serve"}, {}, context);
  });

  it(`should run the executors to completion in parallel`, async function () {
    const implicitDependency1 = 'implicit1';
    const implicitDependency2 = ASYNC_EXECUTOR_TRIGGER;
    const implicitDeps = [implicitDependency2, implicitDependency1];
    const context = generateContext(implicitDeps);

    await multiServeExecutor(options, context);
    const executorMock = runExecutor as jest.MockedFunction<typeof runExecutor>;
    expect(executorMock.mock.calls[0][0])
      .toEqual({project: implicitDeps[0], target: "serve"});
    expect(executorMock.mock.calls[1][0])
      .toEqual({project: implicitDeps[1], target: "serve"});
  });
});

//TODO::change the executors name
//TODO::make the executor run with current serve (e.g. run the multi executor and then the local serve)
//TODO::add it to components
//TODO::add it to docs
//TODO::when running in docs, should run the watch on all three modules
//TODO::create a sass executor that handles `--serve`?

