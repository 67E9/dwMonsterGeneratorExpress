const monsterdata = $(".monsterName").text().trim() + "\r" + $(".tags").text().trim() +
  "\r" + $(".atkName").text().trim() + $(".atkDmg").text().trim() +
  $(".atkRange").text().trim() + $(".atkTag").text().trim() + "\r" +
  $(".hitPoints").text().trim() + " " + $(".hpTxt").text().trim() + " " + $(".armTxt").text().trim() +
  " " + $(".armor").text().trim() + "\r" + $(".specTxt").text().trim() + " " +
  $(".specialTags").text().trim() + "\r" + $(".instinctTxt").text().trim() + " " +
  $(".instinctOutput").text().trim() + allMoves();
//trim() removes leading and final whitespace

function allMoves() {
  let moves = ""

  $(".move").each(function(){
    moves = moves + "\r" + $(this).html();
  })

  return moves
}


const copyToClipboard = () => {
  if (navigator && navigator.clipboard && navigator.clipboard.writeText)
    return navigator.clipboard.writeText(monsterdata).then(function() {
      window.alert("Dein Monster wurde kopiert!");
    });
  return Promise.reject('Kein Zugriff auf Clipboard API');
};
