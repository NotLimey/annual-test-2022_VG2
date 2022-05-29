using System.Globalization;
using Limeyfy.API.Services.Limeyfy.Invoices;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace Limeyfy.API.Endpoints.Statistics.Revenue.FullStatistics;

public class Endpoint : Endpoint<Request, Response>
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
        
        var months = new List<DateTime>();
        var currentMonth = DateTime.Now.Month;
        var currentYear = DateTime.Now.Year;
        for (var i = 0; i < 12; i++)
        {
            var month = currentMonth - i;
            var year = currentYear;
            if (month < 1)
            {
                month = 12 + month;
                year = year - 1;
            }
            months.Add(new DateTime(year, month, 1));
        }

        months.Reverse();
        
        var revenue = new List<StatisticDataSet>();
        foreach (var month in months)
        {
            var total = invoices.Where(i => i.CreatedAt.Month == month.Month && i.CreatedAt.Year == month.Year && i.IsPaid).Sum(i => i.Total);
            revenue.Add(new StatisticDataSet
            {
                Label = month.ToString("MMMM", CultureInfo.InvariantCulture),
                Value = total
            });
        }
        var thisYearRevenue = invoices.Where(i => i.CreatedAt.Year == DateTime.Now.Year && i.IsPaid).Sum(i => i.Total);
        var lastYearRevenue = invoices.Where(i => i.CreatedAt.Year == DateTime.Now.Year - 1 && i.IsPaid).Sum(i => i.Total);
        var last30DaysRevenue = invoices.Where(i => i.CreatedAt >= DateTime.Now.AddDays(-30) && i.IsPaid).Sum(i => i.Total);
        var totalRevenue = invoices.Where(x => x.IsPaid).Sum(i => i.Total);
        
        await SendAsync(new Response()
        {
            ThisYearDataSets = revenue,
            ThisYear = thisYearRevenue,
            LastYear = lastYearRevenue,
            Last30Days = last30DaysRevenue,
            Total = totalRevenue
        });
    }
}