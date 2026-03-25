# Templates de Artefatos — dev-new-feature

## 1. Entidade

```csharp
// VSEGURADORA.Core.Entidades/Entidades/[Nome].cs
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VSEGURADORA.Core.Entidades
{
    /// <summary>
    /// Representa [descrição da entidade no contexto de seguros veiculares].
    /// </summary>
    [Table("[nome_tabela]")]  // NUNCA adicionar prefixo "tb_"; usar exatamente o nome da documentação
    public class [Nome] : EntidadeBase
    {
        [Column("[nome_campo_snake_case]")]
        [Required]
        [StringLength(200)]
        public string NomeCampo { get; set; }

        // FK example:
        [Column("id_[entidade_relacionada]")]
        public int Id[EntidadeRelacionada] { get; set; }

        [ForeignKey("Id[EntidadeRelacionada]")]
        public virtual [EntidadeRelacionada] [EntidadeRelacionada] { get; set; }

        [Column("ativo")]
        public bool Ativo { get; set; }
    }
}
```

**Regras:** Herdar de `EntidadeBase`. Nomes de colunas em snake_case. FKs: `int Id[Nome]` + `[Column]` + `[ForeignKey]` + propriedade de navegação `virtual`.

---

## 2. Interface Repository

```csharp
// VSEGURADORA.Infra.Data/SIGA/Interfaces/I[Nome]Repository.cs
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using VSEGURADORA.Core.Entidades;
using VSEGURADORA.Infra.Data.Generic;

namespace VSEGURADORA.Infra.Data.SIGA.Interfaces
{
    public interface I[Nome]Repository : IGenericRepository<[Nome]>
    {
        IList<[Nome]> Listar(IList<Expression<Func<[Nome], bool>>> filtros);
    }
}
```

---

## 3. Implementação Repository

```csharp
// VSEGURADORA.Infra.Data/SIGA/Repository/[Nome]Repository.cs
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using VSEGURADORA.Core.Entidades;
using VSEGURADORA.Infra.Data.Generic;
using VSEGURADORA.Infra.Data.SIGA.Context;
using VSEGURADORA.Infra.Data.SIGA.Interfaces;

namespace VSEGURADORA.Infra.Data.SIGA.Repository
{
    public class [Nome]Repository : GenericRepository<[Nome]>, I[Nome]Repository
    {
        public [Nome]Repository(SIGAContext context) : base(context) { }

        public IList<[Nome]> Listar(IList<Expression<Func<[Nome], bool>>> filtros)
        {
            IQueryable<[Nome]> query = this.context.Set<[Nome]>();
            foreach (var filtro in filtros)
                query = query.Where(filtro);
            return query.ToList();
        }
    }
}
```

---

## 4. Interface Business

> ⚠️ Não redeclarar `Obter`, `Listar`, `Salvar`, `Excluir` — já existem em `BusinessBase`. Declarar apenas métodos específicos de domínio.

```csharp
// VSEGURADORA.Core/Interfaces/I[Nome]Business.cs
using System.Collections.Generic;
using VSEGURADORA.Core.Entidades;

namespace VSEGURADORA.Core.Interfaces
{
    public interface I[Nome]Business : IBusiness
    {
        // Apenas métodos de domínio específicos desta funcionalidade.
        // Ex: IList<[Nome]> ListarAtivos(int idContexto);
    }
}
```

---

## 5. Implementação Business

> ⚠️ Não reimplementar `Salvar`, `Obter`, `Listar`, `Excluir`. NUNCA usar NLog aqui.

```csharp
// VSEGURADORA.Core/Business/[Nome]Business.cs
using System;
using VSEGURADORA.Core.Entidades;
using VSEGURADORA.Core.Interfaces;
using VSEGURADORA.Infra.Data.SIGA.Interfaces;

namespace VSEGURADORA.Core.Business
{
    public class [Nome]Business : BusinessBase<[Nome], I[Nome]Repository>, I[Nome]Business
    {
        private readonly IUnitOfWork _unitOfWork;

        public [Nome]Business(IUnitOfWork unitOfWork) : base(unitOfWork)
        {
            this._unitOfWork = unitOfWork;
        }

        // Sobrescrever Salvar APENAS se houver lógica de domínio extra:
        // public override void Salvar([Nome] entidade)
        // {
        //     ValidarRegrasDeNegocio(entidade);
        //     entidade.DataAtualizacao = DateTime.Now;
        //     base.Salvar(entidade);
        // }

        // Para acessar repositório: var repo = (I[Nome]Repository)_unitOfWork.Repository(typeof(I[Nome]Repository));
    }
}
```

