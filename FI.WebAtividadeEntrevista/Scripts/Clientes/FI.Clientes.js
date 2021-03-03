
$(document).ready(function () {
    if (obj) {
        $('#Id').val(obj.Id);
        $('#Nome').val(obj.Nome);
        $('#CEP').val(obj.CEP);
        $('#Email').val(obj.Email);
        $('#Sobrenome').val(obj.Sobrenome);
        $('#Nacionalidade').val(obj.Nacionalidade);
        $('#Estado').val(obj.Estado);
        $('#Cidade').val(obj.Cidade);
        $('#Logradouro').val(obj.Logradouro);
        $('#Telefone').val(obj.Telefone);
        $('#CPF').val(obj.CPF);

        MontarTabelaBeneficiario(obj.Beneficiarios);
    }

    $('#formCadastro').submit(function (e) {
        e.preventDefault();

        if (!CPFValido($("#CPF").val())) {
            ModalDialog("Atenção", "CPF inválido");
            return false;
        }

        $.ajax({
            url: urlPost,
            method: "POST",
            data: {
                "Id": $("#Id").val(),
                "Nome": $("#Nome").val(),
                "CEP": $("#CEP").val(),
                "Email": $("#Email").val(),
                "Sobrenome": $("#Sobrenome").val(),
                "Nacionalidade": $("#Nacionalidade").val(),
                "Estado": $("#Estado").val(),
                "Cidade": $("#Cidade").val(),
                "Logradouro": $("#Logradouro").val(),
                "Telefone": $("#Telefone").val(),
                "CPF": $("#CPF").val(),
                "Beneficiarios": beneficiarios
            },
            error:
                function (r) {
                    if (r.status == 400)
                        ModalDialog("Ocorreu um erro", r.responseJSON);
                    else if (r.status == 500)
                        ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
                },
            success:
                function (r) {
                    ModalDialog("Sucesso!", r)
                    window.location.href = urlRetorno;
                }
        });
    })

})
