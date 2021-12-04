/* global axios, sanitizeHTML, timeago*/
// noinspection JSCheckFunctionSignatures

/*
 * Client-side JS logic goes here
 */

// make the form object global to allow all scripts access to it, so we keep it DRY
window.formObj = undefined;
window.tweetCont = undefined;

const ready = callbackFunc => {
  if (document.readyState !== 'loading') {
    // Document is already ready, call the callback directly
    callbackFunc();
  } else {
    // All modern browsers to register DOMContentLoaded
    document.addEventListener('DOMContentLoaded', callbackFunc);
  }
};

const loadTweets = () => {
  axios.get('/tweets').then(function(res) {
    let data = res.data;
    data.sort(function(a, b) {
      return b.created_at - a.created_at;
    });
    renderTweets(data);
  });
};

const checkForErrors = () => {
  const tbElval = document.getElementById('tweet-text').value.trim();
  let errArray = [];
  if (tbElval.length > 140) {
    errArray.push('Text must be less than 140 characters.');
  }
  if (tbElval.length === 0) {
    errArray.push('Text must not be empty.');
  }
  return errArray;
};

const postTweet = event => {
  // prevent default form submit
  event.preventDefault();
  const hasError = checkForErrors();
  if (hasError.length) {
    //alert('Please fix the following errors:');
    const errElObj = document.getElementById('errors');
    errElObj.innerHTML = '';
    hasError.forEach(error => {
      // noinspection JSValidateTypes
      errElObj.innerHTML = error;
    });
    return;
  }
  // serialze form data
  let formData = new FormData(event.target);
  // POST the data
  axios.post('/tweets', new URLSearchParams(formData).toString(),
  ).then(function() {
    // clear the textarea after submit
    document.getElementById('tweet-text').value = '';
    loadTweets();
  }).catch(function(e) {
    console.log(e);
  });
};

const renderTweets = tweetData => {
  // loops through tweets
  // calls createTweetElement for each tweet
  window.tweetCont.innerHTML = '';
  tweetData.forEach(tweet => {
    window.tweetCont.insertAdjacentHTML('beforeend', createTweetElement(tweet));
  });
};

ready(() => {
  //do this after dom fully loaded
  window.formObj = document.getElementById('frmNewTweet');
  // listen for the submit event and run the function
  window.formObj.addEventListener('submit', postTweet);
  // get and store tweet container object globally
  window.tweetCont = document.getElementById('tweets-container');
  loadTweets();
  document.getElementById('back2Top').scrollTop = 0;
  document.getElementById('writeTweet').addEventListener('click', function() {
    document.getElementById('tweet-text').focus();
  });
});

const createTweetElement = tweetData => `
  	<article class="tweet">
		<header>
			<span class="realname"><img src="${tweetData.user.avatars ? `${tweetData.user.avatars}` : '/public/images/icons8-frog-face-48.png'}" alt="${tweetData.user.name}"> ${tweetData.user.name}</span>
			<span class="username"><a href="users/${tweetData.user.handle}">${tweetData.user.handle}</a></span>
		</header>
		<p class="bold tweet-text">${sanitizeHTML(tweetData.content.text)}</p>
		<footer>
			<span class="date-tweeted">${timeago.format(tweetData.created_at)}</span>
			<span class="actions">
				<i class="fa fa-flag"></i>
				<i class="fa fa-retweet"></i>
				<i class="fa fa-heart"></i>
			</span>
		</footer>
	</article>
  `;

// Great little function to serialize FormData data
// function serialize(data) {
//   let obj = {};
//   for (let [key, value] of data) {
//     if (obj[key] !== undefined) {
//       if (!Array.isArray(obj[key])) {
//         obj[key] = [obj[key]];
//       }
//       obj[key].push(value);
//     } else {
//       obj[key] = value;
//     }
//   }
//   return obj;
// }
