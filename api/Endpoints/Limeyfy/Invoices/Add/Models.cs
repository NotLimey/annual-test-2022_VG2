using Limeyfy.API.DTOs.Limeyfy;

namespace Limeyfy.API.Endpoints.Limeyfy.Invoices.Add;

public class Request
{
    public string Title { get; set; }
    
    public string Description { get; set; }
    
    public string CompanyId { get; set; }
    
    public int OrganizationId { get; set; }
    
    public int BankAccount { get; set; }
    
    public int InvoiceNumber { get; set; }
    
    public string DueDate { get; set; }
    
    public bool IsPaid { get; set; }
    
    public List<SimpleInvoiceLine> InvoiceLines { get; set; }
    
    public bool UseMva { get; set; }
}

public class SimpleInvoiceLine
{
    public string Description { get; set; } = String.Empty;
    
    public double Hours { get; set; }
    
    public double Rate { get; set; }
}

public class Response
{
    public string Message { get; set; }
    
    public string Status { get; set; }
}