using System.Security.Claims;
using System.Text.Json;
using Limeyfy.API.Models.Application;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;

namespace Limeyfy.API.Endpoints.Users.GetUserRoles;

public class Endpoint : Endpoint<Request, Response>
{
    private readonly UserManager<ApplicationUser> _userManager;

    public Endpoint(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
    }

    public override void Configure()
    {
        Get("/user/get-user-roles");
        AuthSchemes(JwtBearerDefaults.AuthenticationScheme);
    }
    
    public override async Task HandleAsync(Request r, CancellationToken c)
    {
        var user = await _userManager.FindByNameAsync(User.Identity?.Name);
        if(user == null)
            ThrowError("User not found");
        
        
        
        var roles = await _userManager.GetRolesAsync(user);
        var result = roles.ToList();
        
        var claimRoles = User.Claims.Select(claim =>
        {
            if (claim.Type == "http://schemas.microsoft.com/ws/2008/06/identity/claims/role")
            {
                return claim.Value;
            }

            return "";
        }).ToList();
        
        await SendAsync(new Response()
        {
            Claims = claimRoles.Where(x => x != "").ToList(),
            Roles = result
        });
    }
}