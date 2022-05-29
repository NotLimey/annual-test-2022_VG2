namespace Limeyfy.API.Endpoints.Limeyfy.Hours.Add;

public class Request
{
    public string ProjectId { get; set; }
    
    public string Date { get; set; }
    
    public double Hours { get; set; }
    
    public string Description { get; set; }
}

public class Response
{
    public string Message { get; set; }
    
    public string Status { get; set; }
}