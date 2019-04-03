// Page Elements
const espn = document.getElementById('espn');
const cnn = document.getElementById('cnn');
const wapo = document.getElementById('wapo');
const ign = document.getElementById('ignNews');
const natgeo = document.getElementById('natgeo');
const wired = document.getElementById('wired');
const techCrunch = document.getElementById('techCrunch');
const bitcoin = document.getElementById('bitcoin');
const reddit = document.getElementById('reddit');
const arsTechnica = document.getElementById('arsTechnica');
const search = document.getElementById('search');
const searchInput = document.getElementById('searchInput');
const searchResult = document.getElementById('searchResult');
const menuCont = document.getElementById('menu-container');
const navMenu = document.getElementById('nav-menu');
const articleRow = document.getElementById('article-row');
const col = document.getElementById('col');
const technology = document.getElementById('technology');
const design = document.getElementById('design');
const film = document.getElementById('film');
const travel = document.getElementById('travel');
const music = document.getElementById('music');
const fashion = document.getElementById('fashion');

const main = document.getElementsByTagName('main')[0];
const input = document.getElementsByTagName('input')[0];

let queries = [];

// News API Data
const apiKey = 'e1a57c30f61646bfa1568e026031039e';
const cnnUrl = 'https://newsapi.org/v1/articles?source=cnn&sortBy=top&apiKey=';
const ignUrl = 'https://newsapi.org/v1/articles?source=ign&sortBy=latest&apiKey=';
const espnUrl = 'https://newsapi.org/v1/articles?source=espn&sortBy=latest&apiKey=';
const wapoUrl = 'https://newsapi.org/v1/articles?source=the-washington-post&sortBy=latest&apiKey=';
const natgeoUrl = 'https://newsapi.org/v1/articles?source=national-geographic&sortBy=latest&apiKey=';
const wiredUrl = 'https://newsapi.org/v2/top-headlines?sources=wired&apiKey=';
const techCrunchUrl = 'https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=';
const redditUrl = 'https://newsapi.org/v2/top-headlines?sources=reddit-r-all&apiKey=';
const bitcoinUrl = 'https://newsapi.org/v2/everything?q=bitcoin&from=2019-03-26&to=2019-03-26&sortBy=popularity&apiKey='
const technologyUrl = 'https://newsapi.org/v2/top-headlines?country=us&category=technology&sortBy=popularity&apiKey='
const designUrl = 'https://newsapi.org/v2/everything?q=graphic-design&sortBy=popularity&apiKey='
const filmUrl = 'https://newsapi.org/v2/everything?q=movies&from=2019-03-26&to=2019-03-26&sortBy=popularity&apiKey='
const travelUrl = 'https://newsapi.org/v2/everything?q=travel&sortBy=popularity&apiKey='
const musicUrl = 'https://newsapi.org/v2/everything?q=underground-music&apiKey='
const fashionUrl = 'https://newsapi.org/v2/everything?q=fashion-week&apiKey='

// Request News Function
async function getNews(url) {
  let response = await fetch(url + apiKey);
  let jsonResponse = await response.json();
  let articlesArray = jsonResponse.articles.slice(0, 20);
  console.log(jsonResponse);
  return articlesArray;
}

// Render Function
function renderNews(articles) {
  articles.map((article, index) => {
    let articleRow =
      '<div class="articlerow" id="article-row">' +
      '<div class="col" id="col">' +
      ' <div class="article">' +
      ' <div class="img-cont">' +
      '   <img class="storyimage" src="' + article.urlToImage + '" />' +
      ' </div>' +
      '   <h2 class="title">' + article.title + '</h2>' +
      '   <h3>By ' + article.author + '</h3>' +
      '   <p> ' + article.description + '</p>' +
      '   <a href="' + article.url + '" target="_blank" class="readmore ">Read More ⟶</a>' +
      '<hr>'
    ' </div>' +
    '</div>' +
    '</div>';

    main.innerHTML += articleRow;
    main.animate([{
        transform: 'scale(0.0)'
      },
      {
        transform: 'scale(1.0)'
      }
    ], {
      // timing options
      duration: 1000,
      iterations: 1,
      easing: 'ease-in-out'

    });
  });
  return articles;
}
window.addEventListener('load', function() {
  main.innerHTML = ' ';
  getNews(technologyUrl)
    .then(articlesArray => renderNews(articlesArray))
}, false);

// Button Event Listeners
cnn.addEventListener('click', function() {
  main.innerHTML = ' ';
  getNews(cnnUrl)
    .then(articlesArray => renderNews(articlesArray))
}, false);

wapo.addEventListener('click', function() {
  main.innerHTML = ' ';
  getNews(wapoUrl)
    .then(articlesArray => renderNews(articlesArray))
}, false);

espn.addEventListener('click', function() {
  main.innerHTML = ' ';
  getNews(espnUrl)
    .then(articlesArray => renderNews(articlesArray))
}, false);

ign.addEventListener('click', function() {
  main.innerHTML = ' ';
  getNews(ignUrl)
    .then(articlesArray => renderNews(articlesArray))
}, false);

natgeo.addEventListener('click', function() {
  main.innerHTML = ' ';
  getNews(natgeoUrl)
    .then(articlesArray => renderNews(articlesArray))
}, false);

wired.addEventListener('click', function() {
  main.innerHTML = ' ';
  getNews(wiredUrl)
    .then(articlesArray => renderNews(articlesArray))
}, false);

techCrunch.addEventListener('click', function() {
  main.innerHTML = ' ';
  getNews(techCrunchUrl)
    .then(articlesArray => renderNews(articlesArray))
}, false);
reddit.addEventListener('click', function() {
  main.innerHTML = ' ';
  getNews(redditUrl)
    .then(articlesArray => renderNews(articlesArray))
}, false);

arsTechnica.addEventListener('click', function() {
  main.innerHTML = ' ';
  getNews(techCrunchUrl)
    .then(articlesArray => renderNews(articlesArray))
}, false);

//category search
technology.addEventListener('click', function() {
  main.innerHTML = ' ';
  getNews(technologyUrl)
    .then(articlesArray => renderNews(articlesArray))
}, false);

design.addEventListener('click', function() {
  main.innerHTML = ' ';
  getNews(designUrl).then(articlesArray => renderNews(articlesArray))
}, false);
film.addEventListener('click', function() {
  main.innerHTML = ' ';
  getNews(filmUrl).then(articlesArray => renderNews(articlesArray))
}, false);
travel.addEventListener('click', function() {
  main.innerHTML = ' ';
  getNews(travelUrl).then(articlesArray => renderNews(articlesArray))
}, false);
music.addEventListener('click', function() {
  main.innerHTML = ' ';
  getNews(musicUrl).then(articlesArray => renderNews(articlesArray))
}, false);
fashion.addEventListener('click', function() {
  main.innerHTML = ' ';
  getNews(fashionUrl).then(articlesArray => renderNews(articlesArray))
}, false);
// keyword search
search.addEventListener('click', function() {
  main.innerHTML = '';
  let searchVal = input.value;
  queries.push(" " + "<span class='individual-search-val' id='searchResult'>" + searchVal + "</span>");

  let searchHistory = queries.join('');
  pastQueries.innerHTML = searchHistory;

  getNews('https://newsapi.org/v2/everything?q=' + input.value + '&apiKey=')

    .then(articlesArray => renderNews(articlesArray))
}, false);

menuCont.addEventListener('click', function(x) {
  menuCont.classList.toggle("change");
  navMenu.classList.toggle("show")
  searchInput.classList.toggle("show")
  search.classList.toggle("show")
})
