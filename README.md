# Slide Show

A slide show with touch support and GSAP animations.

## Setup

To setup a slide show you must provide a *nav* element with a class of *.ss-nav*, and each link within the navigation must include an *href* that matches up with the *data-id* attribute of each slide.

The *.ss-slides* div acts as the container for each of the slides, and each slide within this container must use a *section* element.

## Usage

To transition from slide to slide you can either click on the navigation on the right side of the screen, scroll with the mouse, or the arrow keys on the keyboard.

### Mouse Controls

- **Click**: Transition to a slide
- **Scroll**: Transition between slides

### Keyboard Controls

- **&#8593;**: Next slide
- **&#8595;**: Previous slide
- **&#8592;**: First slide
- **&#8594;**: Last slide
- **Space**: Next slide
