'use strict';
const ConversionButton = document.getElementById('bConversion');
const canvas = document.getElementById('testcanvas');
const outputArea = document.getElementById('outputArea')
const inputText = document.getElementById('textin')
const arrYouon = ['ぁ','ぃ','ぅ','ぇ','ぉ','ゃ','ゅ','ょ','ゎ','ゕ','ゖ']
let arrBoin = [
  [["あ","か","さ","た","な","は","ま","や","ら","わ"], "red"],
  [["い","き","し","ち","に"],"blue"],
  [["う","く","す","つ","ぬ"],"yellow"],
  [["え","け","せ","て","ね"],"purple"],
  [["お","こ","そ","と","の"],"orange"],
  ];

//変換ボタンを押したときの出力
ConversionButton.onclick = () => {
  // テキストが空の時は処理を終了する
  if (inputText.length === 0) {
    return;
  }
  //テキストを1文字づつ配列にいれる
  const alltext = inputText.value;
  let arrTest = alltext.split('');
  //拗音、撥音を分けなおして1音ずつに配列しなおす
  let strMax = alltext.length; //文字数
  const arrFormated = formatSingleWord(strMax,arrTest).split(',');

  //for (let index = 0; index < formatedMax ; index++) {
  //const element = arrFormated[index];
    
  //}
  

  
  

 

  // 診断結果表示エリアの作成
  const paragraph = document.createElement('p');
  paragraph.innerText = alltext;
  outputArea.appendChild(paragraph);

  if (canvas.getContext) {
  
    var ctx = canvas.getContext('2d');

    // 四角形を描画するメソッドfillRect(x, y, width, height)
    for(let arrIndex=0; arrIndex<arrFormated.length; arrIndex++){
      var thisColor 
      for (let index = 0; index < 5; index++) {
        if (arrBoin[index][0].includes(arrFormated[arrIndex]) ) {
          thisColor = arrBoin[index][1]
        }
      }
      console.log(thisColor);
      ctx.fillStyle = thisColor; 
      ctx.fillRect(arrIndex*60, 0, 50, 50);

      }
      // 描画するコードをここに
  } else {
    console.log("エラー");
    // キャンバスに未対応の場合のコードをここに
  }

}

function formatSingleWord(maxlength,arrTest) {
  let buf = ''
  for (let i = 0; i <= maxlength - 1; i++) {
    if (buf === '' ) {
      buf = arrTest[i]
    } else if ( arrTest[i] === 'っ') {
      buf = buf + arrTest[i];
    } else if (arrYouon.includes(arrTest[i])) {
      buf = buf + arrTest[i];
    } else {
      buf = buf +',' + arrTest[i];
    }
  }
  return buf;
}

