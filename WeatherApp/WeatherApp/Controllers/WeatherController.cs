using System;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

[Route("api")]
public class WeatherController : Controller
{
    private HttpClient _httpClient;
    private const string ApiKey = "5a80963efb4716c21fe155feb7f73315";
    private const string BaseUrl = "http://api.openweathermap.org/data/2.5/";

    public WeatherController()
    {
        _httpClient = new HttpClient();
    }

    [HttpGet("current")]
    public async Task<IActionResult> GetCurrentWeather(string city)
    {
        var response = await _httpClient.GetAsync($"{BaseUrl}weather?q={city}&appid={ApiKey}");
        return Ok(await response.Content.ReadAsStringAsync());
    }

    [HttpGet("1hour")]
    public async Task<IActionResult> GetOneHourForecast(string city)
    {
        var response = await _httpClient.GetAsync($"{BaseUrl}forecast/hourly?q={city}&appid={ApiKey}");
        return Ok(await response.Content.ReadAsStringAsync());
    }

    [HttpGet("2day")]
    public async Task<IActionResult> GetTwoDayForecast(string city)
    {
        var response = await _httpClient.GetAsync($"{BaseUrl}forecast?q={city}&cnt=16&appid={ApiKey}");
        return Ok(await response.Content.ReadAsStringAsync());
    }

    [HttpGet("7day")]
    public async Task<IActionResult> GetSevenDayForecast(string city)
    {
        var response = await _httpClient.GetAsync($"{BaseUrl}forecast/daily?q={city}&cnt=7&appid={ApiKey}");
        return Ok(await response.Content.ReadAsStringAsync());
    }
}
