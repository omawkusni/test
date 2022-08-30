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

  for (let value of testMap) {
    console.log(value)
  }


  pattern="^[0-9A-Za-z]+$" title="エラー表記"
