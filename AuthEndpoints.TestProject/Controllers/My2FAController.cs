using AuthEndpoints.Controllers;
using AuthEndpoints.Services;
using AuthEndpoints.TestProject.Models;
using Microsoft.AspNetCore.Identity;

namespace AuthEndpoints.TestProject.Controllers;
public class My2FAController : TwoStepVerificationController<string, MyApplicationUser>
{
    public My2FAController(UserManager<MyApplicationUser> userManager, 
        IAuthenticator<MyApplicationUser> authenticator, 
        IEmailSender emailSender, 
        IEmailFactory emailFactory) : base(userManager, authenticator, emailSender, emailFactory)
    {
    }
}
