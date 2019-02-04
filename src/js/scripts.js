import $ from 'jquery';
import ScrollMagic from 'scrollmagic';
import { TimelineMax } from 'gsap';
import 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap';
// import 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators';
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
$(document).on('mouseover', '.entry.web .portfolio-piece', function () {
  const preview = $(this).data('preview');
  $(this).attr('src', `images/${preview}.gif`);
});

$(document).on('mouseout', '.entry.web .portfolio-piece', function () {
  const preview = $(this).data('preview');
  $(this).attr('src', `images/${preview}-poster.gif`);
});

$(document).on('click', '.entry.web .portfolio-piece', function () {
  const preview = $(this).data('preview');
  const oldSrc = $(this).attr('src');
  const newsrc = (oldSrc.includes('-poster')) ? `images/${preview}.gif` : `images/${preview}-poster.gif`;
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
      top: '-=65',
    }, 500, () => {
      $('nav').hide()
    });
  })
  .on('enter', () => {
    $('nav').show().animate({
      top: '+=65',
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

  // AUTOPLAY THE ANIMATIONS
  // When you're scrolling dowp, start on enter and stop on leave
  $('.entry.web img').each(function () {
    new ScrollMagic.Scene({
      triggerElement: this,
      triggerHook: 0.25,
    })
    .on('enter leave', (event) => {
      const direction = event.scrollDirection;
      const thisImg = $(this).data('preview');
      if (direction === 'FORWARD') {
        $(this).attr('src', `images/${thisImg}-poster.gif`);
      } else {
        $(this).attr('src', `images/${thisImg}.gif`);
      }      
    })
    .addTo(controller);
  });

  // When you're scrolling up, start on enter, stop on leave
  $('.entry.web img').each(function () {
    new ScrollMagic.Scene({
      triggerElement: this,
      triggerHook: 0.75,
    })
    .on('enter leave', (event) => {
      const direction = event.scrollDirection;
      const thisImg = $(this).data('preview');
      if (direction === 'REVERSE') {
        $(this).attr('src', `images/${thisImg}-poster.gif`);
      } else {
        $(this).attr('src', `images/${thisImg}.gif`);
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
      triggerHook: 0.95,
    })
    .setTween(tl)
    .addTo(controller);
  });

  // Animate the signature

  const tl = new TimelineMax();

  const l = document.getElementById('l');
  const a = document.getElementById('a');
  const y = document.getElementById('y');
  const n = document.getElementById('n');
  const e = document.getElementById('e');
  
  const l_Length = l.getTotalLength();
  const a_Length = a.getTotalLength();
  const y_Length = y.getTotalLength();
  const n_Length = n.getTotalLength();
  const e_Length = e.getTotalLength();

  $('.signature').show();
  
  tl.set(l, { strokeDasharray: l_Length })
  tl.set(a, { strokeDasharray: a_Length })
  tl.set(y, { strokeDasharray: y_Length })
  tl.set(n, { strokeDasharray: n_Length })
  tl.set(e, { strokeDasharray: e_Length })
  tl.set(l, { strokeWidth: 16 })
  tl.fromTo(l, 0.4, { strokeDashoffset: l_Length }, { strokeDashoffset: 0 })
  tl.set(a, { strokeWidth: 16 })
  tl.fromTo(a, 0.4, { strokeDashoffset: a_Length }, { strokeDashoffset: 0 })
  tl.set(y, { strokeWidth: 16 })
  tl.fromTo(y, 0.4, { strokeDashoffset: y_Length }, { strokeDashoffset: 0 })
  tl.set(n, { strokeWidth: 16 })
  tl.fromTo(n, 0.4, { strokeDashoffset: n_Length }, { strokeDashoffset: 0 })
  tl.set(e, { strokeWidth: 16 })
  tl.fromTo(e, 0.4, { strokeDashoffset: e_Length }, { strokeDashoffset: 0 })

});
