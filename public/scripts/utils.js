const sanitizeHTML = str => str.replace(/[^\w. ]/gi, function(c) {
  return '&#' + c.charCodeAt(0) + ';';
});
