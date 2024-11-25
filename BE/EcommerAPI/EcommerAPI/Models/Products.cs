using System.ComponentModel.DataAnnotations;

namespace EcommerAPI.Models
{
    public class Products
    {
        [Key]
        public Guid ProductId { get; set; } = new Guid();
        public string Name { get; set; } = string.Empty;
        public string Title_Top { get; set; } = string.Empty;
        public string Images { get; set; } = string.Empty;
        public string Title_Bot { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public decimal Price_Old { get; set; } = 0;
        public decimal Price_Sale { get; set; } = 0;
        public string  Descriptions { get; set; } = string.Empty;
    }
}
