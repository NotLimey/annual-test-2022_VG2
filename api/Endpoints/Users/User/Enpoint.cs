using Limeyfy.API.DTOs.Auth;
using Limeyfy.API.Models.Application;
using Limeyfy.API.Services.Auth;
using Mapster;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;

namespace Limeyfy.API.Endpoints.Auth.User;

public class Enpoint : Endpoint<Request, UserDtoFull>
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IUserService _userService;

    public Enpoint(UserManager<ApplicationUser> userManager, IUserService userService)
    {
        _userManager = userManager;
        _userService = userService;
    }

    public override void Configure()
    {
        Get("/users/user");
        AuthSchemes(JwtBearerDefaults.AuthenticationScheme);
    }

    public override async Task HandleAsync(Request r, CancellationToken c)
    {
        ApplicationUser? user = await _userManager.FindByNameAsync(User.Identity?.Name);

        if (user == null)
        {
            ThrowError("You're not authorized");
            return;
        }

        var mappedUser = await _userService.GetMappedUser(user, User);
        
        await SendAsync(mappedUser);
    }
}