document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Load nội dung giới thiệu
    const introEl = document.getElementById('introText');
    if (introEl && typeof introText !== 'undefined') introEl.textContent = introText;

    // 2. TỰ ĐỘNG CẬP NHẬT SIDEBAR (Sự kiện sắp tới)
    const sidebarList = document.querySelector('.mini-event-list');
    
    // Kiểm tra xem sidebar có tồn tại không (để tránh lỗi nếu bạn chưa update HTML sidebar)
    if (sidebarList && typeof activities !== 'undefined') {
        sidebarList.innerHTML = ''; 

        const today = new Date();
        today.setHours(0,0,0,0); 

        const upcomingEvents = activities
            .filter(evt => new Date(evt.start) >= today) 
            .sort((a, b) => new Date(a.start) - new Date(b.start)) 
            .slice(0, 3); 

        if (upcomingEvents.length > 0) {
            upcomingEvents.forEach(evt => {
                const dateObj = new Date(evt.start);
                const dayStr = dateObj.getDate() + '/' + (dateObj.getMonth() + 1); 
                
                const html = `
                <div class="mini-event">
                    <span class="event-date">${dayStr}</span>
                    <div class="event-info">
                        <strong>${evt.title}</strong>
                        <span>${evt.desc || 'Sự kiện hấp dẫn'}</span>
                    </div>
                </div>`;
                sidebarList.innerHTML += html;
            });
        } else {
            sidebarList.innerHTML = '<p style="font-size:0.9rem; opacity:0.8; color:#fff;">Chưa có sự kiện sắp tới.</p>';
        }
    }

    // 3. KHỞI TẠO LỊCH
    const calendarEl = document.getElementById('activitiesContainer');
    const registerModal = document.getElementById('registerModal');
    // Tìm nút đóng cẩn thận hơn
    const closeRegBtn = document.querySelector('.close-register-btn'); 
    const formActivityName = document.getElementById('activityName');
    const formActivityDate = document.getElementById('activityDate');

    if (calendarEl && typeof activities !== 'undefined') {
        var calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            locale: 'vi',
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,listMonth'
            },
            // Giới hạn thời gian xem lịch
            validRange: {
                start: '2025-01-01',
                end: '2026-12-31' 
            },
            events: activities, 
            
            eventClick: function(info) {
                info.jsEvent.preventDefault(); 
                if(formActivityName) formActivityName.value = info.event.title;
                
                if(formActivityDate) {
                    const dateStr = info.event.start.toLocaleDateString('vi-VN');
                    formActivityDate.value = dateStr;
                }
                
                if(registerModal) registerModal.style.display = 'flex';
            }
        });
        calendar.render();
    }

    // 4. XỬ LÝ ĐÓNG MODAL (Sửa lỗi không bấm được)
    if (registerModal) {
        // Sự kiện click nút X
        if (closeRegBtn) {
            closeRegBtn.addEventListener('click', () => {
                registerModal.style.display = 'none';
            });
        }
        
        // Sự kiện click ra ngoài vùng trắng để đóng
        window.addEventListener('click', (e) => {
            if (e.target === registerModal) {
                registerModal.style.display = 'none';
            }
        });
    }

    // 5. Load testimonials
    const testimonialsContainer = document.getElementById('testimonialsContainer');
    if (testimonialsContainer && typeof testimonials !== 'undefined') {
        testimonials.forEach(t => {
            const div = document.createElement('div');
            div.className = 'testimonial hidden';
            const imgSrc = t.img ? t.img : 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
            div.innerHTML = `<img src="${imgSrc}" alt="Member"><p>"${t.text}"</p><strong>- ${t.name}</strong>`;
            testimonialsContainer.appendChild(div);
        });
    }

    // 6. Animation scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); 
            }
        });
    });
    setTimeout(() => {
        const hiddenElements = document.querySelectorAll('.hidden');
        hiddenElements.forEach((el) => observer.observe(el));
    }, 100);
});