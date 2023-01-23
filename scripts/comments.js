import  elementGenerator  from "./elementGenerator.js";
import { apiKEY, baseURL } from "./const.js";
// declared variables 
const form = document.getElementById('form');
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
    const commentSection = document.getElementById('commentBox');
    // created nameElement and added styling. Assigned obj.name to innerHTML
    const nameElement = elementGenerator('h4', {class: 'conversation__name'});
    nameElement.innerHTML = obj.name;
    // created dateElement and added styling. Assigned obj.timestamp to innerHTML
    const dateElement = elementGenerator('p', {class: 'conversation__date'});
    dateElement.innerHTML = formatCommentDate(obj.timestamp);
    // created nameDiv, added styling and appended childrem: nameElement, dateElement
    const nameDiv = elementGenerator('div', {class: 'conversation__title-section'}, nameElement, dateElement);
    // created commentElement and added styling. Assigned obj.comment to innerHTML
    const commentElement = elementGenerator('p', {class: 'conversation__text'});
    commentElement.innerHTML = obj.comment;
    // created deleteIcon and deleteBtn with styling. Appended child into deleteBtn: deleteIcon. Included event listener function to retrieve grandparent's Id (.conversation__comment-wrapper) to remove wrapper element when delete button is clicked.
    const deleteIcon = elementGenerator('i', {class: 'fa-solid fa-trash fa-xl conversation__icon'}) 
    const deleteBtn = elementGenerator('button', {class: 'conversation__btn'}, deleteIcon);
    addEventListenerToBtn(deleteBtn, "delete");
    // created likeIcon and likeBtn with styling. Appended child into likeBtn: likeIcon. Included event listener function to retrieve grandparent's Id (.conversation_comment-wrapper) to update like status when like button is clicked.
    const likeIcon = elementGenerator('i', {class: 'fa-regular fa-heart fa-2xl conversation__icon conversation__icon--like'})
    const likeBtn = elementGenerator('button', {class: 'conversation__btn conversation__btn--like'}, likeIcon);
    addEventListenerToBtn(likeBtn, "liked");
    // created iconDiv, added styling. Appended children:  deleteBtn, likeBtn
    const iconDiv = elementGenerator('div', {class: 'conversation__icon-container'}, deleteBtn, likeBtn);
    // created commentDiv, added styling and appended children: nameDiv, commentDiv
    const commentDiv = elementGenerator('div', {class: 'conversation__comment-div'}, nameDiv, commentElement);
    // created avatarImg and added styling
    const avatarImg = elementGenerator('img', {class: 'conversation__avatar', src: "../assets/images/Mohan-muruge.jpg", alt: "user's profile-img"}); 
    // created containerDiv, added styling and appended children: avatarImg, commentDiv, iconDiv
    const containerDiv = elementGenerator('div', {class: 'conversation__comment-wrapper', id: obj.id}, avatarImg, commentDiv, iconDiv);
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
        console.log(error);
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
            console.log(error);
        })
    })
    form.reset();       
}
const addEventListenerToBtn = (element, action) => {
    element.addEventListener('click', (e) => {
        // console.log(e);
        const wrapperId = e.target.parentNode.parentNode.id;
        // console.log("gparent's id" + wrapperId);
        if (action == "liked") {
            likedComment(wrapperId);
        } else {
           const i = e.srcElement.children[0].classList.add("conversation__icon--delete");
        // console.log(i);
           deleteComment(wrapperId);
        }
        
    })
}
const likedComment = (elementId) => {
    axios.get(`${baseURL}/comments?api_key=${apiKEY}`)
    .then((res) => {
        // console.log(res.data);
        const data = res.data;
        data.find(e => {
            // console.log(e);
            const i = document.getElementById(elementId);
            // console.log(i);
            const heartIconFill = i.querySelector('.conversation__icon-container .conversation__btn--like i');
            // console.log(heartIconFill);
            if((e.id == elementId)) {
                axios.put(`${baseURL}/comments/${elementId}/like?api_key=${apiKEY}`)
                .then(res => {
                    console.log(res.data);
                    heartIconFill.classList.add("fa-solid");
                })
            } 
        })
    })
}
const deleteComment = (elementId) => {
    axios.delete(`${baseURL}/comments/${elementId}/?api_key=${apiKEY}`)
    .then (res => {
        console.log(res)
        // find the element that has this id and remove from the DOM
        const commentToDelete = document.getElementById(elementId);
        // console.log(commentToDelete);
        commentToDelete.remove();
    }
    ).catch((error) => {
        console.log(error);
    })
}
form.addEventListener('submit', createAndDisplayNewComment);