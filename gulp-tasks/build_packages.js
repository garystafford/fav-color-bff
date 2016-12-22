import gulp from 'gulp';
import {path, tasks} from './const';

const PACKAGES = [
  path.ROOT + 'package.json'
];

gulp.task(tasks.BUILD_PACKAGES_DIST, () => {
  return gulp.src(PACKAGES, {base: path.ROOT})
    .pipe(gulp.dest(path.DIST));
});
