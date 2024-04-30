const $mainPage = document.getElementById("main-page");
const $movieContainer = document.querySelector(".movie-container");
const $form = document.querySelector("form");
const $input = document.querySelector("input");
const $upBtn = document.querySelector(".up-btn");

window.onload = () => {
  $input.focus();
};

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

const getMovieId = (e) => {
  if (e.target === $movieContainer) return;
  if (e.target.closest("li")) alert(`영화 ID: ${e.target.closest("li").id}`);
};

$movieContainer.addEventListener("click", getMovieId);

const searchMovie = async () => {
  const movieInfo = await fetchMovieData();
  $form.addEventListener("submit", (e) => {
    e.preventDefault();
    searchStructure(movieInfo);
  });
};

const searchStructure = (movieArray) => {
  if ($input.value === "") {
    alert("검색어를 입력해주세요.");
    $input.focus();
  } else {
    $movieContainer.innerHTML = "";
    movieArray
      .filter((movie) =>
        movie.title.toUpperCase().includes($input.value.toUpperCase())
      )
      .forEach((movie) => {
        let temp_html = `
        <li class="movie-box" id=${movie.id}>
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="" />
          <div class="movie-info-box">
            <div class="title-score">
              <p class="title">${movie.title}</p>
              <p class="score">⭐️${movie.vote_average}</p>
            </div>
            <p>${movie.overview}</p>
          </div>
        </li>`;

        $movieContainer.innerHTML += temp_html;
      });

    $input.value = "";
  }
};

makeMovieBox();
searchMovie();

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
