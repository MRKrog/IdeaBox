class Idea {
  constructor(id, title, body) {
    this.id = id;
    this.title = title;
    this.body = body;
    console.log("constructor call");
  }

  saveToStorage() {
    localStorage.setItem(this.id, JSON.stringify(this));
    console.log("Save to storage called");
  }

  deleteFromStorage() {

  }

  updateContent() {

  }

  updateQuality() {

  }

}
