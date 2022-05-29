using Limeyfy.API.Models.Limeyfy;

namespace Limeyfy.API.Services.Limeyfy.Hours;

public interface IHourService
{
    Task<Hour?> GetHourAsync(string id);
    
    Task<List<Hour>> GetHoursAsync();
    
    Task<Hour> CreateHourAsync(Hour hour);
}