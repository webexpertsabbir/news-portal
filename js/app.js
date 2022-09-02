const loadCatagori = async() =>{
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    const res = await fetch(url);
    const data = await res.json();
    dispalyCatagori(data.data.news_category);
}

const dispalyCatagori = catagoris =>{
    // console.log(catagoris)
    const catagorilist = document.getElementById('catagori-list');
    catagoris.forEach(catagori => {
        // console.log(catagori);
        const li = document.createElement('li');
        li.innerHTML = `<a onclick="loadNews(${catagori.category_id})">${catagori.category_name}</a>`;
        catagorilist.appendChild(li);

    })
};

loadCatagori();

const loadNews = async(category_id) =>{
    // console.log(news)
    const url = `https://openapi.programming-hero.com/api/news/category/0${category_id}`;
    // console.log(url)
    const res = await fetch(url);
    const data = await res.json();
    displayNews(data.data);
};

const displayNews = blogPost =>{
    // console.log(blogPost);
    const displayNews = document.getElementById('dispaly-news');
    blogPost.forEach(news =>{
        console.log(news);
        const article = document.createElement('article');
        article.innerHTML = `
        <div class="row py-5">
        <div class="card mb-3 ">
          <div class="row g-0">
            <div class="col-md-3">
              <img src="${news.image_url}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-9">
              <div class="card-body">
                <h5 class="card-title">${news.title}</h5>
                <p class="card-text">${news.details}</p>
                <div class="row">
                  <div class="col d-flex justify-content-between align-items-center">
                    <img class="avater-img rounded-circle" src="./img/avatar.jpg" alt="">
                    <div>
                      <h5 class="m-0">Jane Cooper</h5>
                      <p class="m-0">Jan 10, 2022</p>
                    </div>
                  </div>
                  <div class="col">
                    <h3 class="mt-2"><i class="fa-regular fa-eye"></i> 1.5M</h3>
                  </div>
                  <div class="col">
                    <div class="mt-2 fs-4">
                      <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star-half-stroke"></i>
                    </div>
                  </div>
                  <div class="col d-flex justify-content-end align-items-center  ">
                    <button class="btn btn-outline-primary d-block "><i class="fa-sharp fa-solid fa-arrow-right"></i></button>
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
};