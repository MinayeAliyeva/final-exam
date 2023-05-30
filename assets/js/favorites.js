const FAV_URL = "http://localhost:3000/favorites";
let mainRow = document.querySelector(".mainRow2");
async function getFavs() {
  let res = await axios(`${FAV_URL}`);
  let data = await res.data;
  data.forEach((obj) => {
    mainRow.innerHTML += `
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
                  <i class="fa-solid fa-trash" onclick=deleteFav(${obj.id})></i>
                </div>
              </div>
            </div> 
    `;
  });
}
getFavs();
//delete fav
async function deleteFav(id) {
  await axios.delete(`${FAV_URL}/${id}`);
}
