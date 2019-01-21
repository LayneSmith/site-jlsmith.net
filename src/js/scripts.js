import $ from 'jquery';
import Handlebars from 'handlebars';
import resume from './resume-data';

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


$(document).ready(() => {
  console.log('DOM Ready');
});
