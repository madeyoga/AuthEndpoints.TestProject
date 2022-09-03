using AuthEndpoints.SimpleJwt.Core.Models;
using AuthEndpoints.TestProject.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace AuthEndpoints.TestProject.Data;

public class MyDbContext : IdentityDbContext<MyApplicationUser>
{
    public DbSet<RefreshToken>? RefreshTokens { get; set; }

    public MyDbContext(DbContextOptions<MyDbContext> options) : base(options)
    {

    }
}
