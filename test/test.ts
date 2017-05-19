/// <reference path="../out/index.d.ts" />

import test = require('blue-tape');
import anime = require('animejs');

test('roundtrip', t => {
  anime({
    targets: 'div',
    translateX: [
      { value: 100, duration: 1200 },
      { value: 0, duration: 800 }
    ],
    rotate: '1turn',
    backgroundColor: '#FFF',
    duration: 2000,
    loop: true
  });

// Any CSS properties can be animated:

anime({
  targets: 'div',
  left: '80%', // Animate all divs left position to 80%
  opacity: .8, // Animate all divs opacity to .8
  backgroundColor: '#FFF' // Animate all divs background color to #FFF
});

// CSS transforms can be animated individually:

anime({
  targets: 'div',
  translateX: 250, // Animate all divs translateX property to 250px
  scale: 2, // Animate all divs scale to 1.5
  rotate: '1turn' // Animate all divs rotation to 1 turn
});

// Any Object property containing a numerical value can be animated:

var myObject = {
  prop1: 0,
  prop2: '0%'
}

anime({
  targets: myObject,
  prop1: 50, // Animate the 'prop1' property from myObject to 50
  prop2: '100%' // Animate the 'prop2' property from myObject to 100%
});


// Any DOM Attribute containing a numerical values can be animated:

anime({
  targets: 'input',
  value: 1000, // Animate the input value to 1000
  round: 1 // Remove decimals by rounding the value
});

// Any SVG Attribute containing a numerical values can be animated:
anime({
  targets: 'polygon',
  points: '64 128 8.574 96 8.574 32 64 0 119.426 32 119.426 96'
});


// Property parameters
anime({
  translateX: {
    value: 250,
    duration: 800
  },
  rotate: {
    value: 360,
    duration: 1800,
    easing: 'easeInOutSine'
  },
  scale: {
    value: 2,
    duration: 1600,
    delay: 800,
    easing: 'easeInOutQuart'
  },
  delay: 250 // All properties except 'scale' inherit 250ms delay
});


// Function based property parameters
anime({
  targets: 'div',
  translateX: 100,
  translateY: 250,
  rotate: 180,
  duration: function(target) {
    // Duration based on every div 'data-duration' attribute
    return target.getAttribute('data-duration');
  },
  delay: function(target, index) {
    // 100ms delay multiplied by every div index, in ascending order
    return index * 100;
  },
  elasticity: function(target, index, totalTargets) {
    // Elasticity multiplied by every div index, in descending order
    return 200 + ((totalTargets - index) * 200);
  }
});

// Animation parameters
anime({
  targets: 'div',
  translateX: 100,
  duration: 2000,
  loop: 3, // Play the animation 3 times
  direction: 'reverse', // Play the animation in reverse
  autoplay: false // Animation paused by default
});

// Property values
anime({
  targets: 'div',
  translateX: 100, // Add 'px' by default (from 0px to 100px)
  rotate: '1turn', // Use 'turn' as unit (from 0turn to 1turn)
  scale: '*=2', // Multiply the current scale value by 2 (from 1 to (1 * 2))
  backgroundColor: '#FFF', // Animate the background color to #FFF (from 'rgb(0,0,0)' to 'rgb(255,255,255)')
  duration: 1500
});


// From > To values
anime({
  targets: 'div',
  translateX: [100, 200], // Translate X from 100 to 200
  rotate: ['.5turn', '1turn'], // Rotate from 180deg to 360deg
  scale: ['*=2', 1], // Scale from 2 times the original value to 1,
  backgroundColor: ['rgb(255,0,0)', '#FFF'], // Will transition the background color from red to white
  duration: 1500
});


// Function based values
anime({
  targets: 'div',
  translateX: function(el) {
    return el.getAttribute('data-x');
  },
  translateY: function(el, i) {
    return 50 + (-50 * i);
  },
  scale: function(el, i, l) {
    return (l - i) + .25;
  },
  rotate: function() { return anime.random(-360, 360); },
  duration: function() { return anime.random(1200, 1800); },
  elasticity: function() { return anime.random(800, 1600); },
  delay: function() { return anime.random(0, 1000); }
});

// Keyframes
anime({
  targets: 'div',
  translateX: [
    { value: 250, duration: 1000, delay: 500, elasticity: 0 },
    { value: 0, duration: 1000, delay: 500, elasticity: 0 }
  ],
  translateY: [
    { value: -40, duration: 500, elasticity: 100 },
    { value: 40, duration: 500, delay: 1000, elasticity: 100 },
    { value: 0, duration: 500, delay: 1000, elasticity: 100 }
  ],
  scaleX: [
    { value: 4, duration: 100, delay: 500, easing: 'easeOutExpo' },
    { value: 1, duration: 900, elasticity: 300 },
    { value: 4, duration: 100, delay: 500, easing: 'easeOutExpo' },
    { value: 1, duration: 900, elasticity: 300 }
  ],
  scaleY: [
    { value: [1.75, 1], duration: 500 },
    { value: 2, duration: 50, delay: 1000, easing: 'easeOutExpo' },
    { value: 1, duration: 450 },
    { value: 1.75, duration: 50, delay: 1000, easing: 'easeOutExpo' },
    { value: 1, duration: 450 }
  ]
});


  t.end();
});


