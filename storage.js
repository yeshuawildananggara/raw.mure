const StorageManager = {
    KEY: 'aurajournal_entries',

    // Mengambil semua data entri
    getAllEntries() {
        const data = localStorage.getItem(this.KEY);
        return data ? JSON.parse(data) : {};
    },

    // Mengambil satu entri berdasarkan tanggal (YYYY-MM-DD)
    getEntry(date) {
        const entries = this.getAllEntries();
        return entries[date] || {
            id: date,
            date: date,
            title: '',
            content: '',
            mood: 'happy',
            habits: { water: 0, meditate: false },
            stickers: []
        };
    },

    // Menyimpan entri tunggal
    saveEntry(date, entryData) {
        const entries = this.getAllEntries();
        entries[date] = { ...entries[date], ...entryData };
        localStorage.setItem(this.KEY, JSON.stringify(entries));
    }
};