---

## 6. SIGAContext

```csharp
// Adicionar em SIGAContext.cs junto aos demais DbSet<T>:
public DbSet<[Nome]> [Nome]s { get; set; }
```

---

## 7. UnitOfWork

```csharp
// Adicionar no switch do método Repository(Type tipo):
case "I[Nome]Repository":
    repository = new [Nome]Repository(this.context);
    break;
```

---

## 8. BusinessBase

```csharp
// Adicionar no switch do método getBussines(Type Tipo):
case "I[Nome]Business":
    return new [Nome]Business(uow);
```

---

## 9. ViewModel

```csharp
// VSEGURADORA.Apresentacao.Web/Models/[Nome]/[Nome]ViewModel.cs
using System;
using System.ComponentModel.DataAnnotations;

namespace VSEGURADORA.Apresentacao.Web.Models
{
    public class [Nome]ViewModel : FiltroPaginacaoViewModel
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "O campo [Label] é obrigatório.")]
        [StringLength(200, ErrorMessage = "Máximo de 200 caracteres.")]
        [Display(Name = "[Label]")]
        public string [Propriedade] { get; set; }

        [Display(Name = "Status")]
        public bool Ativo { get; set; }

        [Display(Name = "Situação")]
        public string Situacao { get; set; }

        public DateTime DataAtualizacao { get; set; }
    }
}
```

---

## 10. AutoMapper

```csharp
// Adicionar em AutoMapperConfig.cs dentro de Configure():
Mapper.CreateMap<[Nome], [Nome]ViewModel>();
Mapper.CreateMap<[Nome]ViewModel, [Nome]>();
Mapper.CreateMap<Paginacao<[Nome]>, PaginacaoViewModel<[Nome]ViewModel>>();
```

---

## 11. Actions no [Epic]Controller

