using Limeyfy.API.Models.Application;
using Limeyfy.API.Models.Limeyfy;
using Limeyfy.API.Services.Limeyfy.Hours;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;

namespace Limeyfy.API.Endpoints.Limeyfy.Hours.Add;

public class Endpoint : Endpoint<Request, Response>
{
    private readonly IHourService _hourService;
    private readonly UserManager<ApplicationUser> _userManager;

    public Endpoint(IHourService hourService, UserManager<ApplicationUser> userManager)
    {
        _hourService = hourService;
        _userManager = userManager;
    }

    public override void Configure()
    {
        Post("/limeyfy/hours");
        AuthSchemes(JwtBearerDefaults.AuthenticationScheme);
        Policies("limeyfy");
    }

    public override async Task HandleAsync(Request r, CancellationToken c)
    {
        var user = await _userManager.FindByNameAsync(User.Identity.Name);
        
        if(user == null)
            ThrowError("Unauthorized");

        var hour = new Hour
        {
            Date = DateTime.Parse(r.Date).ToUniversalTime(),
            Description = r.Description,
            Hours = r.Hours,
            ProjectId = r.ProjectId,
            UserId = user.Id,
        };
        
        await _hourService.CreateHourAsync(hour);
        
        await SendAsync(new Response()
        {
            Message = "Created hour successfully!",
            Status = "Success"
        });
    }
}