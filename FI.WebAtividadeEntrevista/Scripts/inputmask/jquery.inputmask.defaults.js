$(document).ready(function () {
    Inputmask.extendAliases({
        'placaveiculo': {
            mask: ["aaa-9999", "aaa 9a99", "aaa 99 a9"]
        },
        'integer': {
            alias: 'numeric',
            digits: 0,
            radixPoint: '',
            allowMinus: false,
            allowPlus: false
        },
        'moeda': {
            alias: 'numeric',
            digits: 2,
            prefix: "R$ ",
            autoGroup: true,
            clearMaskOnLostFocus: false,
            digitsOptional: false,
            groupSeparator: ".",
            radixPoint: ",",
            placeholder: "0"
        },
        'moeda2': {
            alias: 'numeric',
            digits: 2,
            prefix: "R$ ",
            clearMaskOnLostFocus: false,
            digitsOptional: false,
            placeholder: "0"
        },
        'multidateMonths': {
            regex: '([0-9][0-9]\/[0-9][0-9][0-9][0-9])(,[0-9][0-9]\/[0-9][0-9][0-9][0-9])*', // o correto seria ([0-9]{2}\/[0-9]{4})(,[0-9]{2}\/[0-9]{4})*, mas no ano está permitindo 6 números
            alias: 'Regex',
            onKeyDown: function (evt, buffer, caretPos, opts) {
                var field = evt.currentTarget;
                var key = +evt.key;
                if (caretPos % 8 == 2 && !Number.isNaN(key)) {
                    field.value += '/';
                }
            }
        },
        'cpf': {
            mask: '999.999.999-99',
            keepStatic: true
        },
        'cnpj': {
            mask: '99.999.999/9999-99',
            keepStatic: true
        },
        'cpfcnpj': {
            mask: ['999.999.999-99', '99.999.999/9999-99'],
            keepStatic: true
        },
        'telefone': {
            mask: ['(99)9999-9999', '(99)99999-9999'],
            clearIncomplete: true
        },
        'datepicker': {
            mask: '99/99/9999'
        },
        'hora': {
            alias: 'datetime',
            mask: "h:s",
            placeholder: "hh:mm",
            hourFormat: "24",
            insertMode: false, 
            clearIncomplete: true
        },
        'cep': {
            mask: '99999-999',
            keepStatic: true
        }
    });

    DefaultInputMask();
});

function DefaultInputMask() {
    $('input.integer').inputmask({ alias: 'integer' });
    $('input.moeda').inputmask({ alias: 'moeda' });
    $('input.placa').inputmask({ alias: 'placaveiculo' });
    $('input.cpf').inputmask({ alias: 'cpf' });
    $('input.cnpj').inputmask({ alias: 'cnpj' });
    $('input.cpfcnpj').inputmask({ alias: 'cpfcnpj' });
    $('input.telefone').inputmask({ alias: 'telefone' });
    $('input.datepicker').inputmask({ alias: 'datepicker' });
    $('input.hora').inputmask({ alias: 'hora' });
    $('input.cep').inputmask({ alias: 'cep' });
}
