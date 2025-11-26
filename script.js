// script.js - Phiên bản sửa lỗi
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Load dữ liệu
    const introEl = document.getElementById('introText');
    if (introEl && typeof introText !== 'undefined') introEl.textContent = introText;

    // 2. Xử lý Activities và Modal
    const activitiesContainer = document.getElementById('activitiesContainer');
    const modal = document.getElementById('imageModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalGallery = document.getElementById('modalGallery');
    const closeBtn = document.querySelector('.close-btn'); // Tìm nút X

    if (activitiesContainer && typeof activities !== 'undefined') {
        activities.forEach(act => {
            const div = document.createElement('div');
            div.className = 'activity hidden';
            div.style.cursor = 'pointer'; 
            div.innerHTML = `<h3>${act.title}</h3><p>${act.desc}</p>`;
            
            // Bấm vào thẻ thì mở Modal
            div.onclick = function() {
                if(modal) {
                    modalTitle.textContent = act.title;
                    modalGallery.innerHTML = ''; 
                    
                    if (act.images && act.images.length > 0) {
                        act.images.forEach(imgSrc => {
                            const img = document.createElement('img');
                            img.src = imgSrc;
                            modalGallery.appendChild(img);
                        });
                    } else {
                        modalGallery.innerHTML = '<p style="text-align:center; padding:20px;">Chưa có hình ảnh.</p>';
                    }
                    modal.style.display = 'flex';
                }
            };
            activitiesContainer.appendChild(div);
        });
    }

    // 3. CHỨC NĂNG ĐÓNG MODAL (Quan trọng)
    if (modal) {
        // Cách 1: Bấm nút X
        if (closeBtn) {
            closeBtn.onclick = function() {
                modal.style.display = 'none';
            };
        }

        // Cách 2: Bấm ra vùng đen bên ngoài
        window.onclick = function(e) {
            if (e.target == modal) {
                modal.style.display = 'none';
            }
        };
    }

    // 4. Load testimonials
    const testimonialsContainer = document.getElementById('testimonialsContainer');
    if (testimonialsContainer && typeof testimonials !== 'undefined') {
        testimonials.forEach(t => {
            const div = document.createElement('div');
            div.className = 'testimonial hidden';
            div.innerHTML = `<img src="${t.img}" alt="Member"><p>"${t.text}"</p><strong>- ${t.name}</strong>`;
            testimonialsContainer.appendChild(div);
        });
    }

    // 5. Scroll mượt
    const joinBtn = document.getElementById('joinBtn');
    if (joinBtn) {
        joinBtn.addEventListener('click', () => {
            const contactSection = document.getElementById('contact');
            if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // 6. Animation khi cuộn trang
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