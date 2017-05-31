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

function compile(watch) {
  var bundler = watchify(browserify('./src/app.js', { debug: true }).transform(babel).transform(vueify));

  function rebundle() {
    bundler.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source('app.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./dist'));
  }

  if (watch) {
    bundler.on('update', function() {
      console.log('-> Bundling...');
      rebundle();
      console.log('-> Done.');
    });
  }

  rebundle();
  gulp.start(['webserver']);
}

function watch() {
  return compile(true);
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

gulp.task('build', function() { return compile(); });
gulp.task('watch', function() { return watch(); });

gulp.task('default', ['watch']);

// var gulp = require('gulp');
// var copy = require('gulp-copy');
// var concat = require('gulp-concat');
// var uglify = require('gulp-uglify');
// var connect = require('gulp-connect');
// var browserify = require('browserify');
// var babel = require('babelify');
// var vueify = require('vueify');
// var source = require('vinyl-source-stream');
// var buffer = require('vinyl-buffer');
// var open = require('gulp-open');

// gulp.task('styles', function() {
//     var stylesheets = [
//         'src/styles/**/*.css'
//     ];

//     gulp.src(stylesheets)
//         .pipe(concat('styles.css'))
//         .pipe(gulp.dest('dist'))
// });

// gulp.task('js', function() {
//     // browserify({
//     //     entries: 'src/app.js',
//     //     debug: false
//     // })
//     browserify('./src/app.js', { debug: true })
//     .transform(babel)
//     .transform(vueify)
//     .bundle()
//     .pipe(source('app.js'))
//     .pipe(buffer())
//     .pipe(uglify())
//     .pipe(gulp.dest('dist'))
//     .pipe(connect.reload());
// });

// gulp.task('webserver', function() {
//   var port = 8000;
//   connect.server({
//     root: './dist',
//     port: port,
//     fallback: './dist/index.html'
//   });
//   gulp.src(__filename)
//     .pipe(open({uri: 'http://localhost:'+port}));
// });

// gulp.task('watch:js', function() {
//     gulp.watch('src/**/*.js', ['js']);
// });

// gulp.task('compile', ['styles', 'js']);
// gulp.task('watch', ['compile', 'watch:js']);
// gulp.task('serve', ['watch', 'webserver']);
// gulp.task('default', ['compile']);
