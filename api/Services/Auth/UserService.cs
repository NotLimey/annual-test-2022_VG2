using System.IdentityModel.Tokens.Jwt;
using System.Runtime.InteropServices;
using System.Security.Claims;
using System.Text;
using Limeyfy.API.DTOs.Auth;
using Limeyfy.API.Models.Application;
using Limeyfy.API.Services.Limeyfy.Companies;
using Mapster;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace Limeyfy.API.Services.Auth;

public class UserService : IUserService
{
    private readonly IConfiguration _configuration;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly ICompanyService _companyService;

    public UserService(IConfiguration configuration, UserManager<ApplicationUser> userManager, ICompanyService companyService)
    {
        _configuration = configuration;
        _userManager = userManager;
        _companyService = companyService;
    }

    public async Task<List<UserDto>> GetMappedUsers()
    {
        var users = await _userManager.Users.ToListAsync();
        var mappedUsers = users.Select(user =>
        {
            var roles = _userManager.GetRolesAsync(user).Result;
            return new UserDto
            {
                Id = user.Id,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                UserName = user.UserName,
                Roles = roles.ToList(),
                Company = _companyService.GetCompanyAsync(user.Company).Result
            };
        }).ToList();
        return mappedUsers;
    }
    
    public async Task<UserDtoFull> GetMappedUser(ApplicationUser user, [Optional] ClaimsPrincipal? principal)
    {
        var mappedUser = user.Adapt<UserDtoFull>();
        mappedUser.Company = await _companyService.GetCompanyAsync(user.Company) ?? null;
        mappedUser.Roles = (await _userManager.GetRolesAsync(user)).ToList();
        if (principal != null)
        {
            mappedUser.Claims = principal.Claims.Select(claim =>
            {
                if (claim.Type == "http://schemas.microsoft.com/ws/2008/06/identity/claims/role")
                {
                    return claim.Value;
                }

                return "";
            }).Where(x => !String.IsNullOrEmpty(x)).ToList();
        }
        return mappedUser;
    }

    public JwtSecurityToken GetToken(List<Claim> authClaims, bool rememberMe)
    {
        var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

        var token = new JwtSecurityToken(
            expires: rememberMe ? DateTime.Now.AddDays(7) : DateTime.Now.AddHours(3),
            claims: authClaims,
            signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
        );

        return token;
    }
}