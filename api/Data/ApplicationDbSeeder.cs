using Limeyfy.API.Models.Application;
using Microsoft.AspNetCore.Identity;

namespace Limeyfy.API.Data;

public class ApplicationDbSeeder
{
    private readonly List<string> _roles = new() { "Admin", "User", "Limeyfy", "UnoMarine", "Finance" };
    public async Task SeedDbAsync(IServiceProvider serviceProvider)
    {
        var userManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();
        var roleManager = serviceProvider.GetRequiredService<RoleManager<ApplicationRole>>();
        var configuration = serviceProvider.GetRequiredService<IConfiguration>();

        var existingAdminUser = await userManager.FindByNameAsync("l-admin");

        if (existingAdminUser == null)
        {
            var user = new ApplicationUser
            {
                Email = "admin@limeyfy.no",
                UserName = "l-admin",
            };
            await userManager.CreateAsync(user, configuration["AdminPassword"]);
        }

        foreach (var role in _roles)        
        {
            if (!await roleManager.RoleExistsAsync(role))
            {
                var _role = new ApplicationRole(role);
                await roleManager.CreateAsync(_role);
            }
        }

        if (existingAdminUser == null)
        {
            var admin = await userManager.FindByNameAsync("l-admin");
            if(admin != null) 
                await userManager.AddToRoleAsync(admin, "Admin");
            return;
        }
        await userManager.AddToRoleAsync(existingAdminUser, "Admin");
    }
}