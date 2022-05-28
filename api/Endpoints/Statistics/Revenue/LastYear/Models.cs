using Microsoft.AspNetCore.Mvc;

namespace Limeyfy.API.Endpoints.Statistics.Revenue.LastYear;

public class Request
{
}

public class StatisticDataSet
{
    public string Label { get; set; }
    
    public double Value { get; set; }
}