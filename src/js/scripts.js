import $ from 'jquery';
import Handlebars from 'handlebars';
import resume from './resume-data';

const experienceSource = document.getElementById('experience-template').innerHTML;
const experienceTemplate = Handlebars.compile(experienceSource);
const experienceHTML = experienceTemplate(resume.experience);
$('section.experience').append(experienceHTML);

const awardSource = document.getElementById('award-template').innerHTML;
const awardTemplate = Handlebars.compile(awardSource);
const awardHTML = awardTemplate(resume.awards);
$('section.awards').append(awardHTML);


$(document).ready(() => {
  console.log('DOM Ready');
});
