using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Limeyfy.API.Models.Limeyfy;

public class Expense
{
    
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public string Id { get; set; }
    
    public string UserId { get; set; }
    
    public DateTime Date { get; set; }
    
    public double Amount { get; set; }
    
    public string Description { get; set; }
    
    public string Category { get; set; }
    
    public string To { get; set; }
    
    public string ToLink { get; set; }
    
    public string Why { get; set; }
}