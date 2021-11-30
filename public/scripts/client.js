/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

'use strict';

// don't need this any longer since we do it in the createTweetElement
// document.addEventListener('DOMContentLoaded', function() {
//   // start DOM loaded stuff. jquery = badnews and dead
//   const els = document.querySelectorAll('.date-tweeted');
//   els.forEach(function(el, idx) {
//     el.innerHTML = timeago.format(el.dataset.datetime);
//   });
//
// }, false);

// Test / driver code (temporary). Eventually will get this from the server.
// since we already have a data file, just import it instead of duplicating it in here
const tweetData = [
  {
    'user': {
      'name': 'Newton',
      'avatars': 'https://i.imgur.com/73hZDYK.png',
      'handle': '@SirIsaac',
    },
    'content': {
      'text': 'If I have seen further it is by standing on the shoulders of giants',
    },
    'created_at': 1638037126990,
  },
  {
    'user': {
      'name': 'Descartes',
      'avatars': 'https://i.imgur.com/nlhLi3I.png',
      'handle': '@rd',
    },
    'content': {
      'text': 'Je pense , donc je suis',
    },
    'created_at': 1638123526990,
  },
];

const createTweetElement = tweetData => `
  	<article class="tweet">
		<header>
			<span class="realname"><img src="${tweetData.user.avatars}" alt="${tweetData.user.name}"> ${tweetData.user.name}</span>
			<span class="username"><a href="users/${tweetData.user.handle}">${tweetData.user.name}</a></span>
		</header>
		<p class="bold tweet-text">${tweetData.content.text}</p>
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
const renderTweets = tweets => {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  const tweetCont = document.getElementById('tweets-container');
  tweets.forEach(tweet => {
    tweetCont.insertAdjacentHTML('beforeend', createTweetElement(tweet));
  });
};

renderTweets(tweetData);
