using Limeyfy.API.Models.Application;
using Limeyfy.API.Services.Limeyfy.Companies;
using Mapster;

namespace Limeyfy.API.DTOs.Auth;

public class GetCompany
{
    private readonly ICompanyService _companyService;

    public GetCompany(ICompanyService companyService)
    {
        _companyService = companyService;
    }
}

public class UserDtoFull
{
    public string Id { get; set; }
    
    public string UserName { get; set; }
    
    public string FirstName { get; set; }
    
    public string LastName { get; set; }
    
    public string Email { get; set; }
    
    public List<string> Roles { get; set; }
    
    public List<string> Claims { get; set; }
    
    [AdaptIgnore]
    public Company? Company { get; set; }
    
}