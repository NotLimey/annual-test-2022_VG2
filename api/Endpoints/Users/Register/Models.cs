using FluentValidation;

namespace Limeyfy.API.Endpoints.Auth.Register;

public class Request
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string UserName { get; set; }
    public string Password { get; set; }
    
    public string Company { get; set; }
}

public class Validator : Validator<Request>
{
    public Validator()
    {
        RuleFor(x => x.FirstName)
            .NotEmpty().WithMessage("your name is required!")
            .MinimumLength(3).WithMessage("name is too short!");
        
        RuleFor(x => x.LastName)
            .NotEmpty().WithMessage("your name is required!")
            .MinimumLength(3).WithMessage("name is too short!");

        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("email address is required!")
            .EmailAddress().WithMessage("the format of your email address is wrong!");

        RuleFor(x => x.UserName)
            .NotEmpty().WithMessage("a username is required!")
            .MinimumLength(3).WithMessage("username is too short!")
            .MaximumLength(15).WithMessage("username is too long!");

        RuleFor(x => x.Password)
            .NotEmpty().WithMessage("a password is required!")
            .MinimumLength(8).WithMessage("password is too short!")
            .MaximumLength(112).WithMessage("password is too long!");
    }
}


public class Response
{
    public string Status { get; set; }
    public string Message { get; set; }
}


