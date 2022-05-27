using Limeyfy.API.Models.Application;
using Microsoft.AspNetCore.Identity;

namespace Limeyfy.API.Endpoints.Auth.Register;

public class Endpoint : Endpoint<Request, Response>
{
    private readonly UserManager<ApplicationUser> _userManager;

    public Endpoint(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
    }

    public override void Configure()
    {
        Post("/auth/register");
        AllowAnonymous();
    }
    
    public override async Task HandleAsync(Request r, CancellationToken c)
    {
        ApplicationUser user = new()
        {
            Email = r.Email,
            FirstName = r.FirstName,
            LastName = r.LastName,
            SecurityStamp = Guid.NewGuid().ToString(),
            UserName = r.UserName,
            Company = IsGuid(r.Company) ? r.Company : ""
        };

        var result = await _userManager.CreateAsync(user, r.Password);

        if (!result.Succeeded)
        {
            foreach (var error in result.Errors)
            {
                AddError(error.Description);
            }
        }
        
        ThrowIfAnyErrors();
        
        await SendAsync(new Response()
        {
            Status = "Success",
            Message = "User created successfully!"
        });
    }
    
    private static bool IsGuid(string value)
    {
        Guid x;
        return Guid.TryParse(value, out x);
    }
}