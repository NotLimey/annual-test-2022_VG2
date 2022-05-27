using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Limeyfy.API.Models.Application;
using Limeyfy.API.Services.Auth;
using Microsoft.AspNetCore.Identity;
using JwtRegisteredClaimNames = Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames;

namespace Limeyfy.API.Endpoints.Auth.Login;

public class Endpoint : Endpoint<Request, Response>
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
        Post("/user/login");
        AllowAnonymous();
    }
    public override async Task HandleAsync(Request r, CancellationToken c)
    {
        var user = await _userManager.FindByNameAsync(r.UserName);
        if (user == null || !await _userManager.CheckPasswordAsync(user, r.Password))
        {
            ThrowError("Username or password is invalid");
        }
        
        var userRoles = await _userManager.GetRolesAsync(user);

        var authClaims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, user.UserName),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        };

        foreach (var userRole in userRoles)
        {
            authClaims.Add(new Claim(ClaimTypes.Role, userRole));
        }
        
        var token = _userService.GetToken(authClaims, r.RememberMe ?? false);

        await SendAsync(new Response()
        {
            Token = new JwtSecurityTokenHandler().WriteToken(token),
            Expiration = token.ValidTo.ToUniversalTime()
        });
    }
}