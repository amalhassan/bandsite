import  elementGenerator  from "./elementGenerator.js";
//validation of user's submission
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

// variables 
const form = document.getElementById('form');
console.log(form);
let commentSection = document.getElementById('commentBox');
let containerDiv;
let avatarImg;
let commentDiv;
let commentElement;
let nameDiv;
let nameElement;
let dateElement;

// second argument for toLocaleDateString() method - formats date as MM/dd/YYYY
const dateFormat = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
}
// array to store comments
let commentArray = [
    {
        name: "Connor Walton", 
        date: new Date('02/17/2021').toLocaleDateString('en-US', dateFormat), 
        comment: "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains."
    }, 
    {
        name: "Emilie Beach", 
        date: new Date('01/09/2021').toLocaleDateString('en-US', dateFormat), 
        comment: "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day."
    }, 
    {
        name: "Miles Acosta", 
        date: new Date('12/20/2020').toLocaleDateString('en-US', dateFormat), 
        comment: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough."
    }
];
console.log(commentArray);

const defaultDisplayComment = (ca) => {
    ca.forEach((obj) => {
        // created nameElement and added styling. Assigned obj.name to innerHTML
        nameElement = elementGenerator('h4', {class: 'conversation__name'});
        nameElement.innerHTML = obj.name;

        // created dateElement and added styling. Assigned obj.date to innerHTML
        dateElement = elementGenerator('p', {class: 'conversation__date'});
        dateElement.innerHTML = obj.date;

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
        containerDiv = elementGenerator('div', {class: 'conversation__comment-wrapper'}, avatarImg, commentDiv);
        
        //appended containerDiv element into commentSection element
        commentSection.append(containerDiv);
    })  
}
defaultDisplayComment(commentArray);

let createComment = (e) => {
    e.preventDefault();
    userInput.forEach(input => {
        input.classList.remove("conversation__input-error");
    });
    let commentName = form[0].value;
    console.log(commentName);
    let commentText = form[1].value
    console.log(commentText);
    let commentDate = Date.now();
    console.log(commentDate);
    form.reset();
    let addToCommentArray = (cn, fd, ct) => {
        let newComment = {
            name: cn,
            date: fd,
            comment: ct
        }
        commentArray.push(newComment);
        commentArray.forEach((item) => {
            item.date = new Date(item.date).getTime();
        });
        commentArray.sort(
            (a, b) => b.date - a.date,
        );
        commentArray.forEach((item) => {
            item.date = new Date(item.date).toLocaleDateString('en-US', dateFormat);
        });
        console.log(commentArray);
    }
    addToCommentArray(commentName, commentDate, commentText);
    const displayComment = (ca) => {
        // created nameElement and added styling. Assigned obj.name to innerHTML
        nameElement = elementGenerator('h4', {class: 'conversation__name'});
        nameElement.innerHTML = ca[0].name;

        // created dateElement and added styling. Assigned obj.date to innerHTML
        dateElement = elementGenerator('p', {class: 'conversation__date'});
        dateElement.innerHTML = ca[0].date;

        // created nameDiv, added styling and appended childrem: nameElement, dateElement
        nameDiv = elementGenerator('div', {class: 'conversation__title-section'}, nameElement, dateElement);

        // created commentElement and added styling. Assigned obj.comment to innerHTML
        commentElement = elementGenerator('p', {class: 'conversation__text'});
        commentElement.innerHTML = ca[0].comment;

        // created commentDiv, added styling and appended children: nameDiv, commentDiv
        commentDiv = elementGenerator('div', {class: 'conversation__comment-div'}, nameDiv, commentElement);

        // created avatarImg and added styling
        avatarImg = elementGenerator('img', {class: 'conversation__avatar', src: "../assets/images/Mohan-muruge.jpg"}); 

        // created containerDiv, added styling and appended children: avatarImg, commentDiv
        containerDiv = elementGenerator('div', {class: 'conversation__comment-wrapper'}, avatarImg, commentDiv);
        //comment div prepended into commentSection
        commentSection.prepend(containerDiv);
    }
    displayComment(commentArray);
}
form.addEventListener('submit', createComment);