```csharp
// Campo privado:
private I[Nome]Business _[nomeCamelCase]Business;

// No construtor, adicionar parâmetro I[Nome]Business [nomeCamelCase]Business e atribuição.

[Autoriza(Funcionalidade = EFuncionalidade.[Epic], TipoAcesso = (int)ETipoAcesso.Pesquisar)]
public ActionResult [Nome]([Nome]ViewModel viewModel)
{
    ViewBag.Situacao = ListarSituacaoConta();
    ViewBag.Resultado = Pesquisar[Nome](viewModel);
    return View(viewModel);
}

private PaginacaoViewModel<[Nome]ViewModel> Pesquisar[Nome]([Nome]ViewModel filtro)
{
    IList<Expression<Func<[Nome], bool>>> querys = new List<Expression<Func<[Nome], bool>>>();
    querys.Add(x =>
        (string.IsNullOrEmpty(filtro.[CampoPrincipal]) || x.[CampoPrincipal].Contains(filtro.[CampoPrincipal])) &&
        (string.IsNullOrEmpty(filtro.Situacao) || (filtro.Situacao == "Ativo" && x.Ativo || filtro.Situacao == "Inativo" && !x.Ativo))
    );
    return Mapper.Map<PaginacaoViewModel<[Nome]ViewModel>>(
        _[nomeCamelCase]Business.ListarPaginado(filtro.PaginaAtual ?? 1, 10,
            filtros: querys,
            ordenadoPor: q => q.OrderBy(x => x.[CampoPrincipal]))
    );
}

[Autoriza(Funcionalidade = EFuncionalidade.[Epic], TipoAcesso = (int)ETipoAcesso.Cadastrar | (int)ETipoAcesso.Editar | (int)ETipoAcesso.Consultar)]
public ActionResult Create[Nome](int id = 0)
{
    if (!this.VerificaAcessoEdicao(id, EFuncionalidade.[Epic]))
        return RedirectToAction("AcessoNegado", "Acesso");

    [Nome]ViewModel viewModel = new [Nome]ViewModel();
    if (id != 0)
    {
        IList<Expression<Func<[Nome], bool>>> query = new List<Expression<Func<[Nome], bool>>>();
        query.Add(x => x.Id == id);
        var entidade = _[nomeCamelCase]Business.Listar(query).FirstOrDefault();
        viewModel = Mapper.Map<[Nome]ViewModel>(entidade);
    }
    else { viewModel.Ativo = true; }
    return View(viewModel);
}

[Autoriza(Funcionalidade = EFuncionalidade.[Epic], TipoAcesso = (int)ETipoAcesso.Cadastrar | (int)ETipoAcesso.Editar)]
[HttpPost]
public ActionResult Salvar[Nome]([Nome]ViewModel viewModel)
{
    if (!this.VerificaAcessoEdicao(viewModel.Id, EFuncionalidade.[Epic]))
        return RedirectToAction("AcessoNegado", "Acesso");

    if (ModelState.IsValid)
    {
        [Nome] entidade;
        string mensagemSucesso;
        if (viewModel.Id > 0)
        {
            IList<Expression<Func<[Nome], bool>>> query = new List<Expression<Func<[Nome], bool>>>();
            query.Add(x => x.Id == viewModel.Id);
            entidade = _[nomeCamelCase]Business.Listar(query).FirstOrDefault();
            entidade = Mapper.Map(viewModel, entidade);
            mensagemSucesso = "[NomeAmigavel] atualizado(a) com sucesso.";
        }
        else
        {
            entidade = Mapper.Map<[Nome]>(viewModel);
            mensagemSucesso = "[NomeAmigavel] incluído(a) com sucesso.";
        }
        entidade.DataAtualizacao = DateTime.Now;
        _[nomeCamelCase]Business.Salvar(entidade);
        this.DefinirNotificacaoProximaPagina(mensagemSucesso, TipoNotificacao.Sucesso);
        return RedirectToAction("[Nome]");
    }
    return View("Create[Nome]", viewModel);
}

[Autoriza(Funcionalidade = EFuncionalidade.[Epic], TipoAcesso = (int)ETipoAcesso.Excluir)]
public JsonResult SetarInativo[Nome](int id)
{
    try
    {
        IList<Expression<Func<[Nome], bool>>> query = new List<Expression<Func<[Nome], bool>>>();
        query.Add(x => x.Id == id);
        [Nome] entidade = _[nomeCamelCase]Business.Listar(query).FirstOrDefault();
        if (entidade != null)
        {
            entidade.Ativo = false;
            entidade.DataAtualizacao = DateTime.Now;
            _[nomeCamelCase]Business.Salvar(entidade);
            this.DefinirNotificacaoProximaPagina("[NomeAmigavel] definido(a) como inativo(a).", TipoNotificacao.Sucesso);
            return Json(new { Message = "Inativado com sucesso.", httpStatusCode = HttpStatusCode.OK }, JsonRequestBehavior.AllowGet);
        }
        return Json(new { Message = "Registro não encontrado.", httpStatusCode = HttpStatusCode.NotFound }, JsonRequestBehavior.AllowGet);
    }
    catch (Exception ex)
    {
        return Json(new { Message = ex.Message, httpStatusCode = HttpStatusCode.InternalServerError }, JsonRequestBehavior.AllowGet);
    }
}
```

---

## 12. View Pesquisar

> ⚠️ O botão **"Novo(a) [NomeAmigavel]"** é **obrigatório** no cabeçalho direito.

