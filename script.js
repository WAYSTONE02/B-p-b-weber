// Load dữ liệu intro
document.getElementById('introText').textContent = introText;

// Load activities
const activitiesContainer = document.getElementById('activitiesContainer');
activities.forEach(act => {
    const div = document.createElement('div');
    div.className = 'activity';
    div.innerHTML = `<h3>${act.title}</h3><p>${act.desc}</p>`;
    activitiesContainer.appendChild(div);
});

// Load testimonials
const testimonialsContainer = document.getElementById('testimonialsContainer');
testimonials.forEach(t => {
    const div = document.createElement('div');
    div.className = 'testimonial';
    div.innerHTML = `<img src="${t.img}" alt="Member"><p>"${t.text}"</p><strong>- ${t.name}</strong>`;
    testimonialsContainer.appendChild(div);
});

// Scroll mượt khi nhấn button
document.getElementById('joinBtn').addEventListener('click', ()=>{
    document.getElementById('contact').scrollIntoView({behavior:'smooth'});
});
