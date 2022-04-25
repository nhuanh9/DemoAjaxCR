let content = document.getElementById('content')
let listProduct = document.getElementById('list-product')
let API = "https://website-3h.herokuapp.com/api/v1"
let listImageLogo = ["channel.png", "nike.png", "hermes.png", "gucci.jpeg", "adidas.png", "hm.jpeg", "Levi's.svg", "puma.jpeg", "dior.jpeg", "lv.png"];

function loadHomeContent() {
    let html = `
        <div class="col-12" >
        <h2 style="text-align: center; margin-top: 20px" >Product List</h2>
        
        <h4 style="text-align: center; cursor: pointer; color: blue" onclick="showAddProductForm()">Add new product</h4>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Image</th>
                  <th scope="col">Name</th>
                  <th scope="col">Brand Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Short Description</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody id="list-product">
               
              </tbody>
            </table>
        </div>`
    document.getElementById('content').innerHTML = html;
    loadListProduct();
}

function loadListProduct() {
    $.ajax({
        type: "GET",
        url: API + "/products?size=50",
        success: function (data) {
            console.log(data.content)
            let html1 = "";
            for (let i = 0; i < data.content.length; i++) {
                if (data.content[i].state == true) {

                    html1 += `<tr>
                          <th scope="row">
                              <img src="${data.content[i].image}" alt="" style="width: 150px">
                          </th>
                          <td>${data.content[i].name}</td>
                          <td>${data.content[i].brandName}</td>
                          <td>${data.content[i].price}</td>
                          <td>${data.content[i].shortDescription}</td>
                          <td><button class="btn btn-outline-secondary mr-2" onclick="showEditProduct('${data.content[i].code}')">Detail</button><Button class="btn btn-outline-danger" onclick="deleteProduct(${data.content[i].id},'${data.content[i].name}')">Del</Button></td></tr>`
                }
            }
            document.getElementById('list-product').innerHTML = html1;
        }, error: function (error) {
            console.log(error);
        }
    })
}

function showOneProduct() {
    let html = `<div class="col-12 p-3">
                    <h1>Đang show one nhé!</h1>
                    <a onclick="loadHomeContent()">Quay về</a>
                </div>`;
    document.getElementById('content').innerHTML = html;
}

