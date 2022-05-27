namespace Limeyfy.API.Endpoints.Limeyfy.Projects.Update;

public class Request
{
    [FromHeader]
    public string Id { get; set; }
    
    public string Title { get; set; }

    public string Description { get; set; } = string.Empty;

    public string PrivateNote { get; set; } = string.Empty;

    public string ReferenceLink { get; set; } = string.Empty;

    public List<string>? Images { get; set; }

    public bool IsCompleted { get; set; } = false;

    public bool IsPublic { get; set; } = false;

    public double Hours { get; set; }

    public int LinesOfCode { get; set; }
}


public class Response
{
    public string Status { get; set; }
    public string Message { get; set; }
}
