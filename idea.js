class Idea {
  constructor(id, title, body, quality) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.quality = quality;
  }

  saveToStorage() {
    localStorage.setItem(this.id, JSON.stringify(this));
  }

  deleteFromStorage() {
    console.log("Deleting from storage: " + this);
    localStorage.removeItem(this.id);
  }

  updateContent() {
    console.log("Update content: " + this);
    localStorage.setItem(this.id, JSON.stringify(this));
  }

  updateQuality() {
    console.log("Update quality: " + this);
  }

}
