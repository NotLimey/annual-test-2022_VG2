global using FastEndpoints;
using System.Text;
using FastEndpoints.Swagger;
using Limeyfy.API.Data;
using Limeyfy.API.Models.Application;
using Limeyfy.API.Services.Auth;
using Limeyfy.API.Services.Limeyfy.Companies;
using Limeyfy.API.Services.Limeyfy.Expences;
using Limeyfy.API.Services.Limeyfy.Invoices;
using Limeyfy.API.Services.Limeyfy.Projects;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder();
var configuration = builder.Configuration;

builder.Services.AddFastEndpoints();
builder.Services.AddSwaggerDoc();

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var isDevelopment = builder.Environment.IsDevelopment();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
        b =>
        {
            b.WithOrigins("http://localhost:3000")
                .AllowAnyMethod()
                .AllowAnyHeader();
        });
});


builder.Services.AddDbContext<LimeyfyDbContext>(options =>
    options.UseNpgsql(configuration.GetConnectionString("Limeyfy")));

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(configuration.GetConnectionString("Application")));

builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IProjectService, ProjectService>();
builder.Services.AddScoped<ICompanyService, CompanyService>();
builder.Services.AddScoped<IInvoiceService, InvoiceService>();
builder.Services.AddScoped<IExpenseService, ExpenseService>();

builder.Services.AddIdentity<ApplicationUser, ApplicationRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.SaveToken = true;
    options.RequireHttpsMetadata = false;
    options.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuer = false,
        ValidateAudience = false,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Secret"]))
    };
});
builder.Services.AddAuthorization(o =>
{
    o.AddPolicy("limeyfy", policy =>
    {
        policy.RequireRole("Admin", "Limeyfy");
    });
    
    o.AddPolicy("finance", policy =>
    {
        policy.RequireRole("Admin", "Finance");
    });
});

builder.Services.AddTransient<ApplicationDbSeeder>();

var app = builder.Build();

using (var serviceScope = app.Services.CreateScope())
{
    var applicationDbSeeder = new ApplicationDbSeeder();
    await applicationDbSeeder.SeedDbAsync(serviceScope.ServiceProvider);
}

app.UseCors(MyAllowSpecificOrigins);
app.UseAuthorization();
app.UseFastEndpoints();
app.UseOpenApi();
app.UseSwaggerUi3(c =>
{
    c.ConfigureDefaults();
    c.CustomStylesheetPath = "/SwaggerDark.css";
});

app.UseStaticFiles();
app.UseAuthentication();
app.UseAuthorization();


app.Run();