document.addEventListener('DOMContentLoaded', function() {

  const tweetTextEl = document.getElementById('tweet-text');
  const counterEl = document.getElementById('counter');

  const countChars = function() {
    let theCnt = parseInt(tweetTextEl.value.length);
    if (theCnt >= 0 && theCnt <= 140) {
      counterEl.classList.remove('red');
    } else if (theCnt > 140) {
      counterEl.classList.add('red');
    }
    counterEl.innerHTML = (140 - theCnt).toString();
  };
  window.addEventListener('mousedown', countChars, false);
  window.addEventListener('keydown', countChars, false);
  window.addEventListener('paste', countChars, false);

  // tweetTextEl.addEventListener('keyup paste mouseup', () => {
  //
  // });
}, false);
