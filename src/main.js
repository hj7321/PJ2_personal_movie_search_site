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
});

const fetchMovieData = async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMzUwZGE1MWJhNmVkMjdlYzlmMDZjNzkzNDdlZTQyNSIsInN1YiI6IjY2MjVkNDQ2ZTI5NWI0MDE2NDlhNTZmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LwKRpRWLt3lSImtcWOQiis4LAkBC1o-OtFFjJUZhW-s",
    },
  };

  const { results } = await fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    options
  ).then((response) => response.json());

  return results;
};

const makeMovieBox = async () => {
  const movieInfo = await fetchMovieData();

  $movieContainer.innerHTML = movieInfo
    .map(
      (movie) => `
        <li class="movie-box" id=${movie.id}>
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="" />
          <div class="movie-info-box">
            <div class="title-score">
              <p class="title">${movie.title}</p>
              <p class="score">⭐️${movie.vote_average}</p>
            </div>
            <p>${movie.overview}</p>
          </div>
        </li>`
    )
    .join("");
};

const openModal = (content) => {
  const $modalBox = document.querySelector(".modal-box");
  const $message = document.querySelector(".message");
  const $checkBtn = document.querySelector(".check-btn");
  $modalBox.style.display = "flex";
  $message.textContent = content;
  $checkBtn.addEventListener("click", () => ($modalBox.style.display = "none"));
};

const searchMovie = (value) => {
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

makeMovieBox();
