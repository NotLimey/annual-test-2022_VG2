using Limeyfy.API.Models.Application;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;

namespace Limeyfy.API.Endpoints.Roles.GetAll;

public class Request
{
    
}

public class Endpoint: Endpoint<Request, List<string>>
{
    private readonly RoleManager<ApplicationRole> _roleManager;

    public Endpoint(RoleManager<ApplicationRole> roleManager)
    {
        _roleManager = roleManager;
    }

    public override void Configure()
    {
        Get("/role/roles");
        AuthSchemes(JwtBearerDefaults.AuthenticationScheme);
        Roles("Admin");
    }

    public override async Task HandleAsync(Request r, CancellationToken c)
     => await SendAsync(_roleManager.Roles.Select(x => x.Name).ToList());
}