
// =========================================
// 1. STICKY NAVBAR
// =========================================

const navbar = document.querySelector('.navbar');

if (navbar) {

    window.addEventListener('scroll', function () {

        if (window.scrollY > 50) {

            navbar.classList.add('scrolled');

        } else {

            if (!document.body.classList.contains('forum-page')) {
                navbar.classList.remove('scrolled');
            }
        }
    });
}


// =========================================
// 2. SMOOTH SCROLL
// =========================================

const nutThuongVan = document.getElementById('nutThuongVan');
const phanDongChay = document.getElementById('dong-chay');

if (nutThuongVan && phanDongChay) {

    nutThuongVan.addEventListener('click', function () {

        phanDongChay.scrollIntoView({
            behavior: 'smooth'
        });
    });
}


// =========================================
// 3. SEARCH BAR
// =========================================

const thanhTimKiem = document.querySelector('.search-bar');

if (thanhTimKiem) {

    thanhTimKiem.addEventListener('keypress', function (event) {

        if (event.key === 'Enter') {

            let tuKhoa = thanhTimKiem.value;

            alert('Bạn vừa tìm kiếm từ khóa: ' + tuKhoa);

            thanhTimKiem.value = '';
        }
    });
}


// =========================================
// 4. TAB SWITCH
// =========================================

function moTab(tenTab, event) {

    let cacTab = document.querySelectorAll('.tab-content');

    cacTab.forEach(tab => {
        tab.classList.remove('active');
    });

    let cacNut = document.querySelectorAll('.tab-btn');

    cacNut.forEach(nut => {
        nut.classList.remove('active');
    });

    document.getElementById(tenTab).classList.add('active');

    event.currentTarget.classList.add('active');
}


// =========================================
// 5. AUTHOR POPUP
// =========================================

const modalTacGia = document.getElementById('popupTacGia');

if (modalTacGia) {

    const nutDong = modalTacGia.querySelector('.close-btn');

    const tenPopup = document.getElementById('tenTacGiaPopup');

    const thongTinPopup =
        document.getElementById('thongTinTacGiaPopup');

    const cacTheTacGia =
        document.querySelectorAll('.author-card');

    cacTheTacGia.forEach(the => {

        the.addEventListener('click', function () {

            let ten =
                this.querySelector('.author-name').innerText;

            tenPopup.innerText = ten;

            thongTinPopup.innerText =
                `${ten} là một tác giả có góc nhìn sâu sắc và truyền cảm hứng trong cộng đồng yêu văn học.`;

            modalTacGia.style.display = 'flex';
        });
    });

    nutDong.addEventListener('click', () => {
        modalTacGia.style.display = 'none';
    });

    window.addEventListener('click', (e) => {

        if (e.target == modalTacGia) {
            modalTacGia.style.display = 'none';
        }
    });
}


// =========================================
// 6. FORM SUBMIT
// =========================================

const formGhiBai = document.getElementById('formGhiBai');

if (formGhiBai) {

    formGhiBai.addEventListener('submit', function (e) {

        e.preventDefault();

        let ten =
            document.getElementById('tenNguoiGui').value;

        alert(
            `Cảm ơn ${ten}! Bài viết của bạn đã được gửi.`
        );

        formGhiBai.reset();
    });
}


// =========================================
// 7. LOGIN / REGISTER
// =========================================

function chuyenForm() {

    const formLogin =
        document.getElementById('formDangNhap');

    const formRegister =
        document.getElementById('formDangKy');

    if (formLogin && formRegister) {

        if (formLogin.classList.contains('active')) {

            formLogin.classList.remove('active');

            formRegister.classList.add('active');

        } else {

            formRegister.classList.remove('active');

            formLogin.classList.add('active');
        }
    }
}


// =========================================
// 8. WRITING UI
// =========================================

const startBtn =
    document.getElementById('start-writing-btn');

const submitBtn =
    document.getElementById('submit-btn');

const introView =
    document.getElementById('intro-view');

const editorSection =
    document.getElementById('editor-section');

const analysisView =
    document.getElementById('analysis-view');

const textarea =
    document.getElementById('main-textarea');

const textDisplay =
    document.getElementById('final-text-display');

const homeBtn =
    document.getElementById('home-btn');


// =========================================
// API KEY
// =========================================

// KHÔNG nên hardcode ngoài production
const API_KEY = "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";


