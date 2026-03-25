// =========================================================================
// admin.js - Admin panel operatsiyalari va LocalStorage ustida amallar
// =========================================================================

document.addEventListener('DOMContentLoaded', () => {
    const addNewsForm = document.getElementById('add-news-form');
    const resetBtn = document.getElementById('reset-data');

    if (addNewsForm) {
        addNewsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Maydonlardan ma'lumotlarni olish
            const title = document.getElementById('news-title').value;
            const date = document.getElementById('news-date').value;
            const image = document.getElementById('news-image').value || "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80";
            const content = document.getElementById('news-content').value;
            
            const currentNews = JSON.parse(localStorage.getItem('school_news')) || [];
            const newId = currentNews.length > 0 ? Math.max(...currentNews.map(n => n.id)) + 1 : 1;
            
            const newArticle = {
                id: newId,
                title,
                date,
                image,
                content
            };
            
            // Xabarni massivga qo'shish va LocalStorage'ni yangilash
            currentNews.push(newArticle);
            localStorage.setItem('school_news', JSON.stringify(currentNews));
            
            // Yangilanish sodir bo'lganligi haqida global signal yuborish
            window.dispatchEvent(new Event('newsUpdated'));
            
            // Bildirishnoma va tozalash
            window.showToast("Yangilik muvaffaqiyatli saqlandi va sahifaga tushirildi!", "success");
            addNewsForm.reset();
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            // Foydalanuvchiga ogohlantirish berish
            if(confirm("Haqiqatan ham barcha qo'shilgan yangiliklarni o'chirib, dastlabki holatga qaytarmoqchimisiz?")) {
                
                // Bazani tozalash va asosiy qiymatlarni qaytarish
                localStorage.removeItem('school_news');
                if (typeof initialNews !== 'undefined') {
                    localStorage.setItem('school_news', JSON.stringify(initialNews));
                }
                
                window.dispatchEvent(new Event('newsUpdated'));
                window.showToast("Ma'lumotlar tozalandi va asl holatiga qaytdi", "success");
            }
        });
    }
});
