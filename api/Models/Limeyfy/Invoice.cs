using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Limeyfy.API.Models.Limeyfy;

public class Invoice
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public string Id { get; set; }
    
    public string Title { get; set; }
    
    public string Description { get; set; }
    
    public string CreatedBy { get; set; }
    
    public string CompanyId { get; set; }
    
    public long OrganizationId { get; set; }
    
    public long BankAccount { get; set; }
    
    public int InvoiceNumber { get; set; }
    
    public DateTime DueDate { get; set; }
    
    public bool IsPaid { get; set; }
    
    public double Amount { get; set; }

    public double Mva { get; set; }
    
    public double Total { get; set; }
    
    public string InvoiceLines { get; set; }
    
    public bool UseMva { get; set; }

    public string PdfData { get; set; } = string.Empty;
    
    public DateTime CreatedAt { get; set; }
}