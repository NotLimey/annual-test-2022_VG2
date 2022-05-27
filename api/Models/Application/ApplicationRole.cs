using Microsoft.AspNetCore.Identity;

namespace Limeyfy.API.Models.Application;

public class ApplicationRole : IdentityRole
{
    public ApplicationRole(string name)
    {
        Name = name;
    } 
}