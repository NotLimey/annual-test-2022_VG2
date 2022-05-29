﻿using Limeyfy.API.Data;
using Limeyfy.API.Models.Limeyfy;
using Microsoft.EntityFrameworkCore;

namespace Limeyfy.API.Services.Limeyfy.Hours;

public class HourService : IHourService
{
    private readonly LimeyfyDbContext _context;

    public HourService(LimeyfyDbContext context)
    {
        _context = context;
    }

    public async Task<Hour?> GetHourAsync(string id) => await _context.Hours.FirstOrDefaultAsync(x => x.Id == id);

    public async Task<IList<Hour>> GetHoursAsync() => await _context.Hours.ToListAsync();

    public async Task<Hour> CreateHourAsync(Hour hour)
    {
        _context.Hours.Add(hour);
        await _context.SaveChangesAsync();
        return hour;
    }
}