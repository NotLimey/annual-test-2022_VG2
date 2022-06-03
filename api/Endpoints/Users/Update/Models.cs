using System.Runtime.InteropServices;
using FluentValidation;

namespace Limeyfy.API.Endpoints.Auth.Update;

public class Request
{
    [FromHeader(IsRequired = false)]
    public string? Id { get; set; } = String.Empty;

    public string? FirstName { get; set; } = default!;
    public string? LastName { get; set; } = default!;
    
    public string? Company { get; set; } = default!;
}


public class Response
{
    public string Status { get; set; }
    public string Message { get; set; }
}