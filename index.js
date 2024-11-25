 // Hiệu ứng chuyển động ảnh
 var slides = document.querySelector('.slides');
 let index = 0;
    setInterval(() => {
        index++;
        if (index >= slides.children.length) {
            index = 0;
        }
        slides.style.transform = `translateX(-${index * 100}%)`;
    }, 2000);

     // Lấy nút và phần chi tiết
    const viewMoreBtn = document.querySelector('.view-more-btn');
    const productDescription = document.querySelector('.product-description');

    // Thêm sự kiện click cho nút "Xem Thêm"
    viewMoreBtn.addEventListener('click', () => {
        if (productDescription.style.display === 'none' || productDescription.style.display === '') {
            // Hiển thị chi tiết
            productDescription.style.display = 'block';
            viewMoreBtn.textContent = 'Ẩn Bớt';
        } else {
            // Ẩn chi tiết
            productDescription.style.display = 'none';
            viewMoreBtn.textContent = 'Xem Thêm';
        }
    });

    // Lấy thông tin tỉnh thành phố
    var citis = document.getElementById("city");
    var districts = document.getElementById("district");
    var wards = document.getElementById("ward");
    var Parameter = {
    url: "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json", 
    method: "GET", 
    responseType: "application/json", 
    };
    var promise = axios(Parameter);
    promise.then(function (result) {
    renderCity(result.data);
    });

    function renderCity(data) {
    for (const x of data) {
        var opt = document.createElement('option');
        opt.value = x.Name;
        opt.text = x.Name;
        opt.setAttribute('data-id', x.Id);
        citis.options.add(opt);
    }
    citis.onchange = function () {
        district.length = 1;
        ward.length = 1;
        if(this.options[this.selectedIndex].dataset.id != ""){
        const result = data.filter(n => n.Id === this.options[this.selectedIndex].dataset.id);

        for (const k of result[0].Districts) {
            var opt = document.createElement('option');
            opt.value = k.Name;
            opt.text = k.Name;
            opt.setAttribute('data-id', k.Id);
            district.options.add(opt);
        }
        }
    };
    district.onchange = function () {
        ward.length = 1;
        const dataCity = data.filter((n) => n.Id === citis.options[citis.selectedIndex].dataset.id);
        if (this.options[this.selectedIndex].dataset.id != "") {
        const dataWards = dataCity[0].Districts.filter(n => n.Id === this.options[this.selectedIndex].dataset.id)[0].Wards;

        for (const w of dataWards) {
            var opt = document.createElement('option');
            opt.value = w.Name;
            opt.text = w.Name;
            opt.setAttribute('data-id', w.Id);
            wards.options.add(opt);
        }
        }
    };
    }

    //thời gian đếm ngược 
    document.addEventListener("DOMContentLoaded", function () {
        // Lấy ngày giờ hiện tại
        let now = new Date();
        
        // Ngày kết thúc
        let endDate = new Date(now.getTime() +  24 * 30 * 60 * 1000);

        // Hàm khởi động lại thời gian
        function resetCountdown() {
            now = new Date();
            endDate = new Date(now.getTime() + 24 * 30 * 60 * 1000);
        }

        // Hàm cập nhật thời gian đếm ngược
        function updateCountdown() {
            const currentTime = new Date().getTime();
            const remainingTime = endDate - currentTime;

            if (remainingTime > 0) {
                // Tính toán ngày, giờ, phút, giây còn lại
                const hours = Math.floor((remainingTime % (1000 * 60 * 30 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((remainingTime % (1000 * 60 * 30)) / (1000 * 60));
                const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

                // Cập nhật giao diện
                document.getElementById("hours").textContent = hours.toString().padStart(2, "0");
                document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0");
                document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0");
            } else {
                // Khi hết thời gian, đặt lại thời gian đếm ngược
                resetCountdown();
            }
        }

        // Cập nhật mỗi giây
        setInterval(updateCountdown, 1000);

        // Gọi ngay để khởi động
        updateCountdown();
    });