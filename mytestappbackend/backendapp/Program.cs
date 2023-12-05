using System.Text.Json;
var builder = WebApplication.CreateBuilder(args);


// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors();

var app = builder.Build();
app.UseCors(options =>
{
    options.WithOrigins("http://localhost:3000");
});

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseRouting();
app.MapGet("/api/getproducts", async () =>
{
    var response = JsonSerializer.Deserialize<List<ProductModel>>(await FetchProductList());
    if (response != null)
    {
        foreach (var item in response)
        {
            double newPrice = item.unitPrice!=0? item.unitPrice * 20 / 100:item.unitPrice;
            item.unitPrice = item.unitPrice + newPrice;
        }
    }


    return response;
});

app.Run();

static async Task<string> FetchProductList()
{
    string apiUrl = "https://alltheclouds.com.au/api/Products";

    // an instance of HttpClient
    using (HttpClient httpClient = new HttpClient())
    {
        try
        {
            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, apiUrl);

            request.Headers.Add("accept", "text/plain");
            request.Headers.Add("api-key", "API-JQJBYKP1V06D1LB");

            HttpResponseMessage response = await httpClient.SendAsync(request);
            // Check if the request was successful (status code 200-299)
            if (response.IsSuccessStatusCode)
            {
                // Read the response content
                string content = await response.Content.ReadAsStringAsync();
                return content;
            }
            else
            {
                // Print the error status code
                Console.WriteLine($"Error: {response.StatusCode}");
                return null;
            }
        }
        catch (Exception ex)
        {
            // Handle exceptions
            Console.WriteLine($"Exception: {ex.Message}");
            return null;
        }
    }
}