
$(document).ready(function () {

    if (document.getElementById("gridClientes")) {
        $('#gridClientes').jtable({
            title: 'Clientes',
            paging: true, //Enable paging
            pageSize: 5, //Set page size (default: 10)
            sorting: true, //Enable sorting
            defaultSorting: 'Nome ASC', //Set default sorting
            actions: {
                listAction: urlClienteList,
            },
            fields: {
                Nome: {
                    title: 'Nome',
                    width: '35%'
                },
                CPF: {
                    title: 'CPF',
                    width: '20%'
                },
                Email: {
                    title: 'Email',
                    width: '30%'
                },
                Opcoes: {
                    title: '',
                    width: '15%',
                    display: function (data) {
                        return '<button onclick="window.location.href=\'' + urlAlteracao + '/' + data.record.Id + '\'" class="btn btn-primary btn-sm">Alterar</button>' + 
                                '<button onclick="window.location.href=\'' + urlExclusao + '/' + data.record.Id + '\'" class="btn btn-primary btn-sm">Excluir</button>';
                    }
                }
            }
        });

        $('#gridClientes').jtable('load');
    }

})