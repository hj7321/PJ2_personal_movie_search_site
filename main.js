const $movieContainer = document.querySelector(".movie-container");

// TMDB 오픈 API를 이용하여 인기영화 데이터 가져오기
const loadJson = async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMzUwZGE1MWJhNmVkMjdlYzlmMDZjNzkzNDdlZTQyNSIsInN1YiI6IjY2MjVkNDQ2ZTI5NWI0MDE2NDlhNTZmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LwKRpRWLt3lSImtcWOQiis4LAkBC1o-OtFFjJUZhW-s",
    },
  };

  let response = await fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    options
  );
  if (response.status === 200) {
    return response.json();
  } else {
    throw new Error(response);
  }
};

// 영화 컨테이너 안의 영화 박스에 영화 정보 넣기
const getData = async () => {
  let res = await loadJson();
  console.log(res.results);

  res.results.forEach((movie) => {
    let imgSrc = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    let temp_html = `
    <div class="movie-box">
      <img src=${imgSrc} alt="" />
      <div class="movie-info-box">
        <div class="title-score">
          <p class="title">${movie.title}</p>
          <p class="score">⭐️${movie.vote_average}</p>
        </div>
        <p>${movie.overview}</p>
      </div>
    </div>`;

    $movieContainer.innerHTML += temp_html;
  });
};

getData();

$movieContainer.addEventListener("click", () => {
  alert(`영화 ID: ${movie.id}`)
})