// =========================================
// START BUTTON
// =========================================

if (startBtn) {

    startBtn.addEventListener('click', () => {

        introView.style.display = 'none';

        submitBtn.style.display = 'block';

        textarea.focus();

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}


// =========================================
// SUBMIT BUTTON
// =========================================

if (submitBtn) {

    submitBtn.addEventListener('click', async () => {

        const userContent =
            textarea.value.trim();

        if (userContent.length < 5) {

            alert(
                "Bạn hãy nhập nội dung dài hơn để AI phân tích nhé!"
            );

            return;
        }

        editorSection.style.display = 'none';

        analysisView.style.display = 'grid';

        textDisplay.innerText = userContent;

        const suggestionList =
            document.querySelector('.suggestion-list');

        suggestionList.innerHTML =
            "<li>AI đang phân tích văn bản...</li>";

        await callGeminiAI(userContent);
    });
}


// =========================================
// AI FUNCTION
// =========================================

async function callGeminiAI(text) {

    if (!text || text.trim() === "") {

        document.querySelector(".suggestion-list").innerHTML =
            "<li>Vui lòng nhập văn bản.</li>";

        return;
    }

    const url =
        "https://openrouter.ai/api/v1/chat/completions";

    const prompt = `
Bạn là một biên tập viên văn học giỏi.

Hãy sửa đoạn văn sau để:
- tự nhiên hơn
- văn chương hơn
- cảm xúc hơn

QUY TẮC:
- Chỉ trả về JSON hợp lệ
- Không markdown
- Không giải thích
- Không thêm chữ ngoài JSON
- Chỉ dùng đúng key:
  suggestions
  improvedText

JSON mẫu:
{
  "suggestions": [
    {
      "old": "từ cũ",
      "new": "từ mới",
      "note": "lý do"
    }
  ],
  "improvedText": "đoạn văn mới"
}

Nội dung:
${text}
`;

    try {

        const response = await fetch(url, {

            method: "POST",

            headers: {

                "Content-Type": "application/json",

                "Authorization":
                    `Bearer ${API_KEY}`,

                "HTTP-Referer":
                    window.location.origin,

                "X-Title":
                    "Literary Editor"
            },

            body: JSON.stringify({

                model:
                    "google/gemini-2.0-flash-001",

                messages: [
                    {
                        role: "user",
                        content: prompt
                    }
                ],

                response_format: {
                    type: "json_object"
                },

                temperature: 0.3
            })
        });

        const data = await response.json();

        console.log("FULL RESPONSE:", data);

        if (data.error) {

            throw new Error(data.error.message);
        }

        const aiResponse =
            data?.choices?.[0]?.message?.content;

        if (!aiResponse) {

            throw new Error("AI không trả dữ liệu");
        }

        console.log("AI RAW:", aiResponse);

        let result;

        try {

            result = JSON.parse(aiResponse);

        } catch (jsonError) {

            console.error(jsonError);

            throw new Error(
                "AI trả JSON không hợp lệ"
            );
        }

        if (!result.improvedText) {

            throw new Error(
                "Thiếu improvedText"
            );
        }

        if (!Array.isArray(result.suggestions)) {

            result.suggestions = [];
        }

        displayResults(result);

    } catch (error) {

        console.error("Lỗi AI:", error);

        document.querySelector(
            ".suggestion-list"
        ).innerHTML =
            `<li>${error.message}</li>`;
    }
}


// =========================================
// DISPLAY RESULT
// =========================================

function displayResults(data) {

    const suggestionList =
        document.querySelector('.suggestion-list');

    const finalResult =
        document.querySelector('.final-result');

    suggestionList.innerHTML = "";

    data.suggestions.forEach((item, index) => {

        const li =
            document.createElement('li');

        li.innerHTML = `
            <strong>Gợi ý ${index + 1}:</strong>
            Thay
            <span class="highlight-red">
                "${item.old}"
            </span>
            bằng
            <strong>
                "${item.new}"
            </strong>
            <em>(${item.note})</em>
        `;

        suggestionList.appendChild(li);
    });

    if (finalResult) {

        finalResult.innerHTML = `
            <strong>Kết quả nâng cấp:</strong>
            <br><br>
            ${data.improvedText}
        `;
    }
}


// =========================================
// RESET
// =========================================

if (homeBtn) {

    homeBtn.addEventListener('click', () => {

        location.reload();
    });
}
