using Limeyfy.API.Models.Limeyfy;
using Limeyfy.API.Services.Limeyfy.Hours;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace Limeyfy.API.Endpoints.Limeyfy.Hours.GetAll;

public class Endpoint : Endpoint<Request, List<Hour>>
{
    private readonly IHourService _hourService;

    public Endpoint(IHourService hourService)
    {
        _hourService = hourService;
    }

    public override void Configure()
    {
        Get("/limeyfy/hours");
        AuthSchemes(JwtBearerDefaults.AuthenticationScheme);
        Policies("limeyfy");
    }

    public override async Task HandleAsync(Request r, CancellationToken c) 
    {
        var hours = await _hourService.GetHoursAsync();
        await SendAsync(hours);
    }
}