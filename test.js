'use strict';
const ConversionButton = document.getElementById('bConversion');
const boinCanvas = document.getElementById('boincanvas');
const colorElement = document.getElementsByName('boincolor');
const Colorbtn = document.getElementById('btnColor');
const canvas = document.getElementById('testcanvas');
const outputArea = document.getElementById('outputArea')
const inputText = document.getElementById('textin')
/**拗音（小さい音）が入っている配列*/
const arrYouon = ['ぁ','ぃ','ぅ','ぇ','ぉ','ゃ','ゅ','ょ','ゎ','ゕ','ゖ']
/**ひらがなが母音ごとに分けられた配列*/
const arrBoin = [
  ["あ","か","さ","た","な","は","ま","ら","わ","が","ざ","だ","ば","ぱ","ぁ","や","ゃ","ゕ"],
  ["い","き","し","ち","に","ひ","み","り","ゐ","ぎ","じ","ぢ","び","ぴ","ぃ"],
  ["う","く","す","つ","ぬ","ふ","む","る","ん","ぐ","ず","づ","ぶ","ぷ","ぅ","ゆ","ゅ","ゔ"],
  ["え","け","せ","て","ね","へ","め","れ","ゑ","げ","ぜ","で","べ","ぺ","ぇ","ゖ"],
  ["お","こ","そ","と","の","ほ","も","ろ","を","ご","ぞ","ど","ぼ","ぽ","ぉ","よ","ょ"],
  ];

  
//母音の色設定
Colorbtn.onclick = () => {



if (boinCanvas.getContext) {
  var ctx1 = boinCanvas.getContext('2d');

  let recX = 0
    ctx1.clearRect(0, 0, 100, 20)//
    console.log(colorElement[0].value)
    colorElement.forEach(element => {
      ctx1.fillStyle = element.value
      ctx1.fillRect(recX*60, 0 , 50, 50)
      recX++
    });

  } else {
    console.log ("表示できません")
  }
}  



//変換ボタンを押したときの出力
ConversionButton.onclick = () => {
  // テキストが空の時は処理を終了する
  if (inputText.length === 0) {
    return;
  }
  //テキストを1文字づつ配列にいれる
  const arrText = inputText.value.split('');

  /** 
   * 拗音、撥音を考慮した文節ごとの配列
   * @type {Array}
   */
  const arrBunsetsu = devideIntoBunsetsu(arrText).split(',');

  

  console.log(arrBunsetsu)

  // 結果表示エリアの作成
  const paragraph = document.createElement('p');
  outputArea.innerText = ''
 // paragraph.innerText = alltext;
 // outputArea.appendChild(paragraph);

  if (canvas.getContext) {
  
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 1000, 1000)//描画をクリア
    let recX = 0
    let recY = 0
    // 一文字ずつまわす
    for(let arrIndex of arrBunsetsu){
      let thisColor
        if (arrIndex === '\n') {
          recX = 0
          recY = recY + 60
        } else {
        //母音５行プラス改行で該当行を探す
          for (let index = 0; index < 5; index++) {
            var lastMoji = arrIndex.slice(0,1) 
            if (arrBoin[index].includes(lastMoji) ) {
              thisColor = colorElement[index].value;
            }
          }
          console.log(thisColor);
          ctx.fillStyle = thisColor; 
         ctx.fillRect(recX*60, recY , 50, 50);

          ctx.font = 'bold 10pt serif';
          ctx.fillText(arrIndex,recX*60, recY+70)
          recX++
        }
      }
      // 描画するコードをここに
  } else {
    console.log("エラー");
    // キャンバスに未対応の場合のコードをここに
  }
}

function devideIntoBunsetsu(arrTest) {
  let buf = ''
  for (let moji of arrTest) {
    if (buf === '' ) {
      buf = moji
    } else if ( moji === '\n') {  //改行は１節に区切る
      buf = buf + ','+ moji;
    } else if ( moji === 'っ') {   //促音は前の音につなげる
      buf = buf + moji;
    } else if (arrYouon.includes(moji)) {  //拗音なら前の音につなげる
      buf = buf + moji;
    } else if (isNotHiragana(moji)){  //ひらがな以外は前の音につなげる
      buf = buf + moji;
    } else {
      buf = buf + ',' + moji;  //ひらがなは１節に区切る
    }
  }
  return buf;
}

function isNotHiragana(str){
  str = (str==null)?"":str;
  if(str.match(/^[ぁ-んー　]*$/)){    //"ー"の後ろの文字は全角スペースです。
    return false;
  }else{
    return true;
  }
}

function selectBoin(str) {
  let buf
  if (arrboin.includes(str)) {
    return 
  
 }
  
}