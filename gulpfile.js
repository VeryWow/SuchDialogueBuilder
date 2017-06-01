const gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    babel = require('babelify'),
    vueify = require('vueify'),
    dogefy = require('dogefy'),
    connect = require('gulp-connect'),
    open = require('gulp-open'),
    util = require('gulp-util'),
    autoprefixer = require('gulp-autoprefixer');

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
  // gulp.src('./dist/*.css')
  //   .pipe(autoprefixer({
  // //       // browsers: ['last 2 versions'],
  // //       // cascade: false
  //   }))
  //   .pipe(gulp.dest('./dist'));

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
    var res = compile(false, true);

    gulp.src('./dist/*.css')
      .pipe(autoprefixer(require('./autoprefixer.config')))
      .pipe(gulp.dest('./dist'));

    util.log('Very wow!\n' + dogefy('dialogue builder applicaion'));

    return res;
  }
);

gulp.task('default', ['watch']);