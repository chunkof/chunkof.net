'use strict';
var gulp = require('gulp');
var markdown = require('gulp-markdown');
var concat = require('gulp-concat-util');
var fs = require('fs');
var del = require('del');

var src_path      = './src/**';
var md_src_path   = './src/**/*.md';
var settings_path = './settings/**';

//------------
// build markdown
//------------
gulp.task('build-md', function() {
  var header = fs.readFileSync("./settings/header.html");
  var footer = fs.readFileSync("./settings/footer.html");
  var contents = gulp.src(md_src_path).pipe(markdown());

  contents
    .pipe(concat.header(header))
    .pipe(concat.footer(footer))
    .pipe(gulp.dest('./dst'));
});

//------------
// build except markdown
//------------
gulp.task('build-except-md', function() {
  gulp.src([src_path, '!'+md_src_path])
    .pipe(gulp.dest('./dst'));
});

//------------
// clean
//------------
gulp.task('clean', function(cb) {
  del(['dst/*'], cb);
});

//------------
// watch
//------------
gulp.task('watch', function(){
  gulp.watch([md_src_path, settings_path]    ['build-md']);
  gulp.watch([src_path, '!'+md_src_path],    ['build-except-md']);
});

//------------
// default
//------------
gulp.task('default', ['clean','build-md','build-except-md']);


// for debug
module.exports = gulp;
