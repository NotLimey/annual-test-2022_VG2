using Limeyfy.API.Models.Application;

namespace Limeyfy.API.Services.Limeyfy.Companies;

public interface ICompanyService
{
    Task<List<Company>> GetCompaniesAsync();

    Task<Company> AddCompanyAsync(Company company);

    Task<bool> UpdateCompanyAsync(Company company);

    Task<Company?> GetCompanyAsync(string id);
}