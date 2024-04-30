import { openModal } from "./modal.js";
import { makeMovieBox } from "./movie.js";
import { searchMovie } from "./search.js";

const $input = document.querySelector("input");
const $mainPage = document.getElementById("main-page");
const $upBtn = document.querySelector(".up-btn");
const $movieContainer = document.querySelector(".movie-container");
const $form = document.querySelector("form");

window.onload = () => {
  $input.focus();
};

$mainPage.addEventListener("click", () => {
  $movieContainer.innerHTML = "";
  makeMovieBox();
  $input.value = "";
  $input.focus();
});

$upBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

$movieContainer.addEventListener("click", (e) => {
  openModal(`영화 ID: ${e.target.closest("li").id}`);
});

$form.addEventListener("submit", (e) => {
  e.preventDefault();
  searchMovie($input.value);
  $input.value = "";
});

makeMovieBox();