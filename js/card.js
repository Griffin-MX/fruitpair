var pic = [];  // Array containing picutres that is used
var pos = [];  // Array containing the picture position
var nPair = 0; // Number of pairs.

/**
 * Initialize the game and card position.
 *
 * @param level {String} [in] Level, in "easy", "normal" or "hard".
 */
function card_init(level) {
  switch (level) {
    case "easy":
      nPair = 2; // sqrt(2*2)
      break;
    case "normal":
      nPair = 8; // sqrt(4*4)
      break;
    case "hard":
      nPair = 18; // sqrt(6*6)
      break;
    default:
      throw("Unwanted \"level\" encountered: " + level)
      return;
  }

  pic = ransel(1, 18, nPair); // Randomly select `nPair` pictures according to the level specified
  pos = ranseq(nPair * 2, 1); // Use a shuffled positional list.

  /* Here is a graph showing how we randomly position the cards. Given the level "Easy":
   *
   *      |---|---|---|---|
   * pos  | 4 | 2 | 3 | 1 | ← Randomly shuffled an 1 to 4 array (ranseq)
   *      |~~~|~~~|~~~|~~~|
   *        ↑  ↗    ↑  ↗    ← (Picture) ↑  ↗ (Word)
   *      |---|   |---|
   * pic  | 3 |   | 9 |     ← 2 Numbers randomly selected from 1 to 18 (ransel)
   *      |~~~|   |~~~|
   */

  // NOTE: Firefox 53.0 on Linux: Cards won't be enabled if the last game disabled somwthing.
  for (var i = 1; i <= nPair * 2; i++) {
    document.getElementById("pic" + i).parentNode.disabled = false;
  }

  return;
}

var flipped = []; // Array containing cards flipped. FIXME: No need (only one will be stored).

/**
 * Handler for a card being clicked.
 *
 * @param idNum {Number} [in] The ID suffix number
 */
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
    var first_click = flipped.pop();
    var second_click = idNum;
    /* NOTE: Sequence matters. Consider the following:
     *
     *       Second   First
     *            ↓   ↓
     *      |---|---||---|---|
     * pos  | 4 | 2 || 3 | 1 |
     *      |~~~|~~~||~~~|~~~|
     * [i]    0  ↙1   ↓2   3
     *      |---|    |---|
     * pic  |[3]|    |[9]|
     *      |~~~|    |~~~|
     * [i]    0        1
     *
     * Even positions for pictures, while odd positions are for words. From graph above, we need to:
     *
     * 1. Determine which comes first;
     * 2. Determine if they are beside each other (latter - former = 1);
     * 3. Determine if the former one is on the picture position (even).
     *
     * If the 3 conditions above are all true, then the 2 clicks matched. (So the condition on the graph does not match)
     */
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

/**
 * Query Card Names.
 *
 * This function checks array `pos`, and reveresely check the filename of clicked picture (in array `pic`), and return
 * it. Used to flip cards.
 *
 * @param idNum {Number} [in] The ID suffix number
 * @return Relative path to the image (to ease the process of pointing to the file)
 */
function query_card_src(idNum) {
  /* To reveresely check the card's face (given that card id "pic2 is clicked"):
   *
   *            ↓           →→ Traverse pos[]
   *      |---|---|---|---|
   * pos  | 4 | 2 | 3 | 1 |
   *      |~~~|~~~|~~~|~~~|
   * [i]    0  ↙1   2   3   ← Even positions for pictures, while odd positions are for words.
   *      |---|   |---|       (Mind that in array the position is start from 0)
   * pic  |[3]|   | 9 |     → Return with full path assembled
   *      |~~~|   |~~~|
   * [i]    0       1
   */
  for (var i = 0; i < pos.length; i++) {
    if (pos[i] == idNum) {
      if (i%2 == 0) {
        return "../img/" + pic[Math.floor(i/2)] + ".jpg";
      } else {
        return "../img/words/" + pic[Math.floor(i/2)] + ".jpg";
      }
    }
  }

  throw ("Internal error occurred in query_card_src: " + idNum + " cannot be found in pic");
  return "";
}

/**
 * Query Card Position in array `pos`.
 *
 * @param idNum {Number} [in] The ID suffix number
 * @return Index number where the number positions.
 */
function query_card_pos_index(idNum) {
  /*
   * Given that card id "pic2 is clicked":
   *
   *            ↓           →→ Traverse pos[]
   *      |---|---|---|---|
   * pos  | 4 | 2 | 3 | 1 |
   *      |~~~|~~~|~~~|~~~|
   * [i]    0  [1]   2   3  → Return
   */
  for (var i = 0; i < pos.length; i++) {
    if (pos[i] == idNum) {
      return i;
    }
  }

  throw ("Internal error occurred in query_card_pos_index: " + idNum + " cannot be found in pos");
  return "";
}

/**
 * Increase score by `score`.
 *
 * @param score {Number} [in] Score to be increased
 */
function score_inc(score) {
  var curr_score = parseInt(document.getElementById('curr-score').innerHTML);
  document.getElementById('curr-score').innerHTML = curr_score + score;
}

/**
 * Decrease score by `score`.
 *
 * @param score {Number} [in] Score to be decreased
 */
function score_dec(score) {
  var curr_score = parseInt(document.getElementById('curr-score').innerHTML);
  document.getElementById('curr-score').innerHTML = curr_score - score;
}

/**
 * Flip all cards faced-on.
 */
function card_all_face_on() {
  for (var i = 1; i <= pos.length; i++) {
    document.getElementById("pic" + i).src = query_card_src(i);
    // Disable them because generally the game can't proceed (often it wins)
    document.getElementById("pic" + i).parentNode.disabled = true;
  }
}

/**
 * Flip back two cards.
 *
 * This is used 1s after the cards unmatched, invoked by a setTimeout.
 *
 * @param first_click  {Number} [in] The first ID suffix number
 * @param second_click {Number} [in] The secind ID suffix number
 */
function card_flip_back(first_click, second_click) {
  document.getElementById("pic" + first_click).src = "../img/back.jpg";
  document.getElementById("pic" + second_click).src = "../img/back.jpg";
  document.getElementById("pic" + first_click).parentNode.disabled = false;
  document.getElementById("pic" + second_click).parentNode.disabled = false;
}

/**
 * Check if it wins.
 */
function check_win() {
  for (var i = 1; i <= nPair * 2; i++) {
    if (document.getElementById("pic" + i).parentNode.disabled === false) {
      return; // Not winning once we find that there is still a card not flipped
    }
  }

  // It wins.
  alert("congratulations!");
  clearInterval(int); // `int` is in HTML inline script. Jeez.
}
