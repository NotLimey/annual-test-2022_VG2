using Limeyfy.API.Models.Application;
using Limeyfy.API.Services.Limeyfy.Companies;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace Limeyfy.API.Endpoints.Companies.Update;

public class Endpoint : Endpoint<Request, Response>
{
    
    private readonly ICompanyService _companyService;

    public Endpoint(ICompanyService companyService)
    {
        _companyService = companyService;
    }

    public override void Configure()
    {
        Put("/companies");
        AuthSchemes(JwtBearerDefaults.AuthenticationScheme);
        Roles("Admin");
    }
    
    public override async Task HandleAsync(Request r, CancellationToken c)
    {
        var company = await _companyService.GetCompanyAsync(r.Id);
        company.City = r.City;
        company.Country = r.Country;
        company.Created = DateTime.UtcNow;
        company.Description = r.Description;
        company.Latitude = r.Latitude;
        company.Logo = r.Logo;
        company.Longitude = r.Longitude;
        company.Name = r.Name;
        company.BankNr = r.BankNr;
        company.PhoneNumber = r.PhoneNumber;
        company.ContactEmail = r.ContactEmail;
        company.FullAddress = r.StreetAddress + ", " + r.City + ", " + r.Country;
        company.InvoiceEmail = r.InvoiceEmail;
        company.OrgNr = r.OrgNr;
        company.StreetAddress = r.StreetAddress;
        company.ZipCode = r.ZipCode;
        
        var result = await _companyService.UpdateCompanyAsync(company);

        if (!result)
        {
            ThrowError("Couldn't update company, server error.");
        }
    
        await SendAsync(new Response()
        {
            Message = "Updated company successfully",
            Status = "Successful"
        });
    }
}