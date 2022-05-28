using Microsoft.AspNetCore.Mvc;

namespace Limeyfy.API.Endpoints.Statistics.Revenue.LastMonth;

public class Request
{
}

public class StatisticDataSet
{
    public string Label { get; set; }
    
    public double Value { get; set; }
}