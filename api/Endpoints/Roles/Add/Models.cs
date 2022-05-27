namespace Limeyfy.API.Endpoints.Roles.Add;

public class Request
{
    public string Id { get; set; }
    
    public string Role { get; set; }
}
public class Response
{
    public string Status { get; set; }
    public string Message { get; set; }
}