namespace Limeyfy.API.Endpoints.Statistics.Revenue.FullStatistics;

public class Request
{
}

public class Response
{
    public double LastYear { get; set; }
    
    public double LastYearNet { get; set; }
    public double ThisYear { get; set; }
    
    public double ThisYearNet { get; set; }
    public double Last30Days { get; set; }
    public double Total { get; set; }
    
    public double TotalNet { get; set; }
    
    public List<StatisticDataSet> ThisYearDataSets { get; set; }
}

public class StatisticDataSet
{
    public string Label { get; set; }
    
    public double Income { get; set; }
    
    public double Expense { get; set; }
}