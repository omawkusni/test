'use strict';
const ConversionButton = document.getElementById('bConversion');
const boinCanvas = document.getElementById('boincanvas');
const colorElement = document.getElementsByName('boincolor');
const Colorbtn = document.getElementById('btnColor');
const canvas = document.getElementById('testcanvas');
const outputArea = document.getElementById('outputArea')
const inputText = document.getElementById('textin')



const arrBoin = [
  ["あ","か","さ","た","な","は","ま","ら","わ","が","ざ","だ","ば","ぱ","ぁ","や","ゃ","ゕ"],
  ["い","き","し","ち","に","ひ","み","り","ゐ","ぎ","じ","ぢ","び","ぴ","ぃ"],
  ["う","く","す","つ","ぬ","ふ","む","る","ん","ぐ","ず","づ","ぶ","ぷ","ぅ","ゆ","ゅ","ゔ"],
  ["え","け","せ","て","ね","へ","め","れ","ゑ","げ","ぜ","で","べ","ぺ","ぇ","ゖ"],
  ["お","こ","そ","と","の","ほ","も","ろ","を","ご","ぞ","ど","ぼ","ぽ","ぉ","よ","ょ"],
  [" ","　"]
  ];

  
//母音の色設定
Colorbtn.onclick = () => {

if (boinCanvas.getContext) {
  var ctx1 = boinCanvas.getContext('2d');

  let recX = 0
    ctx1.clearRect(0, 0, 100, 20)//

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

  // キャンバスに未対応の場合
  if (!canvas.getContext) {
    alert("すいません。表示ができません。" )
    return;
  }

  //テキストを1文字づつ配列にいれる
  const arrText = inputText.value.split('');

  var ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 1000, 1000)//描画をクリア
  let recX = 0
  let recY = 0
  let mapBunsetsu = new Map
  mapBunsetsu = makeBunsetsuMap(arrText)
  mapBunsetsu.forEach((obj, key) => {
    let thisColor
    if (obj.moji === '\n') {
      recX = 0
      recY = recY + 70
    } else {
    //母音５行とスペースで対象要素を配列から探して色をセット
      for (let index = 0; index < 6; index++) {
        if (arrBoin[index].includes(obj.boin) ) {
          thisColor = colorElement[index].value;
        }
      }
      ctx.fillStyle = thisColor; 
      ctx.fillRect(recX*60, recY , 50, 50);
      ctx.font = 'bold 10pt serif';
      console.log (obj.haba);
      ctx.fillText(obj.moji,recX*60+culcRecX(obj.haba,10,50), recY+65)
      recX++
    }
  })
 


/**
 * 文字列を文節ごとにわけて、文節の母音と文字幅も一緒にMapに入れる
 * @param {Array} arrtext 
 * @returns {Map}
 */
function makeBunsetsuMap(arrtext) {

  let mojibuf //仮文節変数
  let boinbuf //仮母音変数
  let cnt = 0 //Mapにセットした回数カウント用 Mapのindex

  const mymap = new Map()
  arrtext.forEach((str, index) => {
    //最初の要素なら仮文節変数、仮母音変数にstrを入れて次へ
    if (index == 0){
        mojibuf = str;
        boinbuf = str;
        return;
    }
  
    if (isYouon(str)) {
        mojibuf = mojibuf + str
        boinbuf = str;
    } else if (str.match(/っ/)) {
        mojibuf = mojibuf + str
    } else if (str.match(/\n/)) {
        mymap.set (cnt,{moji:mojibuf, boin: boinbuf,haba:countHaba(mojibuf)})
        mojibuf = str
        boinbuf = str
        cnt++
    } else if (isNotHiragana(str)) {
        mojibuf = mojibuf + str
    } else {
        console.log(cnt)
        mymap.set (cnt,{moji:mojibuf, boin: boinbuf,haba:countHaba(mojibuf)})
        mojibuf = str
        boinbuf = str
        cnt++
    }
  //最終の要素ならMapに追加
    if (index == arrtext.length - 1){
        mymap.set (cnt,{moji:mojibuf, boin: boinbuf,haba:countHaba(mojibuf)})
    }
  })
  
  return mymap
}




/**
 * 対象文字がひらがなか空白(全角・半角)かどうか
 * @param {String} str 
 * @returns {Boolean}
 */
function isNotHiragana(str){
  str = (str==null)?"":str;
  return !/[ぁ-ゖー　 ]/.test(str); //"ー"の後ろの文字は全角スペースと半角スペースです。
}


/**
 * 対象文字が拗音かどうか
 * @param {String} str 
 * @returns {Boolean}
 */
function isYouon(str){
  str = (str==null)?"":str;
  return /[ぁぃぅぇぉゃゅょゎゕゖ]/.test(str);
}


/**
 * 全角半角を区別した文字幅を返す
 * @param {String} strs /数えたい文字列
 * @returns {Number}
 */
function countHaba(strs) {
    let arrstr = strs.split('')
    let mojihaba = 0
    arrstr.forEach(element => {
      if(/[ -~]/.test(element) ) { //半角だったら0.5足す
          mojihaba += 0.5;
      } else {
          mojihaba +=  1; //全角だったら1足す
      }
    })
    return mojihaba;
  }
}

/**
 * 文字列を四角形の中心に表示するための、文字開始位置を計算
 * @param {Number} mojihaba /文字の幅
 * @param {Number} ptmojisize /文字の大きさ 単位：ポイント
 * @param {Number} pxrecsize /四角形の幅 単位：ピクセル
 * @returns　/文字の開始位置 単位：ピクセル
 */
function culcRecX(mojihaba,ptmojisize,pxrecsize) {
  const pxmojisize = ptmojisize * 1.33 // 1px =　1.33pt
  return Math.round((pxrecsize - mojihaba * pxmojisize)/2); 
}
  