import gulp from 'gulp';
import runSequence from 'run-sequence';
import {path, tasks} from './const';

gulp.task(tasks.CLIENT_BUILD_DIST, () => {
  return new Promise((resolve, reject) => {
    runSequence(
      tasks.CLIENT_DEL_DIST,
      tasks.CLIENT_COPY_DIST,
      tasks.CLIENT_BUILD_PACKAGES_DIST,

      resolve
    );
  });
});
