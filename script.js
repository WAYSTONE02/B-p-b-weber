// script.js - CHỨA TOÀN BỘ LOGIC

// 1. Load dữ liệu intro
const introEl = document.getElementById('introText');
if (introEl) introEl.textContent = introText;

// 2. Load activities (Kèm class 'hidden' cho animation)
const activitiesContainer = document.getElementById('activitiesContainer');
if (activitiesContainer) {
    activities.forEach(act => {
        const div = document.createElement('div');
        div.className = 'activity hidden'; // Class hidden để chờ animation
        div.innerHTML = `<h3>${act.title}</h3><p>${act.desc}</p>`;
        activitiesContainer.appendChild(div);
    });
}

// 3. Load testimonials (Kèm class 'hidden' cho animation)
const testimonialsContainer = document.getElementById('testimonialsContainer');
if (testimonialsContainer) {
    testimonials.forEach(t => {
        const div = document.createElement('div');
        div.className = 'testimonial hidden'; // Class hidden để chờ animation
        div.innerHTML = `<img src="${t.img}" alt="Member"><p>"${t.text}"</p><strong>- ${t.name}</strong>`;
        testimonialsContainer.appendChild(div);
    });
}

// 4. Scroll mượt khi nhấn button Header
const joinBtn = document.getElementById('joinBtn');
if (joinBtn) {
    joinBtn.addEventListener('click', () => {
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });
}

// 5. XỬ LÝ SCROLL ANIMATION (Intersection Observer)
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            // Tùy chọn: Ngừng quan sát sau khi đã hiện để tối ưu hiệu năng
            observer.unobserve(entry.target); 
        }
    });
});

// Chọn tất cả các phần tử có class 'hidden' để quan sát
// Cần setTimeout nhỏ để đảm bảo DOM đã render xong các element từ JS
setTimeout(() => {
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));
}, 100);