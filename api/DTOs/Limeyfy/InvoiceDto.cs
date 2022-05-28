using Limeyfy.API.DTOs.Auth;
using Limeyfy.API.Models.Application;
using Limeyfy.API.Models.Limeyfy;
using Mapster;
using Newtonsoft.Json;
using JsonSerializer = System.Text.Json.JsonSerializer;

namespace Limeyfy.API.DTOs.Limeyfy;

public class InvoiceDto
{
    public InvoiceDto(Invoice invoice, Company? company, List<InvoiceLineDto>? invoiceLines, InvoicePdfDataModel pdfData)
    {
        Id = invoice.Id;
        CreatedBy = invoice.CreatedBy;
        InvoiceNumber = invoice.InvoiceNumber;
        Amount = invoice.Amount;
        Company = company ?? new Company();
        InvoiceLines = invoiceLines ?? new List<InvoiceLineDto>();
        OrganizationId = invoice.OrganizationId;
        CreatedAt = invoice.CreatedAt;
        BankAccount = invoice.BankAccount;
        InvoiceNumber = invoice.InvoiceNumber;
        DueDate = invoice.DueDate;
        IsPaid = invoice.IsPaid;
        Amount = invoice.Amount;
        UseMva = invoice.UseMva;
        Mva = invoice.Mva;
        Total = invoice.Total;
        Title = invoice.Title;
        Description = invoice.Description;
        PdfData = pdfData;
    }
    
    public string Id { get; set; }
    
    public string Title { get; set; }
    
    public string Description { get; set; }
    
    public string CreatedBy { get; set; }
    
    [AdaptIgnore]
    public Company Company { get; set; }
    
    public long OrganizationId { get; set; }
    
    public long BankAccount { get; set; }
    
    public int InvoiceNumber { get; set; }
    
    public DateTime DueDate { get; set; }
    
    public bool IsPaid { get; set; }
    
    public double Amount { get; set; }

    public double Mva { get; set; }
    
    public double Total { get; set; }
    
    [AdaptIgnore]
    public List<InvoiceLineDto> InvoiceLines { get; set; }
    
    public bool UseMva { get; set; }

    public DateTime CreatedAt { get; set; }
    
    public InvoicePdfDataModel? PdfData { get; set; }
    
}