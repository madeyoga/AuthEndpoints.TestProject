using AuthEndpoints.Controllers;
using AuthEndpoints.Services;
using AuthEndpoints.TestProject.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;

namespace AuthEndpoints.TestProject.Controllers;
public class MyJwtController : JwtController<string, MyApplicationUser>
{
    public MyJwtController(UserManager<MyApplicationUser> userManager, 
        IAuthenticator<MyApplicationUser> authenticator, 
        IJwtValidator jwtValidator, 
        IOptions<AuthEndpointsOptions> options) : base(userManager, authenticator, jwtValidator, options)
    {
    }
}
