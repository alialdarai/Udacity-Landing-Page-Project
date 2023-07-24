/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
// variable for navigation
const navList = document.getElementById('navbar__list');

// variable for sections
const sections = document.querySelectorAll('section');

// variable for accordion titles
const accordionTitle = document.querySelectorAll('.accordion-title');


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// Function to check if a section is in the viewport
function isSectionInViewport(section) {
    const rect = section.getBoundingClientRect();
     (
        rect.top >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
};
/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav

// Function to build the navigation dynamically
// Main Function: Build the navigation menu dynamically
  
// Function to build the navigation dynamically
function buildNavigation() {
    sections.forEach(function (section) {
        const listItem = document.createElement('li');
        const sectionId = section.getAttribute('id');
        const sectionName = section.getAttribute('data-nav');
        listItem.innerHTML = `<a href="#${sectionId}" class="menu__link">${sectionName}</a>`;
        navList.appendChild(listItem);
    });
}

// Add class 'active' to section and navigation menu item when near top of viewport

  function setActiveSection() {
  sections.forEach(function (section) {
    if (isSectionInViewport(section)) {
        section.classList.add("your-active-class");
        // Add "active" class to the corresponding navigation menu item
      const navItem = navList.querySelector(`[href="#${section.id}"]`);
      navItem.parentElement.classList.add("your-active-class");
    } else {
        section.classList.remove("your-active-class");
      // Remove "active" class from the corresponding navigation menu item
      const navItem = navList.querySelector(`[href="#${section.id}"]`);
      navItem.parentElement.classList.remove("your-active-class");
    }
  });
}


// Scroll to anchor ID using scrollTO event
function scrollToSection(event) {
    event.preventDefault();
    if (event.target.tagName === "A") {
        const targetSectionId = event.target.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetSectionId);
        targetSection.scrollIntoView({ behavior: "smooth" });
    }
}

// function to hide the navbar after a delay when not scrolling
let scrollTimeout;
function hideNavbarOnScroll() {
    // Show the fixed navigation bar when scrolling
    navList.style.display = "block"; 
    // Hide the fixed navigation bar when not scrolling
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(function () {
        navList.style.display = "none";
    }, 3000);
}



  // Function to create the "Scroll to Top" button
function createScrollToTopButton() {
    const scrollToTopButton = document.createElement('span');
    scrollToTopButton.setAttribute('id', 'scroll-to-top');
    scrollToTopButton.innerHTML = '<i class="fa-solid fa-angles-up"></i>';
    
    // Append the button to the main tag
    const mainTag = document.querySelector('main');
      mainTag.appendChild(scrollToTopButton);
}
  
  
  // Show/hide the "Scroll To Top" button based on user scrolling
  function showScrollToTopButton() {
      const showButton = document.querySelector("#scroll-to-top");
  if (window.scrollY > window.innerHeight / 2) {
      showButton.style.display = "block";
} else {
    showButton.style.display = "none";
  }
};

// Scroll to top when the "Scroll To Top" button is clicked
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// Collapse/Expand sections on button click
function toggleAccordion(event){
 const accordionTitle = event.currentTarget;
        const height = accordionTitle.nextElementSibling.scrollHeight;
        accordionTitle.classList.toggle("active-header");
        if(accordionTitle.classList.contains('active-header')){
            accordionTitle.nextElementSibling.style.maxHeight = `${height}px`;

        } else { 
            accordionTitle.nextElementSibling.style.maxHeight = '0px';
        }
};
/**
 * End Main Functions
 * Begin Events
 * 
*/
// Events
document.addEventListener("DOMContentLoaded", function() {

// Show the fixed navigation bar on scroll and hide it after a delay
  window.addEventListener("scroll", hideNavbarOnScroll);
  
    // Create the "Scroll to Top" button
  createScrollToTopButton();
  // Build navigation menu
  buildNavigation();
  
    // Set active section on page load
    setActiveSection();
  
    // Scroll to section on link click
    navList.addEventListener("click", scrollToSection);
    
    // Set active section on scroll
    window.addEventListener("scroll", setActiveSection);

    // Show/hide the "Scroll To Top" button based on user scrolling
    window.addEventListener("scroll", showScrollToTopButton);
    
    // Scroll to top on button click
     const scrollButton = document.getElementById("scroll-to-top");
     scrollButton.addEventListener("click", scrollToTop);

       // Collapse/Expand sections on button click
       accordionTitle.forEach(function (accordionTitle) {
        accordionTitle.addEventListener('click', toggleAccordion);
       });

  });