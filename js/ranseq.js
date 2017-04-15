/**
 * Generating a `n` long random sequence from `start` without repetition.
 *
 * This is an implementation of Knuth-Durstenfeld Shuffle (modern version of the
 * Fisher–Yates Shuffle, first introduced by Richard Durstenfeld in 1964 and
 * published by Donald Knuth in TAOCP). See: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
 *
 * @param {Number} n     [in] Length of the desired sequence.
 * @param {Number} start [in] The smallest number in the sequence.
 * @return {Array} An array containing the randomly shuffled sequence.
 */
function ranseq(n, start) {
  var a = new Array(n);

  for (let i = 0, j = start; i < n; i++, j++) {
    a[i] = j;
  }

  for (let i = n - 1; i > 0; i--) {
    let j = getRandomIntInclusive(0,i);
    let tmp = a[i];
    a[i] = a[j]
    a[j] = tmp;
  }

  return a;
}

/**
 * Generating `n` numbers from `start` to `end` without repetition, inclusive.
 *
 * This implementation mainly uses a "check list" to guarantee no repete numbers
 * be produced. However, this is not a good method, since:
 *
 * - Specifying a super-wide range (end - start + 1) cost a lot memory;
 * - When `n` is close to range (end - start + 1) there will be many collisions.
 *
 * Use this function only when range is not too big and `n` is far away from it.
 *
 * @param {Number} start [in] The lower bound.
 * @param {Number} end   [in] The upper bound.
 * @param {Number} n     [in] The number of numbers to be retrieved.
 * @return {Array} An array containing `n` randomly selected numbers.
 */
function ransel(start, end, n) {
  var range = end - start + 1;
  var selected = new Array(range);
  var sel      = new Array(n);

  // Sanity check
  if (n > range) {
      throw("ransel: range is " + range + " but " + n + " is going to select. This is incorrect.");
      return;
  }

  for (let i = 0; i < n;) {
    let tmp = getRandomIntInclusive(start,end);
    if (!selected[tmp-start]) {
      sel[i] = tmp;
      selected[tmp-start] = true;
      ++i;
    }
  }

  delete selected;
  return sel;
}

/**
 * Getting a random integer between two values, inclusive.
 *
 * Retrieved from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#Getting_a_random_integer_between_two_values_inclusive.
 *
 * @param {Number} min [in] the lower bound.
 * @param {Number} max [in] the upper bound.
 * @return {Number} A random number between `min` and `max`.
 */
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
