// =========================================================================
// app.js - Saytning asosiy yuklanish va inisializatsiya qismi
// =========================================================================

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. LocalStorage ma'lumotlarini dastlabki yuklash
    if (!localStorage.getItem('school_news') && typeof initialNews !== 'undefined') {
        localStorage.setItem('school_news', JSON.stringify(initialNews));
    }
    
    // 2. Kontentni yaratish va chizish
    renderTeachers();
    renderNews();

    // 3. Admin panel orqali o'zgarish bo'lsa, quloq tutish va yangilash
    window.addEventListener('newsUpdated', () => {
        renderNews();
    });
});

// O'qituvchilar ro'yxatini yuklash
function renderTeachers() {
    const container = document.getElementById('teachers-list');
    if (!container || typeof teachers === 'undefined') return;
    
    container.innerHTML = '';
    
    teachers.forEach(teacher => {
        const div = document.createElement('div');
        div.className = 'team-card text-center card hover-lift';
        
        div.innerHTML = `
            <div class="avatar shadow-sm"><i class="fas ${teacher.icon}"></i></div>
            <h4>${teacher.name}</h4>
            <p class="text-primary mt-2 mb-1" style="font-weight: 500;">${teacher.subject}</p>
            <p class="text-muted text-sm"><i class="fas fa-star text-gold mr-1"></i> Tajriba: ${teacher.experience}</p>
        `;
        
        container.appendChild(div);
    });
}

// Yangiliklarni yuklash qismi (Home va News sahifalari uchun)
window.renderNews = function() {
    const homeContainer = document.getElementById('home-news');
    const allContainer = document.getElementById('all-news');
    
    const newsData = JSON.parse(localStorage.getItem('school_news')) || [];
    // Sanasi bo'yicha kamayish tartibida taxlash (eng yangilari birinchi)
    const sortedNews = newsData.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    const generateNewsCard = (item) => `
        <div class="card hover-lift news-card">
            <img src="${item.image}" alt="${item.title}" class="news-img">
            <div style="flex-grow: 1;">
                <span class="news-date"><i class="far fa-calendar-alt"></i> ${item.date}</span>
                <h4 style="margin-bottom: 0.75rem;">${item.title}</h4>
                <p class="text-muted">${item.content.length > 120 ? item.content.substring(0, 120) + '...' : item.content}</p>
            </div>
            <button class="btn btn-outline mt-3 w-100" onclick="showReadMoreAlert()">O'qish</button>
        </div>
    `;
    
    // Asosiy sahifada eng so'nggi 3 ta yangilikni ko'rsatish
    if (homeContainer) {
        homeContainer.innerHTML = sortedNews.slice(0, 3).map(generateNewsCard).join('');
    }
    
    // Barcha yangiliklar qismida barchasini ko'rsatish
    if (allContainer) {
        allContainer.innerHTML = sortedNews.map(generateNewsCard).join('');
    }
}

// O'qish tugmasi ezilganda yorug'lik bildirishnomasi
window.showReadMoreAlert = function() {
    if (window.showToast) {
        window.showToast("Batafsil o'qish imkoniyati yakuniy modullarda qo'shiladi", "success");
    } else {
        alert("Batafsil o'qish onlayn tez kunda ishga tushadi!");
    }
}
