using Limeyfy.API.Services.Limeyfy.Projects;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace Limeyfy.API.Endpoints.Limeyfy.Projects.Update;

public class Endpoint : Endpoint<Request, Response>
{
    private readonly IProjectService _projectService;

    public Endpoint(IProjectService projectService)
    {
        _projectService = projectService;
    }

    public override void Configure()
    {
        Put("/limeyfy/project");
        AuthSchemes(JwtBearerDefaults.AuthenticationScheme);
        Policies("limeyfy");
    }

    public override async Task HandleAsync(Request r, CancellationToken c)
    {
        var project = await _projectService.GetProjectAsyncById(r.Id);
        if (project == null)
            ThrowError("Cant find project by id");

        project.Description = r.Description;
        project.Hours = r.Hours;
        project.Images = r.Images;
        project.Title = r.Title;
        project.IsCompleted = r.IsCompleted;
        project.IsPublic = r.IsPublic;
        project.PrivateNote = r.PrivateNote;
        project.ReferenceLink = r.ReferenceLink;
        project.LinesOfCode = r.LinesOfCode;

        await _projectService.UpdateProjectAsync(project);
        
        await SendAsync(new Response()
        {
            Message = "Updated project successfully",
            Status = "Successful"
        });
    }

}