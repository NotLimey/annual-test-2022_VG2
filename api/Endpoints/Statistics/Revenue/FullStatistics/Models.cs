namespace Limeyfy.API.Endpoints.Statistics.Revenue.FullStatistics;

public class Request
{
}

public class Response
{
    public double LastYear { get; set; }
    public double ThisYear { get; set; }
    public double Last30Days { get; set; }
    public double Total { get; set; }
    public List<StatisticDataSet> ThisYearDataSets { get; set; }
}

public class StatisticDataSet
{
    public string Label { get; set; }
    
    public double Value { get; set; }
}