import gulp from 'gulp';
import plumber from 'gulp-plumber';
import {path, tasks} from './const';

const JS = [
  path.ROOT + 'app.js',
  path.ROOT + 'config/production.json'
];

gulp.task(tasks.COPY_DIST, () => {
  return gulp.src(JS, {base: path.ROOT})
    .pipe(plumber())
    .pipe(gulp.dest(path.DIST));
});
