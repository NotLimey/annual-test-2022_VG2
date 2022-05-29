using Limeyfy.API.Models.Application;
using Limeyfy.API.Services.Auth;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;

namespace Limeyfy.API.Endpoints.Roles.RemoveFromRole;

public class Endpoint : Endpoint<Request, Response>
{
    private readonly List<string> _roles = new() { "Admin", "User", "Limeyfy", "UnoMarine", "Finance" };
    
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly RoleManager<ApplicationRole> _roleManager;
    private readonly IUserService _userService;

    public Endpoint(UserManager<ApplicationUser> userManager, IUserService userService, RoleManager<ApplicationRole> roleManager)
    {
        _userManager = userManager;
        _userService = userService;
        _roleManager = roleManager;
    }

    public override void Configure()
    {
        Post("/role/remove-from");
        AuthSchemes(JwtBearerDefaults.AuthenticationScheme);
        Roles("Admin");
    }
    
    public override async Task HandleAsync(Request r, CancellationToken c)
    {
        if(!_roles.Contains(r.Role))
            ThrowError("Role doesnt exist");
        
        if (!await _roleManager.RoleExistsAsync(r.Role))
        {
            await  _roleManager.CreateAsync(new ApplicationRole(r.Role));
        }
        
        ApplicationUser user = await _userManager.FindByIdAsync(r.Id);
        await _userManager.RemoveFromRoleAsync(user, r.Role);
        
        await SendAsync(new Response()
        {
            Status = "Success",
            Message = "Removed from role!"
        });
    }
}