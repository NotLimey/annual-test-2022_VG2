using Limeyfy.API.Data;
using Limeyfy.API.Models.Application;
using Microsoft.EntityFrameworkCore;

namespace Limeyfy.API.Services.Limeyfy.Companies;

public class CompanyService : ICompanyService
{
    private readonly ApplicationDbContext _dbContext;

    public CompanyService(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<Company>> GetCompaniesAsync() => await _dbContext.Companies.ToListAsync();

    public async Task<Company> AddCompanyAsync(Company company)
    {
        await _dbContext.Companies.AddAsync(company);
        await _dbContext.SaveChangesAsync();
        return company;
    }

    public async Task<bool> UpdateCompanyAsync(Company company)
    {
        _dbContext.Companies.Update(company);
        var result = await _dbContext.SaveChangesAsync();
        return result > 0;
    }

    public async Task<Company?> GetCompanyAsync(string id) =>
        await _dbContext.Companies.FirstOrDefaultAsync(x => x.Id == id);
}