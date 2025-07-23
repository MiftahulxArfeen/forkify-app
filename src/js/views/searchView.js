import RecipeView from "./view.js";

class SearchView extends RecipeView {
  parentEl = document.querySelector(".search");

  _clearInput() {
    this.parentEl.querySelector(".search__field").value = "";
  }

  getQuery() {
    const query = this.parentEl.querySelector(".search__field").value;
    this._clearInput();
    return query;
  }

  addHandlerRender(handler) {
    this.parentEl.addEventListener("submit", (e) => {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
