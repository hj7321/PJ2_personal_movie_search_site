import { openModal } from "./modal.js";

export const searchMovie = (value) => {
  if (value === "") {
    openModal("검색어를 입력해주세요.");
  } else {
    const $movieBox = document.querySelectorAll(".movie-box");
    $movieBox.forEach((box) => {
      const title = box.querySelector(".title").textContent.toLowerCase();
      const searchValue = value.toLowerCase();
      if (title.includes(searchValue)) box.style.display = "flex";
      else box.style.display = "none";
    });
  }
};
