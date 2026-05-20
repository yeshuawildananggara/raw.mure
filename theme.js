const ThemeManager = {
    themes: ['happy', 'sad', 'calm', 'stressed'],

    setTheme(mood) {
        const body = document.body;
        
        // Bersihkan tema lama
        this.themes.forEach(t => body.classList.remove(`theme-${t}`));
        
        // Pasang tema baru
        body.classList.add(`theme-${mood}`);

        // Update visual tombol aktif di UI
        document.querySelectorAll('.mood-btn').forEach(btn => {
            if (btn.dataset.mood === mood) {
                btn.className = "mood-btn px-3 py-1.5 rounded-full text-sm font-semibold bg-white shadow-md scale-105 transition-all duration-300";
            } else {
                btn.className = "mood-btn px-3 py-1.5 rounded-full text-sm text-gray-500 hover:text-gray-800 transition-all duration-300";
            }
        });
    }
};
