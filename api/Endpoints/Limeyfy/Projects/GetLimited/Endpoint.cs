using Limeyfy.API.DTOs.Limeyfy;
using Limeyfy.API.Services.Limeyfy.Projects;
using Mapster;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace Limeyfy.API.Endpoints.Limeyfy.Projects.GetLimited;

public class Endpoint : Endpoint<Request, List<ProjectLimitedDto>>
{
    private readonly IProjectService _projectService;
    private readonly IConfiguration _configuration;

    public Endpoint(IProjectService projectService, IConfiguration configuration)
    {
        _projectService = projectService;
        _configuration = configuration;
    }

    public override void Configure()
    {
        Get("/limeyfy/projects/public");
        AllowAnonymous();
    }

    public override async Task HandleAsync(Request r, CancellationToken c)
    {
        if (r.client_secret != _configuration["KEYS:Projects"])
        {
            ThrowError("Unauthorized");
        }
        var projects = await _projectService.GetProjectsAsync();
        await SendAsync(projects.Adapt<List<ProjectLimitedDto>>());
    }
}