using Limeyfy.API.Models.Limeyfy;

namespace Limeyfy.API.Services.Limeyfy.Invoices;

public interface IInvoiceService
{
    Task<Invoice?> GetInvoiceAsync(string id);
    
    Task<Invoice> CreateInvoiceAsync(Invoice invoice);
    
    Task<Invoice> UpdateInvoiceAsync(Invoice invoice);
    
    Task<List<Invoice>> GetInvoicesAsync();
}