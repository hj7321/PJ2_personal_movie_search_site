const $movieContainer = document.querySelector(".movie-container");

// TMDB 오픈 API를 이용하여 인기영화 데이터 가져오기
const getMovieData = async () => {
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
const makeMovieBox = async () => {
  let res = await getMovieData();
  console.log(res.results);

  res.results.forEach((movie) => {
    let temp_html = `
    <div class="movie-box" id=${movie.id}>
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="" />
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
  // return res.results; // 다른 곳에서도 영화 정보를 쓰기 위해 리턴받음
};

makeMovieBox();

$movieContainer.addEventListener("click", (e) => {
  const $movieBoxes = [...$movieContainer.getElementsByClassName("movie-box")];
  console.log($movieBoxes);
  // $movieBoxes.addEventListener("click", (e) => {
  //   alert("영화 ID: " + e.currentTarget.id);
  // });
});

// <해야 할 일>
// 1. 영화 카드를 클릭했을 때, 클릭한 영화 id를 나타내는 alert 창 띄우기
// 2. 하단에 위로가기 화살표 아이콘 클릭했을 때 제일 상단으로 이동시키기
//     - 위로가기 화살표 오른쪽으로 이동시키기!!
// 3. 검색창에 입력한 값이 영화 제목에 들어있는 값이라면 그 영화 카드들만 띄우기
//    - 검색버튼 클릭 시 실행되도록 (엔터키 눌러도 실행되도록)
