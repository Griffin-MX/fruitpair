function card_init(level) {
  var nPair = 0;
  var pic = [];
  var pos = [];
  var buffer = "";

  switch (level) {
    case "easy":
      nPair = 2;
      break;
    case "normal":
      nPair = 8;
      break;
    case "hard":
      nPair = 18;
      break;
    default:
      throw("Unwanted \"level\" encountered: " + level)
      return;
  }

  let tmp = ranseq(18,1);
  for (let i = 0; i < nPair * 2; i++) {
    pic[i] = tmp[i] + ".jpg"; // Magic Cast.
  }
  delete tmp;

  for (let i = 0; i < nPair * 2; i++) {
    buffer += "<div class=\"cards\">"
            +   "<img class=\"back\" type=\"button\" src=\"../img/" + pic[i] + "\"/>"
            + "</div>";
  }

  document.getElementById('lefttable').innerHTML = buffer;
  delete buffer;
  return;
}
