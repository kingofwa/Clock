using EcommerAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EcommerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly AppDbContext _context;

        // Inject AppDbContext vào controller
        public ProductsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Products>>> GetProducts()
        {
            var products = await _context.Products.ToListAsync();

            if (products == null || !products.Any())
            {
                return NotFound("No products found.");
            }

            return Ok(products); // Trả về danh sách sản phẩm
        }
    }
}
