using System.Runtime.InteropServices;
using FluentValidation;

namespace Limeyfy.API.Endpoints.Auth.Update;

public class Request
{
    [FromHeader(IsRequired = false)]
    public string? Id { get; set; } = String.Empty;
    public string FirstName { get; set; }
    public string LastName { get; set; }
    
    public string? Company { get; set; }
}

public class Validator : Validator<Request>
{
    public Validator()
    {
        RuleFor(x => x.FirstName)
            .NotEmpty().WithMessage("your name is required!")
            .MinimumLength(3).WithMessage("firstname is too short!");
        
        RuleFor(x => x.LastName)
            .NotEmpty().WithMessage("your name is required!")
            .MinimumLength(3).WithMessage("lastname is to short!");
    }
}


public class Response
{
    public string Status { get; set; }
    public string Message { get; set; }
}