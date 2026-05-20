const PixelsManager = {
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],

    renderGrid(onPixelClick) {
        const container = document.getElementById('pixels-grid-container');
        container.innerHTML = '';
        const allEntries = StorageManager.getAllEntries();

        // Ambil tahun berjalan saat ini
        const currentYear = new Date().getFullYear();

        this.months.forEach((monthName, monthIndex) => {
            const col = document.createElement('div');
            col.className = 'flex flex-col gap-1';

            // Judul Bulan
            const header = document.createElement('div');
            header.className = 'text-center font-bold text-xs mb-2 text-gray-400';
            header.innerText = monthName;
            col.appendChild(header);

            // Total hari dalam bulan ini
            const totalDays = new Date(currentYear, monthIndex + 1, 0).getDate();

            for (let day = 1; day <= 31; day++) {
                const pixel = document.createElement('div');
                
                if (day <= totalDays) {
                    // Format key tanggal ISO: YYYY-MM-DD
                    const dateString = `${currentYear}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                    const entry = allEntries[dateString];
                    
                    pixel.className = this.getMoodColorClass(entry ? entry.mood : 'none');
                    pixel.title = `${day} ${monthName} — Klik untuk buka`;
                    
                    pixel.addEventListener('click', () => onPixelClick(dateString));
                } else {
                    // Kotak kosong untuk tanggal tidak valid (ex: 30 & 31 Feb)
                    pixel.className = 'w-5 h-5 rounded bg-transparent opacity-0 pointer-events-none';
                }
                col.appendChild(pixel);
            }
            container.appendChild(col);
        });
    },

    getMoodColorClass(mood) {
        const base = 'w-5 h-5 rounded cursor-pointer transition-all duration-300 hover:scale-110 shadow-sm border border-black/5 ';
        switch(mood) {
            case 'happy': return base + 'bg-amber-200 hover:bg-amber-300';
            case 'sad': return base + 'bg-slate-300 hover:bg-slate-400';
            case 'calm': return base + 'bg-emerald-200 hover:bg-emerald-300';
            case 'stressed': return base + 'bg-zinc-700 hover:bg-zinc-800';
            default: return base + 'bg-gray-100 hover:bg-gray-200'; // kosong
        }
    }
};
