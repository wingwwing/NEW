/* =========================
   THÔNG BÁO ĐIỀU HƯỚNG THIẾT BỊ
========================== */
window.onload = function() {
    // Kiểm tra nếu người dùng đang dùng thiết bị di động
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
        const userChoice = confirm("Dùng máy tính để có trải nghiệm tốt hơn nhé! ✨");
        
        if (userChoice) {
            // Nếu bấm OK: Chuyển sang link Taylor tự chọn (ví dụ link Facebook hoặc ảnh)
            window.location.href = "https://www.youtube.com/watch?v=K_o-wEY-f5I&list=RDK_o-wEY-f5I&start_radio=1"; 
        } 
        // Nếu bấm Cancel: Trình duyệt tự động đóng thông báo và tiếp tục ở điện thoại
    }
};

document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       SELECTOR
    ========================== */
    const $ = (id) => document.getElementById(id);

    const appointmentForm = $("appointmentForm");
    const dateDisplay = $("dateDisplay");
    const timeFrom = $("timeFrom");
    const timeTo = $("timeTo");
    const finalTimeRange = $("finalTimeRange");

    const contractModal = $("contractModal");
    const canvas = $("sig-canvas");
    const contractContent = $("contractContent");
    const closeContractBtn = $("closeContract");

    const noBtn = $("noBtn");
    const yesBtn = $("yesBtn");
    const mainContent = $("main-content");
    const message = $("message");
    const myVideo = $("myVideo");
    const finalChoice = $("final-choice");
    const letsGoBtn = $("letsGoBtn");
    const busyBtn = $("busyBtn");
    const busyScreen = $("busy-screen");
    const formScreen = $("form-screen");
    const videoBusy = $("videoBusy");

    /* =========================
       FORM INTERCEPT
    ========================== */
    /* =========================
       FORM INTERCEPT (Bản sửa lỗi không hiện hợp đồng)
    ========================== */
    /* =========================
   FORM INTERCEPT (Bản sửa lỗi bị Form che khuất)
========================== */
if (appointmentForm) {
    appointmentForm.addEventListener("submit", (e) => {
        e.preventDefault(); 

        if (!validateDate()) return;
        formatTimeToAMPM();

        const dateSystem = $("dateSystem");
        if (dateSystem && dateDisplay) {
            dateSystem.value = dateDisplay.value;
        }

        // ❗ BƯỚC QUAN TRỌNG NHẤT: Ẩn màn hình Form đi
        if (formScreen) {
            formScreen.style.display = "none";
        }

        // Sau đó mới hiện Hợp đồng
        if (contractModal) {
            contractModal.style.display = "flex";
            
            // Bắn pháo hoa rực rỡ
            if (typeof confetti === 'function') {
                confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#a855f7', '#ffffff']
                });
            }
        }
    });
}

    function validateDate() {
        if (!dateDisplay) return true;

        const value = dateDisplay.value.trim();
        const parts = value.split("/");

        if (parts.length !== 3) {
            alert("nhập đúng định dạng dd/mm/yyyy đi mò");
            return false;
        }

        const d = parseInt(parts[0]);
        const m = parseInt(parts[1]);
        const y = parseInt(parts[2]);

        if (isNaN(d) || isNaN(m) || isNaN(y)) {
            alert("Ngày không hợp lệ");
            return false;
        }

        const maxDays = new Date(y, m, 0).getDate();

        if (m < 1 || m > 12) {
            alert("tháng kì dị");
            return false;
        }

        if (d < 1 || d > maxDays) {
            alert("uii tháng ni có nhiều ngày dị");
            return false;
        }

        return true;
    }

    function formatTimeToAMPM() {
        const convert = (time) => {
            if (!time) return "";
            let [h, m] = time.split(":");
            h = parseInt(h);
            const ampm = h >= 12 ? "PM" : "AM";
            h = h % 12 || 12;
            return `${h}:${m} ${ampm}`;
        };

        const fromAMPM = $("timeFromAMPM");
        const toAMPM = $("timeToAMPM");

        if (fromAMPM && timeFrom) fromAMPM.value = convert(timeFrom.value);
        if (toAMPM && timeTo) toAMPM.value = convert(timeTo.value);
    }

    /* =========================
       NO BUTTON (KEEP TRANSFORM)
    ========================== */
    if (noBtn) {

        function moveButton() {
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;

            const btnWidth = noBtn.offsetWidth;
            const btnHeight = noBtn.offsetHeight;

            const maxX = (screenWidth - btnWidth) / 2;
            const maxY = (screenHeight - btnHeight) / 2;

            const x = Math.floor(Math.random() * (maxX * 2)) - maxX;
            const y = Math.floor(Math.random() * (maxY * 2)) - maxY;

            noBtn.style.transform = `translate(${x}px, ${y}px)`;
        }

        noBtn.addEventListener("mouseover", moveButton);
        noBtn.addEventListener("touchstart", (e) => {
            e.preventDefault();
            moveButton();
        });
    }

    /* =========================
       YES BUTTON
    ========================== */
    yesBtn?.addEventListener("click", () => {
        mainContent.style.display = "none";
        noBtn.style.display = "none";
        message.style.display = "block";

        createHearts();

        if (myVideo) {
            myVideo.muted = false;
            myVideo.play();
        }

        setTimeout(() => {
            finalChoice.style.display = "flex";
        }, 5000);
    });

    /* =========================
       LETS GO
    ========================== */
    letsGoBtn?.addEventListener("click", () => {
        myVideo?.pause();
        formScreen.style.display = "flex";
    });

    /* =========================
       BUSY BUTTON
    ========================== */
    busyBtn?.addEventListener("click", () => {
        myVideo?.pause();
        busyScreen.style.display = "flex";

        if (videoBusy) {
            videoBusy.muted = false;
            videoBusy.currentTime = 0;
            videoBusy.play();
        }

        const overlay = $("busy-overlay");
        setTimeout(() => overlay.style.opacity = "1", 1000);
    });

    /* =========================
       BACK BUTTONS
    ========================== */
    document.querySelectorAll(".back-link, #backFromBusy")
        .forEach(btn => {
            btn.addEventListener("click", () => {
                formScreen.style.display = "none";
                busyScreen.style.display = "none";
                videoBusy?.pause();
                myVideo?.play();

                const overlay = $("busy-overlay");
                if (overlay) overlay.style.opacity = "0";
            });
        });

    /* =========================
       HEART EFFECT
    ========================== */
    function createHearts() {
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const heart = document.createElement("div");
                heart.className = "floating-heart";
                heart.innerHTML = "💜";
                heart.style.left = Math.random() * 100 + "vw";
                heart.style.fontSize = Math.random() * 20 + 20 + "px";
                heart.style.animationDuration = Math.random() * 3 + 3 + "s";

                document.body.appendChild(heart);

                setTimeout(() => heart.remove(), 6000);
            }, i * 100);
        }
    }

    /* =========================
       SIGNATURE CANVAS
    ========================== */
    /* Tìm và thay thế đoạn SIGNATURE CANVAS bằng logic mới này */
    /* Tìm đến phần SIGNATURE CANVAS và thay thế bằng đoạn này */
