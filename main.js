//GSAP Code Components
//(Please check in screen width 600px or more )

//Timeline Variables

let cT;
let cV;
let cN;
let cP;
let pB;
let counterFx;
let master;
let vidArray

//Change Text

let changeText = (hold = 10) => {
  let cText = gsap.utils.toArray('.text');

  cT = gsap.timeline({
    repeat: -1,
    defaults: {
      ease: 'none',
      // duration: 0.5,
    },
  });

  gsap.set(cText, { autoAlpha: 1 });

  cText.forEach((obj, i) => {
    // gsap.set(cText, {
    //   delay: 0.5 * i + hold * i,
    //   repeatDelay: (cText.length - 1) * (0.5 + hold) - 0.5,
    // });
    cT.from(obj, { yPercent: -60, opacity: 0 });
    cT.to(obj, { yPercent: 60, opacity: 0 }, '+=' + hold);
  });
  return cT;
};

// changeText();

//Change Video

let changeVideo = (hold = 10) => {
  let cVideo = gsap.utils.toArray('.v-slide');

  cV = gsap.timeline({
    repeat: -1,
    defaults: {
      ease: 'none',
      // duration: 0.5,
    },
  });

  gsap.set(cVideo, { autoAlpha: 1 });

  cVideo.forEach((obj, i) => {
    // gsap.set(obj, {
    //   delay: 0.5 * i + hold * i,
    //   repeatDelay: (cVideo.length - 1) * (0.5 + hold) - 0.5,
    // });
    cV.from(obj, { yPercent: 0, opacity: 0 });
    cV.to(obj, { yPercent: 0, opacity: 0 }, '+=' + hold);
  });
  return cV;
};

// changeVideo();

//Circle Progress Path With Number Counter

let counterProgress = (hold = 10) => {
  //Counter

  let counter = 0;

  let svgCircleProgressPath = document.getElementById('svgCircleProgressPath');

  counterFx = () => {
    let ctn = document.getElementById('count');

    cN = gsap.from(ctn, hold, {
      textContent: hold,
      repeat: -1,
      ease: 'none',
      repeatDelay: 0.5,
      snap: { textContent: 1 },
      stagger: {
        // each: 1.0,
        // delay: 1,
        onUpdate: function () {
          counter = Math.ceil(this.targets()[0].textContent);
        },
      },
    });
    return cN;
  };

  //Circle Progress Path

  cP = gsap.timeline({ repeat: -1 });

  cP.fromTo(
    svgCircleProgressPath,
    hold,
    { drawSVG: '100%' },
    { drawSVG: '0', delay: 0.5, onUpdate: setCounter }
  );

  //Set Counter

  function setCounter() {
    count.innerHTML = counter;
  }

  return cP;
};

// counterProgress();

// ProgressBar

let progressBar = (hold = 10) => {
  let bar = document.getElementsByClassName('bar');

  let complete = 0;
  pB = gsap
    .timeline({ repeat: -1 })
    .from(bar, hold, { width: 0, ease: Linear.easeNone })
    .to(bar, 0.5, { scaleY: 0 })
    .add(function () {
      if (complete) {
        gsap.to('.loading', 1, { opacity: 0 });
      } else {
        // pB.restart();
      }
    });

  return pB;
};

// Master Timeline

master = gsap.timeline();

master
  .add(changeText(), 0)
  .add(changeVideo(), 0)
  .add(counterProgress(), 0)
  .add(counterFx(), 0)
  .add(progressBar(), 0);

//Play/Pause Button

let pauseBtn = document.getElementById('pause');

//Video Player
let videoplayer = document.getElementById('videoplayer');
videoplayer.play()

//Pause Button
pauseBtn.onclick = function () {
  master.paused(!master.paused());
  vidArray = document.getElementsByClassName('v-slider-frame')[0].children
  for(let i = 0; i < vidArray.length; i++){
    if(vidArray[i].paused === true) {
      vidArray[i].play()
     }else{
      vidArray[i].pause()
     }
  }
  pauseBtn.innerHTML = master.paused() ? 'Play' : 'Pause';
};

