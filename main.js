// Global variables
const titleInput = document.querySelector(".title-input");
const bodyInput = document.querySelector(".body-input");
const submitBtn = document.querySelector(".submit-btn");
const appendNewCard = document.querySelector('.section--idea_container');

const qualityArray = ['Swill', 'Plausible', 'Genius'];


const cardArray = [];

// Event Listeners
window.addEventListener('load', loadFromStorage);
submitBtn.addEventListener('click', submitClick);


// Submit Card
function loadFromStorage(){
  console.log(cardArray);
  console.log(localStorage);

  Object.keys(localStorage).forEach(function(id){
    // console.log(id);
    var item = JSON.parse(localStorage.getItem(id));
    let newIdea = new Idea(item.id, item.title, item.body, item.quality);
    cardArray.push(newIdea);
    createCard(newIdea);
  });
}

// Submit Card
function submitClick(e) {
  e.preventDefault();

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
  // var cardIdea = idea;
  appendNewCard.insertAdjacentHTML('beforeend',
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

const clearLocalStorage = document.querySelector('.clear-localStorage');
clearLocalStorage.addEventListener('click', clearStorage);

// Clear Storage
function clearStorage(){
  window.localStorage.clear();
  alert('cleared storage');
}

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
  // console.log("search function card array: " + cardArray);
  // console.log(inputSearch);
  let filteredSearch = cardArray.filter(function(x, i) {
    // console.log("filter entered");
    // console.log("x = " + x);
    // console.log("index = " + i);
    let titleSearch = x.title.toLowerCase();
    let bodySearch = x.body.toLowerCase();
    // let qualitySearch = qualityArray[x.quality].toLowerCase();
    let qualitySearch = qualityArray[x.quality];
    // console.log(body);
    // console.log(titleSearch.includes(inputSearch));
    // console.log(qualitySearch);
    console.log(qualityArray[x.quality]);
    return titleSearch.includes(inputSearch) || bodySearch.includes(inputSearch) || qualitySearch.includes(inputSearch)
  });

  appendNewCard.innerHTML = "";
  filteredSearch.forEach(function(idea){
    createCard(idea);
  });

}
