using Limeyfy.API.Models.Limeyfy;
using Limeyfy.API.Services.Limeyfy.Expences;

namespace Limeyfy.API.Endpoints.Limeyfy.Expenses.GetAll;

public class Endpoint : Endpoint<Request, List<Expense>>
{
    private readonly IExpenseService _expenseRepository;

    public Endpoint(IExpenseService expenseRepository)
    {
        _expenseRepository = expenseRepository;
    }

    public override void Configure()
    {
        Get("/expenses");
        AllowAnonymous();
    }
    
    public override async Task HandleAsync(Request r, CancellationToken c)
    {
        
        var expenses = await _expenseRepository.GetExpensesAsync();
        
        await SendAsync(expenses);
    }
}