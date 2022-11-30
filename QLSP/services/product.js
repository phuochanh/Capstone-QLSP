function ProductService(){
    this.getList = function(){
        return axios ({
            url: "https://6366210f79b0914b75c9dba5.mockapi.io/products",
            method: "GET",
        });
    };
}

function ProductServicePhan2(){
    this.getList = function(){
        return axios({
            url: "https://6366210f79b0914b75c9dba5.mockapi.io/productsPhan2",
            method: "GET",
        });
    };

    this.addProduct = function (data) {
        return axios({
          url: "https://6366210f79b0914b75c9dba5.mockapi.io/productsPhan2",
          method: "POST",
          data: data,
        });
    };

    this.deleteProduct = function (id) {
        return axios({
          url: `https://6366210f79b0914b75c9dba5.mockapi.io/productsPhan2/${id}`,
          method: "DELETE",
        });
    };

    this.getById = function (id) {
        return axios({
          url: `https://6366210f79b0914b75c9dba5.mockapi.io/productsPhan2/${id}`,
          method: "GET",
        });
      };

    this.updateProduct = function (id, data) {
        return axios({
          url: `https://6366210f79b0914b75c9dba5.mockapi.io/productsPhan2/${id}`,
          method: "PUT",
          data: data,
        });
    }; 
}