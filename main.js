// Global variables
const titleInput = document.querySelector(".title-input");
const bodyInput = document.querySelector(".body-input");

const submitBtn = document.querySelector(".submit-btn");
const deleteBtn = document.querySelector(".button--close");

const appendNewCard = document.querySelector('.section--idea_container');

// const cardArray = JSON.parse(localStorage.getItem()) || [];
const cardArray = [];


// call a function that pushes storage items into card array and reassigns card array
function updateArray(updatedArr){
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    var item = JSON.parse(localStorage.getItem(key));
    cardArray.push(item);
  }
}

updateArray(cardArray);


// Event Listeners
submitBtn.addEventListener('click', submitClick);
deleteBtn.addEventListener('click', deleteCard);
window.addEventListener('load', loadFromStorage);



function loadFromStorage(){
  console.log(cardArray);
  console.log(localStorage);

  for (var j = 0; j < cardArray.length; j++) {
    createCard(cardArray[j]);
  }
}


function submitClick(e) {
  e.preventDefault();

  let titleCopy = titleInput.value;
  let bodyCopy = bodyInput.value;

  var now = new Date().toISOString().slice(11,19);

  // create object and pass the title and body as arguments
  let newIdea = new Idea(now, titleCopy, bodyCopy);

  cardArray.push(newIdea);

  newIdea.saveToStorage();

  createCard(newIdea);

  console.log(cardArray);
  console.log(localStorage);

}

function createCard(idea) {
  appendNewCard.insertAdjacentHTML('beforeend',
  `<article class="article--ideabox_card">
    <div class="div--card_top">
      <h2>${idea.title}</h2>
      <p>
        ${idea.body}
      </p>
    </div>
    <div class="div--card_bottom">
      <button class="button--down button--card" type="button" name="button">
        <img src="images/downvote.svg" />
      </button>
      <button class="button--up button--card" type="button" name="button">
        <img src="images/upvote.svg" />
      </button>
      <h4 class="h4--quality_control">Quality: <span>Swill</span></h4>
      <button class="button--close button--card" type="button" name="button">
        <img src="images/delete.svg" />
      </button>
    </div>
  </article>`
  );
}

function deleteCard() {
  console.log(event.target);
  if (event.target.className === 'delete--button') {
    event.target.parentElement.parentElement.parentElement.remove();
    console.log("Delete clicked");
  }
}



const clearLocalStorage = document.querySelector('.clear-localStorage');
clearLocalStorage.addEventListener('click', clearStorage);

function clearStorage(){
  window.localStorage.clear();
  alert('cleared storage');
}
