document.addEventListener('DOMContentLoaded', function() {

  const tweetTextEl = document.getElementById('tweet-text');
  const counterEl = document.getElementById('counter');

  const countChars = function() {
    let theCnt = tweetTextEl.value.length;
    if (theCnt >= 0 && theCnt <= 140) {
      counterEl.classList.remove('red');
      counterEl.innerHTML = theCnt;
    } else if (theCnt > 140) {
      counterEl.innerHTML = (140 - parseInt(theCnt)).toString();
      counterEl.classList.add('red');
    }
  };
  window.addEventListener('mouseup', countChars, false);
  window.addEventListener('keyup', countChars, false);
  window.addEventListener('paste', countChars, false);

  // tweetTextEl.addEventListener('keyup paste mouseup', () => {
  //
  // });
}, false);
