using Microsoft.AspNetCore.Identity;

namespace Limeyfy.API.Models.Application;

public class ApplicationUser : IdentityUser
{
    public string FirstName { get; set; } = String.Empty;
    
    public string LastName { get; set; } = String.Empty;
    
    public string Company { get; set; } = String.Empty;
}