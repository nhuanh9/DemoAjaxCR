// let inpName = document.getElementById('name');
// let inpAge = document.getElementById('age');
// let inpScore = document.getElementById('score');
let content = document.getElementById('content')
let listProduct = document.getElementById('list-product')

function loadHomeContent() {
    let html = `
        <div class="col-9" ><h2>Danh sách học sinh</h2>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Tên</th>
                  <th scope="col">Tuổi</th>
                  <th scope="col">Điểm</th>
                  <th scope="col">Hành động</th>
                </tr>
              </thead>
              <tbody id="list-product">
               
              </tbody>
            </table>
        </div>
        <div class="col-3" id="categories"></div>`;
    document.getElementById('content').innerHTML = html;
    loadListStudent();
    loadListClass();
}

function loadListStudent() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/students",
        success: function (nal) {
            let html1 = "";
            for (let i = 0; i < nal.length; i++) {
                html1 += `<tr><th scope="row">${i}</th>
                          <td>${nal[i].name}</td>
                          <td>${nal[i].age}</td>
                          <td>${nal[i].score}</td>
                          <td><button class="btn btn-outline-secondary" onclick="showEdit(${nal[i].id})">Sửa</button><Button class="btn btn-outline-danger">Xoá</Button></td></tr>`
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
        success: function (nal) {
            console.log(nal);
            let html = `<div class="row p-3"><h2>Danh sách lớp</h2>`;
            for (let i = 0; i < nal.length; i++) {
                html += '<div class="col-12"><h5>' + nal[i].name + '</h5></div>'
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
        success: function (nal) {
            let html = "<div class='offset-3 col-6 mb-3'><h2 style=\"text-align: center\">Cập nhật thông tin</h2>" +
                "<div>\n" +
                "  <div class=\"form-group row\">\n" +
                "    <label for=\"name\" class=\"col-sm-4 col-form-label\">Họ và tên</label>\n" +
                "    <div class=\"col-sm-8\">\n" +
                "      <input type=\"text\" class=\"form-control\" id=\"name\" value='" + nal.name + "'>\n" +
                "    </div>\n" +
                "  </div>\n" +
                "  <div class=\"form-group row\">\n" +
                "    <label for=\"age\" class=\"col-sm-4 col-form-label\">Tuổi</label>\n" +
                "    <div class=\"col-sm-8\">\n" +
                "      <input type=\"text\" class=\"form-control\" id=\"age\" value='" + nal.age + "'>\n" +
                "    </div>\n" +
                "  </div>\n" +
                "  <div class=\"form-group row\">\n" +
                "    <label for=\"score\" class=\"col-sm-4 col-form-label\">Điểm</label>\n" +
                "    <div class=\"col-sm-8\">\n" +
                "      <input type=\"text\" class=\"form-control\" id=\"score\" value='" + nal.score + "'>\n" +
                "    </div>\n" +
                "  </div>\n" +
                "  <div class=\"row\">\n" +
                "    <div class=\"offset-5 col-sm-2\">\n" +
                "       <button class=\"btn btn-outline-primary\" onclick=\"save(" + nal.id + ")\">Sửa</button>" +
                "    </div>\n" +
                "  </div>\n" +
                "</div>" +
                "</div>"
            content.innerHTML = html

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
    // let clazz = document.getElementById("clazz").value;
    let nal = {
        name: name,
        score: score,
        age: age,
        clazz: {
            id: 1
        }
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        type: 'PUT',
        url: 'http://localhost:8080/api/students/'+id,
        data: JSON.stringify(nal),
        success: loadHomeContent,
        error: function (error) {
            console.log(error)
        }
    })
}
