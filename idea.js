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

  updateQuality(integer, qualityControl) {
    
    var newQuality = (this.quality += integer);
    switch (newQuality) {
      case 0:
        console.log('in zero');
        qualityControl.innerText = "Swill";

        break;
      case 1:
        console.log('in one');
        qualityControl.innerText = "Plausible";
        break;
      case 2:
         console.log('in Two');
         qualityControl.innerText = "Genius";
        break;
      default:
        console.log('defualt');
    }
    console.log(qualityControl);
    console.log(newQuality);


    localStorage.setItem(this.key, JSON.stringify(newQuality));
  }

}
