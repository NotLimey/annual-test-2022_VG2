using Limeyfy.API.Data;
using Limeyfy.API.Models.Limeyfy;
using Microsoft.EntityFrameworkCore;

namespace Limeyfy.API.Services.Limeyfy.Expences;

public class ExpenseService : IExpenseService
{
    private readonly LimeyfyDbContext _context;

    public ExpenseService(LimeyfyDbContext context)
    {
        _context = context;
    }

    public async Task<Expense?> GetExpense(string id) => await _context.Expenses.FirstOrDefaultAsync(x => x.Id == id);

    public async Task<List<Expense>> GetExpenses() => await _context.Expenses.ToListAsync();

    public async Task<Expense> CreateExpense(Expense expense)
    {
        _context.Expenses.Add(expense);
        await _context.SaveChangesAsync();
        return expense;
    }
}