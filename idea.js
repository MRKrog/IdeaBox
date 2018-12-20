class Idea {
  constructor(id, title, body, quality) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.quality = quality;
    // console.log(this.quality);
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

  updateQuality() {
    localStorage.setItem(this.id, JSON.stringify(this));
  }
}
