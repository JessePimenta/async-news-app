const search = document.getElementById('search');
const searchInput = document.getElementById('searchInput');
const searchResult = document.getElementById('searchResult');
const menuCont = document.getElementById('menu-container');
const navMenu = document.getElementById('nav-menu');
const articleRow = document.getElementById('article-row');
const main = document.getElementsByTagName('main')[0];
const input = document.getElementsByTagName('input')[0];
const navButtons = document.querySelectorAll('#nav-menu button')
const two = document.getElementById('two');
let visitedSources = [];
let queries = [];
//news api key
const apiKey = 'b335ace826444deeb7a6bbceb7230cf3';

//default news content
const musicUrl = 'https://newsapi.org/v2/everything?q=underground-music&apiKey='
const bitcoinUrl = 'https://newsapi.org/v2/everything?q=bitcoin&apiKey='

// Request News Function
async function getNews(url) {
  let response = await fetch(url + apiKey);
  let jsonResponse = await response.json();
  let articlesArray = jsonResponse.articles.slice(0,10);
  console.log(jsonResponse);
  return articlesArray;
}

async function pageTwo(url) {
  let response = await fetch(url + apiKey);
  let jsonResponse = await response.json();
  let articlesArray = jsonResponse.articles.slice(11,20);
  console.log(jsonResponse);
  return articlesArray;
}



//default news to some source
window.addEventListener('load', function() {

  main.innerHTML = ' ';
  getNews(bitcoinUrl).then(articlesArray => renderNews(articlesArray))

  two.setAttribute("data-apiurl", "https://newsapi.org/v2/everything?q=bitcoin&apiKey=");

  if (visitedSources[visitedSources.length -1] !== visitedSources[visitedSources.length -2]) {
    two.setAttribute("data-apiurl", visitedSources[visitedSources.length - 1]);
  }
}, false);

// Render Function
function renderNews(articles) {
  articles.map((article, index) => {
    let articleRow =
        '<div class="articlerow animated zoomIn" id="article-row">' +
          '<div class="col" id="col">' +
            '<div class="article">' +
            ' <div class="img-cont">' +
            '   <img preload class="storyimage" src="' + article.urlToImage + '" />' +
            ' </div>' +
              '<h2 class="title">' + article.title + '</h2>' +
              '<h3>By ' + article.author + '</h3>' +
              '<p> ' + article.description + '</p>' +
              '<a href="' + article.url + '" target="_blank" class="readmore ">Read More ⟶</a>' +
              '<hr>'
            '</div>' +
          '</div>' +
        '</div>';
    main.innerHTML += articleRow;
  });
  return articles;
}


// Button Event Listeners


navButtons.forEach((button) => {

  button.addEventListener('click', function(evt) {

    const url = evt.target.dataset.apiurl;
      visitedSources.push(url)

    if (visitedSources[visitedSources.length -1] !== visitedSources[visitedSources.length -2]) {
        two.setAttribute("data-apiurl", visitedSources[visitedSources.length - 1]);
        main.innerHTML = ' ';
        pageTwo(url).then(articlesArray => renderNews(articlesArray))
    }
    main.innerHTML = ' ';
    getNews(url).then(articlesArray => renderNews(articlesArray))

    });
});

document.querySelectorAll('.sub-nav-menu span').forEach((button) => {
  button.addEventListener('click', function(evt) {
    const url = evt.target.dataset.apiurl;
    visitedSources.push(url)

    if (visitedSources[visitedSources.length -1] !== visitedSources[visitedSources.length -2]) {
        two.setAttribute("data-apiurl", visitedSources[visitedSources.length - 1]);
        main.innerHTML = ' ';
        pageTwo(url).then(articlesArray => renderNews(articlesArray))
    }

    main.innerHTML = ' ';
    getNews(url).then(articlesArray => renderNews(articlesArray))
  });
});


// keyword search
search.addEventListener('click', function() {
  main.innerHTML = '';
  let searchVal = input.value;
  queries.push(" " + "<span class='individual-search-val' id='searchResult'>" + searchVal + "</span>");
  // show search history
  let searchHistory = queries.join('');
  pastQueries.innerHTML = searchHistory;
  getNews('https://newsapi.org/v2/everything?q=' + input.value + '&apiKey=').then(articlesArray => renderNews(articlesArray))
}, false);

// hide or show nav menu items on mobile
menuCont.addEventListener('click', function() {
  menuCont.classList.toggle("change");
  navMenu.classList.toggle("show")
  searchInput.classList.toggle("show")
  search.classList.toggle("show")
})
