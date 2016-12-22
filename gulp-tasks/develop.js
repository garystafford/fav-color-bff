import gulp from 'gulp';
import nodemon from 'gulp-nodemon';
import {path, tasks} from './const';

gulp.task(tasks.DEVELOP, () => {
  nodemon({
    script: 'app.js',
    ext: 'js html',
    env: {
      'NODE_ENV': 'development'
    }
  }).on('readable', function() {
    this.stdout.on('data', function(chunk) {
      if (/^Server listening on port/.test(chunk)) {
        livereload.changed(__dirname);
      }
    });
    this.stdout.pipe(process.stdout);
    this.stderr.pipe(process.stderr);
  });
});
