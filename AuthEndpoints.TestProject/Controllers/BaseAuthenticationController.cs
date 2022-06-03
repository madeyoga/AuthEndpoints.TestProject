using AuthEndpoints.Controllers;
using AuthEndpoints.Services;
using AuthEndpoints.TestProject.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;

namespace AuthEndpoints.TestProject.Controllers;
public class BaseAuthenticationController : BaseEndpointsController<string, MyApplicationUser>
{
    public BaseAuthenticationController(UserManager<MyApplicationUser> userManager, 
        IdentityErrorDescriber errorDescriber, 
        IOptions<AuthEndpointsOptions> options, 
        IEmailSender emailSender,
        IEmailFactory emailFactory) : base(userManager, errorDescriber, options, emailSender, emailFactory)
    {
    }
}
