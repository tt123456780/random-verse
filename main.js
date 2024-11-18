async function getVerses(category = 'general') {
    try {
        const response = await fetch(`/data/${category}.json`);
        const data = await response.json();
        return data.verses;
    } catch (error) {
        console.error('Error loading verses:', error);
        return [];
    }
}

async function getRandomVerse(category = 'general') {
    const verses = await getVerses(category);
    const randomIndex = Math.floor(Math.random() * verses.length);
    return verses[randomIndex];
}

function displayVerse(verse) {
    const verseDisplay = document.getElementById('verseDisplay');
    const verseText = document.getElementById('verse');
    const verseReference = document.getElementById('reference');

    verseText.textContent = verse.text;
    verseReference.textContent = verse.reference;
    verseDisplay.classList.remove('hidden');
}

// Main generate button
document.getElementById('generateVerse').addEventListener('click', async () => {
    const verse = await getRandomVerse();
    displayVerse(verse);
});

// Category buttons
document.querySelectorAll('.category-btn').forEach(button => {
    button.addEventListener('click', async () => {
        const category = button.dataset.category;
        const verse = await getRandomVerse(category);
        displayVerse(verse);
    });
});

// Close button for verse display
document.getElementById('closeVerse').addEventListener('click', () => {
    document.getElementById('verseDisplay').classList.add('hidden');
});