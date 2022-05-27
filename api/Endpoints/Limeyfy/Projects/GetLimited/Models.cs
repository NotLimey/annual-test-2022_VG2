namespace Limeyfy.API.Endpoints.Limeyfy.Projects.GetLimited;

public class Request
{
    [FromHeader]
    public string client_secret { get; set; }
}