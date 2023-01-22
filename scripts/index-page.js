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
// function to create elements and display comments
const displayComment = (obj, index) => {
    // created nameElement and added styling. Assigned obj.name to innerHTML
    nameElement = elementGenerator('h4', {class: 'conversation__name'});
    nameElement.innerHTML = obj.name;
    // created dateElement and added styling. Assigned obj.timestamp to innerHTML
    dateElement = elementGenerator('p', {class: 'conversation__date'});
    dateElement.innerHTML = formatCommentDate(obj.timestamp);
    // created nameDiv, added styling and appended childrem: nameElement, dateElement
    nameDiv = elementGenerator('div', {class: 'conversation__title-section'}, nameElement, dateElement);
    // created commentElement and added styling. Assigned obj.comment to innerHTML
    commentElement = elementGenerator('p', {class: 'conversation__text'});
    commentElement.innerHTML = obj.comment;
    // created commentDiv, added styling and appended children: nameDiv, commentDiv
    commentDiv = elementGenerator('div', {class: 'conversation__comment-div'}, nameDiv, commentElement);
    // created avatarImg and added styling
    avatarImg = elementGenerator('img', {class: 'conversation__avatar', src: "../assets/images/Mohan-muruge.jpg"}); 
    // created containerDiv, added styling and appended children: avatarImg, commentDiv
    containerDiv = elementGenerator('div', {class: 'conversation__comment-wrapper', id: obj.id}, avatarImg, commentDiv);
    //comment div prepended into commentSection
    if (index == 0) {
        commentSection.prepend(containerDiv);
    } else {
        commentSection.append(containerDiv);
    }
}
axios.get(`${baseURL}/comments?api_key=${apiKEY}`
    ).then((res) => {
        const commentsData = res.data;
        console.log(commentsData);
        commentsData.sort((a, b) =>
            b.timestamp - a.timestamp,
        )
        commentsData.forEach((obj, index) => {
            displayComment(obj, index);
        })
    }
    ).catch(error => {
        console.error(error);
    })
// function to retrieve submission from user, store new comment into commentsData, and display new comment
const createAndDisplayNewComment = (e) => {
    e.preventDefault();
    axios.post(`${baseURL}/comments?api_key=${apiKEY}`, {
        name: e.target.name.value,
        comment: e.target.comment.value
    }).then (res => {
        const newComment = res.data;
        console.log(newComment);
        axios.get(`${baseURL}/comments?api_key=${apiKEY}`
        ).then (res => {
            const newArray = res.data;
            newArray.sort(
                (a, b) => b.timestamp - a.timestamp,
            );
            console.log(newArray);
            displayComment(newArray[0], 0);
        }
        ).catch(error => {
            console.error(error);
        })
    })
    form.reset();       
}
form.addEventListener('submit', createAndDisplayNewComment);