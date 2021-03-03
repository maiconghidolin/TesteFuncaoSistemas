// Eu preferiria salvar o beneficiário depois de salvar a pessoa 
// Mas como os dados vão ser persistidos só quando salvar a pessoa, vou precisar tratar uma lista dessa forma

var beneficiarios = new Array();

var beneficiario = function (id, cpf, nome) {
    return {
        Id: id,
        CPF: cpf,
        Nome: nome,
        Excluido: false
    };
}

$(document).ready(function () {

    $('#formBeneficiarios').submit(function (e) {
        e.preventDefault();

        if (!CPFBeneficiarioValido()) {
            return false;
        }

        var id = $("#IdBeneficiario").val();
        if (id == 0) {
            InserirNovoBeneficiario();
        } else {
            SalvarBeneficiario();
        }
        LimparCamposBeneficiario();

    });

});

function InserirNovoBeneficiario() {
    var novo = new beneficiario(GerarIdBeneficiario(), $("#CPFBeneficiario").val(), $("#NomeBeneficiario").val());
    beneficiarios.push(novo);
    var tr = GerarTrTabelaBeneficiario(novo);
    $("#tableBeneficiarios tbody").append(tr);
}

function SalvarBeneficiario() {
    var id = $("#IdBeneficiario").val();
    var beneficiario = beneficiarios.find(x => x.Id == id);
    beneficiario.Id = $("#IdBeneficiario").val();
    beneficiario.CPF = $("#CPFBeneficiario").val();
    beneficiario.Nome = $("#NomeBeneficiario").val();

    var trAntiga = $(`#tableBeneficiarios tbody #tr_${id}`);
    trAntiga.attr("id", trAntiga.attr("id") + "removed");

    var tr = GerarTrTabelaBeneficiario(beneficiario);
    $(tr).insertBefore(trAntiga);

    trAntiga.remove()
}

function AlterarBeneficiario(id) {
    var beneficiario = beneficiarios.find(x => x.Id == id);
    $("#IdBeneficiario").val(beneficiario.Id);
    $("#CPFBeneficiario").val(beneficiario.CPF);
    $("#NomeBeneficiario").val(beneficiario.Nome);
}

function ExcluirBeneficiario(id) {
    var beneficiario = beneficiarios.find(x => x.Id == id);
    if (beneficiario.Id > 0) {
        beneficiario.Excluido = true;
    } else {
        beneficiarios = beneficiarios.filter(x => x.Id != id);
    }
    $(`#tableBeneficiarios tbody #tr_${id}`).remove();
    LimparCamposBeneficiario();
}

function LimparCamposBeneficiario() {
    $("#IdBeneficiario").val(0);
    $("#CPFBeneficiario").val("");
    $("#NomeBeneficiario").val("");
}

function MontarTabelaBeneficiario(listaBeneficiarios) {
    beneficiarios = listaBeneficiarios;
    for (var i = 0; i < beneficiarios.length; i++) {
        var tr = GerarTrTabelaBeneficiario(beneficiarios[i]);
        $("#tableBeneficiarios tbody").append(tr);
    }
}

function GerarIdBeneficiario() {
    var minId = beneficiarios.reduce(function (min, p) { return p.Id < min ? p.Id : min }, 0);
    var id = minId >= 0 ? -1 : minId - 1;
    return id;
}

function GerarTrTabelaBeneficiario(beneficiario) {
    var tr = `<tr id="tr_${beneficiario.Id}">
                 <td>${beneficiario.CPF}</td>
                 <td>${beneficiario.Nome}</td>
                 <td class="text-center">
                     <button type="button" class="btn btn-sm btn-primary" onclick="AlterarBeneficiario(${beneficiario.Id})">Alterar</button>
                     <button type="button" class="btn btn-sm btn-primary" onclick="ExcluirBeneficiario(${beneficiario.Id})">Excluir</button>
                 </td>
             </tr>`;

    return tr;
}

function CPFBeneficiarioValido() {
    var id = $("#IdBeneficiario").val();
    var cpf = $("#CPFBeneficiario").val();

    if (!CPFValido(cpf)) {
        ModalDialog("Atenção", "CPF inválido");
        return false;
    }

    var beneficiario = beneficiarios.find(x => x.CPF == cpf && x.Id != id);
    if (beneficiario) {
        ModalDialog("Atenção", "CPF já existe");
        return false;
    }

    return true;
}