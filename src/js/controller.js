import "core-js/stable";
import "regenerator-runtime";
import "./sass/main.scss";
import * as model from "../js/model.js";
import { MODAL_CLOSE_SEC } from "./config.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import searchResultView from "./views/searchResultView.js";
import paginationView from "./views/paginationView.js";
import bookmarksView from "./views/bookmarksView.js";
import addRecipeView from "./views/addRecipeView.js";

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    // Rendering spinner
    recipeView.renderSpinner();

    searchResultView._update(model.loadSearchResultPerPage());
    bookmarksView._update(model.state.bookmarks);

    // Loading recipe
    await model.loadRecipe(id);
    recipeView._render(model.state.recipe);
  } catch (err) {
    console.error(err);
    recipeView.renderError();
  }
};

const controlSearchResult = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) return;

    // Rendering spinner
    searchResultView.renderSpinner();

    // Loading search result
    await model.loadSearchResult(query);

    // Rendering search result
    searchResultView._render(model.loadSearchResultPerPage());

    // Rendering initial pagination button
    paginationView._render(model.state.search);
  } catch (err) {
    console.error(err);
    recipeView.renderError();
  }
};

const controlPaginationButtons = function (goToPage) {
  // Rendering search result
  searchResultView._render(model.loadSearchResultPerPage(goToPage));

  // Rendering pagination button
  paginationView._render(model.state.search);
};

const controlServings = function (servings) {
  model.updateServings(servings);
  recipeView._update(model.state.recipe);
};

const controlBookmark = function () {
  bookmarksView._render(model.state.bookmarks);
};

const controlAddBookmarks = function () {
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }
  recipeView._update(model.state.recipe);

  bookmarksView._render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // Showing loading spinner
    addRecipeView.renderSpinner();

    await model.uploadRecipe(newRecipe);

    // Render recipe
    recipeView._render(model.state.recipe);

    // Display success message
    addRecipeView.successMessage();

    // Change id in URL
    window.history.pushState(null, "", `#${model.state.recipe.id}`);

    // Display bookmarks view
    bookmarksView._render(model.state.bookmarks);

    // Close window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error(err);
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  recipeView.addHandlerBookmark(controlBookmark);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmarks);
  searchView.addHandlerRender(controlSearchResult);
  paginationView.addHandlerButton(controlPaginationButtons);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
