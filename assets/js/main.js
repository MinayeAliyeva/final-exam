const BASE_URL = "http://localhost:3000/users";
let arrCopy = [];
let filteredData = [];
let mainRow = document.querySelector(".mainRow");
let num = 3;
let searchInput = document.querySelector("#searchInput");
async function fillCards() {
  let res = await axios(BASE_URL);
  let data = res.data;

  arrCopy = data;
  filteredData =
    filteredData.length || searchInput.value
      ? filteredData.slice(0, num)
      : data.slice(0, num);

  mainRow.innerHTML = "";
  filteredData.forEach((obj) => {
    mainRow.innerHTML += `
        <div  class="col-lg-4 col-md-6 col-sm-12">
            <div class="card">
              <div class="img">
                <img src="${obj.img}" alt="" />
              </div>
              <div class="text">
                <h5>${obj.name}</h5>
                <p>
                ${obj.description}
                </p>
                <span><i>Age:${obj.price}</i></span>
              </div>
              <div class="actions">
                <i class="fa-solid fa-trash" onclick=delFun(${obj.id})></i>
                <a href="edit-post.html?id=${obj.id}"><i class="fa-solid fa-pen" ></i></a>
                <i class="fa-solid fa-heart" onclick=addFav(${obj.id})></i>
                <a href="details.html?id=${obj.id}">View Details</a>
              </div>
            </div>
          </div>
        `;
  });
}
fillCards();
//search
searchInput.addEventListener("input", (e) => {
  console.log(e.target.value);
  console.log(arrCopy);
  filteredData = arrCopy
    .filter((obj) => {
      return obj.name
        .toLocaleLowerCase()
        .includes(e.target.value.toLocaleLowerCase());
    })
    .slice(0, num);
  fillCards();
});

//sort
let sortBtn = document.querySelector(".sortBtn");
sortBtn.addEventListener("click", () => {
  if (sortBtn.innerHTML == "Ascending") {
    filteredData = filteredData.slice(0, num).sort((a, b) => b.price - a.price);
    sortBtn.innerHTML = "Descending";
    fillCards();
  } else if (sortBtn.innerHTML == "Descending") {
    filteredData = filteredData.slice(0, num).sort((a, b) => a.price - b.price);
    sortBtn.innerHTML = "Default";
    fillCards();
  } else {
    filteredData = arrCopy;
    fillCards();
    sortBtn.innerHTML = "Ascending";
  }
});
//delete
async function delFun(id) {
  await axios.delete(`${BASE_URL}/${id}`);
  filteredData = arrCopy
    .filter((obj) => {
      obj.id != id;
    })
    .slice(0, num);
}
//loadmore
let loadMore = document.querySelector(".loadMore");
loadMore.addEventListener("click", (e) => {
  num += 3;
  filteredData = arrCopy.slice(0, num).filter((obj) => {
    return obj.name
      .toLocaleLowerCase()
      .includes(e.target.value.toLocaleLowerCase());
  });
  console.log(filteredData);
  fillCards();
});
//add fav
const FAV_URL = "http://localhost:3000/favorites";
async function addFav(id) {
  let res = await axios(`${BASE_URL}/${id}`);
  let obj = await res.data;
  window.location = "favorites.html";
  axios.post(`${FAV_URL}`, obj);
}
let menuBar = document.querySelector("#menuBar");
let burgerMenu = document.querySelector(".burger-menu");
menuBar.addEventListener("click", () => {
  burgerMenu.classList.toggle("show");
  menuBar.classList.toggle("fa-bars")
    ? (menuBar.classList = "fa-solid fa-xmark")
    : (menuBar.classList = "fa-solid fa-bars");
});
