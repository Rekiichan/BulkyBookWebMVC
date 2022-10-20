var dataTable;

$(document).ready(function () {
    loadDataTable();
});

function loadDataTable() {
    dataTable = $('#tblData').DataTable({
        "ajax": {
            "url": "/Admin/Product/GetAll"
        },
        "columns": [
            { "data": "title", "width": "15%" },
            { "data": "isbn", "width": "15%" },
            { "data": "price", "width": "15%" },
            { "data": "author", "width": "15%" },
            { "data": "category.name", "width": "15%" },
            {
                "data": "id",
                "width": "15%",
                "render": function (data) {
                    return `
                         <div class="w-75 btn-group" role="group">
                             <a href="/Admin/Product/Upsert?id=${data}"
                                class="nav-link text-black" class="btn btn-primary" mx-2><i class="bi bi-pencil-square"></i>  Edit</a>
                             <a
                                class="nav-link text-black" class="btn btn-dan" mx-2><i class="bi bi-trash" class="btn btn-danger" mx-2></i>  Delete</a>
                         </div>
                            `
                }
            }
        ]
    });
}