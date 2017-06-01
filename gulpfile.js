const gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    babel = require('babelify'),
    vueify = require('vueify'),
    uglify = require('gulp-uglify'),
    dogefy = require('dogefy'),
    connect = require('gulp-connect'),
    open = require('gulp-open'),
    util = require('gulp-util'),
    autoprefixer = () => require('gulp-autoprefixer')(require('./autoprefixer.config'));

function compile(watch, build) {
  var bundler = browserify('./src/app.js', { debug: true })
    .transform(babel)
    .transform(vueify)
    .plugin('vueify/plugins/extract-css', {
      out: 'dist/styles.css' // can also be a WritableStream 
    });
  if (watch && !build) {
    bundler = watchify(bundler);
  }

  function rebundle() {
    return bundler.bundle()
      .on('error', function(err) { util.log(err); console.error(err); this.emit('end'); })
      .pipe(source('app.js'))
      .pipe(buffer())
      .pipe(gulp.dest('./dist'));
  }

  if (watch && !build) {
    bundler.on('update', function() {
      util.log('-> Bundling...');
      console.log('-> Bundling...');
      rebundle();
      util.log('-> Done.');
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

gulp.task('watch', () => watch());
gulp.task('build', () => {
    compile(false, true);

    //autoprefix distributed css
    gulp.src('./dist/*.css')
      .pipe(autoprefixer())
      .pipe(gulp.dest('./dist/prefixed'));

    util.log('Very wow!\n' + dogefy('dialogue builder applicaion'));
  }
);

gulp.task('default', ['watch']);