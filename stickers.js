const StickerManager = {
    init() {
        const panel = document.getElementById('sticker-panel');
        const openBtn = document.getElementById('open-sticker-panel');
        const closeBtn = document.getElementById('close-sticker-panel');
        const paper = document.getElementById('journal-paper');

        // Panel Toggle Animation
        openBtn.addEventListener('click', () => {
            panel.classList.remove('translate-y-2', 'opacity-0', 'pointer-events-none');
        });
        closeBtn.addEventListener('click', () => {
            panel.classList.add('translate-y-2', 'opacity-0', 'pointer-events-none');
        });

        // Setup Event Drag pada item koleksi stiker
        document.querySelectorAll('.sticker-item').forEach(sticker => {
            sticker.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', e.target.dataset.stickerId);
            });
        });

        // Setup Event Drop pada kertas jurnal
        paper.addEventListener('dragover', (e) => e.preventDefault());
        paper.addEventListener('drop', (e) => {
            e.preventDefault();
            const stickerId = e.dataTransfer.getData('text/plain');
            if (!stickerId) return;

            const rect = paper.getBoundingClientRect();
            // Kalkulasi posisi x dan y relatif terhadap kertas jurnal
            const x = e.clientX - rect.left - 24; // 24 adalah setengah lebar stiker (offset center)
            const y = e.clientY - rect.top - 24;

            // Trigger callback global aplikasi untuk menyimpan state data
            if (window.onStickerDropped) {
                window.onStickerDropped({ id_sticker: stickerId, x, y });
            }
        });
    },

    // Merender array stiker milik suatu hari ke atas kertas jurnal
    renderStickers(stickersArray) {
        const canvas = document.getElementById('sticker-canvas');
        canvas.innerHTML = ''; // bersihkan canvas lama

        const iconMap = { 'st-star': '⭐', 'st-heart': '❤️', 'st-cloud': '☁️', 'st-cat': '🐱' };

        stickersArray.forEach(st => {
            const el = document.createElement('div');
            el.className = 'absolute text-2xl select-none transition-all duration-300 pointer-events-auto cursor-pointer hover:scale-125';
            el.style.left = `${st.x}px`;
            el.style.top = `${st.y}px`;
            el.innerText = iconMap[st.id_sticker] || '✨';
            canvas.appendChild(el);
        });
    }
};
