using System.Text.Json;
using Limeyfy.API.DTOs.Limeyfy;
using Limeyfy.API.Models.Application;
using Limeyfy.API.Models.Limeyfy;
using Limeyfy.API.Services.Limeyfy.Companies;
using Limeyfy.API.Services.Limeyfy.Invoices;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;

namespace Limeyfy.API.Endpoints.Limeyfy.Invoices.Add;

public class Endpoint : Endpoint<Request, Response>
{
    private readonly IInvoiceService _invoiceService;
    private readonly ICompanyService _companyService;
    private readonly UserManager<ApplicationUser> _userManager;

    public Endpoint(IInvoiceService invoiceService, UserManager<ApplicationUser> userManager, ICompanyService companyService)
    {
        _invoiceService = invoiceService;
        _userManager = userManager;
        _companyService = companyService;
    }

    public override void Configure()
    {
        Post("/invoices");
        AuthSchemes(JwtBearerDefaults.AuthenticationScheme);
        Policies("finance");
    }


    public override async Task HandleAsync(Request r, CancellationToken c)
    {
        var invoices = await _invoiceService.GetInvoicesAsync();
        var invoiceLines = new List<InvoiceLineDto>();
        foreach (var invoiceLine in r.InvoiceLines)
        {
            invoiceLines.Add(new InvoiceLineDto
            {
                Description = invoiceLine.Description,
                Hours = invoiceLine.Hours,
                Price = invoiceLine.Hours * invoiceLine.Rate,
                Rate = invoiceLine.Rate
            });
        }
        var total = invoiceLines.Sum(x => x.Price);

        var serializedLines = JsonSerializer.Serialize(invoiceLines);

        var user = await _userManager.FindByNameAsync(User.Identity.Name);

        var invoiceId = invoices.Max(x => x.InvoiceNumber) + 1;
        
        var invoice = new Invoice
        {
            InvoiceLines = serializedLines,
            CreatedAt = DateTime.UtcNow,
            BankAccount = r.BankAccount,
            CompanyId = r.CompanyId,
            DueDate = DateTime.Parse(r.DueDate).ToUniversalTime(),
            InvoiceNumber = invoiceId,
            IsPaid = r.IsPaid,
            OrganizationId = r.OrganizationId,
            UseMva = r.UseMva,
            CreatedBy = user != null ? user.UserName : "",
            Amount = total,
            Mva = r.UseMva ? total * 0.25 : 0,
            Total = r.UseMva ? total * 1.25 : total,
            Title = r.Title,
            Description = r.Description
        };
        
        // check if due date is in the past
        if (invoice.DueDate < DateTime.UtcNow && r.IsPaid)
        {
            invoice.PayementDate = invoice.DueDate;
        }

        if (r.IsPaid && invoice.DueDate > DateTime.UtcNow)
            invoice.PayementDate = DateTime.UtcNow;
        
        var company = await _companyService.GetCompanyAsync(invoice.CompanyId);
        var invoicePdfData = new InvoicePdfDataModel
        {
            Amount = invoice.Amount,
            Mva = invoice.Mva,
            Title = invoice.Title,
            Total = invoice.Total,
            BankAccount = invoice.BankAccount,
            CompanyCity = company.City,
            CompanyName = company.Name,
            CreatedAt = invoice.CreatedAt,
            DueDate = invoice.DueDate,
            InvoiceLines = invoiceLines,
            InvoiceNumber = invoice.InvoiceNumber,
            OrganizationId = invoice.OrganizationId,
            CompanyStreetAddress = company.StreetAddress,
            CompanyZipCode = company.ZipCode,
            UseMva = invoice.UseMva
        };
        invoice.PdfData = JsonSerializer.Serialize(invoicePdfData);
        
        var savedInvoice = await _invoiceService.CreateInvoiceAsync(invoice);
        
        await SendAsync(new Response()
        {
            Message = "Created invoice successfully",
            Status = "Successful"
        });
    }
}