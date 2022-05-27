using System.IdentityModel.Tokens.Jwt;
using System.Runtime.InteropServices;
using System.Security.Claims;
using Limeyfy.API.DTOs.Auth;
using Limeyfy.API.Models.Application;

namespace Limeyfy.API.Services.Auth;

public interface IUserService
{
    JwtSecurityToken GetToken(List<Claim> authClaims, bool rememberMe);

    Task<List<UserDto>> GetMappedUsers();
    Task<UserDtoFull> GetMappedUser(ApplicationUser user, [Optional] ClaimsPrincipal? principal);
}