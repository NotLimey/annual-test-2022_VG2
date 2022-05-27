namespace Limeyfy.API.Endpoints.Users.GetUserRoles;

public class Request
{
}

public class Response
{
    public List<string> Roles { get; set; }
    
    public List<string> Claims { get; set; }
}