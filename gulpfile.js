var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

// BrowserSync server
gulp.task('browser-sync', function() {
  var files = [
    './build/style.css'
  ];

  browserSync.init(files, {
    logPrefix: 'COOL',
    logFileChanges: true,
    injectChanges: true,
    port: 3000,
    notify: false,
    server: {
      baseDir: 'build',
      index: 'index.html'
    },

  });
});

// SASS
gulp.task('sass', function() {
  gulp.src('./src/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build/css/'))
    .pipe(browserSync.stream());
});

gulp.task('html', function() {
  gulp.src('./src/html/**/*.html')
    .pipe(gulp.dest('./build'))
    .pipe(browserSync.stream());
})

// Watch for changes to sass files and re-run task 'sass'
gulp.task('watch', function() {
  gulp.watch('./src/html/**/*.html', ['html']);
  gulp.watch('./src/sass/**/*.scss', ['sass']);
});

gulp.task('default', ['watch', 'html', 'sass', 'browser-sync']);