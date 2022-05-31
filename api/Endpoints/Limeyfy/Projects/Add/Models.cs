using FluentValidation;

namespace Limeyfy.API.Endpoints.Limeyfy.Projects.Add;

public class Request
{
    public string Title { get; set; }

    public string Description { get; set; } = string.Empty;

    public string PrivateNote { get; set; } = string.Empty;

    public string ReferenceLink { get; set; } = string.Empty;

    public List<string>? Images { get; set; }

    public bool IsCompleted { get; set; } = false;

    public bool IsPublic { get; set; } = false;

    public int LinesOfCode { get; set; }
}


public class Response
{
    public string Status { get; set; }
    public string Message { get; set; }
}
