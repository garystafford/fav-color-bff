import gulp from 'gulp';
import plumber from 'gulp-plumber';
import del from 'del';
import {path, tasks} from './const';

gulp.task(tasks.DEL_DIST, () => del.sync([path.DIST]));
