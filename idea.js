class Idea {
  constructor(key, title, body) {
    this.key = key;
    this.title = title;
    this.body = body;
    console.log(title, body);
    // console.log("constructor call");
    // console.log(cardArray);
  }

  saveToStorage() {
    console.log("in save storage " + this);
    // var stringifiedObj = JSON.stringify(this);
    localStorage.setItem(this.key, JSON.stringify(this));
    // console.log("Save to storage called");
    // cardArray.push(this);
  }

  deleteFromStorage() {

  }

  updateContent() {

  }

  updateQuality() {

  }

}
