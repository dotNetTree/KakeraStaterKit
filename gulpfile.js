var gulp = require('gulp');
var webserver = require('gulp-webserver');

gulp.task('watch', function() {
  gulp.watch(['./*.*', './app/*.*']);
});

gulp.task('webserver', function() {
  gulp.src('./app/')
    .pipe(webserver({
      host: '0.0.0.0',
      livereload: true
    })
  );
});

gulp.task('default', ['watch', 'webserver']);
