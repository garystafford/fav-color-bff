import gulp from 'gulp';
import plumber from 'gulp-plumber';
import {path, tasks} from './const';

const PACKAGES = [
  path.ROOT + 'package.json'
];

gulp.task(tasks.BUILD_PACKAGES_DIST, () => {
  return gulp.src(PACKAGES, {base: path.ROOT})
    .pipe(plumber())
    .pipe(gulp.dest(path.DIST));
});
