var dataTable;

$(document).ready(function () {
    loadDataTable();
});

function loadDataTable() {
    dataTable = $('#tblData').DataTable({
        "ajax": {
            "url": "/Admin/Company/GetAll"
        },
        "columns": [
            { "data": "name", "width": "45%" },
            { "data": "streetAddress", "width": "15%" },
            { "data": "city", "width": "10%" },
            { "data": "state", "width": "10%" },
            { "data": "phoneNumber", "width": "10%" },
            {
                "data": "id",
                "width": "10%",
                "render": function (data) {
                    return `
                         <div class="w-75 btn-group" role="group">
                             <a href="/Admin/Company/Upsert?id=${data}"
                                class="nav-link text-black" class="btn btn-primary" mx-2><i class="bi bi-pencil-square"></i>  Edit</a>
                            <a onClick=Delete('/Admin/Company/Delete/${data}')
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

