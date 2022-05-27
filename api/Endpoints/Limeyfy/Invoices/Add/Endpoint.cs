using System.Text.Json;
using Limeyfy.API.DTOs.Limeyfy;
using Limeyfy.API.Models.Application;
using Limeyfy.API.Models.Limeyfy;
using Limeyfy.API.Services.Limeyfy.Invoices;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;

namespace Limeyfy.API.Endpoints.Limeyfy.Invoices.Add;

public class Endpoint : Endpoint<Request, Response>
{
    private readonly IInvoiceService _invoiceService;
    private readonly UserManager<ApplicationUser> _userManager;

    public Endpoint(IInvoiceService invoiceService, UserManager<ApplicationUser> userManager)
    {
        _invoiceService = invoiceService;
        _userManager = userManager;
    }

    public override void Configure()
    {
        Post("/limeyfy/invoice");
        AuthSchemes(JwtBearerDefaults.AuthenticationScheme);
        Policies("finance");
    }


    public override async Task HandleAsync(Request r, CancellationToken c)
    {
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
        
        var invoice = new Invoice
        {
            InvoiceLines = serializedLines,
            CreatedAt = DateTime.UtcNow,
            BankAccount = r.BankAccount,
            CompanyId = r.CompanyId,
            DueDate = DateTime.Parse(r.DueDate).ToUniversalTime(),
            InvoiceNumber = r.InvoiceNumber,
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
        var savedInvoice = await _invoiceService.CreateInvoiceAsync(invoice);
        
        await SendAsync(new Response()
        {
            Message = "Created invoice successfully",
            Status = "Successful"
        });
    }
}