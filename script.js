console.log("******************");
console.log("Welcome AnimeList");
console.log("******************");

document.body.innerHTML = `<div class="container">
      <header>
        <h1>Anime Search</h1>
      </header>
      <section id="cards-section">
        <div class="search-container">
          <input
            type="search"
            name="searchKey"
            id="searchKey"
            placeholder="Search .... Anime, Manga etc"
          />
          <button id="searchButton">Search</button>
          <div class="error"></div>
        </div>
        <div class="cards"></div>
      </section>
      <footer>footer &copy; Anime List</footer>
    </div>`;

// Common function
async function getData(url) {
  try {
    let res = await fetch(url);
    let data = await res.json();
    return data;
  } catch (error) {
    console.log(`Error: `, error);
  }
}

// API end points
const rootPath = `https://api.jikan.moe/v3`;
const searchAPI = `${rootPath}/search/anime?q=boruto`;

/**
 * Search API
 */
document.querySelector("#searchButton").addEventListener("click", () => {
  let searchKey = document.querySelector("#searchKey").value;
  let error = document.querySelector(".error");
  let keyLength = searchKey.length;
  let cardsHtml = "";
  if (keyLength > 3) {
    let url = `${searchAPI}${searchKey}`;
    error.innerHTML = "";
    getData(url).then((data) => {
      let { results } = data;
      results.forEach((element) => {
        cardsHtml += `<div class="card">
            <div class="card-caption">Fate kaleid liner Prisma</div>
            <div class="card-image">
              <img
                src="https://cdn.myanimelist.net/images/anime/7/81262.jpg?s=d1da71ebcaa7dfc88db25f023125e6a2"
                alt="Fate kaleid liner Prisma"
              />
            </div>
            <div class="card-description">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Distinctio cumque quas mollitia amet, voluptatum recusandae ipsum
              quisquam eum nihil! Beatae ullam autem possimus dolor quo
              adipisci. Dolorum omnis est expedita.
            </div>
          </div>`;
      });
      document.querySelector(".cards").innerHTML = cardsHtml;
    });
  } else {
    error.innerHTML = "Please enter minimux 3 charcter";
  }
});
