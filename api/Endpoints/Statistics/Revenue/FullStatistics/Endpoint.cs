using System.Globalization;
using Limeyfy.API.Services.Limeyfy.Expences;
using Limeyfy.API.Services.Limeyfy.Invoices;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace Limeyfy.API.Endpoints.Statistics.Revenue.FullStatistics;

public class Endpoint : Endpoint<Request, Response>
{
    private readonly IInvoiceService _invoiceService;
    private readonly IExpenseService _expenseService;

    public Endpoint(IInvoiceService invoiceService, IExpenseService expenseService)
    {
        _invoiceService = invoiceService;
        _expenseService = expenseService;
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
        var expenses = await _expenseService.GetExpensesAsync();
        
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
        
        var dataSets = new List<StatisticDataSet>();
        foreach (var month in months)
        {
            var monthInvoices = invoices.Where(i => i.CreatedAt.Month == month.Month && i.CreatedAt.Year == month.Year && i.IsPaid);
            var monthExpensesDocs = expenses.Where(e => e.Date.Month == month.Month && e.Date.Year == month.Year);
            var monthRevenue = monthInvoices.Sum(i => i.Total);
            var monthExpenses = monthExpensesDocs.Sum(e => e.Amount);
            
            dataSets.Add(new StatisticDataSet
            {
                Label = month.ToString("MMMM", CultureInfo.InvariantCulture),
                Expense = monthExpenses,
                Income = monthRevenue
            });
        }
        
        
        
        var thisYearRevenue = invoices.Where(i => i.CreatedAt.Year == DateTime.Now.Year && i.IsPaid).Sum(i => i.Total);
        var lastYearRevenue = invoices.Where(i => i.CreatedAt.Year == DateTime.Now.Year - 1 && i.IsPaid).Sum(i => i.Total);
        var last30DaysRevenue = invoices.Where(i => i.CreatedAt >= DateTime.Now.AddDays(-30) && i.IsPaid).Sum(i => i.Total);
        var totalRevenue = invoices.Where(x => x.IsPaid).Sum(i => i.Total);
        
        await SendAsync(new Response()
        {
            ThisYearDataSets = dataSets,
            ThisYear = thisYearRevenue,
            LastYear = lastYearRevenue,
            Last30Days = last30DaysRevenue,
            Total = totalRevenue,
        });
    }
}