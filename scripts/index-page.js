const form = document.getElementById('form');
console.log(form);
// let nameInput = document.getElementById('name').value;
// console.log(nameInput);
// let commentInput = document.getElementById('comment').value;
let commentSection = document.getElementById('commentBox');

let commentArray = [
    {
        name: "Connor Walton", 
        date: new Date('02/17/2021').toLocaleDateString('en-US'), 
        comment: "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains."
    }, 
    {
        name: "Emilie Beach", 
        date: new Date('01/09/2021').toLocaleDateString('en-US'), 
        comment: "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day."
    }, 
    {
        name: "Miles Acosta", 
        date: new Date('12/20/2020').toLocaleDateString('en-US'), 
        comment: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough."
    }
];
console.log(commentArray);

defaultDisplayComment = (ca) => {
    ca.forEach((obj) => {
        let containerDiv = document.createElement('div');
        let avatarImg = document.createElement('img');

        let nameDiv = document.createElement('div');
        let nameElement = document.createElement('h4');
        let dateElement = document.createElement('p');
        
        let commentDiv = document.createElement('div');
        let commentElement = document.createElement('p');

        // styling for container div
        containerDiv.classList.add("conversation__comment-wrapper");

        // avatarImg append to comment section
        containerDiv.append(avatarImg);
        avatarImg.classList.add("conversation__avatar");

        // name element
        nameElement.innerHTML = obj.name;
        nameElement.classList.add("conversation__name");
        console.log(nameElement);
        nameDiv.appendChild(nameElement);

        // date element
        dateElement.innerHTML = obj.date;
        dateElement.classList.add("conversation__date");
        nameDiv.appendChild(dateElement);

        //styling for nameDiv
        nameDiv.classList.add("conversation__title-section");

        // name div appended into commment div 
        commentDiv.appendChild(nameDiv);
        commentDiv.classList.add("conversation__comment-div");

        //comment element appended into comment div
        commentElement.innerHTML = obj.comment;
        commentDiv.appendChild(commentElement);
        commentElement.classList.add("conversation__text");

        //comment div append into container div
        containerDiv.append(commentDiv);

        //comment div prepended into commentSection
        commentSection.append(containerDiv);
    })  
}
defaultDisplayComment(commentArray);

let createComment = (e) => {
    e.preventDefault();
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
            item.date = new Date(item.date).toLocaleDateString('en-US');
        });
        console.log(commentArray);
    }
    addToCommentArray(commentName, commentDate, commentText);
    let displayComment = (ca) => {
        let containerDiv = document.createElement('div');
        let avatarImg = document.createElement('img');

        let nameDiv = document.createElement('div');
        let nameElement = document.createElement('h4');
        let dateElement = document.createElement('p');
        
        let commentDiv = document.createElement('div');
        let commentElement = document.createElement('p');

        // styling for container div
        containerDiv.classList.add("conversation__comment-wrapper");
        // avatarImg append to container div
        containerDiv.append(avatarImg);
        avatarImg.classList.add("conversation__avatar");

        // name element
        nameElement.innerHTML = ca[0].name;
        nameElement.classList.add("conversation__name");
        console.log(nameElement);
        nameDiv.append(nameElement);

        // date element
        dateElement.innerHTML = ca[0].date;
        dateElement.classList.add("conversation__date");
        nameDiv.append(dateElement);

        //styling for nameDiv
        nameDiv.classList.add("conversation__title-section");

        // name div appended into commment div 
        commentDiv.appendChild(nameDiv);
        commentDiv.classList.add("conversation__comment-div");

        //comment element appended into comment div
        commentElement.innerHTML = ca[0].comment;
        commentDiv.append(commentElement);
        commentElement.classList.add("conversation__text");

        //comment div append into container dov
        containerDiv.append(commentDiv);

        //comment div prepended into commentSection
        commentSection.prepend(containerDiv);
    }
    displayComment(commentArray);
}
form.addEventListener('submit', createComment);