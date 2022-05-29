namespace Limeyfy.API.Endpoints.Limeyfy.Expenses.Add;

public class Request
{
    public string Date { get; set; }
    
    public double Amount { get; set; }
    
    public string Description { get; set; }
    
    public string Category { get; set; }
    
    public string To { get; set; }
    
    public string ToLink { get; set; }
    
    public string Why { get; set; }
}

public class Response 
{
    
}