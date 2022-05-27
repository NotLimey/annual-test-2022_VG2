using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Limeyfy.API.Models.Application;

public class Company
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public string Id { get; set; }

    public string Name { get; set; } = string.Empty;
    
    public string Description { get; set; } = string.Empty;
    
    public string Logo { get; set; } = string.Empty;
    
    public string City { get; set; } = string.Empty;

    public string Country { get; set; } = string.Empty;

    public string StreetAddress { get; set; } = string.Empty;
    
    public string FullAddress { get; set; } = string.Empty;

    public int ZipCode { get; set; } = 1111;

    public long OrgNr { get; set; } 

    public long BankNr { get; set; }
    
    public long PhoneNumber { get; set; }
    
    public double Latitude { get; set; }
    
    public double Longitude { get; set; }

    public string ContactEmail { get; set; } = string.Empty;
    
    public string InvoiceEmail { get; set; } = string.Empty;

    public DateTime Created { get; set; }
}