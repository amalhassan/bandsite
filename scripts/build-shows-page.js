import  elementGenerator  from "./elementGenerator.js";
// declared variables 
const showsSection = document.getElementById('info-section');
const titleDateLabel = elementGenerator('h4', {class:'shows__label-item shows__label-item--tablet-desktop'}, 'Date');
const titleVenueLabel = elementGenerator('h4', {class:'shows__label-item shows__label-item--tablet-desktop'}, 'Venue');
const titleLocationLabel = elementGenerator('h4', {class:'shows__label-item shows__label-item--tablet-desktop'}, 'Location');
let showLabelContainer = elementGenerator('ul', {class: 'shows__labels shows__label-item--tablet-desktop'}, titleDateLabel, titleVenueLabel, titleLocationLabel);
let showsContainer;
// array to store show information
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
// function to display show information
const displayShows = (showData) => {
    showData.map((show) => {
        // created elements for date information and added styling classes
        let dateLabel = elementGenerator('p', {class: 'shows__label-item--mobile'}, 'Date');
        let showDate = elementGenerator('p', {class: 'shows__info shows__info--date'}, show.date);
        let dateWrapper = elementGenerator('div', {class: 'shows__field-wrapper'}, dateLabel, showDate);
        // created elements for venue information and added styling classes
        let venueLabel = elementGenerator('p', {class: 'shows__label-item--mobile'}, 'Venue');
        let showVenue = elementGenerator('p', {class: 'shows__info'}, show.venue);
        let venueWrapper = elementGenerator('p', {class: 'shows__field-wrapper'}, venueLabel, showVenue);
        // created elements for location information and added styling classes
        let locationLabel = elementGenerator('p', {class: 'shows__label-item--mobile'}, 'Location');
        let showLocation = elementGenerator('p',  {class: 'shows__info'}, show.location);
        let locationWrapper = elementGenerator('div', {class: 'shows__field-wrapper'}, locationLabel, showLocation);
        // created element for button and added styling class
        let ticketBtn = elementGenerator('button', {class: 'shows__btn'}, 'Buy Tickets');
        // created element dor parent container, added styling class, and appended children
        showsContainer = elementGenerator('div', {class: 'shows__info-container'}, dateWrapper, venueWrapper, locationWrapper, ticketBtn);
        // appended showsContainer to showsSection
        showsSection.appendChild(showsContainer);
    })
    showsSection.prepend(showLabelContainer);
};
displayShows(shows);
// get rows with show information
const showRows = document.getElementsByClassName('shows__info-container');
// function to added .selected class to a row when selected and remove when next row is selected
Array.from(showRows).forEach((element) => {
    element.addEventListener('click', () => {
        let selected = document.querySelector('.selected');
        if(selected) {
            selected.classList.remove('selected');
        }
        element.classList.toggle("selected");
    });
})