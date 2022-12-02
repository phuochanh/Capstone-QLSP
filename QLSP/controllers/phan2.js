let productServicePhan2 = new ProductServicePhan2();
function domId(id) {
  return document.getElementById(id);
}
function getProductList() {
  productServicePhan2.getList().then(function (response) {
    renderProductList(response.data);
  });
}

function renderProductList(data) {
  let content = "";
  for (let i = 0; i < data.length; i++) {
    content += `
        <tr>
        <td>${i + 1}</td>
        <td>${data[i].name}</td>
        <td>${data[i].price}</td>
        <td>${data[i].image}</td>
        <td>${data[i].description}</td>
        <td>
        <button onclick="deleteProduct(${
          data[i].id
        })" class="btn btn-danger">XÓA</button>
        <button data-toggle="modal"
        data-target="#myModal" class="btn btn-info" onclick="openUpdateModal(${
          data[i].id
        })" >CẬP NHẬT</button>
        </td>
        </tr>
        `;
  }
  domId("tblDanhSachSP").innerHTML = content;
}

domId("btnThemSP").onclick = function () {
  document.querySelector(".modal-title").innerHTML = "Thêm sản phẩm";
  document.querySelector(".modal-footer").innerHTML =
    "<button onclick='addProduct()' class='btn btn-primary'>THÊM</button>";
};

function addProduct() {
  let isVaid = validationForm();
  if (!isVaid) return;
  let name = domId("TenSP").value;
  let price = domId("GiaSP").value;
  let image = domId("HinhSP").value;
  let description = domId("MotaSP").value;
  let product = new Product(name, price, image, description);

  productServicePhan2.addProduct(product).then(function () {
    alert("Thêm sản phẩm thành công.");
    getProductList();
  });
}

function deleteProduct(id) {
  productServicePhan2.deleteProduct(id).then(function () {
    alert("Xóa sản phẩm thành công");
    getProductList();
  });
}

function openUpdateModal(id) {
  document.querySelector(".modal-title").innerHTML = "Cập nhật sản phẩm";
  document.querySelector(
    ".modal-footer"
  ).innerHTML = `<button onclick='updateProduct(${id})' class='btn btn-primary'>Cập nhật</button>`;

  productServicePhan2.getById(id).then(function (response) {
    domId("TenSP").value = response.data.name;
    domId("GiaSP").value = response.data.price;
    domId("HinhSP").value = response.data.image;
    domId("MotaSP").value = response.data.description;
  });
}

function updateProduct(id) {
  let isVaid = validationForm();
  if (!isVaid) return;
  let name = domId("TenSP").value;
  let price = domId("GiaSP").value;
  let image = domId("HinhSP").value;
  let description = domId("MotaSP").value;
  let product = new Product(name, price, image, description);

  productServicePhan2.updateProduct(id, product).then(function () {
    document.querySelector(".close").click();
    alert("Cập nhật sản phẩm thành công");
    getProductList();
  });
}

window.onload = function () {
  getProductList();
};

//VALIDATION
function validationForm() {
  let name = domId("TenSP").value;
  let price = domId("GiaSP").value;
  let image = domId("HinhSP").value;
  let description = domId("MotaSP").value;
  let isVaid = true;
  isVaid &= required(name, "check1") && checkName(name, "check1");
  isVaid &= required(price, "check2") && checkPrice(price, "check2");
  isVaid &= required(image, "check3");
  isVaid &= required(description, "check4");
  return isVaid;
}

function required(value, spanId) {
  if (value.length === 0) {
    domId(spanId).innerHTML = "*Trường này bắt buộc nhập.";
    return false;
  }
  domId(spanId).innerHTML = "";
  return true;
}

function checkName(value, spanId) {
  let pattern = /^[A-z ]+[\d ]+$/g;

  if (pattern.test(value)) {
    domId(spanId).innerHTML = "";
    return true;
  }
  domId(spanId).innerHTML = "*Chỉ chấp nhận từ A-z + số";
  return false;
}

function checkPrice(value, spanId) {
  let pattern = /^\d+$/;
  if (pattern.test(value)) {
    if (value >= 1000 && value <= 10000) {
      domId(spanId).innerHTML = "";
      return true;
    }
  }
  domId(spanId).innerHTML = "*Chỉ chấp nhận giá từ 1000 - 10 000.";
  return false;
}
