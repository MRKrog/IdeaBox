class Idea {
  constructor(key, title, body, quality) {
    this.key = key;
    this.title = title;
    this.body = body;
    this.quality = quality;
  }

  saveToStorage() {
    localStorage.setItem(this.key, JSON.stringify(this));
  }

  deleteFromStorage() {
    console.log("Deleting from storage: " + this);
    localStorage.removeItem(this.key);
  }

  updateContent() {
    console.log("Update content: " + this);
    localStorage.setItem(this.key, JSON.stringify(this));
  }

  updateQuality() {
    console.log("Update quality: " + this);
  }

}
