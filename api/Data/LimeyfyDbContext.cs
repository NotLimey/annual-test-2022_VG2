using Limeyfy.API.Models.Limeyfy;
using Microsoft.EntityFrameworkCore;

namespace Limeyfy.API.Data;

public class LimeyfyDbContext : DbContext
{
    public LimeyfyDbContext(DbContextOptions<LimeyfyDbContext> options)
        : base(options)
    {
        
    }

    public DbSet<Project> Projects => Set<Project>();
    public DbSet<Invoice> Invoices => Set<Invoice>();
}