class Idea {
  constructor(id, title, body, quality) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.quality = quality || 0;
  }

  saveToStorage() {
    localStorage.setItem(this.id, JSON.stringify(this));
  }

  deleteFromStorage() {
    console.log("Deleting from storage: " + this.title);
    localStorage.removeItem(this.id);
  }

  updateContent() {
    console.log("Update content: " + this);
    localStorage.setItem(this.id, JSON.stringify(this));
  }

  updateQuality(integer) {

    var newQuality = (this.quality += integer);

    console.log(newQuality);

    localStorage.setItem(this.key, JSON.stringify(newQuality));

  }

}
