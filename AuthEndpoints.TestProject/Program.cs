using AuthEndpoints;
using AuthEndpoints.TestProject.Data;
using AuthEndpoints.TestProject.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

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

builder.Services
    .AddAuthEndpoints<string, MyApplicationUser>(options =>
    {
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
    })
    .AddJwtBearerAuthScheme();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        policy =>
        {
            policy.WithOrigins("http://localhost:3000")
                .AllowAnyHeader();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseReDoc(c =>
    {
        c.RoutePrefix = "docs";
    });
}

app.UseHttpsRedirection();

app.UseCors();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
