let nav_cart = document.querySelector(".p1");
let overlay = document.querySelector(".overlay");
let sideBar = document.querySelector(".side-bar");
let sideBar2 = document.querySelector(".sideBar2");

document.querySelector(".xmark").addEventListener("click", () => {
  sideBar.classList.remove("sidebar-show");
  overlay.classList.remove("overlay-show");
});
document.querySelector(".x-mark").addEventListener("click", () => {
  sideBar2.classList.remove("sidebar-show");
  overlay.classList.remove("overlay-show");
});
overlay.addEventListener("click", () => {
  sideBar.classList.remove("sidebar-show");
  sideBar2.classList.remove("sidebar-show");
  overlay.classList.remove("overlay-show");
});

nav_cart.addEventListener("click", () => {
  if (sideBar.classList.contains("sidebar-show")) {
    sideBar.classList.remove("sidebar-show");
    overlay.classList.remove("overlay-show");
  }
  sideBar.classList.add("sidebar-show");
  overlay.classList.add("overlay-show");
});
document.querySelector(".fa-bars").addEventListener("click", () => {
  if (sideBar2.classList.contains("sidebar-show")) {
    sideBar2.classList.remove("sidebar-show");
    overlay.classList.remove("overlay-show");
  }
  sideBar2.classList.add("sidebar-show");
  overlay.classList.add("overlay-show");
});
document.querySelector(".shopping").addEventListener("click", () => {
  if (sideBar.classList.contains("sidebar-show")) {
    sideBar.classList.remove("sidebar-show");
    overlay.classList.remove("overlay-show");
  }
  sideBar.classList.add("sidebar-show");
  overlay.classList.add("overlay-show");
});
let head_leftbtn = document.querySelector(".head-leftbtn");
let head_rightBtn = document.querySelector(".head-rightbtn");
let head_slides = document.querySelectorAll(".head-box1");
let head_slider = document.querySelector(".head-slider");
let customIndex = 0;
let interv = setInterval(updates, 3000);
head_leftbtn.addEventListener("click", function () {
  customIndex--;
  if (customIndex < 0) {
    customIndex = head_slides.length - 1;
  }
  clearInterval(interv);
  interv = setInterval(updates, 3000);
  head_slider.style.marginLeft = ` -${customIndex * 100}% `;
});

function updates() {
  customIndex++;
  if (customIndex > head_slides.length - 1) {
    customIndex = 0;
  }
  head_slider.style.marginLeft = ` -${customIndex * 100}% `;
}

head_rightBtn.addEventListener("click", function () {
  customIndex++;
  if (customIndex > head_slides.length - 1) {
    customIndex = 0;
  }
  clearInterval(interv);
  interv = setInterval(updates, 2000);
  head_slider.style.marginLeft = ` -${customIndex * 100}% `;
});
const product_container = document.querySelector(".product-container");
const product_list = document.querySelectorAll(".product-list");
const product_box = document.querySelectorAll(".product-box");
let array = [
  {
    img_src: "./images/thumb-bananas.png",
    name: "Sunstar Fresh Banana",
    price: 20.0,
    id: 1,
  },
  {
    img_src: "./images/thumb-avocado.png",
    name: "Sunstar Fresh Avocado",
    price: 33.0,
    id: 2,
  },
  {
    img_src: "./images/thumb-biscuits.png",
    name: "Sunstar Fresh Biscuits",
    price: 65.0,
    id: 3,
  },
  {
    img_src: "./images/thumb-cucumber.png",
    name: "Sunstar Fresh Cucumber",
    price: 25.0,
    id: 4,
  },
  {
    img_src: "./images/thumb-herb.jpg",
    name: "Sunstar Fresh Herb",
    price: 45.0,
    id: 5,
  },
  {
    img_src: "./images/thumb-honey.jpg",
    name: "Sunstar Fresh Honey",
    price: 30.0,
    id: 6,
  },
  {
    img_src: "./images/thumb-junk.jpg",
    name: "Sunstar Fresh Junk",
    price: 39.0,
    id: 7,
  },
  {
    img_src: "./images/thumb-milk.png",
    name: "Sunstar Fresh Milk",
    price: 50.0,
    id: 8,
  },
];

product_list.forEach((ele) => {
  ele.addEventListener("click", function () {
    product_list.forEach((ele) => {
      ele.classList.remove("prodlist-show");
    });
    ele.classList.add("prodlist-show");
  });
});

