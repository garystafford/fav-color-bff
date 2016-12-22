import gulp from 'gulp';
import runSequence from 'run-sequence';
import {path, tasks} from './const';

gulp.task(tasks.BUILD_DIST, () => {
  return new Promise((resolve, reject) => {
    runSequence(
      tasks.DEL_DIST,
      tasks.COPY_DIST,
      tasks.BUILD_PACKAGES_DIST,
      tasks.BUILD_JS_DIST,

      resolve
    );
  });
});
