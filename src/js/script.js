!function() {
  'use strict';

  let slides = slideShow.slides;
  const ease = Power1.easeOut;
  const delay = 1.5;

  // slide 1
  const slide1 = document.querySelector('.one h1');
  slides[0].tl.from(slide1, 0.5, {opacity: 0, yPercent: 50, ease: ease, delay: delay});
  slides[0].tl.play(1); // play initial slide, skip ahead 1 second

  // slide 2
  const slide2 = document.querySelector('.two h1');
  slides[1].tl.from(slide2, 0.5, {opacity: 0, yPercent: 50, ease: ease, delay: delay});
  slides[1].tl.pause();

  // slide 3
  const slide3 = document.querySelector('.three h1');
  slides[2].tl.from(slide3, 0.5, {opacity: 0, yPercent: 50, ease: ease, delay: delay});
  slides[2].tl.pause();

  // slide 4
  const slide4 = document.querySelector('.four h1');
  slides[3].tl.from(slide4, 0.5, {opacity: 0, yPercent: 50, ease: ease, delay: delay});
  slides[3].tl.pause();

  // slide 5
  const slide5 = document.querySelector('.five h1');
  slides[4].tl.from(slide5, 0.5, {opacity: 0, yPercent: 50, ease: ease, delay: delay});
  slides[4].tl.pause();

}();