test('timeline', t => {

  // Basic timeline
  var myTimeline_simple = anime.timeline();

  var myTimeline = anime.timeline({
    direction: 'alternate',
    loop: 3,
    autoplay: false
  });
  myTimeline
    .add({
      targets: '.square',
      translateX: 250
    })
    .add({
      targets: '.circle',
      translateX: 250
    })
    .add({
      targets: '.triangle',
      translateX: 250
    });

  myTimeline
    .add({
      targets: '.square',
      translateX: 250
    })
    .add({
      targets: '.circle',
      translateX: 250,
      offset: '-=600' // Starts 600ms before the previous animation ends
    })
    .add({
      targets: '.triangle',
      translateX: 250,
      offset: '-=800' // Starts 800ms before the previous animation ends
    });

  // Defines an absolute starting time on the timeline with a number.
  myTimeline
  .add({
    targets: '.square',
    translateX: 250,
    offset: 1000 // Starts at 1000ms
  })
  .add({
    targets: '.circle',
    translateX: 250,
    offset: 500 // Starts at 500ms
  })
  .add({
    targets: '.triangle',
    translateX: 250,
    offset: 0 // Starts at 0ms
  });

  //


  t.end();
});




test('Playback controls', t => {
  // Play / Pause
  var playPauseAnim = anime({
    targets: 'div',
    translateX: 250,
    direction: 'alternate',
    loop: true,
    autoplay: false // prevent the instance from playing
  });

  playPauseAnim.play(); //  Manually play
  playPauseAnim.pause(); //  Manually pause


  // Restart
  var restartAnim = anime({
    targets: 'div',
    translateX: 250,
    direction: 'alternate',
    loop: true,
    autoplay: false
  });

  restartAnim.restart(); // Restart the animation and reset the loop count / current direction

  // Reverse
  var restartAnim = anime({
    targets: 'div',
    translateX: 250,
    direction: 'alternate',
    loop: true
  });

  restartAnim.reverse(); // Change the animation direction


  // Seek
  var seekAnim = anime({
    targets: 'div',
    translateX: 250,
    delay: function(el, i, l) { return i * 100; },
    elasticity: 200,
    autoplay: false
  });

  seekAnim.seek(500); // Set the animation current time to 500ms




  t.end();
});



test('Callbacks', t => {

  // Update
  // update() is called on every frame while the instance is playing.
  var myAnimation = anime({
    targets: '#callbacks .el',
    translateX: 250,
    delay: 1000,
    update: function(anim) {
      console.log(anim.currentTime + 'ms'); // Get current animation time with `myAnimation.currentTime`, return value in ms.
      console.log(anim.progress + '%'); // Get current animation progress with `myAnimation.progress`, return value in %
    }
  });

  // Begin
  // begin() is called once after the delay is finished.
  var myAnimation = anime({
    targets: '#begin .el',
    translateX: 250,
    delay: 1000,
    begin: function(anim) {
      console.log(anim.began); // true after 1000ms
    }
  });

  // Run
  // run() is called every frame after the delay is finished.
  var myAnimation = anime({
    targets: '#begin .el',
    translateX: 250,
    delay: 1000,
    run: function(anim) {
      console.log(anim.currentTime);
    }
  });


  // Complete
  // complete() is called once after the animation is finished.
  var myAnimation = anime({
    targets: '#complete .el',
    translateX: 250,
    complete: function(anim) {
      console.log(anim.completed);
    }
  });


  t.end();
});




test('SVG', t => {
  // Create a path `Object`
  var path = anime.path('#motionPath path');

  var motionPath = anime({
    targets: '#motionPath .el',
    translateX: path('x'), // Follow the x values from the path `Object`
    translateY: path('y'), // Follow the y values from the path `Object`
    rotate: path('angle')  // Follow the angle values from the path `Object`
  });


  // Animate the transition between two SVG shapes:
  var svgAttributes = anime({
    targets: '.shape polygon',
    points: '64 128 8.574 96 8.574 32 64 0 119.426 32 119.426 96'
  });

  // Line drawing animation of an SVG shape:
  anime({
    targets: '.shape path',
    strokeDashoffset: [anime.setDashoffset, 0]
  });

  t.end();
});


test('Easing functions', t => {
  anime({
    targets: 'div',
    translateX: 100,
    easing: 'easeOutExpo' // Default 'easeOutElastic'
  });
  anime({
    targets: 'div',
    translateX: 100,
    easing: 'easeOutElastic',
    elasticity: 600 // Default 500, range [0-1000]
  });
  anime({
    targets: 'div',
    translateX: 100,
    easing: [.91,-0.54,.29,1.56],
  });
  // Add custom function
  anime.easings['myCustomEasingName'] = function(t) {
    return Math.pow(Math.sin(t * 3), 3);
  }

  // Usage
  anime({
    targets: 'div',
    translateX: 100,
    easing: 'myCustomEasingName'
  });

  // add custom Bézier curve function
  anime.easings['myCustomCurve'] = anime.bezier(.91,-0.54,.29,1.56);

  // Usage
  anime({
    targets: 'div',
    translateX: 100,
    easing: 'myCustomCurve'
  });


  t.end();
});

test('Helpers', t => {
  anime.speed = .5; // Slow down all animations by half of their original speed
  anime.running;
  anime.remove('.item-2'); // Remove all divs with the class '.item-2'
  anime.getValue('div', 'translateX'); // Return '100px'

  anime.easings;
  anime.bezier(1, 2, 3, 4); // Return function(t

  anime.random(10, 40); // Will return a random number between 10 and 40


  t.end();
});


