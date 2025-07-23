import View from "./view.js";
import previewView from "./previewView.js";

class bookmarksView extends View {
  _parentEl = document.querySelector(".bookmarks__list");

  _generateMarkup() {
    return this._data
      .map((bookmark) => previewView._render(bookmark, false))
      .join("");
  }
}

export default new bookmarksView();
