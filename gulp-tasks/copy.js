import gulp from 'gulp';
import {path, tasks} from './const';

const JS = [
  path.ROOT + 'app.js'
];

gulp.task(tasks.COPY_DIST, () => {
  return gulp.src(JS, {base: path.ROOT})
    .pipe(gulp.dest(path.DIST));
});
