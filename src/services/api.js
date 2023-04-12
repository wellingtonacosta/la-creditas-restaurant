const fetchPage = async (page) => {
   const url =  `https://mockbin.org/bin/b74c94e0-9553-4e39-b3ec-8e3e7f5d2079`;
  

  return await fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      for (let i = 0; i < response.pages.length; i++) {
        if (page == response.pages[i].name) {
          fetchMeals(response.pages[i].id);
        }
      }
    });
};

const fetchMeals = async (ids) => {
  const url = `https://mockbin.org/bin/b74c94e0-9553-4e39-b3ec-8e3e7f5d2079`;

  return await fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      document.querySelector("div.loader").remove();

      for (let i = 0; i < response.meals.length; i++) {
        if (ids.includes(response.meals[i].id)) {
          const article = document.createElement("article");
          article.classList.add("article", "article--home");
          article.innerHTML = `
                      <div>
                        <h2 class="article__title">${response.meals[i].name}</h2>
                        <p class="article__desc"> ${response.meals[i].description}</p>
                        <a class="article__link" href="#">Leia Mais</a>
                      </div>
            
                      <picture class="article__picture">
                        <source srcset="image/${response.meals[i].image}" />
                        <img src="/image/${response.meals[i].image}" alt="prato de comida mexicana" />
                      </picture>
            `;

          const section = document.querySelector(".section");
          section.appendChild(article);
        }
      }
    });
};