```cshtml
@* Views/[Epic]/[Nome].cshtml *@
@using VSEGURADORA.Core.Common.Enums
@using VSEGURADORA.Core.Entidades
@using VSEGURADORA.Apresentacao.Web.Models
@model VSEGURADORA.Apresentacao.Web.Models.[Nome]ViewModel
@{
    ViewBag.Title = "[NomeAmigavel]";
    Layout = "~/Views/Shared/_Layout.cshtml";
    Usuario usuarioLogado = ViewBag.UsuarioLogado;
}

@using (Html.BeginForm(null, null, FormMethod.Post, new { id = "form1" }))
{
    <div class="page">
        <div class="page-header row">
            <h1 class="page-title col-md-6">
                [NOME AMIGÁVEL] - CONSULTAR
                <ol class="breadcrumb" style="font-size:initial;">
                    <li class="breadcrumb-item"><a href="@Url.Action("Index", "Home")">Dashboard</a></li>
                    <li class="breadcrumb-item active">Consultar [NomeAmigavel]</li>
                </ol>
            </h1>
            <div class="col-md-6" style="text-align:right;">
                @if (Usuario.EstaAutorizado(usuarioLogado, EFuncionalidade.[Epic], ESubfuncao.Nada, (int)ETipoAcesso.Cadastrar))
                {
                    <a href="@Url.Action("Create[Nome]")" class="btn btn-success">Novo(a) [NomeAmigavel]</a>
                }
            </div>
        </div>
        <div class="page-content">
            <div class="panel">
                <div class="panel-heading panel-group" id="siteMegaAccordionHeadingOne" style="cursor:pointer;" role="tab">
                    <h3 style="font-size:19px;" class="panel-title"
                        data-toggle="collapse" href="#siteMegaCollapseOne" data-parent="#siteMegaAccordion"
                        aria-expanded="false" aria-controls="siteMegaCollapseOne">
                        Filtros de Pesquisa
                    </h3>
                </div>
                <div class="panel-collapse collapse" id="siteMegaCollapseOne" aria-labelledby="siteMegaAccordionHeadingOne" role="tabpanel">
                    <div class="panel-body">
                        <div class="form-group row">
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label>[Label do campo]:</label>
                                    @Html.TextBoxFor(m => m.[Propriedade], new { @class = "form-control", @placeholder = "[Placeholder]", @maxlength = "[tamanho]" })
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label>Status:</label>
                                    @Html.DropDownListFor(m => m.Situacao, (SelectList)ViewBag.Situacao, "Selecione", new { @class = "form-control" })
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <button type="submit" class="btn btn-primary">Pesquisar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        @if (ViewBag.Resultado != null)
        {
            Html.RenderPartial("_Resultado[Nome]", (ViewBag.Resultado as PaginacaoViewModel<[Nome]ViewModel>));
        }
    </div>
}

<script src="~/Scripts/sweetalert.js"></script>
@{ var message = TempData["sucess"] ?? string.Empty; }
@section scripts {
    <script language='javascript' type='text/javascript'>
        var message = '@Html.Raw(message)';
        if (message) { swal(message, "Para continuar pressione OK", "success"); }
    </script>
}
```

---

## 13. View Resultado Parcial

> ⚠️ `@{ Html.RenderPartial("_Paginacao", Model); }` é **obrigatório** — nunca omitir.

```cshtml
@* Views/[Epic]/_Resultado[Nome].cshtml *@
@using VSEGURADORA.Apresentacao.Web.Models
@model PaginacaoViewModel<VSEGURADORA.Apresentacao.Web.Models.[Nome]ViewModel>

<div class="page-content" style="margin-top: -3%;">
    <div class="panel">
        <div class="panel-heading"><h3 class="panel-title">Resultado da Pesquisa</h3></div>
        <div class="panel-body">
            <div class="example table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th data-tablesaw-priority="3">[Coluna 1]</th>
                            <th data-tablesaw-priority="2">[Coluna 2]</th>
                            <th data-tablesaw-priority="1">Status</th>
                            <th data-tablesaw-priority="2">Data de Atualização</th>
                        </tr>
                    </thead>
                    <tbody>
                        @if (Model.Entidades.Count() > 0)
                        {
                            foreach (var item in Model.Entidades)
                            {
                                <tr onclick="window.location='@(Url.Action("Create[Nome]"))?id=@Html.DisplayFor(m => item.Id)'">
                                    <th>@item.[Propriedade1]</th>
                                    <td>@item.[Propriedade2]</td>
                                    <td>@(item.Ativo ? "Ativo" : "Inativo")</td>
                                    <td>
                                        @if (item.DataAtualizacao > DateTime.MinValue)
                                        { @item.DataAtualizacao.ToString("dd/MM/yyyy HH:mm") }
                                    </td>
                                </tr>
                            }
                        }
                        else
                        {
                            <tr><td colspan="4">Nenhum registro encontrado.</td></tr>
                        }
                    </tbody>
                </table>
            </div>
            @{ Html.RenderPartial("_Paginacao", Model); }
        </div>
    </div>
</div>
```

