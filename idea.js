class Idea {
  constructor(key, title, body) {
    this.key = key;
    this.title = title;
    this.body = body;
  }

  saveToStorage() {
    localStorage.setItem(this.key, JSON.stringify(this));
  }

  deleteFromStorage() {

  }

  updateContent() {

  }

  updateQuality() {

  }

}
