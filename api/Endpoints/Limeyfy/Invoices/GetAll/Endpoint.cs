using System.Text.Json;
using Limeyfy.API.DTOs.Limeyfy;
using Limeyfy.API.Models.Application;
using Limeyfy.API.Services.Limeyfy.Companies;
using Limeyfy.API.Services.Limeyfy.Invoices;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace Limeyfy.API.Endpoints.Limeyfy.Invoices.GetAll;

public class Endpoint : Endpoint<Request, List<InvoiceDto>>
{
    private readonly IInvoiceService _invoiceService;
    private readonly ICompanyService _companyService;

    public Endpoint(IInvoiceService invoiceService, ICompanyService companyService)
    {
        _invoiceService = invoiceService;
        _companyService = companyService;
    }

    public override void Configure()
    {
        Get("/invoices");
        AuthSchemes(JwtBearerDefaults.AuthenticationScheme);
        Policies("finance");
    }

    public override async Task HandleAsync(Request r, CancellationToken c)
    {
        var invoices = new List<InvoiceDto>();
        var invoiceResult = await _invoiceService.GetInvoicesAsync();

        foreach (var invoice in invoiceResult)
        {
            var company = await _companyService.GetCompanyAsync(invoice.CompanyId);
            var invoiceLines = JsonSerializer.Deserialize<List<InvoiceLineDto>>(invoice.InvoiceLines);
            invoices.Add(new InvoiceDto(invoice, company, invoiceLines));
        }
        
        await SendAsync(invoices);
    }
}