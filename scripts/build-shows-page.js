import  elementGenerator  from "./elementGenerator.js";
const showsTitleSection = document.getElementById('title-container'); 
const showsSection = document.getElementById('info-section');
const titleDateLabel = elementGenerator('h4', {class:'shows__label-item shows__label-item--tablet-desktop'}, 'Date');
const titleVenueLabel = elementGenerator('h4', {class:'shows__label-item shows__label-item--tablet-desktop'}, 'Venue');
const titleLocationLabel = elementGenerator('h4', {class:'shows__label-item shows__label-item--tablet-desktop'}, 'Location');
let showLabelContainer = elementGenerator('ul', {class: 'shows__labels shows__label-item--tablet-desktop'}, titleDateLabel, titleVenueLabel, titleLocationLabel);
let showsContainer;

window.addEventListener("load", () => {
    // const titleDateLabel = elementGenerator('h4', {class:'shows__label-item shows__label-item--tablet-desktop'}, 'Date');
    // const titleVenueLabel = elementGenerator('h4', {class:'shows__label-item shows__label-item--tablet-desktop'}, 'Venue');
    // const titleLocationLabel = elementGenerator('h4', {class:'shows__label-item shows__label-item--tablet-desktop'}, 'Location');
    // let showLabelContainer = elementGenerator('ul', {class: 'shows__labels'}, titleDateLabel, titleVenueLabel, titleLocationLabel);
    // console.log(showLabelContainer);
    // showsTitleSection.append(showLabelContainer);
})

let shows = [
    {
        date: "Mon Sept 06 2021",
        venue: "Ronald Lane",
        location: "San Francisco, CA"
    },
    {
        date: "Tue Sept 21 2021",
        venue: "Pier 3 East",
        location: "San Francisco, CA"
    },
    {
        date: "Fri Oct 15 2021",
        venue: "View Lounge",
        location: "San Francisco, CA"
    },
    {
        date: "Sat Nov 06 2021",
        venue: "Hyatt Agency",
        location: "San Francisco, CA"
    },
    {
        date: "Fri Nov 26 2021",
        venue: "Moscow Center",
        location: "San Francisco, CA"
    },
    {
        date: "Wed Dec 15 2021",
        venue: "Press Club",
        location: "San Francisco, CA"
    },
];
console.log(shows);

const displayShows = (showData) => {
    showData.map((show) => {
        let dateLabel = elementGenerator('p', {class: 'shows__label-item--mobile'}, 'Date');
        let showDate = elementGenerator('p', {class: 'shows__info shows__info--date'}, show.date);
        let dateWrapper = elementGenerator('div', {class: 'shows__field-wrapper'}, dateLabel, showDate);
    
        let venueLabel = elementGenerator('p', {class: 'shows__label-item--mobile'}, 'Venue');
        let showVenue = elementGenerator('p', {class: 'shows__info'}, show.venue);
        let venueWrapper = elementGenerator('p', {class: 'shows__field-wrapper'}, venueLabel, showVenue);
    
        let locationLabel = elementGenerator('p', {class: 'shows__label-item--mobile'}, 'Location');
        let showLocation = elementGenerator('p',  {class: 'shows__info'}, show.location);
        let locationWrapper = elementGenerator('div', {class: 'shows__field-wrapper'}, locationLabel, showLocation);
        let ticketBtn = elementGenerator('button', {class: 'shows__btn'}, 'Buy Tickets');
        showsContainer = elementGenerator('div', {class: 'shows__info-container'}, dateWrapper, venueWrapper, locationWrapper, ticketBtn);
        showsSection.appendChild(showsContainer);
    })
    showsSection.prepend(showLabelContainer);
};

displayShows(shows);
console.log(showsContainer);
const showRows = document.getElementsByClassName('shows__info-container');
console.log(showRows);
Array.from(showRows).forEach((element, index) => {
    let current = document.querySelectorAll('selected');
    console.log(current);
    element.addEventListener('click', () => {
        element.classList.toggle("selected");
    });
});