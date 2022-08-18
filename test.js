'use strict';
const ConversionButton = document.getElementById('bConversion');
const canvas = document.getElementById('testcanvas');
const outputArea = document.getElementById('outputArea')
const inputText = document.getElementById('textin')
const arrYouon = ['ぁ','ぃ','ぅ','ぇ','ぉ','ゃ','ゅ','ょ','ゎ','ゕ','ゖ']
let arrBoin = [
  [["あ","か","さ","た","な","は","ま","や","ら","わ","が","ざ","だ","ば","ぱ"], "red"],
  [["い","き","し","ち","に","ひ","み","  ","り","  ","ぎ","じ","ぢ","び","ぴ"],"blue"],
  [["う","く","す","つ","ぬ","ふ","む","ゆ","る","ん","ぐ","ず","づ","ぶ","ぷ"],"yellow"],
  [["え","け","せ","て","ね","へ","め","  ","れ","  ","げ","ぜ","で","べ","ぺ"],"purple"],
  [["お","こ","そ","と","の","ほ","も","よ","ろ","を","ご","ぞ","ど","ぼ","ぽ"],"orange"],
  [["\n"],"black"]
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
  console.log(arrFormated)

  // 結果表示エリアの作成
  const paragraph = document.createElement('p');
  paragraph.innerText = alltext;
  outputArea.appendChild(paragraph);

  if (canvas.getContext) {
  
    var ctx = canvas.getContext('2d');

    // 四角形を描画するメソッドfillRect(x, y, width, height)
    let recX = 0
    let recY = 0
    // 一文字ずつまわす
    for(let arrIndex of arrFormated){
      let thisColor
        if (arrIndex === '\n') {
          recX = 0
          recY = recY + 60
        } else {
        //母音５行プラス改行で該当行を探す
        for (let index = 0; index < 6; index++) {
          if (arrBoin[index][0].includes(arrIndex ) ) {
            thisColor = arrBoin[index][1]
          }
        }
        console.log(thisColor);
        ctx.fillStyle = thisColor; 
        ctx.fillRect(recX*60, recY , 50, 50);
        recX++
        }
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

