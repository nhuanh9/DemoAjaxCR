function loadHomeContent() {
    let html = `
        <div class="col-9" id="list-product"></div>
        <div class="col-3" id="categories"></div>`;
    document.getElementById('content').innerHTML = html;
    loadListProduct();
    loadListClass();
}

function loadListProduct() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/students",
        success: function (nal) {
            console.log(nal);
            let html = `<div class="row p-3">`;
            for (let i = 0; i < nal.length; i++) {
                html += '<div class="col-4 product p-3"><h3>' + nal[i].name + '</h3></div>'
            }
            html += `</div>`;
            document.getElementById('list-product').innerHTML = html;
        }
    })
}

function loadListClass() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/classes",
        success: function (nal) {
            console.log(nal);
            let html = `<div class="row p-3">`;
            for (let i = 0; i < nal.length; i++) {
                html += '<div class="col-12"><h5>' + nal[i].name + '</h5></div>'
            }
            html += `</div>`;
            document.getElementById('categories').innerHTML = html;
        }
    })
}
