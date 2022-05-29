using Limeyfy.API.Models.Limeyfy;

namespace Limeyfy.API.Services.Limeyfy.Expences;

public interface IExpenseService
{
    Task<Expense?> GetExpenseAsync(string id);
    
    Task<List<Expense>> GetExpensesAsync();
    
    Task<Expense> CreateExpenseAsync(Expense expense);
}