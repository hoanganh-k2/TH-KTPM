document.getElementById("loginForm").onsubmit = function (event) {
    event.preventDefault();
    // Thêm logic xác thực ở đây
    alert("Đăng nhập thành công!");
    window.location.href = "index.html"; // Chuyển hướng về trang Dashboard
};

document.getElementById("registerForm").onsubmit = function (event) {
    event.preventDefault();
    alert("Đăng ký thành công!");
    window.location.href = "login.html"; // Chuyển hướng về trang Đăng Nhập
};

document.getElementById("loginForm").onsubmit = function (event) {
    event.preventDefault();
    // Giả định rằng đăng nhập thành công
    alert("Đăng nhập thành công!");
    // Chuyển hướng đến trang chủ (index.html)
    window.location.href = "index.html";
};

// Nếu bạn cần thêm logic cho trang đăng ký
document.getElementById("registerForm").onsubmit = function (event) {
    event.preventDefault();
    alert("Đăng ký thành công!");
    window.location.href = "login.html"; // Chuyển hướng về trang Đăng Nhập
};
