'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');

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
// Button scrolling
const section1 = document.querySelector('#section--1');
btnScrollTo.addEventListener('click', function (e) {
  //Bounds of section1
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  //Bounds of the event target (the button that we added the eventlistener to)
  console.log(e.target.getBoundingClientRect());
  //Position of horizontal/vertical scrolling relative to the top of the page
  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);
  //Dimensions of the viewport
  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // Scrolling
  /*   window.scrollTo(
    //Section1 element X coordinate (relative to the viewport) + shifting amount in the X axis
    s1coords.left + window.pageXOffset, //Horizontal scroll
    //Section1 element Y coordinate (relative to the viewport) + shifting amount in the Y axis
    s1coords.top + window.pageYOffset //Vertical scroll
    //So we need to add the shifting amount (page offset) so that we get to the desired position
    //no matter where in the page we are when we click the button.
  ); */

  //We can also implement scrolling using an object with left & top attributes, and specify a behaviour attribute as well
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  //THE BEST WAY OF SCROLLING (WITH OPTIONAL SMOOTH BEHAVIOUR) --ONLY WORKS IN MODERN BROWSERS--
  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////
// Page navigation

//Attaching an eventlistener to all the elements selected
//If there's a ton of elements selected, a ton of listeners & funtcions will be attached. BAD PRACTICE - BAD PERFORMANCE
/* document.querySelectorAll('.nav__link').forEach(function (el) {
  el.addEventListener('click', function (e) {
    e.preventDefault();
    const id = this.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  });
}); */

//It's better to use event delegation, setting the eventlistener in a common ancestor of the elements, and fire the event when it bubbles up
// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  //e.target is the element that triggered the event
  //Now we have to filter the events coming from the child elements from the events coming from de ancestor itself, wich we won't probably use
  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    //Only nav__link class elements will pass the test (the ancestor element won't)
    const id = e.target.getAttribute('href'); // In this case href="#section_id"
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' }); //We can query by id to set the smooth scroll
  }
});

///////////////////////////////////////
// Tabbed component

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  // Guard clause
  if (!clicked) return; //No parent element, no action

  // Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Activate tab
  clicked.classList.add('operations__tab--active');
  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

///////////////////////////////////////
// Menu fade animation
/* const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Passing "argument" into handler
//due to bind(), 'this' is bound to the nav element (nav constant), and also to the argument of bind()
nav.addEventListener('mouseover', handleHover.bind(0.5)); //due to bind(), 'this' is the nav element (nav constant)
nav.addEventListener('mouseout', handleHover.bind(1)); */

// Menu fade animation (ALTERNATIVE)
const handleHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = opacity;
    });
    logo.style.opacity = opacity;
  }
};

// Menu fade animation (YET ANOTHER ALTERNATIVE)
// you can log the handleHover(0.1) to see that it returns a function which
// has access to the argument(opacity value) passed to handleHover() due to closures
/* const handleHover = function (o) {
  return function (e) {
    if (e.target.classList.contains('nav__link')) {
      const link = e.target;
      const siblings = link.closest('.nav').querySelectorAll('.nav__link');
      con;
      siblings.forEach(el => {
        if (el !== link) el.style.opacity = o;
      });
      logo.style.opacity = o;
    }
  };
};

// Passing "argument" into handler
nav.addEventListener('mouseover', handleHover(0.5));
nav.addEventListener('mouseout', handleHover(1)); */

// Passing "argument" into handler
nav.addEventListener('mouseover', function (e) {
  handleHover(e, 0.5);
});
nav.addEventListener('mouseout', function (e) {
  handleHover(e, 1);
});

///////////////////////////////////////
// Sticky navigation: Intersection Observer API

//We want to make the navigation bar sticky in the beginning of section 1

/* const initialCoordinates = section1.getBoundingClientRect();
console.log(initialCoordinates); */
/* const header = document.querySelector('.header'); */
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////

////SECTIONS CODE//////////////////////

// Selecting, Creating, and Deleting Elements

// Selecting elements
//Top level elements that doesn't need a selector method
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

/* const header = document.querySelector('.header'); */
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
/* document.documentElement.style.setProperty('--color-primary', 'orangered'); */

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

///////////////////////////////////////
// Types of Events and Event Handlers
const h1 = document.querySelector('h1');

const alertH1 = function (e) {
  alert('addEventListener: Great! You are reading the heading :D');
  //We can also remove listeners added with addEventListener()
  //In this case we remove the listener right into the listener's function, so it won't trigger the event again
  h1.removeEventListener('mouseenter', alertH1);
};

//BEST way of setting event listeners
//We can also add more than one function to the same listener
//'mouseenter' event fires an event when you hover the mouse over an element
h1.addEventListener('mouseenter', alertH1);

//We can also remove listeners added with addEventListener() outside of the listener function according to other needs or circumstances
//Here we remove the listener after a certain amount of time
setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

//OLD way of setting event listeners
//We can't add more than one function to the same listener, a second function will override the first one
// h1.onmouseenter = function (e) {
//   alert('onmouseenter: Great! You are reading the heading :D');
// };

///////////////////////////////////////
// Event Propagation in Practice
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

/* document.querySelector('.nav__link').addEventListener('click', function (e) {
//In an event listener, 'this' points always to the element to which the eventlistener is attached
this.style.backgroundColor = randomColor();
console.log('LINK', e.target, e.currentTarget);
console.log(e.currentTarget === this);

// Stop propagation
// e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
this.style.backgroundColor = randomColor();
console.log('CONTAINER', e.target, e.currentTarget);
});

document.querySelector('.nav').addEventListener('click', function (e) {
this.style.backgroundColor = randomColor();
console.log('NAV', e.target, e.currentTarget);
}); */

///////////////////////////////////////
// DOM Traversing
/* const h1 = document.querySelector('h1'); */

// Going downwards: child
console.log(h1.querySelectorAll('.highlight')); //All children and grandchildren down to the bottom ot the tree
console.log(h1.childNodes); //All the child nodes, as many as there are (repeted ones included)
console.log(h1.textContent); //The text content of h1 element
console.log(h1.innerHTML); //The actual HTML code inside the h1 element (with their attributes & other tags if they exsist)
//HTML collection (dynamic data) of the elements inside the h1 element
console.log(h1.children); //HTMLCollection(3) [span.highlight, br, span.highlight]
//Selecting the first or last element child and changin their style
/* h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered'; */

// Going upwards: parents
//Usually parentNode & parentElement are the same
console.log(h1.parentNode);
console.log(h1.parentElement);

//closest(selector) returns the closest parent element that matches the selector string, or null if none does
//Then we can manipulate the element we fount as any other element
//It's also very useful for event delegation
/* h1.closest('.header').style.background = 'var(--gradient-secondary)';

h1.closest('h1').style.background = 'var(--gradient-primary)'; */

// Going sideways: siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

//All of the siblings included itself (h1)
console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});
