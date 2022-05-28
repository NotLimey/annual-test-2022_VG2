using FluentValidation;

namespace Limeyfy.API.Endpoints.Auth.ChangePassword;

public class Request
{
    public string OldPassword { get; set; }
    
    public string NewPassword { get; set; }
    
    public string ConfirmPassword { get; set; }
}

public class Validator : Validator<Request>
{
    public Validator()
    {
        RuleFor(x => x.OldPassword)
            .NotEmpty().WithMessage("a old password is required!");

        RuleFor(x => x.NewPassword)
            .NotEmpty().MinimumLength(8).WithMessage("a password is required!");
        
        RuleFor(x => x.ConfirmPassword)
            .NotEmpty().Equal(x => x.NewPassword).WithMessage("confirm password has to be equal to new password!");
    }
}

public class Response
{
    public string Status { get; set; }
    public string Message { get; set; }
}