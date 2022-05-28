using Microsoft.AspNetCore.Mvc;

namespace Limeyfy.API.Endpoints.Statistics.Revenue;

public class Request
{
    [FromQuery] public DateTime StartDate { get; set; }
    [FromQuery] public DateTime? EndDate { get; set; } = DateTime.Now;
}

public class Response
{
    public StatisticDataSet Data { get; set; }
}

public class StatisticDataSet
{
    public string Label { get; set; }
    
    public double Value { get; set; }
}