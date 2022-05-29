using Limeyfy.API.Models.Limeyfy;

namespace Limeyfy.API.Services.Limeyfy.Expences;

public interface IExpenseService
{
    Task<Expense?> GetExpense(string id);
    
    Task<List<Expense>> GetExpenses();
    
    Task<Expense> CreateExpense(Expense expense);
}