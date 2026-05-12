document.addEventListener('DOMContentLoaded', () => {
    const rings = document.getElementById('rings');

    for (let i = 0; i < 20; i++) {
        const ring = document.createElement('div');
        ring.className = 'ring';
        rings.appendChild(ring);
    }
});

let isOpen = false;

function openBook() {
    if (isOpen)return;
    isOpen = true;
    document.getElementById('cover-title').classList.add('hidden');
    document.getElementById('img-front-page').classList.add('hidden');
}