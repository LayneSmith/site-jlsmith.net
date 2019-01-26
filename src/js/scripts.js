import $ from 'jquery';
import ScrollMagic from 'scrollmagic';
import { TimelineMax } from 'gsap';
import 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap';
import 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators';
import Handlebars from 'handlebars';
import resume from './resume-data';


// ////////////////////////////////////////////////////////////////////////////
// HANDLEBARS
// ////////////////////////////////////////////////////////////////////////////
const portfolioSource = document.getElementById('portfolio-template').innerHTML;
const portfolioTemplate = Handlebars.compile(portfolioSource);
const portfolioHTML = portfolioTemplate(resume.portfolio);
$('section.portfolio').append(portfolioHTML);

const experienceSource = document.getElementById('experience-template').innerHTML;
const experienceTemplate = Handlebars.compile(experienceSource);
const experienceHTML = experienceTemplate(resume.experience);
$('section.experience').append(experienceHTML);

const sndSource = document.getElementById('award-template').innerHTML;
const sndTemplate = Handlebars.compile(sndSource);
const sndHTML = sndTemplate(resume.awards.filter(d => d.issued === 'Society of News Design'));
$('.snd-awards').append(sndHTML);

const katieSource = document.getElementById('award-template').innerHTML;
const katieTemplate = Handlebars.compile(katieSource);
const katieHTML = katieTemplate(resume.awards.filter(d => d.issued === 'Press Club of Dallas'));
$('.katie-awards').append(katieHTML);

const tapmeSource = document.getElementById('award-template').innerHTML;
const tapmeTemplate = Handlebars.compile(tapmeSource);
const tapmeHTML = tapmeTemplate(resume.awards.filter(d => d.issued === 'Texas Associated Press Managing Editors'));
$('.tapme-awards').append(tapmeHTML);


// ////////////////////////////////////////////////////////////////////////////
// CONTROL ANIMATED GIFS ON CLICK AND HOVER
// ////////////////////////////////////////////////////////////////////////////
$(document).on('mouseover', '.portfolio-piece', function () {
  const preview = $(this).data('preview');
  $(this).attr('src', `images/animations/${preview}.gif`);
});

$(document).on('mouseout', '.portfolio-piece', function () {
  const preview = $(this).data('preview');
  $(this).attr('src', `images/animations/${preview}-poster.gif`);
});

$(document).on('click', '.portfolio-piece', function () {
  const preview = $(this).data('preview');
  const oldSrc = $(this).attr('src');
  const newsrc = (oldSrc.includes('-poster')) ? `images/animations/${preview}.gif` : `images/animations/${preview}-poster.gif`;
  $(this).attr('src', newsrc);
});


// ////////////////////////////////////////////////////////////////////////////
// SCROLLMAGIC
// ////////////////////////////////////////////////////////////////////////////
const controller = new ScrollMagic.Controller();

// DROP NAV
new ScrollMagic.Scene({
  triggerElement: '.portfolio', 
  triggerHook: 0,
})
  .on('leave', () => {
    $('nav').animate({
      top: '-=40',
    }, 500, () => {
      $('nav').hide()
    });
  })
  .on('enter', () => {
    $('nav').show().animate({
      top: '+=40',
    }, 500, () => {
    });
  })
  .addTo(controller);

// FOR EACH SECTION SET THE CHAPTER TITLE IN NAV
$('section').each(function () {
  new ScrollMagic.Scene({
    triggerElement: this,
    triggerHook: 0.5,
  })
    .on('enter leave', (event) => {
      const direction = event.scrollDirection;
      const $thisSection = $(this);
      if(direction === 'FORWARD'){
        const thisChapter = $thisSection.data('chapter');
        $('nav .chapter').fadeOut('fast', function () {
          $(this).text(thisChapter).fadeIn('fast');
        });
      } else {
        const thisChapter = $thisSection.prev().data('chapter');
        $('nav .chapter').fadeOut('fast', function () {
          $(this).text(thisChapter).fadeIn('fast');
        });
      }
    })
    .addTo(controller);
});

$(document).ready(function(){
  console.log('DOM Ready');


  // AUTOPLAY THE ANIMATIONS
  // When you're scrolling dowp, start on enter and stop on leave
  $('.portfolio-piece').each(function () {
    console.log($(this).attr('src'));
    new ScrollMagic.Scene({
      triggerElement: this,
      triggerHook: 0.25,
    })
    .on('enter leave', (event) => {
      const direction = event.scrollDirection;
      const thisImg = $(this).data('preview');
      if (direction === 'FORWARD') {
        $(this).attr('src', `images/animations/${thisImg}-poster.gif`);
      } else {
        $(this).attr('src', `images/animations/${thisImg}.gif`);
      }      
    })
    .addTo(controller);
  });

  // When you're scrolling up, start on enter, stop on leave
  $('.portfolio-piece').each(function () {
    new ScrollMagic.Scene({
      triggerElement: this,
      triggerHook: 0.75,
    })
    .on('enter leave', (event) => {
      const direction = event.scrollDirection;
      const thisImg = $(this).data('preview');
      if (direction === 'REVERSE') {
        $(this).attr('src', `images/animations/${thisImg}-poster.gif`);
      } else {
        $(this).attr('src', `images/animations/${thisImg}.gif`);
      }      
    })
    .addTo(controller);
  });

  // Add appear effect when scrolling in
  $('.portfolio article').each(function () {
    const tl = new TimelineMax().add([
      TweenMax.from($(this), 1, { y: 50, autoAlpha: 0, ease: Power1.easeOut })
    ]);
    new ScrollMagic.Scene({
      triggerElement: this,
      triggerHook: 0.8,
    })
    .setTween(tl)
    .addTo(controller);
  });
});
