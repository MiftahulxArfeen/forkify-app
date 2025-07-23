import icons from "url:../../img/icons.svg";
import View from "./view.js";
import { RES_PER_PAGE } from "../config.js";

class PaginationView extends View {
  _parentEl = document.querySelector(".pagination");

  _generateMarkup() {
    const numPages = Math.ceil(this._data.results.length / RES_PER_PAGE);
    const curPages = this._data.page;

    // If i am in page 1, other page exists
    if (curPages === 1 && numPages > 1) {
      return `
      <button data-go-to = "2" class="btn--inline pagination__btn--next">
        <span>Page 2</span>
          <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
          </svg>
      </button>
      `;
    }
    // If i am in other page
    if (curPages < numPages) {
      return `
      <button data-go-to = "${curPages - 1}" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPages - 1}</span>
      </button>
      <button data-go-to = "${curPages + 1}" class="btn--inline pagination__btn--next">
        <span>Page ${curPages + 1}</span>
          <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
          </svg>
      </button>
      `;
    }
    // last page
    if (curPages === numPages && numPages > 1) {
      return `
      <button data-go-to = "${curPages - 1}" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPages - 1}</span>
      </button>
      `;
    }
    // If i am in page 1, no other page exists
    return "";
  }

  addHandlerButton(handler) {
    this._parentEl.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");
      if (!btn) return;
      const goToPage = +btn.dataset.goTo;

      handler(goToPage);
    });
  }
}

export default new PaginationView();
