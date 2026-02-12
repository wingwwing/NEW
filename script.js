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
if (canvas) {
    const ctx = canvas.getContext("2d");
    let drawing = false;
    let isLocked = false;
    const confirmBtn = document.getElementById("confirmSigBtn");

    const getPos = (e) => {
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return { x: clientX - rect.left, y: clientY - rect.top };
    };

    const start = (e) => { if (isLocked) return; drawing = true; ctx.beginPath(); const pos = getPos(e); ctx.moveTo(pos.x, pos.y); };
    const draw = (e) => {
        if (!drawing || isLocked) return;
        if (!drawing) return;
        const pos = getPos(e);
        ctx.lineWidth = 2; ctx.lineCap = "round"; ctx.strokeStyle = "#4b2c20"; // Nét mực nâu cũ
        ctx.lineTo(pos.x, pos.y); ctx.stroke();
    };
    /* Trong phần xử lý chữ ký (stop function) */
const stop = () => { 
    if (drawing) {
        drawing = false; 
        const confirmBtn = document.getElementById("confirmSigBtn");
        confirmBtn.style.display = "block"; // Nút xác nhận hiện ra sau khi ký
    }
};

/* Trong phần click vào nút confirmSigBtn */
confirmBtn.addEventListener("click", () => {
    isLocked = true; // Khóa canvas sau khi ký
    confirmBtn.style.display = "none";
    
    // 1. THÊM MỚI: Hoán đổi sticker (Yêu cầu ít thay đổi nhất)
    const bSign = document.querySelector(".before-sign");
    const aSign = document.querySelector(".after-sign");
    if (bSign) bSign.style.display = "none";
    if (aSign) aSign.style.display = "block";
    
    // Đổi nội dung hợp đồng
    document.getElementById("contractTitle").innerText = "DATE CONTRACT";
    document.getElementById("contractContent").innerHTML = `<strong>Condition:</strong> i will hold ur hand and bring you flower, us gonna hug and i will kiss my cutie :333`;
    
    // Hiện nút Mãi iu
    const closeBtn = document.getElementById("closeContract");
    closeBtn.style.display = "block";
    
    // Hiệu ứng pháo hoa bùng nổ
    confetti({
        particleCount: 180,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#a855f7', '#ec4899', '#ffffff']
    });
});

    canvas.addEventListener("mousedown", start);
    canvas.addEventListener("mousemove", draw);
    window.addEventListener("mouseup", stop);
    canvas.addEventListener("touchstart", start);
    canvas.addEventListener("touchmove", (e) => { e.preventDefault(); draw(e); });
    canvas.addEventListener("touchend", stop);

    // XỬ LÝ KHI NHẤN "XÁC NHẬN ĐÃ KÝ"
    confirmBtn.addEventListener("click", () => {
        confirmBtn.style.display = "none"; // Ẩn nút xác nhận
        
        // Thay đổi nội dung sang Hợp đồng thật
        document.getElementById("contractTitle").innerText = "DATE CONTRACT";
        document.getElementById("contractContent").innerHTML = `<strong>Condition:</strong> I will hold ur hand and bring you flower, us gonna hug and i will kiss my cutie :333`;
        
        // Hiện nút chốt hạ
        document.getElementById("closeContract").style.display = "block";
        
        // Bắn pháo hoa rực rỡ khi lộ bí mật
        confetti({
            particleCount: 150,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#a855f7', '#ffffff', '#fdf5e6']
        });
    });
}

    /* =========================
       FINAL SUBMIT
    ========================== */
    closeContractBtn?.addEventListener("click", () => {
        contractModal.style.display = "none";
        alert("Deal sealed — no canceling! 💜");
        appointmentForm.submit(); // 👉 Gửi mail thật sau khi ký
    });

});
