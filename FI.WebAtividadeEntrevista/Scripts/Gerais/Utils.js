
function CPFValido(cpf) {
    var sum = 0;
    var resto;

    cpf = cpf.replace(/\./g, "").replace("-", "");

    if (cpf.length !== 11 || !Array.from(cpf).filter(e => e !== cpf[0]).length) {
        return false
    }

    for (i = 1; i <= 9; i++)
        sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);

    resto = (sum * 10) % 11;

    if ((resto == 10) || (resto == 11))
        resto = 0;

    if (resto != parseInt(cpf.substring(9, 10)))
        return false;

    sum = 0;
    for (i = 1; i <= 10; i++)
        sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);

    resto = (sum * 10) % 11;

    if ((resto == 10) || (resto == 11))
        resto = 0;

    if (resto != parseInt(cpf.substring(10, 11)))
        return false;

    return true;
}

function ModalDialog(titulo, texto) {
    var random = Math.random().toString().replace('.', '');
    var texto = '<div id="' + random + '" class="modal fade">                                                               ' +
        '        <div class="modal-dialog">                                                                                 ' +
        '            <div class="modal-content">                                                                            ' +
        '                <div class="modal-header">                                                                         ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
        '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-body">                                                                           ' +
        '                    <p>' + texto + '</p>                                                                           ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-footer">                                                                         ' +
        '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
        '                </div>                                                                                             ' +
        '            </div><!-- /.modal-content -->                                                                         ' +
        '  </div><!-- /.modal-dialog -->                                                                                    ' +
        '</div> <!-- /.modal -->                                                                                            ';

    $('body').append(texto);
    $('#' + random).modal('show');
}