function showEditProduct(id) {
    console.log(id)
    $.ajax({
        type: "GET",
        url: "https://website-3h.herokuapp.com/api/v1/products/" + id,
        success: function (data) {
            let html = "<div class='offset-3 col-6 mb-3'><h2 style=\"text-align: center\">Detail</h2>" +
                "<form id='product'>" +
                "  <center><img src='" + data.image + "' alt=''></center>\n" +
                "  <div class=\"form-group row mt-4\">\n" +
                "    <label for=\"name\" class=\"col-sm-4 col-form-label\">Name</label>\n" +
                "    <div class=\"col-sm-8\">\n" +
                "      <input type=\"text\" class=\"form-control\" name=\"name\" value='" + data.name + "'>\n" +
                "    </div>\n" +
                "  </div>\n" +
                "  <div class=\"form-group row\">\n" +
                "    <label for=\"age\" class=\"col-sm-4 col-form-label\">Price</label>\n" +
                "    <div class=\"col-sm-8\">\n" +
                "      <input type=\"text\" class=\"form-control\" name=\"price\" value='" + data.price + "'>\n" +
                "    </div>\n" +
                "  </div>\n" +
                "  <div class=\"form-group row\">\n" +
                "    <label for=\"score\" class=\"col-sm-4 col-form-label\">Competitive</label>\n" +
                "    <div class=\"col-sm-8\">\n" +
                "      <input type=\"text\" class=\"form-control\" name=\"competitive\" value='" + data.competitive + "'>\n" +
                "    </div>\n" +
                "  </div>\n" +
                "  <div class=\"form-group row\">\n" +
                "    <label for=\"score\" class=\"col-sm-4 col-form-label\">Short Description</label>\n" +
                "    <div class=\"col-sm-8\">\n" +
                "      <input type=\"text\" class=\"form-control\" name=\"shortDescription\" value='" + data.shortDescription + "'>\n" +
                "    </div>\n" +
                "  </div>\n" +
                "  <div class=\"form-group row\">\n" +
                "    <label for=\"score\" class=\"col-sm-4 col-form-label\">Description</label>\n" +
                "    <div class=\"col-sm-8\">\n" +
                "      <input type=\"text\" class=\"form-control\" name=\"description\" value='" + data.description + "'>\n" +
                "    </div>\n" +
                "  </div>\n" +
                "  <div class=\"form-group row\">\n" +
                "    <label for=\"score\" class=\"col-sm-4 col-form-label\">Brand Name</label>\n" +
                "    <div class=\"col-sm-8\">\n" +
                "      <input type=\"text\" class=\"form-control\" value='" + data.brandName + "'>\n" +
                "    </div>\n" +
                "  </div>\n" +
                "  <div class=\"form-group row\">\n" +
                "    <label for=\"score\" class=\"col-sm-4 col-form-label\">Category Name</label>\n" +
                "    <div class=\"col-sm-8\">\n" +
                "      <input type=\"text\" class=\"form-control\" value='" + data.categoryName + "'>\n" +
                "    </div>\n" +
                "  </div>\n" +
                "  <div class=\"form-group row\">\n" +
                "    <label for=\"score\" class=\"col-sm-4 col-form-label\">Colors</label>\n" +
                "    <div class=\"col-sm-8\">\n" +
                "      <input type=\"text\" class=\"form-control\" value='" + data.colors.join(', ') + "'>\n" +
                "    </div>\n" +
                "  </div>\n" +
                "  <div class=\"form-group row\">\n" +
                "    <label for=\"score\" class=\"col-sm-4 col-form-label\">Size</label>\n" +
                "    <div class=\"col-sm-8\">\n" +
                "      <input type=\"text\" class=\"form-control\" value='" + data.sizes.join(', ') + "'>\n" +
                "    </div>\n" +
                "  </div>\n" +
                "  <div class=\"row\">\n" +
                "    <div class=\"offset-5 col-sm-2\">\n" +
                "       <button class=\"btn btn-outline-primary mt-2\" type='button' onclick=\"saveProduct(" + data.id + ", '" + data.code + "')\">Change</button>" +
                "    </div>\n" +
                "  </div>\n" +
                "</form>" +
                "</div>"
            content.innerHTML = html
        }
    })
}

function saveProduct(id, code) {

    let formData = new FormData(document.getElementById('product'));
    formData.append('brand', '1');
    formData.append('category', '1');
    formData.append('colors', [1, 2]);
    formData.append('sizes', [3, 4]);
    formData.append('image', '1');
    formData.append('state', 'true');
    formData.append('id', id);
    formData.append('code', code);
    $.ajax({
        type: 'PUT',
        url: API + '/products',
        data: formData,
        cache: false,
        processData: false,
        contentType: 'form-data',
        mimeType: 'form-data',
        success: loadHomeContent,
        error: function (error) {
            console.log(error)
            for (var pair of formData.entries()) {
                console.log(pair[0] + ', ' + pair[1]);
            }
        }
    })
}

function showAddProductForm() {

    let html = "<div class='offset-3 col-6 mb-3 mt-3'><h2 style=\"text-align: center\">Add new product</h2>" +
        "<form id='product'>" +
        "  <div class=\"form-group row mt-4\">\n" +
        "    <label for=\"name\" class=\"col-sm-4 col-form-label\">Name</label>\n" +
        "    <div class=\"col-sm-8\">\n" +
        "      <input type=\"text\" class=\"form-control\" name=\"name\">\n" +
        "    </div>\n" +
        "  </div>\n" +
        "  <div class=\"form-group row\">\n" +
        "    <label for=\"age\" class=\"col-sm-4 col-form-label\">Price</label>\n" +
        "    <div class=\"col-sm-8\">\n" +
        "      <input type=\"text\" class=\"form-control\" name=\"price\">\n" +
        "    </div>\n" +
        "  </div>\n" +
        "  <div class=\"form-group row\">\n" +
        "    <label for=\"score\" class=\"col-sm-4 col-form-label\">Competitive</label>\n" +
        "    <div class=\"col-sm-8\">\n" +
        "      <input type=\"text\" class=\"form-control\" name=\"competitive\">\n" +
        "    </div>\n" +
        "  </div>\n" +
        "  <div class=\"form-group row\">\n" +
        "    <label for=\"score\" class=\"col-sm-4 col-form-label\">Short Description</label>\n" +
        "    <div class=\"col-sm-8\">\n" +
        "      <input type=\"text\" class=\"form-control\" name=\"shortDescription\">\n" +
        "    </div>\n" +
        "  </div>\n" +
        "  <div class=\"form-group row\">\n" +
        "    <label for=\"score\" class=\"col-sm-4 col-form-label\">Description</label>\n" +
        "    <div class=\"col-sm-8\">\n" +
        "      <input type=\"text\" class=\"form-control\" name=\"description\">\n" +
        "    </div>\n" +
        "  </div>\n" +
        "  <div class=\"row\">\n" +
        "    <div class=\"offset-6 col-sm-2\">\n" +
        "       <button class=\"btn btn-outline-primary mt-2\" type='button' onclick=\"addProduct()\">Add</button>" +
        "    </div>\n" +
        "  </div>\n" +
        "</form>" +
        "</div>"
    content.innerHTML = html;
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/classes",
        success: function (data) {
            let html = ``;
            for (let i = 0; i < data.length; i++) {
                html += `<option value="${data[i].id}"> ${data[i].name}</option>`
            }
            html += ``;
            document.getElementById('clazz').innerHTML = html;
        }
    })

}

