const spawn = require('child_process').spawn;
const gutil = require('gulp-util');
const gulp = require('gulp');



function run_command(command, options) {
  const child = spawn(command, options, {cwd: process.cwd()});
  let stdout = '', stderr = '';

  child.stdout.setEncoding('utf8');

  child.stdout.on('data', function (data) {
    stdout += data;
    gutil.log(data);
  });

  child.stderr.setEncoding('utf8');
  child.stderr.on('data', function (data) {
    stderr += data;
    gutil.log(gutil.colors.red(data));
    gutil.beep();
  });

  child.on('close', function (code) {
    gutil.log("Done with exit code", code);
    gutil.log("You access complete stdout and stderr from here"); // stdout, stderr
  });
}

function npm_start(path) {
  run_command('npm', ['start', '--prefix', path]);
}

function npm_install(path) {
  run_command('npm', ['install', '--prefix', path]);
}

gulp.task('default', ['start_app1', 'start_app2']);

gulp.task('install', ['install_app1', 'install_app2']);

//-------- Running app using npm start
gulp.task('start_app1', () => {
  npm_start("../app1/");
});

gulp.task('start_app2', () => {
  npm_start("../app2/");
});
//-------- Installation using npm install -----------
gulp.task('install_app1', () => {
  npm_install("../app1/");
});

gulp.task('install_app2', () => {
  npm_install("../app2/");
});