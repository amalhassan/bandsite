import  elementGenerator  from "./elementGenerator.js";
import { apiKEY, baseURL } from "./const.js";

// declared variables 
const form = document.getElementById('form');
// console.log(form);
let commentSection = document.getElementById('commentBox');
let containerDiv;
let avatarImg;
let commentDiv;
let commentElement;
let nameDiv;
let nameElement;
let dateElement;
// function returning a relative date format for comment dates 
const relativeTimeFormat = new Intl.RelativeTimeFormat('en', {
    numeric: 'auto',
})
const timePeriod = [
    {period: 60, name: 'seconds'},
    {period: 60, name: 'minutes'},
    {period: 24, name: 'hours'},
    {period: 7, name: 'days'},
    {period: 4.34524, name: 'weeks'},
    {period: 12, name: 'months'},
    {period: Number.POSITIVE_INFINITY, name: 'years'}
]
const formatCommentDate = (date) => {
    let difference = (date - new Date()) / 1000;
    timePeriod.find((obj) => {
        if (Math.abs(difference) < obj.period) {
            date = relativeTimeFormat.format(Math.round(difference), obj.name);
            return true
        }
        difference = difference / obj.period;
    })
    return date;
}
// validation of user's submission
const userInput = document.querySelectorAll("input, textarea");
userInput.forEach(input => {
    input.addEventListener("invalid", (event) => {
            input.classList.add("conversation__input-error");
        },
        false
    );
    input.addEventListener("blur", (event) => {
        if (input.checkValidity()) {
            input.classList.remove("conversation__input-error");
        } 
      });
});
// array to store comments
let commentArray = [
    {
        name: "Connor Walton", 
        date: new Date('02/17/2021'), 
        comment: "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains."
    }, 
    {
        name: "Emilie Beach", 
        date: new Date('01/09/2021'), 
        comment: "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day."
    }, 
    {
        name: "Miles Acosta", 
        date: new Date('12/20/2020'), 
        comment: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough."
    }
];
// function to create elements and display comments
const displayComment = (ca, index) => {
    // created nameElement and added styling. Assigned obj.name to innerHTML
    nameElement = elementGenerator('h4', {class: 'conversation__name'});
    nameElement.innerHTML = ca.name;
    // created dateElement and added styling. Assigned obj.date to innerHTML
    dateElement = elementGenerator('p', {class: 'conversation__date'});
    dateElement.innerHTML = formatCommentDate(ca.date);
    // created nameDiv, added styling and appended childrem: nameElement, dateElement
    nameDiv = elementGenerator('div', {class: 'conversation__title-section'}, nameElement, dateElement);
    // created commentElement and added styling. Assigned obj.comment to innerHTML
    commentElement = elementGenerator('p', {class: 'conversation__text'});
    commentElement.innerHTML = ca.comment;
    // created commentDiv, added styling and appended children: nameDiv, commentDiv
    commentDiv = elementGenerator('div', {class: 'conversation__comment-div'}, nameDiv, commentElement);
    // created avatarImg and added styling
    avatarImg = elementGenerator('img', {class: 'conversation__avatar', src: "../assets/images/Mohan-muruge.jpg"}); 
    // created containerDiv, added styling and appended children: avatarImg, commentDiv
    containerDiv = elementGenerator('div', {class: 'conversation__comment-wrapper'}, avatarImg, commentDiv);
    //comment div prepended into commentSection
    if (index == 0) {
        commentSection.prepend(containerDiv);
    } else {
        commentSection.append(containerDiv);
    }
}
console.log(commentArray);
commentArray.forEach((obj, index) => {
    displayComment(obj, index);
})
// function to retrieve submission from user, store new comment into commentArray, and display new comment
const createAndDisplayNewComment = (e) => {
    e.preventDefault();
    let commentName = form[0].value;
    // console.log(commentName);
    let commentText = form[1].value
    // console.log(commentText);
    let commentDate = Date.now();
    // console.log(commentDate);
    form.reset();
    let addToCommentArray = (cn, cd, ct) => {
        let newComment = {
            name: cn,
            date: cd,
            comment: ct
        }
        commentArray.push(newComment);
        commentArray.forEach((item) => {
            item.date = new Date(item.date).getTime();
        });
        commentArray.sort(
            (a, b) => b.date - a.date,
        );
    }
    addToCommentArray(commentName, commentDate, commentText);
    displayComment(commentArray[0], 0);
}
form.addEventListener('submit', createAndDisplayNewComment);