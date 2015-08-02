'use strict';

var gulp = require('gulp'),
	concat = require('gulp-concat'),
	webserver = require('gulp-webserver'),
	scss = require('gulp-sass');

gulp.task('jsl', function(){
	gulp.src([
			'bower_components/angular/angular.js',
      'bower_components/angular-bootstrap/ui-bootstrap.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
		])
	.pipe(concat('libs.js'))
	.pipe(gulp.dest('dest'));
});

gulp.task('js', function(){
	gulp.src('development/**/*.js')
		.pipe(concat('app.js'))
		.pipe(gulp.dest('dest'));
})

gulp.task('html', function(){
	gulp.src('development/**/*.html')
		.pipe(gulp.dest('dest'));
});


gulp.task('img', function(){
	gulp.src([
		'development/**/*.jpg',
		'development/**/*.png'
		])
	.pipe(gulp.dest('dest'));
});

gulp.task('cssl', function(){
	gulp.src([
		'bower_components/angular/angular-csp.css',
		'development/css/bootstrap.css',
		'development/css/bootstrap-theme.css'
		])
	.pipe(concat('theme.css'))
	.pipe(gulp.dest('dest'));
})

gulp.task('css', function(){
	gulp.src('development/**/*.scss')
		.pipe(scss())
		.pipe(concat('all.css'))
		.pipe(gulp.dest('dest'));
	// gulp.src('development/**/*.scss')
	// 	.pipe(scss())
	// 	.pipe(concat('all.css'))
	// 	.pipe(gulp.dest('dest'));
	// gulp.src(['development/**/*.scss'])
    // .pipe(scss())
    // .pipe(concat('all.css'))
    // .pipe(prefix('last 15 versions'))
    // .pipe(minifyCSS(''))
    // .pipe(rename('all.min.css'))
    // .pipe(gulp.dest('dest'));
})

gulp.task('watch', function(){
	gulp.watch('development/**/*.js', ['js'])
	gulp.watch('development/**/*.scss', ['css'])
	gulp.watch('development/**/*.html', ['html'])
});


gulp.task('webserver', function() {
  gulp.src('dest/')
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});


gulp.task('default', [
	'html',
	'cssl',
	'css',
	'jsl',
	'js',
	'watch',
	'webserver'
]);

