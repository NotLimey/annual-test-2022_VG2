using Limeyfy.API.Models.Application;
using Limeyfy.API.Services.Limeyfy.Invoices;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;

namespace Limeyfy.API.Endpoints.Limeyfy.Invoices.Update;

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
        Put("/invoices");
        AuthSchemes(JwtBearerDefaults.AuthenticationScheme);
        Policies("finance");
    }

    public override async Task HandleAsync(Request r, CancellationToken c)
    {
        var invoice = await _invoiceService.GetInvoiceAsync(r.Id);
        if (invoice == null)
        {
            ThrowError("Invoice not found");
        }
        invoice.IsPaid = r.IsPaid;
        if (r.IsPaid)
        {
            invoice.PayementDate = DateTime.UtcNow;
        }
        else
        {
            invoice.PayementDate = new DateTime(8640000000000000).ToUniversalTime();
        }
        
        await _invoiceService.UpdateInvoiceAsync(invoice);
        await SendAsync(new Response()
        {
            Message = "Created invoice successfully",
            Status = "Successful"
        });
    }
}