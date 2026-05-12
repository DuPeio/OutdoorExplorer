document.addEventListener('DOMContentLoaded', () => {
    const rings = document.getElementById('rings');

    for (let i = 0; i < 20; i++) {
        const ring = document.createElement('div');
        ring.className = 'ring';
        rings.appendChild(ring);
    }
});


function openBook(){
    return true;
}