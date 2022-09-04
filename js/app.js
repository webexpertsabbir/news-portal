
//load catagori
const loadCatagori = async () => {
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    try{
      const res = await fetch(url);
      const data = await res.json();
      dispalyCatagori(data.data.news_category);
    }
    catch(error){
      console.log(error);
    }

}


//display catagori
const dispalyCatagori = catagoris => {
    // console.log(catagoris)
    const catagorilist = document.getElementById('catagori-list');
    catagoris.forEach(catagori => {
        // console.log(catagori);
        const li = document.createElement('li');
        li.classList.add('cursor-pointer', 'mx-3', 'd-inline');
        li.innerHTML = `<a onclick="loadNews(${catagori.category_id})">${catagori.category_name}</a>`;
        catagorilist.appendChild(li);
    })
};

loadCatagori();

//load news
const loadNews = async (category_id) => {
    // console.log(category_id);
    const url = `https://openapi.programming-hero.com/api/news/category/0${category_id}`;
    // console.log(url)
    try{
      const res = await fetch(url);
      const data = await res.json();
      displayNews(data.data);
    }
    catch(error){
      console.log(error)
    }
};

// displaye news arrow fanction
const displayNews = blogPost => {
    toggolSpinner(true);
    // console.log(blogPost);

    // news sort
    blogPost.sort((a, b) => {
      return b.total_view - a.total_view;
    })

    //catagori length
    const showLenght = document.getElementById('show-length');
    const length = blogPost.length;
    // showLenght.innerText = blogPost.length;
    if(length == 0){
      showLenght.innerText = 'News Not Found';
    }else{
      showLenght.innerText = length
    }
    


    //Dispaly news
    const displayNews = document.getElementById('dispaly-news');
    displayNews.textContent = '';
    blogPost.forEach(news => {
      // const shortView = news.total_view;
      // console.log(shortView);
        // console.log(news);
        const article = document.createElement('article');
        article.innerHTML = `
        <div class="row py-5">
        <div class="card mb-3 ">
          <div class="row g-0">
            <div class="col-md-3">
              <img src="${news.image_url}" class="img-fluid rounded-start mt-3" alt="...">
            </div>
            <div class="col-md-9">
              <div class="card-body">
                <h5 class="card-title">${news.title}</h5>
                <p class="card-text">${(news.details).slice(1, 250,)}<span>...</span></p>
                <div class="row">
                  <div class="col d-flex justify-content-start align-items-center">
                    <img class="avater-img rounded-circle" src="${news.thumbnail_url}" alt="">
                    <div class="ms-3">
                      <h5 class="m-0 authore-name">${news.author.name != null ? news.author.name : 'No Data Found'}</h5>
                      <p class="m-0">${news.author.published_date != null ? news.author.published_date.slice(1, 10) : 'No Publish date ' }</p>
                    </div>
                  </div>
                  <div class="col d-flex justify-content-center align-items-center">
                    <h5 class="mt-2"><i class="fa-regular fa-eye"></i> <span id="view">${news.total_view != null ? news.total_view : 'No views'}</span></h5>
                  </div>
                  <div class="col d-flex justify-content-center align-items-center d-none d-sm-block d-sm-none d-md-block">
                    <div class=" fs-5">
                      <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star-half-stroke"></i>
                    </div>
                  </div>
                
                  <div class="col d-flex justify-content-end align-items-center">

                  <button onclick="loadModalNewss('${news._id}')" class="btn btn-outline-primary d-block" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-sharp fa-solid fa-arrow-right"></i></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        `;

        displayNews.appendChild(article);
    });
    toggolSpinner(false);
};

loadNews(1);


//spinner
const toggolSpinner = isLoading => {
  const loaderSection = document.getElementById('loader');
  if(isLoading){
      loaderSection.classList.remove('d-none');
  }
  else{
      loaderSection.classList.add('d-none');
  }
}



//load Modal news
const loadModalNewss = async(id) => {
    const url = `https://openapi.programming-hero.com/api/news/${id}`;
    try{
      const res = await fetch(url);
    const data = await res.json();
    displayModalNews(data.data[0]);
    }
    catch(error){
      console.log(error);
    }
}

// display modal
const displayModalNews = modal =>{
  // console.log(modal);
  const modalTitle = document.getElementById('modal-title');
  modalTitle.innerText = `${modal.title}`;
  const modalBodyNews = document.getElementById('modal-body-news');
  modalBodyNews.innerHTML =`
  <img class="img-fluid" src="${modal.image_url}" alt="">
  <p>${(modal.details).slice(1, 150)}<span>...</span></p>

  <div class="col-5 d-flex justify-content-start align-items-center">
     <img class="avater-img rounded-circle" src="${modal.thumbnail_url}" alt="">
     <div class="ms-3">
      <h5 class="m-0 authore-name">${modal.author.name != null ? modal.author.name : 'No Data'}</h5>
      <p class="m-0">${modal.author.published_date != null ? modal.author.published_date.slice(1, 10) : 'No Publish date ' }</p>
      </div>
  </div>
  <div class="col-3">
  <h5 class="mt-2"><i class="fa-regular fa-eye"></i> <span id="view">${modal.total_view != null ? modal.total_view : 'No views'}</span></h5>

  </div>
  <div class="col-4">
  <div class=" fs-4">
      <h5 class="mt-2">${modal.rating.number} <i class="fa-solid fa-star"></i></h5>
      </div>
  </div>
  `;
}