---

## 14. View Cadastrar/Editar

```cshtml
@* Views/[Epic]/Create[Nome].cshtml *@
@using VSEGURADORA.Apresentacao.Web.Models
@using VSEGURADORA.Apresentacao.Web.Extensions
@using VSEGURADORA.Core.Common.Enums
@using VSEGURADORA.Core.Entidades
@model VSEGURADORA.Apresentacao.Web.Models.[Nome]ViewModel
@{
    ViewBag.Title = Model.Id > 0 ? "Editar [NomeAmigavel]" : "Incluir [NomeAmigavel]";
    Usuario usuarioLogado = ViewBag.UsuarioLogado;
    Layout = "~/Views/Shared/_Layout.cshtml";
}

@using (Html.BeginForm("Salvar[Nome]", "[Epic]", FormMethod.Post, new { id = "formCreate[Nome]" }))
{
    @Html.HiddenFor(m => m.Id)
    <div class="page">
        <div class="page-header">
            <h1 class="page-title">
                @(Model.Id > 0 ? "EDITAR [NOME AMIGÁVEL]" : "INCLUIR [NOME AMIGÁVEL]")
                <ol class="breadcrumb" style="font-size:initial;">
                    <li class="breadcrumb-item"><a href="@Url.Action("Index", "Home")">Dashboard</a></li>
                    <li class="breadcrumb-item"><a href="@Url.Action("[Nome]", "[Epic]")">Consultar [NomeAmigavel]</a></li>
                    <li class="breadcrumb-item active">@(Model.Id > 0 ? "Editar" : "Incluir")</li>
                </ol>
            </h1>
        </div>
        <div class="page-content">
            <div class="panel">
                <div class="panel-body">
                    <div class="row">
                        <div class="col-md-12">
                            @if (!ViewData.ModelState.IsValid)
                            { @Html.ValidationSummary(true, "", new { @class = "text-danger" }) }
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="[Propriedade]">[Label]*:</label>
                                @Html.TextBoxFor(m => m.[Propriedade], new { @class = "form-control", @placeholder = "[Placeholder]", @maxlength = "[tamanho]", @autocomplete = "off" })
                                @Html.ValidationMessageFor(m => m.[Propriedade], "", new { @class = "text-danger" })
                            </div>
                        </div>
                        <div class="col-md-6">
                            <label style="display:block; margin-bottom:10px;">Status:</label>
                            <div class="form-group">
                                <div class="radio-custom radio-default radio-inline">
                                    @Html.RadioButtonFor(m => m.Ativo, true, new { @id = "statusSim" })
                                    <label for="statusSim">Ativo</label>
                                </div>
                                <div class="radio-custom radio-default radio-inline">
                                    @Html.RadioButtonFor(m => m.Ativo, false, new { @id = "statusNao" })
                                    <label for="statusNao">Inativo</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-group row">
                <div class="col-md-12" style="text-align:center;">
                    <a href="@Url.Action("[Nome]", "[Epic]")" class="btn btn-primary">Voltar</a>
                    @if (Model.Id > 0)
                    { <button type="button" id="btnInativar" class="btn btn-danger">Inativar</button> }
                    <button type="submit" class="btn btn-primary">Salvar</button>
                </div>
            </div>
        </div>
    </div>
}

@section scripts {
    <script type="text/javascript">
        $(document).ready(function () {
            var apenasLeitura = '@ViewBag.ApenasLeitura';
            if (apenasLeitura != null && apenasLeitura === 'True') {
                $(':input').attr('disabled', 'disabled');
            }
            $('#btnInativar').click(function () {
                swal({
                    title: "Deseja inativar este(a) [NomeAmigavel]?",
                    text: "Esta ação não exclui o registro, apenas o inativa.",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonClass: "btn-danger",
                    confirmButtonText: 'Inativar',
                    cancelButtonText: 'Cancelar',
                    closeOnConfirm: false
                },
                function () {
                    $.getJSON('@Url.Action("SetarInativo[Nome]", "[Epic]")', { id: $('#Id').val() }, function (data) {
                        if (data.httpStatusCode == 200) {
                            swal("Inativado!", "Registro inativado com sucesso.", "success");
                            setTimeout(function () { window.location = '@Url.Action("[Nome]", "[Epic]")'; }, 1500);
                        } else { swal("Erro", data.Message, "error"); }
                    });
                });
            });
        });
    </script>
}
```

