import $ from 'jquery';
import ScrollMagic from 'scrollmagic';
import 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators';
import Handlebars from 'handlebars';
import resume from './resume-data';

// HANDLEBARS
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

// CONTROL ANIMATED GIFS ON CLICK AND HOVER
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

// SCROLLMAGIC
const controller = new ScrollMagic.Controller();

// PLAY ANIMATION ON ROLL IN AND STOP ON ROLLOUT?
// ANIMATE PHOTOS IN GALLERY SECTION AS COME INTO VIEW

new ScrollMagic.Scene({
  triggerElement: '.portfolio', // what will trigger scene
  triggerHook: 0,
})
  .on('leave', () => {
    $('nav').animate({
      top: '-=40',
    }, 500, () => {
      $('nav').hide()
      console.log('Slide up complete');
    });
  })
  .on('enter', () => {
    $('nav').show().animate({
      top: '+=40',
    }, 500, () => {
      console.log('Slide down complete');
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
