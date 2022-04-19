let content = document.getElementById('content')
let listProduct = document.getElementById('list-product')
let API = "https://website-3h.herokuapp.com/api/v1"

function loadHomeContent() {
    let html = `
        <div class="col-12" >
        <h2 style="text-align: center" >Product List</h2>
        
        <h4 style="text-align: center; cursor: pointer; color: blue" onclick="showAddForm()">Add new product</h4>
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
                          <td><button class="btn btn-outline-secondary mr-2" onclick="showEdit('${data.content[i].code}')">Detail</button><Button class="btn btn-outline-danger" onclick="del(${data.content[i].id},'${data.content[i].name}')">Del</Button></td></tr>`
                }
            }
            document.getElementById('list-product').innerHTML = html1;
        }, error: function (error) {
            console.log(error);
        }
    })
}

function loadListClass() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/classes",
        success: function (data) {
            let html = `<div class="row p-3"><h2>Danh sách lớp</h2>`;
            for (let i = 0; i < data.length; i++) {
                html += '<div class="col-12"><h5>' + data[i].name + '</h5></div>'
            }
            html += `</div>`;
            document.getElementById('categories').innerHTML = html;
        }
    })
}

function showOne() {
    let html = `<div class="col-12 p-3">
                    <h1>Đang show one nhé!</h1>
                    <a onclick="loadHomeContent()">Quay về</a>
                </div>`;
    document.getElementById('content').innerHTML = html;
}

function showEdit(id) {
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
                "       <button class=\"btn btn-outline-primary mt-2\" type='button' onclick=\"save(" + data.id + ", '"+data.code+"')\">Change</button>" +
                "    </div>\n" +
                "  </div>\n" +
                "</form>" +
                "</div>"
            content.innerHTML = html
        }
    })
}

function save(id, code) {

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

function showAddForm() {

    let html = "<div class='offset-3 col-6 mb-3'><h2 style=\"text-align: center\">Add new product</h2>" +
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
        "       <button class=\"btn btn-outline-primary mt-2\" type='button' onclick=\"add()\">Add</button>" +
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

function add() {
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

function del(id, name) {
    if (confirm("Bạn có chắc chắn muốn xoá học sinh " + name + "???")) {
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

function findByScore() {
    let from = document.getElementById('from').value;
    let to = document.getElementById('to').value;
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/students/score-between?from=" + from + "&to=" + to,
        success: function (data) {
            let html1 = "";
            for (let i = 0; i < data.length; i++) {
                html1 += `<tr><th scope="row">${i}</th>
                          <td>${data[i].name}</td>
                          <td>${data[i].clazz.name}</td>
                          <td>${data[i].age}</td>
                          <td>${data[i].score}</td>
                          <td><button class="btn btn-outline-secondary mr-2" onclick="showEdit(${data[i].id})">Sửa</button><Button class="btn btn-outline-danger" onclick="del(${data[i].id},'${data[i].name}')">Xoá</Button></td></tr>`
            }
            document.getElementById('list-product').innerHTML = html1;
        }, error: function (error) {
            console.log(error);
        }
    })
}
