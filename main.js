// Global variables
const titleInput = document.querySelector(".title-input");
const bodyInput = document.querySelector(".body-input");
const submitBtn = document.querySelector(".submit-btn");
const appendNewCard = document.querySelector('.section--idea_container');

const cardArray = [];

// Event Listeners
window.addEventListener('load', loadFromStorage);
submitBtn.addEventListener('click', submitClick);


// Submit Card
function loadFromStorage(){
    console.log(cardArray);
    console.log(localStorage);
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    var item = JSON.parse(localStorage.getItem(key));
    let newIdea = new Idea(item.id, item.title, item.body, item.quality);
    cardArray.push(newIdea);
    createCard(cardArray[i]);
  }
}

// Submit Card
function submitClick(e) {
  e.preventDefault();

  let titleCopy = titleInput.value;
  let bodyCopy = bodyInput.value;
  let quality;

  var id = Date.now();
  let newIdea = new Idea(id, titleCopy, bodyCopy, quality);
  cardArray.push(newIdea);
  newIdea.saveToStorage();
  createCard(newIdea);
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
       <button class="button--down button--card" type="button" name="button" onclick="decreaseQuality(${idea.id})">
         <img src="images/downvote.svg" />
       </button>
       <button class="button--up button--card" type="button" name="button" onclick="increaseQuality(${idea.id})">
         <img src="images/upvote.svg" />
       </button>
       <h4 class="h4--quality_control">Quality: <span>${idea.quality}</span></h4>
       <button class="button--close button--card" type="button" name="button" onclick="deleteCard(${idea.id})">
         <img src="images/delete.svg" />
       </button>
     </div>
    </article>`
  );
  //
  // addEventsToCards(cardIdea);

  // const deleteBtn = document.querySelector(".button--close");
  // const upQualityBtn = document.querySelector(".button--up");
  // const downQualityBtn = document.querySelector(".button--down");
  //
  // deleteBtn.addEventListener('click', deleteCard);
  // upQualityBtn.addEventListener('click', increaseQuality);
  // downQualityBtn.addEventListener('click', decreaseQuality);
  // return idea;
}
//
// function addEventsToCards(idea){
//   // console.log(idea.key);
//
//   let deleteBtn = document.querySelectorAll(".button--close");
//
//   // deleteBtn.addEventListener('click', deleteCard);
//   for (var i = 0; i < deleteBtn.length; i++) {
//     console.log(deleteBtn[i]);
//     deleteBtn[i].addEventListener('click', deleteCard);
//   }
// }

// const ideaboxCard = document.getElementsByClassName('article--ideabox_card')[0];

// Delete Card
function deleteCard(cardId) {
  var thisCard = document.getElementById(cardId.toString());
  thisCard.remove();

  let ideaToDelete = cardArray.find(function(idea) {
    return cardId === idea.id;
  });

  ideaToDelete.deleteFromStorage();

  let deleteIndex = cardArray.findIndex(function(idea){
    return cardId === idea.id;
  })

  cardArray.splice(deleteIndex , 1);
}

const clearLocalStorage = document.querySelector('.clear-localStorage');
clearLocalStorage.addEventListener('click', clearStorage);

// Clear Storage
function clearStorage(){
  window.localStorage.clear();
  alert('cleared storage');
}

// Increase Quality
function increaseQuality(upClick) {
  let ideaToIncrease = cardArray.find(function(idea) {
    return upClick === idea.id;
  });
  ideaToIncrease.updateQuality(1);
  console.log(ideaToIncrease);
  ideaToIncrease.saveToStorage();
}

// Decrease Quality
function decreaseQuality(downClick) {
  let ideaToDecrease = cardArray.find(function(idea) {
    return downClick === idea.id;
  });
  ideaToDecrease.updateQuality(-1);
  console.log(ideaToDecrease);
  ideaToDecrease.saveToStorage();
}
