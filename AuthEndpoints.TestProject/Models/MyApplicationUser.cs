using Microsoft.AspNetCore.Identity;

namespace AuthEndpoints.TestProject.Models;

public class MyApplicationUser : IdentityUser
{
    string Nickname { get; set; } = "";
}
