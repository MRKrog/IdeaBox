// Global variables
const titleInput = document.querySelector(".title-input");
const bodyInput = document.querySelector(".body-input");
const submitBtn = document.querySelector(".submit-btn");
const appendNewCard = document.querySelector('.section--idea_container');
var footerContainer = document.querySelector('.footer--container');

var tenCardHeight = 0;
const qualityArray = ['Swill', 'Plausible', 'Genius'];
const qualClick = document.querySelector("#quality-filter");

const cardArray = [];

// Event Listeners
window.addEventListener('load', loadFromStorage);
submitBtn.addEventListener('click', submitClick);
qualClick.addEventListener('click', qualityFilter);

// Listen for user Enter key
bodyInput.addEventListener('keypress', function(event) {
  if (event.keyCode == 13) {
    event.preventDefault();
    document.getElementById('submitBtn').click();
  }
});

// Submit Card
function loadFromStorage(){
  console.log(cardArray);
  console.log(localStorage);
  Object.keys(localStorage).forEach(function(id){
    var item = JSON.parse(localStorage.getItem(id));
    let newIdea = new Idea(item.id, item.title, item.body, item.quality);
    cardArray.push(newIdea);
    createCard(newIdea);
  });
  setShowMore();
}

// Submit Card
function submitClick(event) {
  event.preventDefault();

  let titleCopy = titleInput.value;
  let bodyCopy = bodyInput.value;
  let quality = 0;

  var id = Date.now();
  let newIdea = new Idea(id, titleCopy, bodyCopy, quality);
  cardArray.push(newIdea);
  newIdea.saveToStorage();
  createCard(newIdea);

  // Clear Inputs
  // titleInput.value = "";
  // bodyInput.value = "";
}

// Create Card
function createCard(idea) {
  appendNewCard.insertAdjacentHTML('afterbegin',
    `<article class="article--ideabox_card" id="${idea.id}">
     <div class="div--card_top">
       <h2>${idea.title}</h2>
       <p>
         ${idea.body}
       </p>
     </div>
     <div class="div--card_bottom">
       <button class="button--down button--card" type="button" name="button" onclick="upDownQuality(${idea.id}, -1)">
         <img src="images/downvote.svg" />
       </button>
       <button class="button--up button--card" type="button" name="button" onclick="upDownQuality(${idea.id}, 1)">
         <img src="images/upvote.svg" />
       </button>
       <h4 class="h4--quality_control">Quality: <span>${qualityArray[idea.quality]}</span></h4>
       <button class="button--close button--card" type="button" name="button" onclick="deleteCard(${idea.id})">
         <img src="images/delete.svg" />
       </button>
     </div>
    </article>`
  );
}

// Delete Card
function deleteCard(cardId) {
  var thisCard = document.getElementById(cardId.toString());
  thisCard.remove();

  let ideaToDelete = cardArray.find(function(idea) {
    return cardId === idea.id;
  });

  ideaToDelete.deleteFromStorage();

  let deleteCardArray = cardArray.findIndex(function(idea){
    return cardId === idea.id;
  })

  cardArray.splice(deleteCardArray, 1);
}

// const clearLocalStorage = document.querySelector('.clear-localStorage');
// clearLocalStorage.addEventListener('click', clearStorage);
// // Clear Storage
// function clearStorage(){
//   window.localStorage.clear();
//   alert('cleared storage');
// }

function upDownQuality(cardId, direction){
  let ideaToUpdate = cardArray.find(function(idea) {
    return cardId === idea.id;
  });
  var thisCard = document.getElementById((ideaToUpdate.id).toString()); // the whole card
  var theQuality = thisCard.querySelector('.h4--quality_control > span'); // h4 quality
  var newQuality = ideaToUpdate.quality; // this instance quality value

  if(direction === 1 && newQuality < 2){
    if(newQuality === 1){
      ideaToUpdate.quality = 2; // Now Genius
    } else if (newQuality === 0) {
      ideaToUpdate.quality = 1; // Now Plausible
    }
  } else if(direction === -1){
    if(newQuality === 2) {
      ideaToUpdate.quality = 1; // Now Plausible
    } else if(newQuality === 1){
      ideaToUpdate.quality = 0; // Now Swill
    }
  }
  theQuality.innerText = qualityArray[ideaToUpdate.quality];
  ideaToUpdate.updateQuality();
}


// Search for Ideas
const searchBtn = document.querySelector('.searchButton');
const searchInput = document.querySelector('.searchTerm');
searchBtn.addEventListener('click', searchIdeas);
searchInput.addEventListener('keyup', searchIdeas);

function searchIdeas(e) {
  e.preventDefault();
  let inputSearch = searchInput.value.toLowerCase();
  let filteredSearch = cardArray.filter(function(x, i) {
    let titleSearch = x.title.toLowerCase();
    let bodySearch = x.body.toLowerCase();
    return titleSearch.includes(inputSearch) || bodySearch.includes(inputSearch)
  });
  appendNewCard.innerHTML = "";
  filteredSearch.forEach(function(idea){
    createCard(idea);
  });
}

function qualityFilter(event){
  event.preventDefault();
  var clickedQuality = event.target.dataset.quality;
  let filteredQuality = cardArray.filter(function(x, i){
    let qualityName = qualityArray[x.quality]
    return qualityName.includes(clickedQuality)
  });
  appendNewCard.innerHTML = "";
  filteredQuality.forEach(function(idea){
    createCard(idea)
  });
}

function setShowMore(){
  var numberOfCards = cardArray.length;
  if(numberOfCards >= 10) {
    footerContainer.insertAdjacentHTML('afterbegin',
      `<button class="show-cards">Show More...</button>`
    );
    var showBtn = document.querySelector('.show-cards');
    showBtn.addEventListener('click', showMoreLessBtn);
    //
    // var cardTop = document.querySelector('.div--card_top').offsetHeight;
    // console.log(cardTop);
    //
    // var cardBottom = document.querySelector('.div--card_bottom').offsetHeight;
    // console.log(cardBottom);

    var cardHeight = (document.querySelector('.article--ideabox_card').offsetHeight) + 25;
    console.log(cardHeight + "px single card height");

    // var singleCardHeight = (document.querySelector('.article--ideabox_card').offsetHeight) + 25;
    tenCardHeight = cardHeight * 11;
    console.log(tenCardHeight + "px 10 card height");
    
    appendNewCard.classList.add('hideContent');
    appendNewCard.style.height = `${tenCardHeight}px`;
  }
}

function showMoreLessBtn(){
  var thisText = this.innerText.toUpperCase();
  if(thisText === "SHOW MORE..."){
    appendNewCard.style.height = `auto`;
    appendNewCard.classList.remove('hideContent');
    appendNewCard.classList.add('showContent');
    this.innerText = "Show Less...";

  } else if(thisText === "SHOW LESS..."){
    this.innerText = "Show More...";
    appendNewCard.classList.remove('showContent');
    appendNewCard.classList.add('hideContent');
    appendNewCard.style.height = `${tenCardHeight}px`;
  }
}
