// let inpName = document.getElementById('name');
// let inpAge = document.getElementById('age');
// let inpScore = document.getElementById('score');
let content = document.getElementById('content')
let listProduct = document.getElementById('list-product')

function loadHomeContent() {
    let html = `
        <div class="col-12" >
        <h2 style="text-align: center" >Danh sách học sinh</h2>
        
        <h4 style="text-align: center; cursor: pointer; color: blue" onclick="showAddForm()">Thêm mới</h4>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Tên</th>
                  <th scope="col">Lớp</th>
                  <th scope="col">Tuổi</th>
                  <th scope="col">Điểm</th>
                  <th scope="col">Hành động</th>
                </tr>
              </thead>
              <tbody id="list-product">
               
              </tbody>
            </table>
        </div>`
    // <div class="col-3" id="categories"></div>`;
    document.getElementById('content').innerHTML = html;
    loadListStudent();
    // loadListClass();
}

function loadListStudent() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/students",
        success: function (data) {
            console.log(data)
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
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/students/" + id,
        success: function (student) {
            $.ajax({
                type: "GET",
                url: "http://localhost:8080/api/classes",
                success: function (data) {
                    let html = "<div class='offset-3 col-6 mb-3'><h2 style=\"text-align: center\">Cập nhật thông tin</h2>" +
                        "<div>\n" +
                        "  <div class=\"form-group row\">\n" +
                        "    <label for=\"name\" class=\"col-sm-4 col-form-label\">Họ và tên</label>\n" +
                        "    <div class=\"col-sm-8\">\n" +
                        "      <input type=\"text\" class=\"form-control\" id=\"name\" value='" + student.name + "'>\n" +
                        "    </div>\n" +
                        "  </div>\n" +
                        "  <div class=\"form-group row\">\n" +
                        "    <label for=\"age\" class=\"col-sm-4 col-form-label\">Tuổi</label>\n" +
                        "    <div class=\"col-sm-8\">\n" +
                        "      <input type=\"number\" class=\"form-control\" id=\"age\" value='" + student.age + "'>\n" +
                        "    </div>\n" +
                        "  </div>\n" +
                        "  <div class=\"form-group row\">\n" +
                        "    <label for=\"score\" class=\"col-sm-4 col-form-label\">Điểm</label>\n" +
                        "    <div class=\"col-sm-8\">\n" +
                        "      <input type=\"number\" class=\"form-control\" id=\"score\" value='" + student.score + "'>\n" +
                        "    </div>\n" +
                        "  </div>\n" +
                        "  <div class=\"row\">\n" +
                        "    <label for=\"clazz\" class=\"col-sm-4 col-form-label\">Lớp</label>\n" +
                        "    <div class=\"col-sm-8\">\n" +
                        "      <select class=\"form-control\" id='clazz'>\n"
                    for (let i = 0; i < data.length; i++) {
                        html += `<option value="${data[i].id}"> ${data[i].name}</option>`
                    }
                    html += "      </select>" +
                        "    </div>\n" +
                        "  </div>\n" +
                        "  <div class=\"row\">\n" +
                        "    <div class=\"offset-5 col-sm-2\">\n" +
                        "       <button class=\"btn btn-outline-primary mt-2\" onclick=\"save(" + student.id + ")\">Sửa</button>" +
                        "    </div>\n" +
                        "  </div>\n" +
                        "</div>" +
                        "</div>"
                    content.innerHTML = html
                }
            })
        }
    })
}

function save(id) {
    let inpName = document.getElementById('name');
    let inpAge = document.getElementById('age');
    let inpScore = document.getElementById('score');
    let name = inpName.value;
    let score = inpScore.value;
    let age = inpAge.value;
    let clazz = document.getElementById("clazz").value;
    let data = {
        name: name,
        score: score,
        age: age,
        clazz: {
            id: clazz
        }
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        type: 'PUT',
        url: 'http://localhost:8080/api/students/' + id,
        data: JSON.stringify(data),
        success: loadHomeContent,
        error: function (error) {
            console.log(error)
        }
    })
}

function showAddForm() {

    let html = "<div class='offset-3 col-6 mb-3'><h2 style=\"text-align: center\">Thêm mới học sinh</h2>" +
        "<div>\n" +
        "  <div class=\"form-group row\">\n" +
        "    <label for=\"name\" class=\"col-sm-4 col-form-label\">Họ và tên</label>\n" +
        "    <div class=\"col-sm-8\">\n" +
        "      <input type=\"text\" class=\"form-control\" id=\"name\">\n" +
        "    </div>\n" +
        "  </div>\n" +
        "  <div class=\"form-group row\">\n" +
        "    <label for=\"age\" class=\"col-sm-4 col-form-label\">Tuổi</label>\n" +
        "    <div class=\"col-sm-8\">\n" +
        "      <input type=\"number\" class=\"form-control\" id=\"age\">\n" +
        "    </div>\n" +
        "  </div>\n" +
        "  <div class=\"form-group row\">\n" +
        "    <label for=\"score\" class=\"col-sm-4 col-form-label\">Điểm</label>\n" +
        "    <div class=\"col-sm-8\">\n" +
        "      <input type=\"number\" class=\"form-control\" id=\"score\">\n" +
        "    </div>\n" +
        "  </div>\n" +
        "  <div class=\"row\">\n" +
        "    <label for=\"clazz\" class=\"col-sm-4 col-form-label\">Lớp</label>\n" +
        "    <div class=\"col-sm-8\">\n" +
        "      <select class=\"form-control\" id='clazz'>\n" +
        "      </select>" +
        "    </div>\n" +
        "  </div>\n" +
        "  <div class=\"row mt-2\">\n" +
        "    <div class=\"offset-5 col-sm-2\">\n" +
        "       <button class=\"btn btn-outline-primary\" onclick=\"add()\">Thêm</button>" +
        "    </div>\n" +
        "  </div>\n" +
        "</div>" +
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
    let inpName = document.getElementById('name');
    let inpAge = document.getElementById('age');
    let inpScore = document.getElementById('score');
    let name = inpName.value;
    let score = inpScore.value;
    let age = inpAge.value;
    let clazz = document.getElementById("clazz").value;
    let data = {
        name: name,
        score: score,
        age: age,
        clazz: {
            id: clazz
        }
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        type: 'POST',
        url: 'http://localhost:8080/api/students',
        data: JSON.stringify(data),
        success: loadHomeContent,
        error: function (error) {
            console.log(error)
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
            url: 'http://localhost:8080/api/students/' + id,
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