product_list.forEach((ele) => {
  ele.addEventListener("click", function () {
    let filteredArray;

    product_container.innerHTML = "";

    if (ele.innerHTML == "ALL") {
      filteredArray = array.filter((ele, idx) => idx < array.length);
    } else if (ele.innerHTML == "FRUITS VEGES") {
      filteredArray = array.filter((ele, idx) => idx > 3 && idx < 7);
    } else if (ele.innerHTML == "JUICES") {
      filteredArray = array.filter((ele, idx) => idx > 3);
    }

    getting(filteredArray);
    update();
  });
});
getting();
function getting(filt) {
  if (filt) {
    filt.forEach((ele) => {
      product_container.innerHTML += `
      <div class="product-box product-scale">
      <div class="product-imgbox">
          <i class="fa-regular fa-heart heart"></i>
          <img src="${ele.img_src}" class="product-img" alt="">
      </div>
      <p class="p9">${ele.name}</p>
      <p class="p10">${ele.price}.00$</p>
      <button class="product-cartbtn" onclick="addToCart(${ele.id})">Add to Cart</button>
  </div>`;
    });
  } else {
    array.forEach((ele) => {
      product_container.innerHTML += `
      <div class="product-box product-scale">
      <div class="product-imgbox">
          <i class="fa-regular fa-heart heart"></i>
          <img src="${ele.img_src}" class="product-img" alt="">
      </div>
      <p class="p9">${ele.name}</p>
      <p class="p10">${ele.price}.00$</p>
      <button class="product-cartbtn" onclick="addToCart(${ele.id})">Add to Cart</button>
  </div> `;
    });
  }
}
let cartbtn = document.querySelector(".cart-listbox");
let cartItems = [];
let product_quantity = 0;

function addToCart(productId) {
  let product = array.find((item) => item.id === productId);

  if (product) {
    let existingCartItem = cartItems.find((item) => item.id === product.id);
    if (existingCartItem) {
      existingCartItem.quantity++;
      existingCartItem.totalprice += product.price;
      updateCartDisplay();
    } else {
      cartItems.push({
        ...product,
        quantity: 1,
        totalprice: product.price,
      });
      updateCartDisplay();
    }
  }
}

function updateCartDisplay() {
  cartbtn.innerHTML = "";
  document.querySelector(".p3").innerHTML = cartItems.length;
  document.querySelector(".cart-counter").innerHTML = cartItems.length;
  cartItems.forEach((item, index) => {
    const cartItem = document.createElement("li");
    cartItem.style.listStyle = "none";
    cartItem.innerHTML = `<div class="cart-listbox1"><i class="fa-solid fa-xmark remove" onClick="removeCartItem(${index})"></i><img class="cart-img" src="${item.img_src}">${item.name} - Quantity: <button class="minus-btn" onclick="decrementQuantity(${index})"><i class="fa-solid fa-minus"></i></button>${item.quantity}<button class="plus-btn" onclick="incrementQuantity(${index})"><i class="fa-solid fa-plus"></i></button> - Total Price: $${item.totalprice};</div>`;
    cartbtn.appendChild(cartItem);
  });
}

function incrementQuantity(index) {
  cartItems[index].quantity++;
  cartItems[index].totalprice += cartItems[index].price;
  updateCartDisplay();
}

function decrementQuantity(index) {
  if (cartItems[index].quantity > 1) {
    cartItems[index].quantity--;
    cartItems[index].totalprice -= cartItems[index].price;
    updateCartDisplay();
  }
}
function removeCartItem(index) {
  // Remove the item from the cart array
  cartItems.splice(index, 1);
  updateCartDisplay();
}
document.querySelector(".fa-user").addEventListener("click", function () {
  document.querySelector(".user-box").classList.toggle("user-boxshow");
});
update();

function update() {
  let like_div = document.querySelectorAll(".heart");
  let sec3_overlay = document.querySelector(".product-overlay");
  let sec3_div = document.querySelector(".product-div");
  let create_img = document.querySelector(".product-filtimg");
  like_div.forEach((ele) => {
    ele.addEventListener("click", function () {
      create_img.src = ele.nextElementSibling.src;
      document.querySelector(".hvr-name").innerHTML =
        ele.parentElement.nextElementSibling.innerHTML;
      document.querySelector(".hvr-price").innerHTML =
        ele.parentElement.nextElementSibling.nextElementSibling.innerHTML;
      sec3_overlay.classList.add("product-overlayshow");
      sec3_div.classList.add("product-divshow");
      console.log(ele.parentElement.nextElementSibling.innerHTML, "hello");
    });
  });
  document.querySelector(".cross-mark").addEventListener("click", function () {
    sec3_overlay.classList.remove("product-overlayshow");
    sec3_div.classList.remove("product-divshow");
  });
}
function loading() {
  document.querySelector(".loader-container").classList.remove("loader-hidden");
  document.querySelector(".main").classList.add("main-hidden");
}
function complete() {
  document.querySelector(".loader-container").classList.add("loader-hidden");
  document.querySelector(".main").classList.remove("main-hidden");
}
function newQuote() {
  loading();
  // Pick a random quote from array
  setTimeout(function () {
    complete();
  }, 3000);
}
newQuote();
window.addEventListener("scroll", () => {
  let hight = (window.innerHeight / 5) * 4;
  console.log(hight, "kkk");
  document.querySelectorAll(".anim").forEach((ele) => {
    let topvalue = ele.getBoundingClientRect().top;
    console.log(topvalue);
    if (topvalue < hight) {
      ele.classList.add("anim-show");
    } else {
      ele.classList.remove("anim-show");
    }
  });
});

