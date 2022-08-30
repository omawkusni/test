'use strict';
const ConversionButton = document.getElementById('bConversion');
const colorElement = document.getElementsByName('boincolor');
const canvas = document.getElementById('testcanvas');
const inputText = document.getElementById('textin')



const arrBoin = [
  "あかさたなはまらわがざだばぱぁやゃゕ",
  "いきしちにひみりゐぎじぢびぴぃ",
  "うくすつぬふむるんぐずづぶぷぅゆゅゔ",
  "えけせてねへめれゑげぜでべぺぇゖ",
  "おこそとのほもろをごぞどぼぽぉよょ",
  " 　" //半角スペースと全角スペース
  ];

  

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
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 1000, 1000)//描画をクリア
  ctx.font = 'bold 10pt serif';
  let recX = 0
  let recY = 0

  /**
   * Mapオブジェクト
   * (key：追加順No
   * value:{moji:文節,boin:文節の主韻,haba:文節の幅})    
   */
  const mapBunsetsu = makeBunsetsuMap(arrText)

  mapBunsetsu.forEach((obj, key) => {
    let thisColor
    if (obj.moji === '\n') {
      recX = 0
      recY = recY + 70
    } else {
    //母音５行とスペースで対象要素を配列から探して色をセット
      arrBoin.forEach((value, index) => {
        let re = new RegExp('['+ value +']')
        if (re.test(obj.boin) ) {
          thisColor = colorElement[index].value;
        }
      })
      ctx.fillStyle = thisColor; 
      ctx.fillRect(recX*60, recY , 50, 50);
      ctx.fillText(obj.moji,recX * 60 + culcRecX(obj.haba,10,50), recY + 65);
      recX++
    }
  })
 


/**
 * 文を文節ごとにわけて、文節の母音と文字幅も一緒にMapに入れる
 * @param {Array} arrtext /文を一字づつに分けた配列
 * @returns {}　/key：追加順No* value:{moji:文節,boin:文節の主韻,haba:文節の幅})
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
    } else if (/っ/.test(str)) {
        mojibuf = mojibuf + str
    } else if ((/\n/).test(str)) {
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
  
  return mymap;
}




/**
 * 対象文字がひらがな・空白(全角・半角)・長音符（ー、～）かどうか
 * @param {String} str 
 * @returns {Boolean}
 */
function isNotHiragana(str){
  str = (str==null)?"":str;
  return !/[ぁ-ゖー～　 ]/.test(str); //"～"の後ろの文字は全角スペースと半角スペース
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
    const arrstr = strs.split('')
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
  