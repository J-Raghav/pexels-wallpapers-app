async function loadImages(url, clear=false, cleanup=()=>{}) {
  if (clear){
    document.getElementById(`image-wrapper`).innerHTML = '';
  }
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    // debugger;
    if (this.readyState == 4 && this.status == 200) {
      // Create new wrapper for next batch of images
      let new_image_wrapper = document.createElement('div');
      new_image_wrapper.setAttribute('id', `image-wrapper-${page}`);

      // Inserting it to DOM
      document.getElementById('image-wrapper').appendChild(new_image_wrapper);

      // Filling new wrapper with response images
      for (let image of JSON.parse(this.response).photos){
        document.getElementById(`image-wrapper-${page}`).innerHTML += Handlebars.templates.imagecard({image});
      }

      // Unblock loading new images on scrolling by setting loading to false when all images are loaded
      let last_image = document.querySelector(`#image-wrapper-${page} .cardImage:last-child img`);
      if(last_image){
        last_image.onload = function(){
          document.querySelectorAll('.download-link').forEach(function(item){
            let url = item.dataset.src;
            let filename = item.dataset.title;
            item.onclick = ()=>{download_image(url, filename, item);}
          });
          loading = false;
        }
      }
      // Calls callback after finishing XHR
      cleanup()
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

  // Do nothing in case of empty search query
  if (!search_query){
    return
  }

  // Operations to be performed after XHR
  let callback = function(){
    let content;
    if(document.getElementById('image-wrapper-1').childElementCount === 0){
      page--;
      content = `Sorry we cound't find any results for <span class="text-info" style="font-weight:bold;">${search_query}</span>`
    }
    else{
      content = `Search results for <span style="color:#17a2b8;font-weight:bold;">${search_query}</span>`
    }
    document.getElementById("title").innerHTML = content;
  }

  // Load images to DOM
  loadImages(`${base_url}search/${search_query}?page=1`, clear=true, callback);
  page = 1;
  current_featured = '';
  if(this.firstElementChild){
     this.firstElementChild.firstElementChild.value = '';
  }
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
