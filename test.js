'use strict';
const ConversionButton = document.getElementById('bConversion');
const canvas = document.getElementById('testcanvas');
const outputArea = document.getElementById('outputArea')
const inputText = document.getElementById('textin')
if (canvas.getContext) {
  var ctx = canvas.getContext('2d');
  console.log("大丈夫");


// 四角形を描画するメソッドfillRect()
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, 50, 50);
ctx.fillStyle = 'red';
ctx.fillRect(55, 0, 50, 50);
  // 描画するコードをここに
} else {
  console.log("エラー");
  // キャンバスに未対応の場合のコードをここに
}


ConversionButton.onclick = () => {
  const alltext = inputText.value;
  if (inputText.length === 0) {
    // テキストが空の時は処理を終了する
    return;
  }

  // 診断結果表示エリアの作成

  const paragraph = document.createElement('p');
  paragraph.innerText = alltext;
  outputArea.appendChild(paragraph);


}