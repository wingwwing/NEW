    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768) {

    // Hiện thông báo xác nhận
    
    const userChoice = confirm("Hãy mở link bằng máy tính để có trải nghiệm tốt nhất nha!");

    if (userChoice) {
        // Nếu nhấn OK -> Thoát (chuyển hướng sang trang khác hoặc đóng tab)
       
        window.location.href = "https://www.youtube.com/watch?v=MJE8tqRFPWs&list=RDMJE8tqRFPWs&start_radio=1"; // Hoặc link bất kỳ Taylor muốn
    } else {
        // Nếu nhấn Cancel -> Tiếp tục ở lại trang
        console.log("Harley quyết định xem trên điện thoại.");
    }
}
// Lấy thẻ form
const appointmentForm = document.querySelector('form');
const dateDisplay = document.getElementById('dateDisplay');

if (appointmentForm && dateDisplay) {
    appointmentForm.addEventListener('submit', function(e) {

        // 1. Lấy giá trị từ 2 ô nhập time
    const valFrom = document.getElementById('timeFrom').value;
    const valTo = document.getElementById('timeTo').value;

    // 2. Hàm chuyển đổi 24h -> 12h AM/PM
    const formatAMPM = (time) => {
        if (!time) return "";
        let [h, m] = time.split(':');
        let ampm = h >= 12 ? 'PM' : 'AM';
        h = h % 12 || 12; // Chuyển 00 thành 12
        return `${h}:${m} ${ampm}`;
    };

    // 3. Gán giá trị đã đẹp vào ô ẩn để Formspree gửi đi
    document.getElementById('timeFromAMPM').value = formatAMPM(valFrom);
    document.getElementById('timeToAMPM').value = formatAMPM(valTo);
    const dateValue = dateDisplay.value;
    const parts = dateValue.split('/');

    if (parts.length === 3) {
        const d = parseInt(parts[0]);
        const m = parseInt(parts[1]);
        const y = parseInt(parts[2]);

        // 1. Tính toán số ngày tối đa trong tháng đó
        const maxDays = new Date(y, m, 0).getDate();

        // 2. Các biến kiểm tra sai sót
        const isMonthInvalid = (m < 1 || m > 12);
        const isDayInvalid = (d < 1 || d > maxDays);

        // 3. Logic hiện thông báo (Pop-up) theo yêu cầu của Taylor
        if (isDayInvalid && isMonthInvalid) {
            e.preventDefault();
            alert("nhập lại ngày tháng đi mò"); // Sai cả 2
            dateDisplay.focus();
            return;
        } 

        if (isMonthInvalid) {
            e.preventDefault();
            alert("tháng kì dị"); // Sai tháng
            dateDisplay.focus();
            return;
        }

        if (isDayInvalid) {
            e.preventDefault();
            alert("uii tháng ni có nhiều ngày dị"); // Sai ngày
            dateDisplay.focus();
            return;
        }
    } else {
        // Trường hợp chưa nhập đủ dd/mm/yyyy
        e.preventDefault();
        alert("nhập đúng định dạng dd/mm/yyyy đi mò");
    }
});

    // Tự động thêm dấu / khi gõ (giúp Harley nhập nhanh hơn)
    // dateDisplay.addEventListener('input', function(e) {
    //     let value = e.target.value.replace(/\D/g, '');
    //     if (value.length > 2) value = value.slice(0, 2) + '/' + value.slice(2);
    //     if (value.length > 5) value = value.slice(0, 5) + '/' + value.slice(5, 9);
    //     e.target.value = value;
    // });
}

