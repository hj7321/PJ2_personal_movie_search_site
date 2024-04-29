const $mainPage = document.getElementById("main-page");
const $movieContainer = document.querySelector(".movie-container");
const $searchBtn = document.querySelector(".search-btn");
const $input = document.querySelector("input");
const $upBtn = document.querySelector(".up-btn");

// 전체 페이지 로드가 완료되었을 때 실행될 코드
window.onload = () => {
  $input.focus();
};

// [함수] TMDB 오픈 API를 이용하여 인기영화 데이터 가져오는 함수
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

// [함수] 영화 컨테이너 안에 영화 박스 만들어서 영화 정보 넣는 함수
const makeMovieBox = async () => {
  const movieInfo = await getMovieData(); // 영화 데이터 불러오기
  console.log("makeMovieBox() 함수: movieInfo ↓");
  console.log(movieInfo);
  console.log("makeMovieBox() 함수: movieInfo.results ↓");
  console.log(movieInfo.results);

  movieInfo.results.forEach((movie) => {
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
  getMovieId();
};

// [함수] 클릭한 영화 카드의 영화 아이디를 alert 창에 띄우는 함수
const getMovieId = () => {
  const movieBoxes = $movieContainer.getElementsByClassName("movie-box");
  console.log("getMovieId() 함수: movieBoxes ↓");
  console.log(movieBoxes);

  if (movieBoxes) {
    // 영화 카드 클릭 시 alert 창에 그에 맞는 영화 ID 띄우기
    for (let i = 0; i < movieBoxes.length; i++) {
      movieBoxes[i].addEventListener("click", (e) => {
        console.log("getMovieId() 함수: e.target ↓");
        console.log(e.target);
        alert("영화 ID: " + e.currentTarget.id);
      });
    }
  }
};

// [함수] 검색창에 검색어를 입력하는 함수
const searchMovie = async () => {
  const movieInfo = await getMovieData(); // 영화 데이터 불러오기

  if (movieInfo) {
    // 검색 버튼을 클릭했을 때의 이벤트 리스너
    $searchBtn.addEventListener("click", () => {
      searchStructure(movieInfo.results);
    });
    // 엔터 키를 눌렀을 때의 이벤트 리스너
    $input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault(); // 기본 동작(폼 제출) 방지
        searchStructure(movieInfo.results);
      }
    });
  }
};

// [함수] 영화 검색 형식에 대한 함수(겹치는 부분)
const searchStructure = (movieArray) => {
  if ($input.value === "") {
    alert("검색어를 입력해주세요.");
    $input.focus();
  } else {
    $movieContainer.innerHTML = "";
    // movie.title에 $input.value가 포함되어 있는 것들만 무비 컨테이너 안에 보여줌
    movieArray
      .filter((movie) => movie.title.includes($input.value))
      .forEach((movie) => {
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

    $input.value = "";
    getMovieId();
  }
};

makeMovieBox();
searchMovie();

// 헤더에 있는 제목 글씨 클릭했을 때의 이벤트 리스너
$mainPage.addEventListener("click", () => {
  $movieContainer.innerHTML = "";
  makeMovieBox();
});

// 위로가기 버튼(위쪽을 가리키는 화살표 버튼)을 클릭했을 때의 이벤트 리스너
$upBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});