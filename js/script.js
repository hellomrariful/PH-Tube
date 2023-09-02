let currentCategory = 1000
document.getElementById('sort').addEventListener('click', () => {
  fetch(`https://openapi.programming-hero.com/api/videos/category/${currentCategory}`)
    .then(response => response.json())
    .then(responseData => {
      const sortData = responseData.data
      sortData.sort((a, b) => parseFloat(b.others.views) - parseFloat(a.others.views))
      handelCategory(sortData)
    })
})

const sortCategory = (categoryId) => {
  currentCategory = parseInt(categoryId)
}

const loadCategory = async () => {
  const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
  const data = await response.json();

  const categoryContainer = document.getElementById('category-container')
  const dataCategory = data.data
  dataCategory.forEach((category) => {
    const div = document.createElement('div');
    div.innerHTML = `
        <button onclick='sortFunction("${category.category_id}"); sortCategory("${category.category_id}")' class="px-4 py-2 bg-[#25252526] text-[#252525B2] text-xl font-semibold rounded mt-9 focus:bg-[#FF1F3D] focus:text-white active:bg-[#FF1F3D] active:text-white">${category.category}</button>
        `
    categoryContainer.appendChild(div)
  })
}

const sortFunction = async (categoryId) => {
  const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`)
  const data = await response.json();
  const returnData = await data.data
  handelCategory(returnData)
}

const handelCategory = (cardData) => {
  const cardContainer = document.getElementById('card-container');
  cardContainer.innerHTML = ''

  if (cardData.length === 0) {
    cardContainer.innerHTML = `
    <div class="lg:mt-52 md:mt-52 mt-16 mb-8">
    <img class="flex justify-center mx-auto mb-8" src="./Images/Icon.png" alt="">
    <h1 class="lg:text-3xl md:text-3xl text-2xl text-center text-[#171717] font-bold">Oops!! Sorry, There is no content here</h1>
  </div>
    `
    cardContainer.classList.remove('grid', 'lg:grid-cols-4', 'md:grid-cols-3', 'grid-cols-1', 'gap-6');
  }
  else {
    cardContainer.classList.add('grid', 'lg:grid-cols-4', 'md:grid-cols-3', 'grid-cols-1', 'gap-6');
    cardData.forEach((card) => {
      function secondsToHoursMinutesAgo(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return `${hours} hrs ${minutes} min ago`;
      }

      const seconds = card.others.posted_date;
      const formattedTime = secondsToHoursMinutesAgo(seconds);

      const div = document.createElement('div')
      div.innerHTML = `
          <div class="mt-10">
            <div class="bg-[#FFF] rounded-lg">
            <div class="relative">
            <figure>
              <img class="rounded-lg h-56 w-full" src="${card.thumbnail}" alt="">
            </figure>
            ${formattedTime && card.others.posted_date !== "" ? `<p class="absolute text-white top-0 right-0 bg-[#171717] rounded px-2 py-1 mt-44 mr-4">${formattedTime}</p>` : ''}
          </div>
              <div class="mt-5">
                <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-full overflow-hidden">
                  <img class="w-full h-full object-cover" src="${card.authors[0].profile_picture}" alt="">
                </div>
                  <h2 class="text-[#171717] text-xl font-bold">${card.title}</h2>
                </div>
                <div class="pl-14 mt-2"> 
                  <div class="flex gap-2 items-center">
                    <span class="text-[#171717B2] text-[16px] font-normal">${card.authors[0].profile_name}</span>
                    <span><img src="${card.authors[0].verified ? './Images/verified.png' : ''}" alt=""></span>
                  </div>
                  <p class="mt-2 text-[#171717B2] text-[16px] font-normal">${card.others.views} views</p>
                </div>
              </div>
            </div>
          </div>
          `
      cardContainer.appendChild(div)
    })
  }
}

const blog = document.getElementById('blog-btn').addEventListener('click', function () {
  window.location.href = 'blog.html'
})

loadCategory()
sortFunction(1000)