using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Identity.Web;
using Microsoft.Identity.Web.Resource;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApi(builder.Configuration.GetSection("AzureAd"));
builder.Services.AddAuthorization();

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

var scopeRequiredByApi = app.Configuration["AzureAd:Scopes"] ?? "";


app.MapGet("/weatherforecast", (HttpContext httpContext) =>
{
    httpContext.VerifyUserHasAnyAcceptedScope(scopeRequiredByApi);

    var forecast = 
        new WeatherForecast
        (
            Random.Shared.Next(-20, 55)
        );
    return forecast;
})
.WithName("GetWeatherForecast")
.WithOpenApi()
.RequireAuthorization();

app.Run();

record WeatherForecast( int TemperatureC)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
