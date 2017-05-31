var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require('babelify');
var vueify = require('vueify');
var connect = require('gulp-connect');
var open = require('gulp-open');

function compile(watch, build) {
  var bundler = browserify('./src/app.js', { debug: true }).transform(babel).transform(vueify);
  if (watch && !build) {
    bundler = watchify(bundler);
  }

  function rebundle() {
    bundler.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source('app.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./dist'));
  }

  if (watch && !build) {
    bundler.on('update', function() {
      console.log('-> Bundling...');
      rebundle();
      console.log('-> Done.');
    });
  }

  rebundle();

  if (!build) {
    gulp.start(['webserver']);
  }
}

function watch() {
  return compile(true, false);
};

gulp.task('webserver', function() {
  var port = 8000;
  connect.server({
    root: './dist',
    port: port,
    fallback: './dist/index.html'
  });
  gulp.src(__filename)
    .pipe(open({uri: 'http://localhost:'+port}));
});

gulp.task('build', function() { return compile(false, true); });
gulp.task('watch', function() { return watch(); });

gulp.task('default', ['watch']);
