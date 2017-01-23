# Demo gulp tự động hóa việc khởi động nhiều Node.js app

Có 3 thư mục:
1. gulp để lưu file gulpfile.js để tự động hóa
2. app1: Express web app phục vụ ở cổng 3000
3. app2: Express web app phục vụ ở cổng 3001

Cách chạy thử nghiệm:

```
git clone https://github.com/TechMaster/gulp_npm_start.git
cd gulp_npm_start
gulp install
gulp
```

Dùng browser mở http://localhost:3000 và http://localhost:3001 để xem app1 và app2 đã hoạt động chưa.

Lệnh ```gulp install``` thực chất sẽ chạy lệnh ```npm start``` ở 2 thư mục app1 và app2


Trong file gulp/gulpfile.js có hàm này để thực thi một lệnh trong child process

```js
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
```


