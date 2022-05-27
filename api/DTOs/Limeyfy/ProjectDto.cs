namespace Limeyfy.API.DTOs.Limeyfy;

public class ProjectDto
{
    public string Id { get; set; }
    
    public string Title { get; set; }
    
    public string Description { get; set; }
    
    public string ReferenceLink { get; set; }
    
    public List<string> Images { get; set; }
    
    public DateTime Created { get; set; }
}