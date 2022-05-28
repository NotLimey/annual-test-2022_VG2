using Limeyfy.API.Services.Limeyfy.Invoices;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace Limeyfy.API.Endpoints.Statistics.Revenue.LastMonth;

public class Endpoint : Endpoint<Request, List<StatisticDataSet>>
{
    private readonly IInvoiceService _invoiceService;

    public Endpoint(IInvoiceService invoiceService)
    {
        _invoiceService = invoiceService;
    }

    public override void Configure()
    {
        Get("/statistics/revenue/last-month");
        AuthSchemes(JwtBearerDefaults.AuthenticationScheme);
        Policies("finance");
    }

    public override async Task HandleAsync(Request r, CancellationToken c)
    {
        var invoices = await _invoiceService.GetInvoicesAsync();
        // get days from now to 30 days ago
        var days = new List<DateTime>();
        for (var i = 0; i < 30; i++)
        {
            days.Add(DateTime.Now.AddDays(-i));
        }

        days.Reverse();
        
        var revenue = new List<StatisticDataSet>();
        foreach (var day in days)
        {
            var dayRevenue = invoices.Where(i => i.CreatedAt.Date == day.Date).Sum(i => i.Total);
            revenue.Add(new StatisticDataSet
            {
                Label = day.ToShortDateString(),
                Value = dayRevenue
            });
        }
        
        await SendAsync(revenue);
    }
}