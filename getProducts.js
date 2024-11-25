// Đường dẫn API
var url = "https://localhost:7038/api/Products";

// Sử dụng fetch để lấy dữ liệu từ API
fetch(url)
    .then(response => {
       
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        return response.json(); // Chuyển dữ liệu phản hồi thành JSON
    })
    .then(data => {
        console.log(data[0]);
        // Thay thế nội dung HTML với dữ liệu trả về từ API
        document.getElementById("product-title").textContent = data[0].title_Top;
        document.getElementById("product-name").textContent = data[0].name;
        document.getElementById("product-description").textContent = data[0].content;
        document.getElementById("original-price").textContent = formatCurrency(data[0].price_Old);
        document.getElementById("sale-price").textContent = formatCurrency(data[0].price_Sale);

      
        
        // Thêm hình ảnh vào slider
       var slider = document.getElementById("product-slider");
       var listImages = data[0].images.split('|');
       listImages.forEach(imageUrl => {
            var img = document.createElement("img");
            img.src = imageUrl;
            img.alt = "Product Image";
            slider.appendChild(img);
        });

       // Thêm chi tiết sản phẩm
       var productDetails = document.getElementById("product-details");
       var descriptions = data[0].descriptions.split('|'); // Tách chuỗi descriptions thành mảng
       var descriptionHTML = descriptions.map(desc => {
           return `<p>${desc}</p>`; // Tạo một thẻ <p> cho mỗi mô tả
       }).join(""); // Nối tất cả các mô tả lại thành chuỗi HTML

       // Hiển thị các mô tả vào phần chi tiết sản phẩm
       productDetails.querySelector(".preview-details").innerHTML = descriptionHTML;

    })
    .catch(error => {
        console.error('Có lỗi xảy ra:', error); // Xử lý lỗi nếu có
    });

// Hàm format số thành định dạng tiền tệ
function formatCurrency(amount) {
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}
