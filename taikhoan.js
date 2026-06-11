// 1. Hàm chuyển đổi UI giữa Đăng nhập/Đăng ký
function chuyenForm() {
    const formDangNhap = document.getElementById("formDangNhap");
    const formDangKy = document.getElementById("formDangKy");
    if(formDangNhap && formDangKy) {
        formDangNhap.classList.toggle("active");
        formDangKy.classList.toggle("active");
    }
}

// URL API gốc của Backend
const API_URL = "https://backend-wkbh.onrender.com";

// ==========================================
// 2. XỬ LÝ FORM ĐĂNG KÝ
// ==========================================
const formDangKy = document.getElementById("formDangKy");
if (formDangKy) {
    formDangKy.addEventListener("submit", async (e) => {
        e.preventDefault(); 
        
        // Lấy dữ liệu từ các ô input (Đảm bảo ID khớp 100% với HTML)
        const name = document.getElementById("reg-name").value;
        const email = document.getElementById("reg-email").value;
        const password = document.getElementById("reg-password").value;
        const rePassword = document.getElementById("reg-repassword").value;

        if (password !== rePassword) {
            alert("Mật khẩu nhập lại không khớp!");
            return;
        }

        try {
            const response = await fetch(`${API_URL}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password })
            });

            const data = await response.json();

            if (response.ok) {
                alert("Đăng ký thành công! Mời bạn đăng nhập bằng Email vừa tạo.");
                chuyenForm(); // Tự động trượt sang form đăng nhập
            } else {
                alert("Lỗi: " + data.message);
            }
        } catch (error) {
            console.error("Lỗi kết nối:", error);
            alert("Không thể kết nối đến Server!");
        }
    });
}

// ==========================================
// 3. XỬ LÝ FORM ĐĂNG NHẬP
// ==========================================
const formDangNhap = document.getElementById("formDangNhap");
if (formDangNhap) {
    formDangNhap.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        // Lấy dữ liệu từ các ô input đăng nhập
        const email = document.getElementById("login-email").value; 
        const password = document.getElementById("login-password").value;

        try {
            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                // Lưu trạng thái đăng nhập vào máy
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("token", data.token);
                localStorage.setItem("role", data.role);
                localStorage.setItem("userName", data.name);

                alert(`Chào mừng ${data.name} trở lại!`);
                
                // Phân luồng: Nếu là admin thì vào trang quản trị, học viên vào trang chủ
                if (data.role === "admin") {
                    window.location.href = "admin.html";
                } else {
                    window.location.href = "index.html";
                }
            } else {
                alert("Lỗi: " + data.message);
            }
        } catch (error) {
            console.error("Lỗi kết nối:", error);
            alert("Không thể kết nối đến Server!");
        }
    });
}