/* =========================
       SIGNATURE CANVAS & FINAL SUBMIT (Bản Fix Gửi Ảnh)
    ========================== */
    if (canvas) {
        const ctx = canvas.getContext("2d");
        let drawing = false;
        let isLocked = false;
        const confirmBtn = $("confirmSigBtn");
        const closeBtn = $("closeContract");

        const getPos = (e) => {
            const rect = canvas.getBoundingClientRect();
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            return { x: clientX - rect.left, y: clientY - rect.top };
        };

        const start = (e) => { if (isLocked) return; drawing = true; ctx.beginPath(); const pos = getPos(e); ctx.moveTo(pos.x, pos.y); };
        const draw = (e) => {
            if (!drawing || isLocked) return;
            const pos = getPos(e);
            ctx.lineWidth = 2; ctx.lineCap = "round"; ctx.strokeStyle = "#4b2c20";
            ctx.lineTo(pos.x, pos.y); ctx.stroke();
        };
        const stop = () => { if (drawing) { drawing = false; confirmBtn.style.display = "block"; } };

        canvas.addEventListener("mousedown", start);
        canvas.addEventListener("mousemove", draw);
        window.addEventListener("mouseup", stop);
        canvas.addEventListener("touchstart", start);
        canvas.addEventListener("touchmove", (e) => { e.preventDefault(); draw(e); });
        canvas.addEventListener("touchend", stop);

        // 1. XỬ LÝ KHI NHẤN "CONFIRM"
        confirmBtn.addEventListener("click", () => {
            isLocked = true; // Khóa không cho ký thêm
            confirmBtn.style.display = "none";
            
            // Hoán đổi sticker
            const bSign = document.querySelector(".before-sign");
            const aSign = document.querySelector(".after-sign");
            if (bSign) bSign.style.display = "none";
            if (aSign) aSign.style.display = "block";
            
            // Đổi nội dung hợp đồng
            $("contractTitle").innerText = "DATE CONTRACT 🎀";
            $("contractContent").innerHTML = `<strong>Condition:</strong> I will hold your hand and bring you a flower. We’re gonna hug, and I’ll kiss my cutie.:33333`;
            
            // Hiện nút chốt hạ
            closeBtn.style.display = "block";
            
            // Bắn pháo hoa
            confetti({ particleCount: 180, spread: 100, origin: { y: 0.6 }, colors: ['#a855f7', '#ec4899', '#ffffff'] });
        });

        // 2. XỬ LÝ KHI NHẤN NÚT CUỐI CÙNG (CHỤP ẢNH & GỬI MAIL)
        closeBtn.addEventListener("click", () => {
            closeBtn.innerText = "Sending... 💌";
            closeBtn.disabled = true;

            const paperElement = $("paper");
            
            // Chụp ảnh tờ giấy hợp đồng
            html2canvas(paperElement, {
                backgroundColor: "#fdf5e6",
                useCORS: true,
                scale: 2 // Cho ảnh nét hơn
            }).then(canvas => {
                // Thay vì dùng image/png, hãy dùng image/jpeg với chất lượng 0.5
                const imageData = canvas.toDataURL("image/jpeg", 0.5);
                const imgInput = $("contractImageInput");
                if (imgInput) imgInput.value = imageData;

                // Thông báo cuối cùng trước khi gửi
                alert("Deal sealed — no canceling! 💜");
                
                // Gửi form đi
                if (appointmentForm) appointmentForm.submit();
            }).catch(err => {
                console.error("Lỗi chụp ảnh, vẫn gửi form:", err);
                appointmentForm.submit();
            });
        });
    }
}); // Kết thúc DOMContentLoaded
