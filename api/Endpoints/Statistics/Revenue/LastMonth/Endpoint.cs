using Limeyfy.API.Services.Limeyfy.Invoices;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace Limeyfy.API.Endpoints.Statistics.Revenue;

public class Endpoint : Endpoint<Request, List<StatisticDataSet>>
{
    private readonly IInvoiceService _invoiceService;

    public Endpoint(IInvoiceService invoiceService)
    {
        _invoiceService = invoiceService;
    }

    public override void Configure()
    {
        Get("/statistics/revenue");
        AuthSchemes(JwtBearerDefaults.AuthenticationScheme);
        Policies("finance");
    }

    public override async Task HandleAsync(Request r, CancellationToken c)
    {
        var invoices = await _invoiceService.GetInvoicesAsync();
        // Get invoices where invoice.CreatedAt > startDate && invoice.CreatedAt < endDate
        var startDate = r.StartDate;
        var endDate = r.EndDate;
        var revenue = invoices.Where(i => i.CreatedAt > startDate && i.CreatedAt < endDate);
    
        // get a detailed statistic of revenue by day from startDate to endDate
        var revenueByDay = revenue.GroupBy(i => i.CreatedAt.Date).Select(i => new StatisticDataSet
        {
            Label= i.Key.ToString(),
            Value = i.Sum(invoice => invoice.Total)
        }).ToList();
        
        await SendAsync(revenueByDay);
    }
}