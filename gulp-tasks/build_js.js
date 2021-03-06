import gulp from 'gulp';
import uglify from 'gulp-uglify';
import plumber from 'gulp-plumber';
import {path, tasks} from './const';

const JS = [
  path.DIST + '**/*.js',
  '!' + path.DIST + 'node_modules/**/*'
];

gulp.task(tasks.BUILD_JS_DIST, () => {
  return gulp.src(JS, {base: path.DIST})
    .pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest(path.DIST));
});
