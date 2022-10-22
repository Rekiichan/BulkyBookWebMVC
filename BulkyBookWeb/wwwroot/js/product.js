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
                             <a onClick=Delete('/Admin/Product/Delete/${data}')
                                class="nav-link text-black" class="btn btn-primary" mx-2><i class="bi bi-pencil-square"></i>  Delete</a>
                         </div>
                            `
                }
            }
        ]
    });
}

function Delete(url) {
    Swal.fire(
        {
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: `Delete`
        }).then((result) => {
            if (result.isConfirmed)
            $.ajax(
                {
                    url: url,
                    type: 'DELETE',
                    success: function (data) {
                        if (data.success) {
                            dataTable.ajax.reload();
                            toastr.success(data.message);
                        } else {
                            toastr.error(data.message);
                        }
                    }
                })
        })
}

