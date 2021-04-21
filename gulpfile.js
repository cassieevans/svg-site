const gulp = require('gulp');
const postcss = require('gulp-postcss');
const cssImport = require('postcss-import');
const postcssPresetEnv = require('postcss-preset-env');
const postcssNested = require('postcss-nested');
const postcssCustomMedia = require('postcss-custom-media');

const rollup = require('gulp-rollup');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('rollup-plugin-babel');
const minify = require('gulp-minify');

gulp.task('css', () =>
  gulp
    .src(['./src/assets/css/main.css'])
    .pipe(
      postcss([
        postcssCustomMedia(),
        cssImport(),
        postcssNested(),
        postcssPresetEnv({
          stage: 2,
          features: {
            'nesting-rules': true,
          },
        }),
      ])
    )
    .pipe(gulp.dest('./dist/assets/css'))
);

gulp.task('js', () =>
  gulp
    .src(['./src/assets/js/*'])
    .pipe(sourcemaps.init())
    .pipe(
      rollup({
        allowRealFiles: true,
        input: './src/assets/js/main.js',
        output: {
          format: 'cjs',
        },
        plugins: [
          babel({
            presets: [['@babel/preset-env']],
          }),
        ],
      })
    )
    .pipe(minify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/assets/js'))
);

gulp.task('fonts', () =>
  gulp.src(['./src/assets/fonts/*']).pipe(gulp.dest('./dist/assets/fonts'))
);

gulp.task('images', () =>
  gulp.src(['./src/assets/img/*']).pipe(gulp.dest('./dist/assets/img'))
);

gulp.task('watch', function () {
  gulp.watch('./src/assets/**/*.css', gulp.series('css'));
  gulp.watch('./src/assets/fonts/*', gulp.series('fonts'));
  gulp.watch('./src/assets/img/*', gulp.series('images'));
  gulp.watch('./src/assets/js/*.js', gulp.series('js'));
});

gulp.task('default', gulp.parallel('css', 'fonts', 'js', 'images'));
