using Limeyfy.API.DTOs.Limeyfy;
using Limeyfy.API.Models.Limeyfy;
using Limeyfy.API.Services.Limeyfy.Hours;
using Limeyfy.API.Services.Limeyfy.Projects;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace Limeyfy.API.Endpoints.Limeyfy.Projects.GetAll;

public class Endpoint : Endpoint<Request, List<ProjectDto>>
{
    private readonly IProjectService _projectService;
    private readonly IHourService _hourService;

    public Endpoint(IProjectService projectService, IHourService hourService)
    {
        _projectService = projectService;
        _hourService = hourService;
    }

    public override void Configure()
    {
        Get("/limeyfy/projects");
        AuthSchemes(JwtBearerDefaults.AuthenticationScheme);
        Policies("limeyfy");
    }

    public override async Task HandleAsync(Request r, CancellationToken c)
    {
        var projects = await _projectService.GetProjectsAsync();
        var hours = await _hourService.GetHoursAsync();
        var mappedProjects = new List<ProjectDto>();

        foreach (var project in projects)
        {
            var hoursForProject = hours.Where(h => h.ProjectId == project.Id).Sum(x => x.Hours);
            mappedProjects.Add(new ProjectDto(project, hoursForProject));
        }
        
        await SendAsync(mappedProjects);
    }
}