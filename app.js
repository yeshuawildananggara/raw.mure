// Global State
let currentDate = new Date().toISOString().split('T')[0];
let currentEntry = {};

// Initializer Utama
function initApp() {
    document.getElementById('journal-date').value = currentDate;
    loadJournalDay(currentDate);

    // Setup Navigasi Sidebar
    const viewWrite = document.getElementById('view-write');
    const viewPixels = document.getElementById('view-pixels');
    const navWrite = document.getElementById('nav-write');
    const navPixels = document.getElementById('nav-pixels');

    navWrite.addEventListener('click', () => {
        viewWrite.classList.remove('hidden');
        viewPixels.classList.add('hidden');
        navWrite.className = "w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/80 shadow-sm font-medium transition-all duration-300";
        navPixels.className = "w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/50 text-gray-600 font-medium transition-all duration-300";
    });

    navPixels.addEventListener('click', () => {
        viewWrite.classList.add('hidden');
        viewPixels.classList.remove('hidden');
        navPixels.className = "w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/80 shadow-sm font-medium transition-all duration-300";
        navWrite.className = "w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/50 text-gray-600 font-medium transition-all duration-300";
        PixelsManager.renderGrid(handlePixelSelection);
    });

    // Event Listener Input Data Jurnal
    document.getElementById('journal-title').addEventListener('input', (e) => {
        currentEntry.title = e.target.value;
        StorageManager.saveEntry(currentDate, currentEntry);
    });

    document.getElementById('journal-content').addEventListener('input', (e) => {
        currentEntry.content = e.target.value;
        StorageManager.saveEntry(currentDate, currentEntry);
    });

    document.getElementById('journal-date').addEventListener('change', (e) => {
        currentDate = e.target.value;
        loadJournalDay(currentDate);
    });

    // Event Listener Mood Selector
    document.querySelectorAll('.mood-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const mood = btn.dataset.mood;
            currentEntry.mood = mood;
            ThemeManager.setTheme(mood);
            StorageManager.saveEntry(currentDate, currentEntry);
        });
    });

    // Event Tracker Kebiasaan (Habits)
    document.getElementById('habit-water').addEventListener('click', () => {
        currentEntry.habits.water = (currentEntry.habits.water >= 4) ? 0 : currentEntry.habits.water + 1;
        updateHabitUI();
        StorageManager.saveEntry(currentDate, currentEntry);
    });

    document.getElementById('habit-meditate').addEventListener('click', () => {
        currentEntry.habits.meditate = !currentEntry.habits.meditate;
        updateHabitUI();
        StorageManager.saveEntry(currentDate, currentEntry);
    });

    // Inisialisasi Sub-Manager
    StickerManager.init();
}

// Handler Saat Stiker Dijatuhkan
window.onStickerDropped = function(stickerData) {
    currentEntry.stickers.push(stickerData);
    StickerManager.renderStickers(currentEntry.stickers);
    StorageManager.saveEntry(currentDate, currentEntry);
};

// Handler ketika kotak piksel di klik
function handlePixelSelection(date) {
    currentDate = date;
    document.getElementById('journal-date').value = date;
    loadJournalDay(date);
    document.getElementById('nav-write').click(); // Alihkan layar ke form editor
}

// Memuat data entri hari tertentu ke form UI
function loadJournalDay(date) {
    currentEntry = StorageManager.getEntry(date);

    document.getElementById('journal-title').value = currentEntry.title || '';
    document.getElementById('journal-content').value = currentEntry.content || '';
    
    ThemeManager.setTheme(currentEntry.mood || 'happy');
    updateHabitUI();
    StickerManager.renderStickers(currentEntry.stickers || []);
}

// Sinkronisasi Data Kebiasaan ke Animasi UI
function updateHabitUI() {
    // Air (Max 4 level pengisian)
    const fluid = document.getElementById('water-fluid');
    const levelPercentage = (currentEntry.habits.water / 4) * 100;
    fluid.style.height = `${levelPercentage}%`;

    // Meditasi
    const medBtn = document.getElementById('habit-meditate');
    const medIcon = document.getElementById('meditate-icon');
    if (currentEntry.habits.meditate) {
        medBtn.className = "w-12 h-12 rounded-xl bg-purple-500 text-white flex items-center justify-center transition-all duration-300 shadow-md scale-105";
        medIcon.innerText = "🧘‍♀️";
    } else {
        medBtn.className = "w-12 h-12 rounded-xl bg-purple-50 hover:bg-purple-100 flex items-center justify-center transition-all duration-300";
        medIcon.innerText = "💤";
    }
}

// Jalankan aplikasi saat dokumen siap
window.addEventListener('DOMContentLoaded', initApp);
