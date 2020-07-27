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
      last_image.onload = ()=>{
        loading = false;
      }
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}
function search() {
  event.preventDefault();
  debugger;
  search_query = this.firstElementChild.firstElementChild.value;
  loadImages(`${base_url}search/${search_query}?page=1`, clear=true);
  let content = `Search results for ${search_query}`
  document.getElementById("title").textContent = content;
  page = 1;
}

function load_home(){
  loadImages(`${base_url}curated`,clear=true);
  search_query = ''
}

let loading = false;
let page = 1;
let search_query = ''

const base_url = window.location.origin ? `${window.location.origin}/` : `${window.location.protocol}/${window.location.host}/`;

document.addEventListener('DOMContentLoaded', function() {
  load_home();
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
