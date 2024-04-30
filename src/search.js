export const searchMovie = (value) => {
  const $input = document.querySelector("input");

  if (value === "") {
    openModal("검색어를 입력해주세요.");
    $input.focus();
  } else {
    const $movieBox = document.querySelectorAll(".movie-box");
    $movieBox.forEach((box) => {
      const title = box.querySelector(".title").textContent.toLowerCase();
      const searchValue = value.toLowerCase();
      if (title.includes(searchValue)) box.style.display = "flex";
      else box.style.display = "none";
    });
    value = "";
  }
};
