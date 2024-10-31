// about.js

// Modal functionality for images
document.querySelectorAll('.image').forEach(image => {
    image.addEventListener('click', function () {
        const modal = document.getElementById('image-modal');
        const modalImg = document.getElementById('modal-image');
        modal.style.display = "flex";
        modalImg.src = this.src;
    });
});

// Close the modal when clicking on <span> (x)
document.getElementsByClassName("close")[0].onclick = function () {
    const modal = document.getElementById('image-modal');
    modal.style.display = "none";
};

// Close the modal when clicking anywhere outside of the modal
window.onclick = function (event) {
    const modal = document.getElementById('image-modal');
    if (event.target === modal) {
        modal.style.display = "none";
    }
};


