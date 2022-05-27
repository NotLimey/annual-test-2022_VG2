namespace Limeyfy.API.DTOs.Limeyfy;

public class InvoiceLineDto
{
    public string Description { get; set; } = String.Empty;
    
    public double Hours { get; set; }
    
    public double Rate { get; set; }
    
    public double Price { get; set; }
}