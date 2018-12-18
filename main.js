// Global variables

const titleInput = document.querySelector(".title-input");
const bodyInput = document.querySelector(".body-input");

const submitBtn = document.querySelector(".submit-btn");
const deleteBtn = document.querySelector(".button--close");

const appendNewCard = document.querySelector('.section--idea_container');


// Event Listeners
submitBtn.addEventListener('click', submitClick);
deleteBtn.addEventListener('click', deleteCard);


// Functions
function submitClick(e) {
  e.preventDefault();
  let titleCopy = titleInput.value;
  let bodyCopy = bodyInput.value;
  let counter = 0;
  console.log("Submit Btn Clicked");

  let newIdea = new Idea(Date.now(), titleCopy, bodyCopy);
  newIdea.saveToStorage();
  createCard(newIdea);
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
)}

function deleteCard() {
  console.log(event.target);
  if (event.target.className === 'delete--button') {
    event.target.parentElement.parentElement.parentElement.remove();
    console.log("Delete clicked");
  }
}
