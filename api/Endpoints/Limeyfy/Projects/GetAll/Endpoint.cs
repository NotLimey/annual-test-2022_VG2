using Limeyfy.API.Models.Limeyfy;
using Limeyfy.API.Services.Limeyfy.Projects;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace Limeyfy.API.Endpoints.Limeyfy.Projects.GetAll;

public class Endpoint : Endpoint<Request, List<Project>>
{
    private readonly IProjectService _projectService;

    public Endpoint(IProjectService projectService)
    {
        _projectService = projectService;
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
        await SendAsync(projects);
    }
}