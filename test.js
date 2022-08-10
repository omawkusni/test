'use strict';
var canvas = document.getElementById('testcanvas');

if (canvas.getContext) {
  var ctx = canvas.getContext('2d');
  console.log("大丈夫");
  ctx.fillStyle = 'black';

// 四角形を描画するメソッドfillRect()
ctx.fillRect(10, 10, 50, 50);
ctx.fillStyle = 'red';
ctx.fillRect(70, 10, 50, 50);
  // 描画するコードをここに
} else {
  console.log("エラー");
  // キャンバスに未対応の場合のコードをここに
}