namespace Limeyfy.API.Endpoints.Auth.Login;

using FluentValidation;
public class Request
{
    public string UserName { get; set; }
    public string Password { get; set; }
    
    public bool? RememberMe { get; set; }
}

public class Validator : Validator<Request>
{
    public Validator()
    {
        RuleFor(x => x.UserName)
            .NotEmpty().WithMessage("a username is required!");

        RuleFor(x => x.Password)
            .NotEmpty().WithMessage("a password is required!");
    }
}


public class Response
{
    public string Token { get; set; }
    public DateTime Expiration { get; set; }
}


