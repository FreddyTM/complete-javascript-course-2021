'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

/* for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal); */

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
// Selecting, Creating, and Deleting Elements

// Selecting elements
//Top level elements that doesn't need a selector method
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
//The list of elements returned by querySelectorAll() don't change dynamically. It holds the element list at the time it was called
//If there are changes after that, they won't be reflected
//This is because it returns a NodeList
const allSections = document.querySelectorAll('.section');
console.log(allSections);

document.getElementById('section--1');
//The list of elements returned by getElementsByTagName() change dynamically when elements are created or deleted
//This is because it returns an HTMLCollection
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

//Returns an HTMLCollection
console.log(document.getElementsByClassName('btn'));

// Creating and inserting elements
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'We use cookied for improved functionality and analytics.';
message.innerHTML =
  'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// header.prepend(message); //prepend() inserts as the first element of the parent node
header.append(message); //append inserts as the last element of the parent node

//We cannot prepend or append the same element more than once, it will just jump to the last appending/ prepending point, dissapearing from
//where it was before. To append/prepend multiple times the same element, we have to clone it first
// header.append(message.cloneNode(true));

// header.before(message); //The message element will append before the header element, as a sibling
// header.after(message); //The message element will append after the header element, as a sibling

// Delete elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
    /* Old way of removing elements
    message.parentElement.removeChild(message); */
  });

///////////////////////////////////////
// Styles, Attributes and Classes

// Styles
//These styles are created as inline styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

//We can only retrieve styles that were created programmatically as inline styles
console.log(message.style.color); //We get nothing
console.log(message.style.backgroundColor); //rgb(55, 56, 61)

//To get styles not created programmatically, we have to use getComputedStyle()
console.log(getComputedStyle(message).color); //rgb(187, 187, 187)
console.log(getComputedStyle(message).height); //50px
// This will get ALL the styles of the object (a lot of...) inside a CSSStyleDeclaration object
// but it's just a list of the styles, not their values
// CSSStyleDeclaration {0: "align-content", 1: "align-items", 2: "align-self", 3: "alignment-baseline", 4: "animation-delay", ...}
/* console.log(getComputedStyle(message)); */

//Number.parseFloat() because getComputedStyle(message) will return a string
message.style.height =
  Number.parseFloat(getComputedStyle(message).height) + 30 + 'px';
console.log(message.style.height);
//Setting style properties of the HTML element. It's like setting styles for the whole HTML document
//These properties are pre-defined in the document root, they are not custom properties that we define in css
document.documentElement.style.setProperty('--color-primary', 'orangered');

// Attributes
const logo = document.querySelector('.nav__logo');
//We select element's attributes like we'd select object attributes
//They have to be stardard attributes, already defined as part of the element attributes list
console.log(logo.alt);
console.log(logo.className);

logo.alt = 'Beautiful minimalist logo';

// Selecting non-standard attributes. We use getAttribute()
console.log(logo.designer); //Undefined
console.log(logo.getAttribute('designer')); //whatever the value we gave to the custom attribute 'designer'
// Creating attributes
logo.setAttribute('company', 'Bankist'); //setAttribute(att_name, att_value)

//Getting source (src) attribute value
console.log(logo.src); //Absolute source path
console.log(logo.getAttribute('src')); //Relative source path
//Getting href attribute value
const link = document.querySelector('.nav__link--btn');
console.log(link.href); //Absolute url
//A hash - # within a hyperlink specifies an html element id to which the window should be scrolled.
//href="#some-id" would scroll to an element on the current page such as <div id="some-id">.
//href="//site.com/#some-id" would go to site.com and scroll to the id on that page.
//Clicking an anchor with href="#" will move the scroll position to the top.
console.log(link.getAttribute('href')); //#

// Data attributes (attributes starting by 'data-' -> data-version-number="3.0")
// To retieve them, we use dataset.attribute_name (ommiting 'data-' and writting the rest of the attribute name as camel case)
console.log(logo.dataset.versionNumber);

// Classes
logo.classList.add('c', 'j');
logo.classList.remove('c', 'j');
logo.classList.toggle('c');
logo.classList.contains('c'); // true or false

// Don't use that. It'll remove all the classes of the element, leaving just the new jonas class
/* logo.clasName = 'jonas'; */
