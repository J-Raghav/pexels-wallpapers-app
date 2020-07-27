async function loadImages(url, clear=false) {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

      if (clear){
        document.getElementById(`image-wrapper`).innerHTML = '';
      }

      let new_image_wrapper = document.createElement('div');
      new_image_wrapper.setAttribute('id', `image-wrapper-${page}`);
      document.getElementById('image-wrapper').appendChild(new_image_wrapper);

      for (let image of JSON.parse(this.response).photos){
        document.getElementById(`image-wrapper-${page}`).innerHTML += Handlebars.templates.imagecard({image});
      }

      let last_image = document.querySelector(`#image-wrapper-${page} .cardImage:last-child img`);
      last_image.onload = function(){
        document.querySelectorAll('.download-link').forEach(function(item){
          let url = item.dataset.src;
          let filename = item.dataset.title;
          item.onclick = ()=>{download_image(url, filename, item);}
        });
        loading = false;
      }
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

function download_image(url, filename, tag){
  var xhr = new XMLHttpRequest();
   xhr.open("GET", url, true);
   xhr.responseType = "blob";
   xhr.onload = function(){
       let url_creator = window.URL || window.webkitURL;
       let image_url = url_creator.createObjectURL(this.response);
       tag.href = image_url;
       tag.download = filename;
       tag.onclick = null;
       tag.click();
   }
   xhr.send();
}

function search() {
  event.preventDefault();
  search_query =  current_featured || this.firstElementChild.firstElementChild.value;
  if (!search_query){
    load_home()
  }
  loadImages(`${base_url}search/${search_query}?page=1`, clear=true);
  let content = `Search results for <span style="color:#17a2b8;font-weight:bold;">${search_query}</span>`
  document.getElementById("title").innerHTML = content;
  page = 1;
  current_featured = '';
  this.firstElementChild.firstElementChild.value = '';
}

function addActiveClass(ele){

  ele.parentElement.querySelectorAll('a').forEach((item) => {
    item.classList.remove('active');
  });
  ele.classList.add('active')
}

function load_home(){
  addActiveClass(document.getElementById('home'))
  loadImages(`${base_url}curated`,clear=true);
  search_query = ''
}

let loading = false;
let page = 1;
let search_query = '';
let featured_tags = ['anime', 'nature', 'tech', 'game', 'movies', 'abstract']
let current_featured = '';
const base_url = window.location.origin ? `${window.location.origin}/` : `${window.location.protocol}/${window.location.host}/`;

document.addEventListener('DOMContentLoaded', function() {
  load_home()
  document.querySelector('.navbar-brand').onclick = load_home;
  document.querySelector('#home').onclick = load_home;
  document.querySelector('#random').onclick = function() {

    addActiveClass(this);
    let index = parseInt(Math.random() * featured_tags.length);
    current_featured = featured_tags[index];
    search();

  }

  document.querySelector('nav form').onsubmit = search;
  document.querySelector('header form').onsubmit = search;



  window.onscroll = function() {
    let vh = window.innerHeight;
    let scroll = window.scrollY;
    if ( scroll >= .6 * document.querySelector('header').offsetHeight){
      document.querySelector('nav').classList.remove('nav-at-top');
    }else if(!document.querySelector('nav').classList.contains('nav-at-top')){
      document.querySelector('nav').classList.add('nav-at-top');
    }
    if ( !loading && (scroll + vh >= 0.8 * document.body.offsetHeight)){
      search_query ? loadImages(`${base_url}search/${search_query}?page=${++page}`) : loadImages(`${base_url}curated?page=${++page}`);
      loading = true;
    }
  };
}, false);
