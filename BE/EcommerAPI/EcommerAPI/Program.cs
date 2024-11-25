using EcommerAPI;
using EcommerAPI.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("EcommerConnectionString")));


// Thêm dịch vụ CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", policy =>
    {
        policy.AllowAnyOrigin() // Cho phép tất cả các nguồn
              .AllowAnyMethod()  // Cho phép tất cả các phương thức HTTP
              .AllowAnyHeader(); // Cho phép tất cả các header
    });
});

var app = builder.Build();

// Sử dụng CORS với chính sách đã cấu hình
app.UseCors("AllowAllOrigins");

// Kiểm tra bảng và thêm sản phẩm mặc định nếu bảng chưa có dữ liệu
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();

    // Kiểm tra xem bảng "Products" có sản phẩm chưa
    if (!dbContext.Products.Any())
    {
        // Nếu chưa có sản phẩm, thêm một sản phẩm mặc định
        dbContext.Products.Add(new Products
        {
            ProductId = Guid.NewGuid(),
            Name = "Sample Product",
            Title_Top = "Top Title",
            Title_Bot = "Bottom Title",
            Images = "https://down-vn.img.susercontent.com/file/d8166a8b42caa43c84c42bb9e1a354af|https://th.bing.com/th/id/OIP.IhPU2z_gQAyTg9M0EU_09AHaHa?rs=1&pid=ImgDetMain|https://www.telepolis.pl/images/2022/05/maxcom-fw54-iron-przod.jpg",
            Content = "This is a sample product description.",
            Price_Old = 100,
            Price_Sale = 80,
            Descriptions = "Detailed description of the sample product."
        });
        dbContext.SaveChanges(); // Lưu vào cơ sở dữ liệu
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
