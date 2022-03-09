# watcha-homework

#### 🔗 배포 링크 : https://search-watcha.netlify.app/

* [파일 구조](#파일-구조)
* [구현 사항](#구현-사항)
* [커밋 컨벤션](#커밋-컨벤션)
* [실행 방법](#실행-방법)

![screen-recording](https://user-images.githubusercontent.com/56878724/157223513-67ebaf06-236d-4449-8a2d-d668e79bfe8d.gif)

### 파일 구조

```
📦src
 ┣ 📂components
 ┃ ┣ 📂Header
 ┃ ┃ ┣ 📜Header.js
 ┃ ┃ ┗ 📜Header.module.css
 ┃ ┗ 📂Search
 ┃ ┃ ┣ 📜SearchContent.js
 ┃ ┃ ┣ 📜SearchContent.module.css
 ┃ ┃ ┣ 📜SearchInput.js
 ┃ ┃ ┗ 📜SearchInput.module.css
 ┣ 📂images
 ┃ ┗ 📜logo.png
 ┣ 📂styles
 ┃ ┗ 📜GlobalStyle.module.css
 ┣ 📂utils
 ┃ ┣ 📜api.js
 ┃ ┗ 📜debounce.js
 ┣ 📜App.js
 ┗ 📜index.js
```

* <b>`components`</b> : UI 요소를 관리하는 폴더입니다.
* <b>`components/Header`</b> : header 컴포넌트를 관리하는 폴더입니다.
* <b>`components/Search`</b> : search 컴포넌트를 관리하는 폴더입니다.
* <b>`images`</b> : image 파일을 관리하는 폴더입니다.
* <b>`styles`</b> : 글로벌 스타일을 관리하는 폴더입니다.
* <b>`utils`</b> : 프로젝트 진행 중 필요한 기능들을 모듈화해서 관리하는 폴더입니다.

### 구현 사항

- [X] 자바스크립트, module css로 구현
- [X] UI 요소 컴포넌트로 추상화
- [X] 방향키를 통한 키워드 리스트 포커싱 기능 구현
- [X] input 포커스 유무에 따른 UI 효과
- [X] input의 'X' 버튼 클릭 시 입력 값 삭제
- [X] input의 value 값이 존재하지 않을 때 api 호출 X
- [X] Fetch를 통한 API 호출
- [X] 키워드에 대한 결과가 없을 때 활용할 notice UI 추가 `ex) 찾으시는 '키워드'를 찾지 못했어요`
- [X] 요소 명확성을 위해 시맨틱 태그 활용 `ex) <header>, <main>`
- [X] sessionStorage를 통해 api 응답 캐싱  
- [X] debounce 적용

### 커밋 컨벤션

```
docs: 문서 작업
style: 주석 추가, 간단한 코드 추가 및 수정, 스타일링
refactor: 코드 리팩토링 
feat: 기능 구현 및 추가
conf: 프로젝트 환경 설정
chore: package.json 관련
fix: 오류 해결
```

### 실행 방법

```
$ git clone https://github.com/bxxmi/watcha-homework.git

$ cd watcha-homework
$ yarn install
$ yarn start

// 빌드 시
$ yarn build
```
