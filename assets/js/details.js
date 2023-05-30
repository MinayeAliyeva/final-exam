let userId = new URLSearchParams(window.location.search).get("id");
const BASE_URL = "http://localhost:3000/users";
let row = document.querySelector(".row");
async function getDetails() {
  let res = await axios(`${BASE_URL}/${userId}`);
  let obj = await res.data;
  row.innerHTML = `
  <div class="col-lg-4 col-md-6 col-sm-12">
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
                <i class="fa-solid fa-trash"></i>
                <a href=""><i class="fa-solid fa-pen"></i></a>
                <i class="fa-solid fa-heart"></i>
                <a href="">View Details</a>
              </div>
            </div>
          </div>
  `;
}
getDetails()