// ... Các đoạn code moveButton, createHearts giữ nguyên bên dưới ...

        const noBtn = document.getElementById('noBtn');
        const yesBtn = document.getElementById('yesBtn');
        const mainContent = document.getElementById('main-content');
        const message = document.getElementById('message');
        const videoContainer = document.getElementById('video-container');
        const myVideo = document.getElementById('myVideo');
        const finalChoice = document.getElementById('final-choice');
        const letsGoBtn = document.getElementById('letsGoBtn');
        const busyBtn = document.getElementById('busyBtn');
        const busyScreen = document.getElementById('busy-screen');
        const formScreen = document.getElementById('form-screen');
        const videoBusy = document.getElementById('videoBusy');
        const timeFrom = document.getElementById('timeFrom');
        const timeTo = document.getElementById('timeTo');
        const finalTimeRange = document.getElementById('finalTimeRange');


        // Hàm xử lý định dạng hh:mm cho cả 2 ô
        function formatTimeInput(e) {
            let value = e.target.value.replace(/\D/g, ''); // Chỉ lấy số
            if (value.length > 2) {
                value = value.slice(0, 2) + ':' + value.slice(2, 4);
            }
            e.target.value = value;

        // Gộp giá trị để gửi về hệ thống
            finalTimeRange.value = `Từ ${timeFrom.value} đến ${timeTo.value}`;
        }

        timeFrom.addEventListener('input', formatTimeInput);
        timeTo.addEventListener('input', formatTimeInput);

        // Thêm Validation vào sự kiện submit form
        appointmentForm.addEventListener('submit', function(e) {
            const timePattern = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;

            if (!timePattern.test(timeFrom.value) || !timePattern.test(timeTo.value)) {
                e.preventDefault();
                alert("Hãy nhập đúng định dạng giờ đi mò! (hh:mm)");
            }
        });
        // Xử lý nút No chạy trốn
        let isMoved = false;

    function moveButton() {
        if (!isMoved) {
            // Lần đầu tương tác, chúng ta không dùng fixed nữa mà dùng translate
            // để giữ nguyên vị trí tương đối ban đầu, tránh bị giật
            isMoved = true;
        }

        // Lấy kích thước màn hình và nút
        const buttonRect = noBtn.getBoundingClientRect();
        const containerRect = document.body.getBoundingClientRect();

        // Tính toán khoảng cách tối đa mà nút có thể "dịch chuyển" khỏi vị trí gốc
        // Chúng ta tính toán sao cho nút không bay khỏi màn hình
        const maxX = (window.innerWidth / 2) - noBtn.offsetWidth;
        const maxY = (window.innerHeight / 2) - noBtn.offsetHeight;

        // Tạo tọa độ ngẫu nhiên (có thể âm hoặc dương để nhảy quanh vị trí gốc)
        const x = Math.floor(Math.random() * (maxX * 2)) - maxX;
        const y = Math.floor(Math.random() * (maxY * 2)) - maxY;

        // Dùng transform để di chuyển (GPU sẽ xử lý nên rất mượt)
        noBtn.style.transform = `translate(${x}px, ${y}px)`;
    }
        noBtn.addEventListener('mouseover', moveButton);
        noBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            moveButton();
        });



        // Sự kiện khi ấn Let's Go (Chuyển sang màn hình Form)
            letsGoBtn.addEventListener('click', () => {


         // 1. Tạm dừng video mewkiss và tắt tiếng
            if (myVideo) {
                myVideo.pause(); 
                myVideo.currentTime = 0; // Đưa video về lại giây đầu tiên nếu muốn
            }

            // 2. Hiện màn hình Form
            formScreen.style.display = 'flex';
        });

        // Tương tự cho nút Quay lại (Back) nếu Mẫn muốn video phát lại khi quay ra
        const backLink = document.querySelector('.back-link');
        if (backLink) {
            backLink.addEventListener('click', () => {
                formScreen.style.display = 'none';
                // Nếu muốn quay lại màn hình mewkiss mà vẫn nghe nhạc thì dùng play()
                // if (myVideo) myVideo.play(); 
            });
        }
    // Sự kiện khi ấn Yes
        yesBtn.addEventListener('click', () => {
            mainContent.style.display = 'none';
            noBtn.style.display = 'none';
            createHearts(); 
            message.style.display = 'block';
            if(myVideo) {
            myVideo.muted = false; // Mở tiếng cho video mewkiss
            myVideo.play();
        }

        // CHỜ 5 GIÂY (hoặc thời lượng vd mèo) rồi hiện 2 nút
        setTimeout(() => {
            finalChoice.style.display = 'flex';
        }, 5000); 
    });

    // Sự kiện khi ấn Busy
    // Sự kiện khi ấn Busy
    // --- Xử lý cho nút Busy ---
        busyBtn.addEventListener('click', () => {
            if (myVideo) {
                myVideo.pause(); // Tạm dừng nhạc lãng mạn khi xem video Busy
            }
            busyScreen.style.display = 'flex';
            if (videoBusy) {
                videoBusy.muted = false;
                videoBusy.currentTime = 0;
                videoBusy.play();
            }
            // Hiện chữ See you soon
            const busyOverlay = document.getElementById('busy-overlay');
            setTimeout(() => { if (busyOverlay) busyOverlay.style.opacity = '1'; }, 1000);
        });

        // --- QUAN TRỌNG: Xử lý khi QUAY LẠI (Back) ---
        // Mẫn cần gán sự kiện cho tất cả các nút Back (trong Form và trong màn hình Busy)
        const allBackBtns = document.querySelectorAll('.back-link, #backFromBusy');

        allBackBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Ẩn các màn hình phụ
                formScreen.style.display = 'none';
                busyScreen.style.display = 'none';

                // Tắt video Busy nếu đang chạy
                if (videoBusy) videoBusy.pause();

                // ĐƯA MỌI THỨ TRỞ LẠI BÌNH THƯỜNG
                if (myVideo) {
                    myVideo.muted = false; // Bật lại tiếng
                    myVideo.play();        // Tiếp tục chạy từ điểm đã dừng
                }

                // Reset chữ "See you soon" nếu muốn quay lại lần sau vẫn mờ mờ hiện lên
                const busyOverlay = document.getElementById('busy-overlay');
                if (busyOverlay) busyOverlay.style.opacity = '0';
            });
        });

    // Sự kiện khi ấn Let's Go
    letsGoBtn.addEventListener('click', () => {
        if (myVideo) {
        myVideo.pause(); // Tạm dừng nhạc lãng mạn khi sang Form
    }
        formScreen.style.display = 'flex';
    });

    function createHearts() {
        const heartCount = 50; // Số lượng trái tim
        for (let i = 0; i < heartCount; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.className = 'floating-heart';
                heart.innerHTML = '💜';

                // Vị trí ngang ngẫu nhiên
                heart.style.left = Math.random() * 100 + 'vw';

                // Thời gian bay ngẫu nhiên từ 3s đến 6s
                const duration = Math.random() * 3 + 3;
                heart.style.animationDuration = duration + 's';

                // Kích thước ngẫu nhiên
                heart.style.fontSize = Math.random() * 20 + 20 + 'px';

                document.body.appendChild(heart);

                // Xóa trái tim sau khi bay xong để tránh nặng máy
                setTimeout(() => {
                    heart.remove();
                }, duration * 1000);
            }, i * 100); // Mỗi trái tim xuất hiện cách nhau 0.1s
        }
    }