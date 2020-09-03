var slideShow = (function(exports) {
  'use strict';

  // setup module exports
  var exports = {};

  // setup slides
  let currentIndex = 0;
  let useAnchors = false;
  const nav = document.querySelectorAll('.slide-show__nav a');
  const slides = [];

  for (const key of Object.keys(nav)) {
    // create slide object
    slides[key] = {};
    // add slides
    slides[key].id = nav[key].getAttribute('href');
    slides[key].tl = new TimelineMax();
    // add click events to nav elements
    const navElement = document.querySelector(`.slide-show__nav a[href="${slides[key].id}"]`);
    navElement.addEventListener('click', event => {
      event.preventDefault();
      const slide = event.currentTarget.getAttribute('href');
      scrollTo(slide);
    });
  }

  // set z-index for slides
  let totalSlides = slides.length;

  for (let i = 0; i < totalSlides; i++) {
    const slide = document.querySelector(`.slide-show__slides section[data-id="${slides[i].id}"]`);
    slide.style.zIndex = totalSlides - i;
  }

  // fade in slide show
  const cloak = document.querySelector('.slide-show__cloak');
  cloak.style.visibility = 'visible';
  cloak.style.opacity = 1;

  // returns slide id
  function slideId(index) {
    return slides[index].id;
  }

  // returns slide index
  function slideIndex(slide) {
    for (let i = 0; i < totalSlides; i++) {
      if (slide === slides[i].id) {
        return i;
      }
    }
  }

  // set active class on nav
  function activeNav(slide) {
    for (const key of Object.keys(nav)) {
      const navElement = document.querySelector('.slide-show__nav a[href="' + slides[key].id + '"]');
      const link = nav[key].getAttribute('href');
      if (slide === link) {
        navElement.classList.add('slide-show__nav--active');
      } else {
        navElement.classList.remove('slide-show__nav--active');
      }
    }
  }

  // set default slide on nav
  activeNav(slides[currentIndex].id);

  // animate slide, pause all other slides
  function animateSlide(index) {
    for (const slide of slides) {
      slide.tl.pause();
    }
    slides[index].tl.restart();
  }

  // scroll to selected slide
  function scrollTo(newSlide) {
    // newSlide can be string or number
    let newIndex;
    if (typeof newSlide === 'string') {
      newIndex = slideIndex(newSlide)
    } else {
      newIndex = newSlide;
    }
    // cancel if already on slide
    if (currentIndex === newIndex) { return; }
    // show the new slide
    for (let i = 0; i < totalSlides; i++) {
      const slide = document.querySelector(`.slide-show__slides section[data-id="${slides[i].id}"]`);
      if (i === newIndex) {
        currentIndex = i;
        slide.style.top = '0';
        activeNav(slideId(i)); // set active nav element
        animateSlide(i); // animate active slide
        useAnchors && (window.location = '#' + slideId(i)); // set window location
      } else if (i < newIndex) {
        slide.style.top = '-100%';
      } else if (i > newIndex) {
        slide.style.top = '0';
      }
    }
  }

  // scroll to previous slide
  function prevSlide() {
    if (currentIndex > 0) {
      scrollTo(currentIndex - 1);
    }
  }

  // scroll to next slide
  function nextSlide() {
    if (currentIndex < totalSlides - 1) {
      scrollTo(currentIndex + 1);
    }
  }

  // mouse wheel events
  let allowSlide = true;
  let seconds = 1.5; // should match slide transition time
  let wait = seconds * 1000;

  window.addEventListener('wheel', event => {
    if (allowSlide) {
      allowSlide = false;
      setTimeout(() => {
        allowSlide = true;
      }, wait);
      const nextIndex = currentIndex + (1 * Math.sign(event.deltaY));
      if (nextIndex > currentIndex && nextIndex <= totalSlides - 1) {
        nextSlide();
      } else if (nextIndex < currentIndex && nextIndex >= 0) {
        prevSlide();
      }
    }
  });

  // key events
  window.addEventListener('keydown', event => {
    let keys = {
      up: 38,
      down: 40,
      left: 37,
      right: 39,
      space: 32
    };
    switch (event.which) {
      case keys.up:
        return prevSlide(); // previous slide
      case keys.down:
      case keys.space:
        return nextSlide(); // next slide
      case keys.left:
        return scrollTo(0); // first slide
      case keys.right:
        return scrollTo(totalSlides - 1); // last slide
    }
  });

  // touch events
  let isDragging = false;
  let yStartPos = null;

  window.addEventListener('touchstart', event => {
    isDragging = true;
    yStartPos = event.changedTouches[0].pageY;
  });

  window.addEventListener('touchmove', event => {
    event.preventDefault();
    if (isDragging) {
      isDragging = false; // cancel additional dragging
      // update slide based on
      const yEndPos = event.changedTouches[0].pageY;
      const yDelta = yStartPos - yEndPos;
      if (yDelta > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      yStartPos = null;
    }
  });

  window.addEventListener('touchend', event => {
    isDragging = false;
    yStartPos = null;
  });

  // export slides
  exports.slides = slides;

  // return module exports
  return exports;

}(slideShow || {}));
