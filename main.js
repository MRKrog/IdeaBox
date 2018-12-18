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
  console.log("Submit Btn Clicked");
  createCard();
}

function createCard(e) {
  appendNewCard.insertAdjacentHTML('beforeend',
  `<article class="article--ideabox_card">
    <div class="div--card_top">
      <h2>Example Card 1</h2>
      <p>
        At vero eos et accusamus et iusto odio dignissimos ducimus qui
        blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
        et quas molestias excepturi sint occaecati.
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
  if (event.target.className === 'button--close') {
    event.target.parentElement.parentElement.parentElement.remove();
    console.log("Delete clicked");
  }
}
