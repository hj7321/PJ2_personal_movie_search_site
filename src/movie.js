export const makeMovieBox = async () => {
  const movieInfo = await fetchMovieData();
  const $movieContainer = document.querySelector(".movie-container");

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
