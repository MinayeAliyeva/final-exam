let id = new URLSearchParams(window.location.search).get("id");
let allInputs = document.querySelectorAll(".form-control");
let imgInput = document.querySelector("#imgInput");
let form = document.querySelector("form");
const BASE_URL = "http://localhost:3000/users";
async function fillInputs() {
  let res = await axios(`${BASE_URL}/${id}`);
  let obj = await res.data;
  allInputs[0].value = obj.name;
  allInputs[1].value = obj.description;
  allInputs[2].value = obj.price;
}
fillInputs();
form.addEventListener("submit", (e) => {
    e.preventDefault()
  let obj = {
    name: allInputs[0].value,
    price: allInputs[1].value,
    description: allInputs[2].value,
    img: `./assets/images/${imgInput.value.split("\\")[2]}`,
  };
  console.log(obj);
  if (id) {
    axios.patch(`${BASE_URL}/${id}`, obj);
    window.location = "index.html";
  } else {
    axios.post(`${BASE_URL}`, obj);
    window.location = "index.html";
  }
});
