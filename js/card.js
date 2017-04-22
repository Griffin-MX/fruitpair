function card_init(level) {
  var nPair = 0;
  var pic = [];
  var pos = [];

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

  pic = ransel(1, 18, nPair);
  pos = ranseq(nPair * 2, 1);

  for (let iPic = 0, iPos = 0; iPic < nPair; iPic++, iPos += 2) {
    document.getElementById("pic" + pos[iPos]).src = "../img/" + pic[iPic] + ".jpg";
    document.getElementById("pic" + pos[iPos+1]).src = "../img/words/" + pic[iPic] + ".jpg";
  }

  return;
}
