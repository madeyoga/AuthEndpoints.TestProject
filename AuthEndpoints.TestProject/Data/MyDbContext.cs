using AuthEndpoints.TestProject.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace AuthEndpoints.TestProject.Data;

public class MyDbContext : IdentityDbContext<MyApplicationUser>
{
    public MyDbContext(DbContextOptions<MyDbContext> options) : base(options)
    {

    }
}