function addProduct() {
    let formData = new FormData(document.getElementById('product'));
    formData.append('brand', '1');
    formData.append('category', '1');
    formData.append('colors', [1, 2]);
    formData.append('sizes', [3, 4]);
    formData.append('image', '1');
    $.ajax({
        type: 'POST',
        url: API + '/products',
        data: formData,
        contentType: 'form-data',
        mimeType: 'form-data',
        processData: false,
        success: loadHomeContent,
        error: function (error) {
            console.log(error)
            for (var pair of formData.entries()) {
                console.log(pair[0] + ', ' + pair[1]);
            }
        }
    })
}

function deleteProduct(id, name) {
    if (confirm("Do you want to delete " + name + "???")) {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            type: 'Delete',
            url: API + '/products/' + id,
            success: loadHomeContent,
            error: function (error) {
                console.log(error)
            }
        })
    }
}

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

function loadCategoryManagerContent() {
    let html = `
        <div class="col-12" >
        <h2 style="text-align: center; margin-top: 20px" >Category List</h2>
        
        <h4 style="text-align: center; cursor: pointer; color: blue"  onclick="showAddForm('Category')">Add new category</h4>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Index</th>
                  <th scope="col">Name</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody id="list-product">
               
              </tbody>
            </table>
        </div>`
    document.getElementById('content').innerHTML = html;
    loadListCategory();
}

function loadListCategory() {
    $.ajax({
        type: "GET",
        url: API + "/categories",
        success: function (data) {
            let html1 = "";
            for (let i = 0; i < data.length; i++) {
                if (data[i].state == true) {

                    html1 += `<tr>
                          <td>${i + 1}</td>
                          <td>${data[i].name}</td>
                          <td><Button class="btn btn-outline-danger" onclick="deleteCategory(${data[i].id},'${data[i].name}')">Del</Button></td></tr>`
                }
            }
            document.getElementById('list-product').innerHTML = html1;
        }, error: function (error) {
            console.log(error);
        }
    })
}

function deleteCategory(id, name) {
    if (confirm("Do you want to delete " + name + "???")) {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            type: 'Delete',
            url: API + '/categories/' + id,
            success: loadHomeContent,
            error: function (error) {
                console.log(error)
            }
        })
    }
}

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

function loadBrandManagerContent() {
    let html = `
        <div class="col-12" >
        <h2 style="text-align: center; margin-top: 20px" >Brand List</h2>
        
        <h4 style="text-align: center; cursor: pointer; color: blue"  onclick="showAddForm('Brand')">Add new brand</h4>
            <table class="table table-striped">
              <thead>
                <tr>
                <th scope="col">Image</th>
                  <th scope="col">Index</th>
                  <th scope="col">Name</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody id="list-product">
               
              </tbody>
            </table>
        </div>`
    document.getElementById('content').innerHTML = html;
    loadListBrand();
}