---

## 15. Sitemap

```xml
<!-- Localizar o bloco do Epic e adicionar dentro dele: -->
<mvcSiteMapNode title="[NomeAmigavel]" controller="[EpicController]" action="[Nome]" />
```

---

## 16. Script SQL Manual

```sql
-- Arquivo: VSEGURADORA.Infra.Database/[NomeMigration].sql
-- NUNCA adicionar prefixo "tb_". Usar o nome EXATO da documentação técnica.

CREATE TABLE [nome_tabela] (
    id               INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    [coluna]         [tipo]            [NULL|NOT NULL],
    data_atualizacao DATETIME          NOT NULL DEFAULT GETDATE()
);

-- Rollback:
-- DROP TABLE [nome_tabela];
```

---

## 17. Teste Unitário (MSTest + Moq)

```csharp
// VSEGURADORA.Core.Tester/Testes/[Nome]BusinessTester.cs
[TestClass]
[TestCategory("[Nome]Business")]
public class [Nome]BusinessTester
{
    private Mock<IUnitOfWork> _mockUoW;
    private Mock<I[Nome]Repository> _mockRepository;
    private [Nome]Business _business;

    [TestInitialize]
    public void Setup()
    {
        AutenticacaoHelper.isTest = true;
        AutenticacaoHelper.usuarioTest = new Usuario { Id = 1, Nome = "Usuário Teste", Login = "teste" };
        _mockRepository = new Mock<I[Nome]Repository>();
        _mockUoW = new Mock<IUnitOfWork>();
        _mockUoW.Setup(u => u.[Nome]s).Returns(_mockRepository.Object);
        _business = new [Nome]Business(_mockUoW.Object);
    }

    [TestMethod]
    public void Salvar_ComDadosValidos_DeveInserirECommit()
    {
        var entidade = new [Nome] { /* propriedades mínimas válidas */ };
        _business.Salvar(entidade);
        _mockRepository.Verify(r => r.Inserir(It.IsAny<[Nome]>()), Times.Once);
        _mockUoW.Verify(u => u.Commit(), Times.Once);
    }

    [TestMethod]
    [ExpectedException(typeof(ArgumentNullException))]
    public void Salvar_ComEntidadeNula_DeveLancarArgumentNullException()
    {
        _business.Salvar(null);
    }

    [TestMethod]
    [ExpectedException(typeof(BusinessException))]
    public void Salvar_ComRegraViolada_DeveLancarBusinessException()
    {
        var entidade = new [Nome] { /* campo inválido */ };
        _business.Salvar(entidade);
    }

    [TestMethod]
    public void Excluir_ComIdValido_DeveDeletarECommit()
    {
        _mockRepository.Setup(r => r.ObterPorId(It.IsAny<int>()))
                        .Returns(new [Nome] { Id = 1 });
        _business.Excluir(1);
        _mockRepository.Verify(r => r.Deletar(1), Times.Once);
        _mockUoW.Verify(u => u.Commit(), Times.Once);
    }

    // Um teste por critério de aceitação (CA-01, CA-02, ...)
}
```
