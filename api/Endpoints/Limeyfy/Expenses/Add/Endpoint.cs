using Limeyfy.API.Models.Limeyfy;
using Limeyfy.API.Services.Limeyfy.Expences;

namespace Limeyfy.API.Endpoints.Limeyfy.Expenses.Add;

public class Endpoint : Endpoint<Request, Response>
{
    private readonly IExpenseService _expenseRepository;

    public Endpoint(IExpenseService expenseRepository)
    {
        _expenseRepository = expenseRepository;
    }

    public override void Configure()
    {
        Post("/expenses");
        AllowAnonymous();
    }
    
    public override async Task HandleAsync(Request r, CancellationToken c)
    {
        var expense = new Expense
        {
            Amount = r.Amount,
            Description = r.Description,
            Date = DateTime.Parse(r.Date).ToUniversalTime(),
            Category = r.Category,
            To = r.To,
            Why = r.Why,
            ToLink = r.ToLink,
            UserId = ""
        };
        
        await _expenseRepository.CreateExpense(expense);
        
        await SendAsync(new Response()
        {
            
        });
    }
}