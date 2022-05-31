using Limeyfy.API.Models.Limeyfy;

namespace Limeyfy.API.DTOs.Limeyfy;

public class ProjectDto
{
    public ProjectDto(Project project, double hours)
    {
        Hours = hours;
        Created = project.Created;
        Description = project.Description;
        Id = project.Id;
        Images = project.Images;
        Title = project.Title;
        PrivateNote = project.PrivateNote;
        ReferenceLink = project.ReferenceLink;
        IsCompleted = project.IsCompleted;
        IsPublic = project.IsPublic;
        LinesOfCode = project.LinesOfCode;
    }
    
    public string Id { get; set; } = default!;
    
    public string Title { get; set; } = default!;

    public string Description { get; set; } = default!;

    public string PrivateNote { get; set; } = default!;

    public string ReferenceLink { get; set; } = default!;

    public List<string>? Images { get; set; }

    public bool IsCompleted { get; set; } = false;

    public bool IsPublic { get; set; } = false;
    
    public double Hours { get; set; } = 0;

    public int LinesOfCode { get; set; }

    public DateTime Created { get; set; }
}