# 개인 프로젝트: 영화 검색 사이트 제작

## 개선한 부분
## 1. assets, src, style 폴더 생성
- `assets 폴더` : prettier 설정 파일
- `src 폴더` : 자바스크립트 파일
  - `main.js` : 아래의 파일들을 import하여 실행하는 주요 파일
  - `modal.js` : 모달 창 구현
  - `movie.js` : 영화 데이터 fetch 및 영화 박스 생성
  - `search.js` : 영화 검색 기능 구현
- `style 폴더` : css 파일

## 2. [index.html] 시맨틱 태그로 변경
- `<header>` 부분의 `input` 태그와 `button` 태그를 감싸는 태그를 `div` 태그에서 **`form` 태그**로 변경했다.
- `<header>` 부분의 제목을 보여주는 태그를 `p` 태그에서 **`h1` 태그**로 변경했다.
- `<section>` 부분의 영화 박스를 감싸는 영화 컨테이너(movie-container) 태그를 `div` 태그에서 **`ul` 태그**로 변경했다.

## 3. [index.html] 전체를 감싸는 태그 삭제
- `<header>`, `<section>`, `<footer>`를 감싸는 `div` 태그는 아무 역할도 하지 않아서 삭제했다.

## 4. [main.js] 영화 ID를 보여주는 기능
- 영화 ID를 보여주는 함수인 `getMovieId()`를 삭제했다.
- 이벤트 리스너를 영화 박스(movie-box)들이 아닌 영화 컨테이너(movie-container) 한 곳에만 설정하여서 메모리 효율성을 높였다.
- `e.target.closest("li").id` 코드를 사용하여 영화 박스의 자손 노드를 클릭해도 영화 박스(movie-box)로 이동하도록 구현했다.
  ```javascript
  $movieContainer.addEventListener("click", (e) => {
    openModal(`영화 ID: ${e.target.closest("li").id}`);
  });
  ```

## 5. [main.js] 검색창에 검색어를 입력하고 제출하는 기능
- `input` 태그의 이벤트 리스너(엔터키 누르는 이벤트)와, `button` 태그의 이벤트 리스너(클릭 이벤트)를 삭제했다.
- `input` 태그와 `button` 태그를 감싸는 `form` 태그에 이벤트 리스너(제출 이벤트)를 설정하여 한 개의 이벤트 리스너로 위의 두 개의 기능을 하도록 구현했다.
- `form` 태그에 이벤트 리스너를 설정하고 `preventDefault()` 메서드를 사용하여 이벤트 기본 동작을 방지하도록 구현했다.
  ```javascript
  $form.addEventListener("submit", (e) => {
    e.preventDefault();
    searchMovie($input.value);
  });
  ```

## 6. [movie.js] `fetchMovieData()` 함수에서 구조 분해 할당 사용
- 구조 분해 할당을 사용하여 자바스크립트 객체에서 필요한 속성인 `results`만 가져오도록 구현하여 `fetchMovieData()` 함수를 호출한 코드에서 번거롭게 `.results`를 쓰지 않아도 된다.
- 변경 전 코드
  ```javascript
  let response = await fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    options
  );
  
  return response.json();
  ```
- 변경 후 코드
  ```javascript
  const { results } = await fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    options
  ).then((response) => response.json());

  return results;
  ```

## 7. [movie.js] `makeMovieBox()` 함수에서 배열 메서드 사용
- `map()` 메서드와 `join()` 메서드를 사용하여 변수를 선언하지 않고 바로 `$movieContainer.innerHTML`로 영화 박스(movie-box)가 들어가도록 구현했다.
- `join()` 메서드 안의 구분자를 ""(빈 문자열)로 설정하여 영화 박스들이 구분자 없이 바로 붙도록 설정했다.

## 8. [search.js] `searchStructure()` 함수 삭제 및 `searchMovie()` 함수 내용 변경
- 변경 전 내용
  - `searchMovie()` 함수는 검색창에 검색어를 입력하여 제출하는 기능을 가졌었다.
  - `searchStructure()` 함수는 영화 검색 형식에 대한 함수였다.
    - 인자로 영화 데이터를 받았다.
    - `$movieContainer.innerHTML = "";` 코드로 영화 컨테이너 안에 있는 html 내용을 모두 없앴다.
    - 그 후, 영화 제목에 검색어가 포함되어 있는 영화들만 다시 영화 박스를 만들어서 영화 컨테이너에 넣었다.
    - 너무 비효율적이다.
- 변경 후 내용
  - 인자로 검색어를 받는다.
  - 검색어가 빈 문자열이면, 검색어를 입력하라는 모달 창을 띄우고 input 창에 포커스를 두었다.
  - 검색어가 빈 문자열이 아니면, 영화 제목에 검색어가 포함되어 있는 영화들은 영화 박스의 style의 `display` 속성값을 `flex`로, 영화 제목에 검색어가 포함되어 있지 않은 영화들은 style의 `display` 속성값을 `none`으로 설정하여서 영화 제목에 검색어가 포함되어 있는 영화들만 보이도록 구현했다.

## 9. [index.html] `<script>` 태그 설정
- `<script>` 태그를 `<body>` 부분에서 `<head>` 부분에 넣는 것으로 변경하고, `type=module`을 설정하여 다음 기능을 활성화했다.
  - **모듈화** : `import`, `export` 키워드를 사용하여 모듈 간의 데이터 및 기능을 공유할 수 있다.
  - **Strict Mode 자동 적용** : 스크립트가 자동으로 엄격 모드로 실행되어, 더 엄격한 자바스크립트 구문 및 에러 처리를 적용하여 코드의 안전성을 높였다.
  - **동적 로딩** : `import()` 함수를 사용하여 필요에 따라 모듈을 동적으로 로드할 수 있어서, 애플리케이션의 초기 로딩 시간을 줄이고 필요한 모듈만 로드하여 성능을 최적화했다.
  - **크로스 오리진 요청** : 기본적으로 CORS(Cross-Origin Resource Sharing) 정책에 따라 요청되어, 다른 출처의 모듈을 로드할 때 보안을 유지했다.

## 10. [modal.js] 모달 창 구현
- 기존의 alert 창 대신 나만의 모달창을 구현했다.
- `openModal()` 함수를 호출하면 `$modalBox.style.display = "flex"` 코드를 통해 모달창이 열리도록 구현했다.
- 모달창에 있는 확인 버튼에 포커스를 두어 버튼을 클릭하거나 엔터를 누르면 `$modalBox.style.display = "none"` 코드를 통해 모달창이 닫히도록 구현했다.