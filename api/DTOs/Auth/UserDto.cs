using Limeyfy.API.Models.Application;
using Mapster;

namespace Limeyfy.API.DTOs.Auth;

public class UserDto
{
    public string Id { get; set; }
    
    public string UserName { get; set; }
    
    public string FirstName { get; set; }
    
    public string LastName { get; set; }
    
    public string Email { get; set; }
    
    [AdaptIgnore]
    public List<string> Roles { get; set; }
    
    [AdaptIgnore]
    public Company? Company { get; set; }
}