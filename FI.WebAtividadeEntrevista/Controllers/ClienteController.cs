using FI.AtividadeEntrevista.BLL;
using WebAtividadeEntrevista.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using FI.AtividadeEntrevista.DML;

namespace WebAtividadeEntrevista.Controllers
{
    public class ClienteController : Controller
    {
       
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Incluir()
        {
            return View();
        }

        [HttpPost]
        public JsonResult Incluir(ClienteModel model)
        {
            BoCliente boCliente = new BoCliente();
            BoBeneficiario boBeneficiario = new BoBeneficiario();

            if (!this.ModelState.IsValid)
            {
                List<string> erros = (from item in ModelState.Values
                                      from error in item.Errors
                                      select error.ErrorMessage).ToList();

                Response.StatusCode = 400;
                return Json(string.Join(Environment.NewLine, erros));
            }
            else
            {
                var cpfJaExiste = boCliente.VerificarExistencia(model.CPF, 0);
                if (cpfJaExiste)
                {
                    Response.StatusCode = 400;
                    return Json("CPF já existe");
                }

                model.Id = boCliente.Incluir(new Cliente()
                {
                    CEP = model.CEP,
                    Cidade = model.Cidade,
                    Email = model.Email,
                    Estado = model.Estado,
                    Logradouro = model.Logradouro,
                    Nacionalidade = model.Nacionalidade,
                    Nome = model.Nome,
                    Sobrenome = model.Sobrenome,
                    Telefone = model.Telefone,
                    CPF = model.CPF
                });

                if (model.Beneficiarios?.Count > 0)
                {
                    foreach (var beneficiario in model.Beneficiarios)
                    {
                        boBeneficiario.Incluir(new Beneficiario()
                        {
                            Nome = beneficiario.Nome,
                            CPF = beneficiario.CPF,
                            IdCliente = model.Id
                        });
                    }
                }

                return Json("Cadastro efetuado com sucesso");
            }
        }

        [HttpGet]
        public ActionResult Alterar(long id)
        {
            BoCliente boCliente = new BoCliente();
            BoBeneficiario boBeneficiario = new BoBeneficiario();

            Cliente cliente = boCliente.Consultar(id);
            ClienteModel model = null;

            if (cliente != null)
            {
                List<Beneficiario> beneficiarios = boBeneficiario.Pesquisa(cliente.Id);
                List<BeneficiarioModel> listaBeneficiarios = new List<BeneficiarioModel>();
                foreach (var beneficiario in beneficiarios)
                {
                    listaBeneficiarios.Add(new BeneficiarioModel()
                    {
                        Id = beneficiario.Id,
                        CPF = beneficiario.CPF,
                        Nome = beneficiario.Nome,
                        Excluido = false
                    });
                }

                model = new ClienteModel()
                {
                    Id = cliente.Id,
                    CEP = cliente.CEP,
                    Cidade = cliente.Cidade,
                    Email = cliente.Email,
                    Estado = cliente.Estado,
                    Logradouro = cliente.Logradouro,
                    Nacionalidade = cliente.Nacionalidade,
                    Nome = cliente.Nome,
                    Sobrenome = cliente.Sobrenome,
                    Telefone = cliente.Telefone,
                    CPF = cliente.CPF,
                    Beneficiarios = listaBeneficiarios
                };
            }

            return View(model);
        }

        [HttpPost]
        public JsonResult Alterar(ClienteModel model)
        {
            BoCliente boCliente = new BoCliente();
            BoBeneficiario boBeneficiario = new BoBeneficiario();

            if (!this.ModelState.IsValid)
            {
                List<string> erros = (from item in ModelState.Values
                                      from error in item.Errors
                                      select error.ErrorMessage).ToList();

                Response.StatusCode = 400;
                return Json(string.Join(Environment.NewLine, erros));
            }
            else
            {
                var cpfJaExiste = boCliente.VerificarExistencia(model.CPF, model.Id);
                if (cpfJaExiste)
                {
                    Response.StatusCode = 400;
                    return Json("CPF já existe");
                }

                boCliente.Alterar(new Cliente()
                {
                    Id = model.Id,
                    CEP = model.CEP,
                    Cidade = model.Cidade,
                    Email = model.Email,
                    Estado = model.Estado,
                    Logradouro = model.Logradouro,
                    Nacionalidade = model.Nacionalidade,
                    Nome = model.Nome,
                    Sobrenome = model.Sobrenome,
                    Telefone = model.Telefone,
                    CPF = model.CPF
                });

                if (model.Beneficiarios?.Count > 0)
                {
                    foreach (var beneficiario in model.Beneficiarios)
                    {
                        if (beneficiario.Id > 0)
                        {
                            if (beneficiario.Excluido)
                                boBeneficiario.Excluir(beneficiario.Id);
                            else
                                boBeneficiario.Alterar(new Beneficiario()
                                {
                                    Id = beneficiario.Id,
                                    Nome = beneficiario.Nome,
                                    CPF = beneficiario.CPF
                                });
                        }
                        else
                        {
                            boBeneficiario.Incluir(new Beneficiario()
                            {
                                Nome = beneficiario.Nome,
                                CPF = beneficiario.CPF,
                                IdCliente = model.Id
                            });
                        }
                    }
                }

                return Json("Cadastro alterado com sucesso");
            }
        }

        [HttpGet]
        public ActionResult Excluir(long id)
        {
            BoCliente boCliente = new BoCliente();
            BoBeneficiario boBeneficiario = new BoBeneficiario();

            boBeneficiario.ExcluirPorCliente(id);
            boCliente.Excluir(id);

            return RedirectToAction("Index");
        }

        [HttpPost]
        public JsonResult ClienteList(int jtStartIndex = 0, int jtPageSize = 0, string jtSorting = null)
        {
            try
            {
                int qtd = 0;
                string campoOrdenacao = jtSorting;

                List<Cliente> clientes = new BoCliente().Pesquisa(jtStartIndex, jtPageSize, campoOrdenacao, out qtd);

                //Return result to jTable
                return Json(new { Result = "OK", Records = clientes, TotalRecordCount = qtd });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

    }
}