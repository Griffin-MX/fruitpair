var pic = [];
var pos = [];
var nPair = 0;

function card_init(level) {
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

  // for (let iPic = 0, iPos = 0; iPic < nPair; iPic++, iPos += 2) {
  //   document.getElementById("pic" + pos[iPos]).src = "../img/" + pic[iPic] + ".jpg";
  //   document.getElementById("pic" + pos[iPos+1]).src = "../img/words/" + pic[iPic] + ".jpg";
  // }

  // NOTE: Firefox 53.0 on Linux: Cards won't be enabled if the last game disabled somwthing.
  for (let i = 1; i <= nPair * 2; i++) {
    document.getElementById("pic" + i).parentNode.disabled = false;
  }

  return;
}

var flipped = [];

function card_clicked(idNum) {
  if (flipped.length == 0) {
    flipped.push(idNum);
    document.getElementById("pic" + idNum).src = query_card_src(idNum);
    // Disable the cards to prevent them from being clicked again.
    document.getElementById("pic" + idNum).parentNode.disabled = true;
  } else {
    // Flip the card first.
    document.getElementById("pic" + idNum).src = query_card_src(idNum);
    // Disable the cards to prevent them from being clicked again.
    document.getElementById("pic" + idNum).parentNode.disabled = true;

    // Then check if the flipped card matches the previous flipped one.
    let first_click = flipped.pop();
    let second_click = idNum;
    if ((
       (query_card_pos_index(first_click) < query_card_pos_index(second_click))
    && (query_card_pos_index(second_click) - query_card_pos_index(first_click) == 1)
    && (query_card_pos_index(first_click) % 2 == 0)
    ) || (
       (query_card_pos_index(first_click) > query_card_pos_index(second_click))
    && (query_card_pos_index(second_click) - query_card_pos_index(first_click) == -1)
    && (query_card_pos_index(second_click) % 2 == 0)
    )) {
      // Matched.
      score_inc(10);
      // Check if it wins.
      check_win();
    } else {
      // Unmatched.
      score_dec(1);
      setTimeout(card_flip_back, 1000, first_click, second_click);
    }
  }
}

function query_card_src(idNum) {
  for (let i = 0; i < pos.length; i++) {
    if (pos[i] == idNum) {
      // return "../img/" + pic[i/2] + ".jpg";
      if (i%2 == 0) {
        return "../img/" + pic[Math.floor(i/2)] + ".jpg";
      } else {
        return "../img/words/" + pic[Math.floor(i/2)] + ".jpg";
      }
    }
  }

  throw ("Internal error occurred in query_card_src: " + idNUm + " cannot be found in pic");
  return "";
}

function query_card_pos_index(idNum) {
  for (let i = 0; i < pos.length; i++) {
    if (pos[i] == idNum) {
      return i;
    }
  }

  throw ("Internal error occurred in query_card_pos_index: " + idNUm + " cannot be found in pos");
  return "";
}

function score_inc(score) {
  let curr_score = parseInt(document.getElementById('curr-score').innerHTML);
  document.getElementById('curr-score').innerHTML = curr_score + score;
}

function score_dec(score) {
  let curr_score = parseInt(document.getElementById('curr-score').innerHTML);
  document.getElementById('curr-score').innerHTML = curr_score - score;
}

function card_flip_back(first_click, second_click) {
  document.getElementById("pic" + first_click).src = "../img/back.jpg";
  document.getElementById("pic" + second_click).src = "../img/back.jpg";
  document.getElementById("pic" + first_click).parentNode.disabled = false;
  document.getElementById("pic" + second_click).parentNode.disabled = false;
}

function check_win() {
  for (let i = 1; i <= nPair * 2; i++) {
    if (document.getElementById("pic" + i).parentNode.disabled == false) {
      return;
    }
  }

  // It wins.
  alert("congratulations!");
  clearInterval(int); // `int` is in HTML inline script. Jeez.
}
