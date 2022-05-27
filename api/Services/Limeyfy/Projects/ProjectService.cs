using Limeyfy.API.Data;
using Limeyfy.API.Models.Limeyfy;
using Microsoft.EntityFrameworkCore;

namespace Limeyfy.API.Services.Limeyfy.Projects;

public class ProjectService : IProjectService
{
    private readonly LimeyfyDbContext _dbContext;

    public ProjectService(LimeyfyDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Project> AddProjectAsync(Project project)
    {
        await _dbContext.Projects.AddAsync(project);
        await _dbContext.SaveChangesAsync();
        return project;
    }

    public async Task<List<Project>> GetProjectsAsync() => await _dbContext.Projects.ToListAsync();

    public async Task<Project?> GetProjectAsyncById(string Id) =>
        await _dbContext.Projects.FirstOrDefaultAsync(x => x.Id == Id);

    public async Task<Project> UpdateProjectAsync(Project project)
    {
        _dbContext.Projects.Update(project);
        await _dbContext.SaveChangesAsync();
        return project;
    }
}