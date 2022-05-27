namespace Limeyfy.API.Endpoints.Limeyfy.Invoices.Update;

public class Request
{
    public string Id { get; set; }
    
    public bool IsPaid { get; set; }
}

public class Response
{
    public string Message { get; set; }
    
    public string Status { get; set; }
}