using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Limeyfy.API.Models.Limeyfy;

public class Hour
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public string Id { get; set; }
    
    public string ProjectId { get; set; }
    
    public string UserId { get; set; }
    
    public DateTime Date { get; set; }
    
    public int Hours { get; set; }
    
    public string Description { get; set; }
}