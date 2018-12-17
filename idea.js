// Initalize the functions once the page content is loaded
document.addEventListener("DOMContentLoaded", function(){
  dogSwitch();
  mobileExpand();
});

// Form function to take the inputed text and replace it with it
function dogSwitch(){
  // Do the below when the dog click button is clicked
  document.getElementById('dog-click').onclick = function(event){
    // Prevent Default Click Action
    event.preventDefault();
    // Store the value of the dog input field into a variable
    var inputedText = document.getElementById('dog-input').value;
    // Take the stored varialbe and replace the text of the updated dog copy
    document.getElementById('updated-dog').innerHTML = inputedText;
  }
}

// function to open and close the mobile navigation
function mobileExpand(){
  document.getElementById('mobile-click').onclick = function(event){
    // Prevent Default Click Action
    event.preventDefault();
    // Mark variable for the clicked hamburger
    var mobileClicked = document.getElementById('mobile-click');
    // Make variable the mobile slide down menu
    var mobileMenu = document.getElementById('mobile-navigation-content');
    // Check to see if hamburger has been clicked then open or close menu
    // Do this first statement if the mobile menu does not contain the class open-nav
    if(!mobileMenu.classList.contains("open-nav")){
      // Now add the class open-nav
      mobileMenu.classList.add("open-nav");
      // Add the css style attribute diplay block
      mobileMenu.style.display = "block";
      // console log this message to know that the menu is open (For Testing)
      console.log('menu now contains open navigation');
    } else {
      // If the menu button contains the class open-nav do the following
      // Remove the class open-nav
      mobileMenu.classList.remove("open-nav");
      // Add the css style attribute display none
      mobileMenu.style.display = "none";
      // console log the message to show that the menu has been closed (For Testing)
      console.log('menu now has removed open navigation');
    }
  }
}
