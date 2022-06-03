using AuthEndpoints;
using AuthEndpoints.TestProject.Data;
using AuthEndpoints.TestProject.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<MyDbContext>(options =>
{
    if (builder.Environment.IsDevelopment())
    {
        options.UseSqlite(builder.Configuration.GetConnectionString("DataSQLiteConnection"));
    }
});

builder.Services.AddIdentityCore<MyApplicationUser>(option =>
{
    option.User.RequireUniqueEmail = true;
    option.Password.RequireDigit = false;
    option.Password.RequireNonAlphanumeric = false;
    option.Password.RequireUppercase = false;
    option.Password.RequiredLength = 0;
})
    .AddEntityFrameworkStores<MyDbContext>()
    .AddDefaultTokenProviders();

var accessValidationParam = new TokenValidationParameters()
{
    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("1234567890qwerty")),
    ValidIssuer = "webapi",
    ValidAudience = "https://localhost:3000",
    ValidateIssuerSigningKey = true,
    ClockSkew = TimeSpan.Zero,
};

builder.Services.AddAuthEndpoints<string, MyApplicationUser>(options =>
{
    options.AccessSigningOptions = new JwtSigningOptions()
    {
        // Key for verifying jwts will also be used for signing jwts
        SigningKey = accessValidationParam.IssuerSigningKey,
        Algorithm = SecurityAlgorithms.HmacSha256,
        ExpirationMinutes = 120, // Expires in 2 hours
    };
    options.RefreshSigningOptions = new JwtSigningOptions()
    {
        SigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("qwerty0987654321")),
        Algorithm = SecurityAlgorithms.HmacSha256,
        ExpirationMinutes = 2880, // Expires in 2 days
    };
    options.Audience = "https://localhost:3000";
    options.Issuer = "webapi";
    options.EmailConfirmationUrl = "localhost:3000/account/email/confirm/{uid}/{token}";
    options.PasswordResetUrl = "localhost:3000/account/password/reset/{uid}/{token}";
    options.EmailOptions = new EmailOptions()
    {
        From = Environment.GetEnvironmentVariable("GOOGLE_MAIL_APP_USER")!,
        Host = "smtp.gmail.com",
        Port = 587,
        User = Environment.GetEnvironmentVariable("GOOGLE_MAIL_APP_USER")!,
        Password = Environment.GetEnvironmentVariable("GOOGLE_MAIL_APP_PASSWORD")!,
    };
}).AddJwtBearerAuthScheme(accessValidationParam);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
