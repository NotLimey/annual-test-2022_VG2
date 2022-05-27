using Limeyfy.API.Models.Application;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;

namespace Limeyfy.API.Endpoints.Auth.Update;

public class Enpoint : Endpoint<Request, Response>
{
    private readonly UserManager<ApplicationUser> _userManager;

    public Enpoint(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
    }

    public override void Configure()
    {
        Put("/auth/user");
        AuthSchemes(JwtBearerDefaults.AuthenticationScheme);
    }

    public override async Task HandleAsync(Request r, CancellationToken c)
    {
        var user = await _userManager.FindByNameAsync(User.Identity?.Name);

        if (user == null)
        {
            ThrowError("You're not authorized");
            return;
        }

        if (!string.IsNullOrEmpty(r.Id))
        {
            var roles = await _userManager.GetRolesAsync(user);
            if(!roles.Contains("Admin"))
                ThrowError("You're not authorized");

            var editUser = await _userManager.FindByIdAsync(r.Id);
            if(editUser == null)
                ThrowError("User with id not found");
            
            editUser.FirstName = r.FirstName;
            editUser.LastName = r.LastName;
            if(r.Company != null)
                editUser.Company = r.Company;
            
            var editResult = await _userManager.UpdateAsync(user);

            if (!editResult.Succeeded)
            {
                foreach (var error in editResult.Errors)
                {
                    AddError(error.Description);
                }
            }
        
            ThrowIfAnyErrors();
        
            await SendAsync(new Response()
            {
                Status = "Success",
                Message = "Updated user!"
            });
            return;
        }

        user.FirstName = r.FirstName;
        user.LastName = r.LastName;

        var result = await _userManager.UpdateAsync(user);

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
            Message = "Updated user!"
        });
    }
}