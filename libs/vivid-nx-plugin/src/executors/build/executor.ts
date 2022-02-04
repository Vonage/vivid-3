import { BuildExecutorSchema } from './schema';
import {ExecutorContext, runExecutor} from '@nrwl/devkit';

export default async function multiServe(options: BuildExecutorSchema, context: ExecutorContext) {
  const { implicitDependencies } = context.workspace.projects[context.projectName];

  if (implicitDependencies) {
    for (const implicitDep of implicitDependencies) {
      await runExecutor({
        project: implicitDep,
        target: 'serve'
      }, {}, context);
    }
  }

  return {
    success: true,
  };
}
