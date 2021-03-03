using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebAtividadeEntrevista.Models
{
    /// <summary>
    /// Classe de Modelo de Cliente
    /// </summary>
    public class BeneficiarioModel
    {
        public long Id { get; set; }
               
        /// <summary>
        /// Nome
        /// </summary>
        [Required]
        public string Nome { get; set; }

        /// <summary>
        /// CPF
        /// </summary>
        [Required]
        [RegularExpression(@"^([0-9]{3}[\.][0-9]{3}[\.][0-9]{3}[-][0-9]{2})$", ErrorMessage = "Digite um cpf válido")]
        public string CPF { get; set; }

        /// <summary>
        /// Excluído
        /// </summary>
        public bool Excluido { get; set; }

    }    
}