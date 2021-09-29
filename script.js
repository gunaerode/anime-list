console.log("******************");
console.log("Welcome to AnimeListing");
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
      <footer>
      Footer &copy; Anime Listing 2021 </footer>
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
const searchAPI = `${rootPath}/search/anime?q=`;

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
            <div class="card-caption"><a target="_blank" href="${
              element.url
            }">${element.title}</a></div>
            <div class="card-image">
              <a  target="_blank" href="${element.url}"><img
                src="${element.image_url}"
                alt="Fate kaleid liner Prisma"
              /></a>
            </div>
            <div class="card-description">
              <p>Start Date:${new Date(element.start_date)}</p>
              <p>End Date:${new Date(element.end_date)}</p>
              <p>Score:${element.score}</p>
              <p>Type:${element.type}</p>
            </div>
          </div>`;
      });
      document.querySelector(".cards").innerHTML = cardsHtml;
    });
  } else {
    error.innerHTML = "Please enter minimux 3 charcter";
  }
});

// Enter key click
document.querySelector("#searchKey").addEventListener("keyup", (e) => {
  if (e.keyCode == 13) document.querySelector("#searchButton").click();
});
