const $mainPage = document.getElementById("main-page");
const $movieContainer = document.querySelector(".movie-container");
const $searchBtn = document.querySelector(".search-btn");
const $input = document.querySelector("input");
const $upBtn = document.querySelector(".up-btn");

$mainPage.addEventListener("click", () => {
  // 메인 페이지로 가도록 -> 즉, 영화 데이터 전부가 나오도록
});

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
  const movieBoxes = $movieContainer.getElementsByClassName("movie-box");

  return movieBoxes;
};

const getMovieId = async () => {
  const movieBoxes = await makeMovieBox();
  if (movieBoxes) {
    // 영화 카드 클릭 시 alert 창에 그에 맞는 영화 ID 띄우기
    for (let i = 0; i < movieBoxes.length; i++) {
      movieBoxes[i].addEventListener("click", (e) => {
        alert("영화 ID: " + e.currentTarget.id);
      });
    }
  }
};

// 영화 검색 겹치는 부분 함수로 만듦
const searchStructure = (movieInfo) => {
  if ($input.value.length === 0) {
    alert("검색어를 입력해주세요.");
    $input.focus();
  } else {
    $movieContainer.innerHTML = "";
    // movie.title에 $input.value가 포함되어 있는 것들만 무비 컨테이너 안에 보여줌
    movieInfo.results
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
  }
};

const searchMovie = async () => {
  const movieInfo = await getMovieData();

  if (movieInfo) {
    // 검색 버튼 클릭 시 화면에 영화 제목에 검색어가 포함되어 있는 영화만 띄우기
    $searchBtn.addEventListener("click", () => {
      searchStructure(movieInfo);
    });
    $input.addEventListener("keydown", (e) => {
      // 엔터 키를 눌렀을 때 폼을 제출하거나 원하는 동작을 실행
      if (e.key === "Enter") {
        e.preventDefault(); // 기본 동작(폼 제출) 방지
        searchStructure(movieInfo);
      }
    });
  }
};

getMovieId();
searchMovie();

// $upBtn.addEventListener("click", () => {});

// <해야 할 일>
// 2. 하단에 위로가기 화살표 아이콘 클릭했을 때 제일 상단으로 이동시키기
