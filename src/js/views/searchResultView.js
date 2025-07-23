import View from "./view.js";
import previewView from "./previewView.js";

class SearchResultView extends View {
  _parentEl = document.querySelector(".results");

  _generateMarkup() {
    return this._data
      .map((recipe) => previewView._render(recipe, false))
      .join("");
  }
}

export default new SearchResultView();
