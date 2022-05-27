using Limeyfy.API.Models.Application;
using Limeyfy.API.Services.Limeyfy.Companies;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace Limeyfy.API.Endpoints.Companies.Add;

public class Endpoint : Endpoint<Request, Response>
{
    
    private readonly ICompanyService _companyService;

    public Endpoint(ICompanyService companyService)
    {
        _companyService = companyService;
    }

    public override void Configure()
    {
        Post("/company");
        AuthSchemes(JwtBearerDefaults.AuthenticationScheme);
        Roles("Admin");
    }
    
    public override async Task HandleAsync(Request r, CancellationToken c)
    {
        Company company = new Company
        {
            City = r.City,
            Country = r.Country,
            Created = DateTime.UtcNow,
            Description = r.Description,
            Latitude = r.Latitude,
            Logo = r.Logo,
            Longitude = r.Longitude,
            Name = r.Name,
            BankNr = r.BankNr,
            PhoneNumber = r.PhoneNumber,
            ContactEmail = r.ContactEmail,
            FullAddress = r.StreetAddress + ", " + r.City + ", " + r.Country,
            InvoiceEmail = r.InvoiceEmail,
            OrgNr = r.OrgNr,
            StreetAddress = r.StreetAddress,
            ZipCode = r.ZipCode
        };
        
         await _companyService.AddCompanyAsync(company);
    
        await SendAsync(new Response()
        {
            Message = "Created company successfully",
            Status = "Successful"
        });
    }
}