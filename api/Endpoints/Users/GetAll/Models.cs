using Microsoft.AspNetCore.Mvc;

namespace Limeyfy.API.Endpoints.Users.GetAll;

public class Request
{
    [FromQuery]
    public string? Username { get; set; }
}