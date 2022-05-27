using Limeyfy.API.Data;
using Limeyfy.API.DTOs.Limeyfy;
using Limeyfy.API.Models.Application;
using Limeyfy.API.Models.Limeyfy;
using Limeyfy.API.Services.Limeyfy.Companies;
using Mapster;
using Microsoft.EntityFrameworkCore;

namespace Limeyfy.API.Services.Limeyfy.Invoices;

public class InvoiceService : IInvoiceService
{
    private readonly LimeyfyDbContext _context;
    private readonly ICompanyService _companyService;

    public InvoiceService(LimeyfyDbContext context, ICompanyService companyService)
    {
        _context = context;
        _companyService = companyService;
    }

    public async Task<Invoice?> GetInvoiceAsync(string id) => await _context.Invoices.FirstOrDefaultAsync(x => x.Id == id);
    
    public async Task<Invoice> CreateInvoiceAsync(Invoice invoice)
    {
        _context.Invoices.Add(invoice);
        await _context.SaveChangesAsync();
        return invoice;
    }

    public async Task<Invoice> UpdateInvoiceAsync(Invoice invoice)
    {
        _context.Invoices.Update(invoice);
        await _context.SaveChangesAsync();
        return invoice;
    }

    public async Task<List<Invoice>> GetInvoicesAsync() => await _context.Invoices.ToListAsync();
}