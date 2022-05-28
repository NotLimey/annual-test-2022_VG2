using Limeyfy.API.Models.Application;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;

namespace Limeyfy.API.Endpoints.Auth.ChangePassword;

public class Endpoint : Endpoint<Request, Response>
{
    private readonly UserManager<ApplicationUser> _userManager;

    public Endpoint(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
    }

    public override void Configure()
    {
        Put("/auth/change-password");
        AuthSchemes(JwtBearerDefaults.AuthenticationScheme);
    }

    public override async Task HandleAsync(Request r, CancellationToken c)
    {
        var user = await _userManager.FindByNameAsync(User.Identity?.Name);
        if (user == null)
            ThrowError("Unauthorized");
        
        if(r.ConfirmPassword != r.NewPassword)
            ThrowError("Passwords do not match");

        var token = await _userManager.GeneratePasswordResetTokenAsync(user);
        var result = await _userManager.ResetPasswordAsync(user, token, r.NewPassword);
        
        if(!result.Succeeded)
            ThrowError(result.Errors.First().Description);
        
        await SendAsync(new Response()
        {
            Status = "Success",
            Message = "Updated password successfully!"
        });
    }
}