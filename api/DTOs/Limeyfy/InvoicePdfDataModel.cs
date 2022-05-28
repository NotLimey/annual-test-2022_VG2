using System.Text.Json.Serialization;
using Limeyfy.API.Models.Application;
using Limeyfy.API.Models.Limeyfy;

namespace Limeyfy.API.DTOs.Limeyfy;

public class InvoicePdfDataModel
{
    public string Title { get; set; }
    
    public string CompanyName { get; set; }
    
    public string CompanyStreetAddress { get; set; }
    
    public string CompanyCity { get; set; }
    
    public int CompanyZipCode { get; set; }
    
    public int InvoiceNumber { get; set; }
    
    public DateTime DueDate { get; set; }
    
    public long OrganizationId { get; set; }
    
    public long BankAccount { get; set; }
    
    public List<InvoiceLineDto> InvoiceLines { get; set; }
    
    public double Amount { get; set; }
    
    public double Mva { get; set; }
    
    public double Total { get; set; }
    
    public DateTime CreatedAt { get; set; }
    
    public bool UseMva { get; set; }
}