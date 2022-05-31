using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Limeyfy.API.Models.Limeyfy;

public class Project
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public string Id { get; set; }
    
    public string Title { get; set; }

    public string Description { get; set; } = string.Empty;

    public string PrivateNote { get; set; } = string.Empty;

    public string ReferenceLink { get; set; } = string.Empty;

    public List<string>? Images { get; set; }

    public bool IsCompleted { get; set; } = false;

    public bool IsPublic { get; set; } = false;

    public int LinesOfCode { get; set; }

    public DateTime Created { get; set; }
}