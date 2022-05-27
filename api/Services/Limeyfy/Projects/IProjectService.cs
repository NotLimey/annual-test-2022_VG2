using Limeyfy.API.Models.Limeyfy;

namespace Limeyfy.API.Services.Limeyfy.Projects;

public interface IProjectService
{
    Task<Project> AddProjectAsync(Project project);
    
    Task<List<Project>> GetProjectsAsync();

    Task<Project?> GetProjectAsyncById(string Id);

    Task<Project> UpdateProjectAsync(Project project);
}