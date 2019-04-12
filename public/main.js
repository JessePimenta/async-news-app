const search = document.getElementById('search');
const searchInput = document.getElementById('searchInput');
const searchResult = document.getElementById('searchResult');
const menuCont = document.getElementById('menu-container');
const navMenu = document.getElementById('nav-menu');
const articleRow = document.getElementById('article-row');
const main = document.getElementsByTagName('main')[0];
const input = document.getElementsByTagName('input')[0];
const navButtons = document.querySelectorAll('#nav-menu .news-source-button')
const one = document.getElementById('one');
const two = document.getElementById('two');
const currentPage = document.getElementById('current-page')
let visitedSources = [];
let queries = [];
let page;
let url;
let count = 0;
function preloadImage(url)
{
    var img= new Image();
    img.src=url;
}
//news api key
const apiKey = '959a96617c394b67aa889fb8ce5a0816';

//default news content
url = 'https://newsapi.org/v2/everything?q=bitcoin&language=en&pageSize=20&page=1&apiKey='

async function getNews(url,page) {
  let response = await fetch(url + apiKey);
  let jsonResponse = await response.json();
  let articlesArray = jsonResponse.articles.slice(0,12);
  return articlesArray;
}

async function pageTwo(url) {
  let response = await fetch(url + apiKey);
  let jsonResponse = await response.json();
  let articlesArray = jsonResponse.articles.slice(12,24);
  return articlesArray;
}


//default news to some source
window.addEventListener('load', function(evt) {
  main.innerHTML = ' ';
  getNews(url).then(articlesArray => renderNews(articlesArray))
  visitedSources.push(url)
  one.setAttribute("data-apiurl", "https://newsapi.org/v2/everything?q=bitcoin&apiKey=");
  two.setAttribute("data-apiurl", "https://newsapi.org/v2/everything?q=bitcoin&apiKey=");
}, false);

// Render Function
function renderNews(articles) {
  articles.map((article, index) => {
    let articleRow =
        '<div class="articlerow animated zoomIn" id="article-row">' +
          '<div class="col" id="col">' +
            '<div class="article">' +
            ' <div class="img-cont">' +
            '   <a href="'+ article.url + '"><img class="storyimage" src="' + article.urlToImage + '" /></a>' +
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


//  NEWS SOURCES
navButtons.forEach((button) => {
  button.addEventListener('click', function(evt) {
    url = evt.target.dataset.apiurl;
    visitedSources.push(url)
    one.setAttribute("data-apiurl", visitedSources[visitedSources.length - 1])
    two.setAttribute("data-apiurl", visitedSources[visitedSources.length - 1]);
    main.innerHTML = ' ';
    getNews(url).then(articlesArray => renderNews(articlesArray))
    });
});

// CATEGORIES
document.querySelectorAll('.sub-nav-menu span').forEach((button) => {
  button.addEventListener('click', function(evt) {
    url = evt.target.dataset.apiurl;
    visitedSources.push(url)
    one.setAttribute("data-apiurl", visitedSources[visitedSources.length - 1])
    two.setAttribute("data-apiurl", visitedSources[visitedSources.length - 1]);
    main.innerHTML = ' ';
    getNews(url).then(articlesArray => renderNews(articlesArray))
  });
});


// ANY KEYWORD SEARCH
search.addEventListener('click', event => {

  main.innerHTML = '';
  let searchVal = input.value;
  url = 'https://newsapi.org/v2/everything?q=' + input.value + '&pageSize=12&page=1&apiKey=';
  visitedSources.push(url)

  one.setAttribute("data-apiurl", visitedSources[visitedSources.length - 1])
  two.setAttribute("data-apiurl", visitedSources[visitedSources.length - 1]);

  queries.push(" " + "<span class='individual-search-val' id='searchResult'>" + searchVal + "</span>");
  let searchHistory = queries.join('');
  pastQueries.innerHTML = searchHistory;
  //show search history

  //if next/prev pages are clicked while a search term is active
  // ** When the page is incremented from the query string it seems to cut me off after a few pages saying:
  // "GET https://newsapi.org/v2/everything?q=bitcoin&pageSize=20&page=6&apiKey=3e2bc7a33aac4bb0aaeb7d40dda4c03b 426 (Upgrade Required)"

  one.addEventListener('click', event => {
    count--;
    url = 'https://newsapi.org/v2/everything?q=' + input.value + '&pageSize=20&page=' + count + '&apiKey=';
    main.innerHTML = ' ';
    getNews(url).then(articlesArray => renderNews(articlesArray))
  })

  two.addEventListener('click', event => {
    count++;
    console.log(count)
    url = 'https://newsapi.org/v2/everything?q=' + input.value + '&pageSize=20&page=' + count + '&apiKey=';
    console.log(url)
    main.innerHTML = ' ';
    pageTwo(url).then(articlesArray => renderNews(articlesArray))
  })

  getNews(url).then(articlesArray => renderNews(articlesArray))
}, false);


// global pagination
one.addEventListener('click', event => {
  main.innerHTML = ' ';
  getNews(url).then(articlesArray => renderNews(articlesArray))
  console.log(visitedSources[visitedSources.length - 2])
})

two.addEventListener('click', event => {
  main.innerHTML = ' ';
  pageTwo(url).then(articlesArray => renderNews(articlesArray))
  console.log(visitedSources[visitedSources.length - 1])
})

// hide or show nav menu items on mobile
menuCont.addEventListener('click', event => {
  menuCont.classList.toggle("change");
  navMenu.classList.toggle("show")
  searchInput.classList.toggle("show")
  search.classList.toggle("show")
})
