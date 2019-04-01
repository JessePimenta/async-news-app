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
const main = document.getElementsByTagName('main')[0];
const input = document.getElementsByTagName('input')[0];
const search = document.getElementById('search');
const pastQueries = document.getElementById('pastQueries');
const menuCont = document.getElementById('menu-container');
const navMenu = document.getElementById('nav-menu');
const articleRow = document.getElementById('article-row');
const col = document.getElementById('col');
// const gridToggle = document.getElementById('grid-toggle');
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
const technologyUrl = 'https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey='

// Request News Function
async function getNews(url) {
  let response = await fetch(url + apiKey);
  let jsonResponse = await response.json();
  let articlesArray = jsonResponse.articles.slice(0,20);
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
      '   <h3>By ' + article.author +'</h3>' +
      '   <p> ' + article.description + '</p>' +
      '   <a href="' + article.url + '" target="_blank" class="readmore ">Read More ⟶</a>' +
      '<hr>'
      ' </div>' +
      '</div>' +
      '</div>';

    main.innerHTML += articleRow;
    main.animate([
      // keyframes
      { opacity: '0' },
      { opacity: '1' }
    ], {
      // timing options
      duration: 400,
      iterations: 1
    });
  });
  return articles;
}

// gridToggle.addEventListener('click',function() {
//   articleRow.classList.toggle('gridview')
// })

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

// keyword search
search.addEventListener('click', function() {
   main.innerHTML = '';
   let searchVal = input.value;
   queries.push(" " + "<span class='individual-search-val'>" + searchVal + "</span>");

   let searchHistory = queries.join('');
   pastQueries.innerHTML = searchHistory;


   getNews('https://newsapi.org/v2/everything?q=' + input.value + '&apiKey=')
   .then(articlesArray => renderNews(articlesArray))
}, false);

  menuCont.addEventListener('click', function(x) {
    menuCont.classList.toggle("change");
    navMenu.classList.toggle("show")
  })