function loadListBrand() {
    $.ajax({
        type: "GET",
        url: API + "/brands",
        success: function (data) {
            let html1 = "";
            for (let i = 0; i < data.length; i++) {
                if (data[i].state == true) {

                    html1 += `<tr>

                          <th>
                              <img src="${"image/" + listImageLogo[i]}" alt="" style="width: 150px">
                          </th>
                          <td>${i + 1}</td>
                          <td>${data[i].name}</td>
                          <td><Button class="btn btn-outline-danger" onclick="deleteBrand(${data[i].id},'${data[i].name}')">Del</Button></td></tr>`
                }
            }
            document.getElementById('list-product').innerHTML = html1;
        }, error: function (error) {
            console.log(error);
        }
    })
}

function deleteBrand(id, name) {
    if (confirm("Do you want to delete " + name + "???")) {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            type: 'Delete',
            url: API + '/colors/' + id,
            success: loadHomeContent,
            error: function (error) {
                console.log(error)
            }
        })
    }
}

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

function loadColorManagerContent() {
    let html = `
        <div class="col-12" >
        <h2 style="text-align: center; margin-top: 20px" >Color List</h2>
        
        <h4 style="text-align: center; cursor: pointer; color: blue" onclick="showAddForm('Color')">Add new color</h4>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Index</th>
                  <th scope="col">Name</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody id="list-product">
               
              </tbody>
            </table>
        </div>`
    document.getElementById('content').innerHTML = html;
    loadListColor();
}

function loadListColor() {
    $.ajax({
        type: "GET",
        url: API + "/colors",
        success: function (data) {
            let html1 = "";
            for (let i = 0; i < data.length; i++) {
                if (data[i].state == true) {

                    html1 += `<tr>
                          <td>${i + 1}</td>
                          <td>${data[i].name}</td>
                          <td><Button class="btn btn-outline-danger" onclick="deleteBrand(${data[i].id},'${data[i].name}')">Del</Button></td></tr>`
                }
            }
            document.getElementById('list-product').innerHTML = html1;
        }, error: function (error) {
            console.log(error);
        }
    })
}

function deleteColor(id, name) {
    if (confirm("Do you want to delete " + name + "???")) {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            type: 'Delete',
            url: API + '/colors/' + id,
            success: loadHomeContent,
            error: function (error) {
                console.log(error)
            }
        })
    }
}

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

function loadSizeManagerContent() {
    let html = `
        <div class="col-12" >
        <h2 style="text-align: center; margin-top: 20px" >Size List</h2>
        
        <h4 style="text-align: center; cursor: pointer; color: blue" onclick="showAddForm('Size')">Add new size</h4>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Index</th>
                  <th scope="col">Name</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody id="list-product">
               
              </tbody>
            </table>
        </div>`
    document.getElementById('content').innerHTML = html;
    loadListSize();
}

function loadListSize() {
    $.ajax({
        type: "GET",
        url: API + "/sizes",
        success: function (data) {
            console.log(data)
            let html1 = "";
            for (let i = 0; i < data.content.length; i++) {

                html1 += `<tr>
                          <td>${i + 1}</td>
                          <td>${data.content[i].name}</td>
                          <td><Button class="btn btn-outline-danger" onclick="deleteSize(${data.content[i].id},'${data.content[i].name}')">Del</Button></td></tr>`
            }
            document.getElementById('list-product').innerHTML = html1;
        }, error: function (error) {
            console.log(error);
        }
    })
}

function deleteSize(id, name) {
    if (confirm("Do you want to delete " + name + "???")) {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            type: 'Delete',
            url: API + '/sizes/' + id,
            success: loadHomeContent,
            error: function (error) {
                console.log(error)
            }
        })
    }
}

function showAddForm(name) {
    let html = "<div class='offset-3 col-6 mb-3 mt-3'><h2 style=\"text-align: center\">Add new " + name + "</h2>" +
        "<form id='product'>" +
        "  <div class=\"form-group row mt-4\">\n" +
        "    <label for=\"name\" class=\"col-sm-4 col-form-label\">Name</label>\n" +
        "    <div class=\"col-sm-8\">\n" +
        "      <input type=\"text\" class=\"form-control\" name=\"name\">\n" +
        "    </div>\n" +
        "  </div>\n" +
        "  <div class=\"row\">\n" +
        "    <div class=\"offset-6 col-sm-2\">\n" +
        "       <button class=\"btn btn-outline-primary mt-2\" type='button' onclick=\"addProduct()\">Add</button>" +
        "    </div>\n" +
        "  </div>\n" +
        "</form>" +
        "</div>"
    content.innerHTML = html;
}
