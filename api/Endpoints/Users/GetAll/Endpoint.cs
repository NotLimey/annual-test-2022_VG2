using Limeyfy.API.DTOs.Auth;
using Limeyfy.API.Models.Application;
using Limeyfy.API.Services.Auth;
using Mapster;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Limeyfy.API.Endpoints.Users.GetAll;

public class Endpoint : Endpoint<Request, List<UserDto>>
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IUserService _userService;

    public Endpoint(UserManager<ApplicationUser> userManager, IUserService userService)
    {
        _userManager = userManager;
        _userService = userService;
    }

    public override void Configure()
    {
        Get("/user/users");
        AuthSchemes(JwtBearerDefaults.AuthenticationScheme);
        Roles("Admin");
    }

    public override async Task HandleAsync(Request r, CancellationToken c)
    {
        var users = await _userService.GetMappedUsers();
        if(r.Username != null)
            users = users.Where(u => u.UserName.ToLower().Contains(r.Username.ToLower())).ToList();

        users = users.OrderBy(u => u.UserName).ToList();
        
        await SendAsync(users);
    }
}