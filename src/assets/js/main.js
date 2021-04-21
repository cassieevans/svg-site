import Hello from './hello.js';

(function () {
  // polyfill for forEach loops in IE
  if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
  }
  if (window.HTMLCollection && !HTMLCollection.prototype.forEach) {
    HTMLCollection.prototype.forEach = Array.prototype.forEach;
  }

  document.documentElement.classList.add('has-js');

  Hello();
})(window);
