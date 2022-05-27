using Limeyfy.API.Models.Limeyfy;
using Limeyfy.API.Services.Limeyfy.Projects;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace Limeyfy.API.Endpoints.Limeyfy.Projects.Add;

public class Endpoint : Endpoint<Request, Response>
{
    private readonly IProjectService _projectService;

    public Endpoint(IProjectService projectService)
    {
        _projectService = projectService;
    }

    public override void Configure()
    {
        Post("/limeyfy/project");
        AuthSchemes(JwtBearerDefaults.AuthenticationScheme);
        Policies("limeyfy");
    }

    public override async Task HandleAsync(Request r, CancellationToken c)
    {
        Project project = new Project
        {
            Created = DateTime.UtcNow,
            Description = r.Description,
            Hours = r.Hours,
            Images = r.Images,
            Title = r.Title,
            IsCompleted = r.IsCompleted,
            IsPublic = r.IsPublic,
            PrivateNote = r.PrivateNote,
            ReferenceLink = r.ReferenceLink,
            LinesOfCode = r.LinesOfCode
        };
        
        Project? result = await _projectService.AddProjectAsync(project);

        await SendAsync(new Response()
        {
            Message = "Created project successfully",
            Status = "Successful"
        });
    }
}