var productService = new ProductService();
var allItem = [];
function getProductList() {
  productService.getList().then(function (response) {
    renderProductList(response.data);
    allItem = response.data;
  });
}
function domId(id) {
  return document.getElementById(id);
}
function renderProductList(data) {
  var content = "";

  for (var i = 0; i < data.length; i++) {
    content += `
                  <div class="card" style="color:white">
                  <div class="img-container">
                    <img id="image" class="product-img" src=${data[i].img} alt="">
                    <div class="out-of-stock-cover"><span></span></div>
                  </div>

                  <div class="details">
                    <div class="name-fav">
                      <strong id="name" class="product-name">${data[i].name}</strong>
                      <button class="heart"><i class="fas fa-heart"></i></button>
                    </div>
                    
                    <div class="wrapper">
                      <p>${data[i].screen}</p>
                      <p>${data[i].backCamera}</p>
                      <p>${data[i].frontCamera}</p>
                      <p>${data[i].desc}</p>
                      <p>${data[i].type}</p>
                    </div>
                    <div class="purchase">
                      <p id="price" class="product-price">${data[i].price}</p>
                      <span class="btn-add">
                    <div>
                  <button onclick="addProduct(${i})" class="add-btn">Add <i class="fas fa-chevron-right"></i></button>
                </div>
                </span>
                    </div>
                  </div>    
                  </div>
    `;
  }
  domId("main-cart").innerHTML = content;
}

// 4. Chọn sản phẩm
domId("chooseProduct").onchange = function (event) {
  var typeProduct = event.target.value; // Lấy giá trị của ô option

  productService.getList().then(function (response) {
    renderProductList(filterProduct(response.data, typeProduct));
  });
};

function filterProduct(data, type) {
  var result = [];
  if (type === "Chọn Sản Phẩm") return data;
  for (var i = 0; i < data.length; i++) {
    if (data[i].type.toLowerCase() === type.toLowerCase()) {
      result.push(data[i]);
    }
  }
  return result;
}

//5. Thêm sản phẩm vào giỏ hàng
var cart = [];
function addProduct(i) {
  if (checkCart(allItem[i].id) >= 0) {
    updateQuantity(checkCart(allItem[i].id));
  } else {
    var cartItem = {
      product: {
        id: 0,
        img: "",
        name: "",
        sl: 0,
        price: 0,
        money: 0,
      },
      quantity: 1,
    };
    cartItem.product.id = allItem[i].id;
    cartItem.product.img = allItem[i].img;
    cartItem.product.price = allItem[i].price;
    cartItem.product.name = allItem[i].name;
    cartItem.product.sl = 1;
    cartItem.product.money = cartItem.product.price * cartItem.product.sl;
    cart.push(cartItem);
  }
  renderCart(cart);
  saveData();
}
// Tìm vị trí
function checkCart(id) {
  let index = -1;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].product.id === id) {
      index = i;
      break;
    }
  }
  return index;
}
//Cập nhật số lượng sản phẩm
function updateQuantity(index) {
  for (let i = 0; i < cart.length; i++) {
    if (i == index) {
      cart[i].product.sl += 1;
      break;
    }
  }
}

function renderCart(cart) {
  var quantity = 0;
  for (var i = 0; i < cart.length; i++) {
    quantity += cart[i].quantity;
  }
  domId("total-qty").innerHTML = quantity;

  var content = "";
 

  for (var i = 0; i < cart.length; i++) {
    var total = cart[i].product.price * cart[i].product.sl;
    content +=
      ` 
      <tr style="color: white">     
      <td style="padding-left: 50px">${cart[i].product.id}</td>
      <td><img id="image" class="product-img" src=${cart[i].product.img} alt="" style="width: 40px; height: 40px"></td>
      <td>${cart[i].product.name}</td>
      <td>
      <div class="buttons_added">
      <input type="hidden" value= "` +
      i +
      `">
  <input onclick="giamsl(this)" class="minus is-form" type="button" value="-">
  <input aria-label="quantity" id="sl" class="input-qty" max="10" min="1" name="" type="number" style="width: 40px" value="${cart[i].product.sl}">
  <input onclick="tangsl(this)" class="plus is-form" type="button" value="+">
</div>
      </td>
      <td>${cart[i].product.price}</td>
      <td>` +
      total +
      `</td>  
      <td><button onclick = "deletesp('${cart[i].product.id}')" class="btn btn-danger">Xóa</button></td>
      </tr>
      `;
  }
  domId("myCart").innerHTML = content;
}

function showCart() {
  domId("showCart").style.display = "block";
}

function noneCart() {
  domId("showCart").style.display = "none";
}

function tangsl(x) {
  let vt = x.parentElement.children[0].value;
  let sl = x.parentElement.children[2];

  let slmoi = 0;
  for (let i = 0; i < cart.length; i++) {
    if (i == vt) {
      slmoi = cart[i].product.sl + 1;
      cart[i].product.sl += 1;
      break;
    }
  }
  sl.value = slmoi;
  renderCart(cart);
}
function giamsl(x) {
  let vt = x.parentElement.children[0].value;
  let sl = x.parentElement.children[2];

  let slmoi = 0;
  for (let i = 0; i < cart.length; i++) {
    if (i == vt) {
      slmoi = cart[i].product.sl - 1;
      cart[i].product.sl -= 1;
      break;
    }
  }
  sl.value = slmoi;
  renderCart(cart);
}
// Xóa sản phẩm ra khỏi giỏ hàng
function deletesp(sp) {
  var index = checkCart(sp);
  if (index === -1) {
    alert("Không tìm thấy sản phẩm phù hợp");
    return;
  }
  cart.splice(index, 1);
  renderCart(cart);
  saveData();
}
// Clear giỏ hàng về mảng rỗng
function clearCart() {
  var nCart = cart;
  nCart = [];
  domId("myCart").innerHTML = nCart;
  domId("total-qty").innerHTML = 0;
}

// Lưu dữ liệu vào localStorage
function saveData() {
  var cartListJSON = JSON.stringify(cart);
  localStorage.setItem("cart", cartListJSON);
}
// Đưa dữ liệu cũ trong localStorage lên màn hình
function getData() {
  cart = JSON.parse(localStorage.getItem("cart"));

  // Nếu localStorage null (ko có ds) thì ko làm gì cả.
  if (!cart)return;
  renderCart(cart);
}

window.onload = function () {
  getProductList();
  getData();
};
