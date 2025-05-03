const images = document.querySelectorAll('img');

images.forEach(image => {
    image.addEventListener('click', function() {
        // Get the image's src attribute
        const src = image.src;

        const expandedImage = document.getElementById('expanded');
        expandedImage.src = src;

        const modal = document.getElementById('modal');
        modal.style.display = 'flex';
    });
});

function closeModal(){
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}