using Limeyfy.API.Models.Application;
using Limeyfy.API.Services.Limeyfy.Companies;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace Limeyfy.API.Endpoints.Companies.GetAll;

public class Endpoint : Endpoint<Request, List<Company>>
{
    
    private readonly ICompanyService _companyService;

    public Endpoint(ICompanyService companyService)
    {
        _companyService = companyService;
    }

    public override void Configure()
    {
        Get("/company/companies");
        AuthSchemes(JwtBearerDefaults.AuthenticationScheme);
        Roles("Admin");
    }
    
    public override async Task HandleAsync(Request r, CancellationToken c)
    {
        var companies = await _companyService.GetCompaniesAsync();
    
        await SendAsync(companies);
    }
}