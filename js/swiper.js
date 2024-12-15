const swiperWrapper = document.querySelector('.swiper-wrapper');
const slides = document.querySelectorAll('.swiper-slide');
const totalSlides = slides.length;

const firstClone = slides[0].cloneNode(true);
const lastClone = slides[totalSlides - 1].cloneNode(true);

swiperWrapper.appendChild(firstClone);
swiperWrapper.prepend(lastClone);

const updatedSlides = document.querySelectorAll('.swiper-slide');
const totalUpdatedSlides = updatedSlides.length;
let currentIndex = 1;
let isTransitioning = false;

swiperWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;

function updateSlider(index) {
    if (isTransitioning) return;
    isTransitioning = true;

    swiperWrapper.style.transition = 'transform 0.6s ease-in-out';
    swiperWrapper.style.transform = `translateX(-${index * 100}%)`;

    currentIndex = index;

    swiperWrapper.addEventListener('transitionend', () => {
        isTransitioning = false;
        if (currentIndex === 0) {
            currentIndex = totalSlides;
            swiperWrapper.style.transition = 'none';
            swiperWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
        if (currentIndex === totalSlides + 1) {
            currentIndex = 1;
            swiperWrapper.style.transition = 'none';
            swiperWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
    });
}

document.querySelector('.swiper-button-next').addEventListener('click', () => {
    if (!isTransitioning) {
        updateSlider(currentIndex + 1);
    }
});

document.querySelector('.swiper-button-prev').addEventListener('click', () => {
    if (!isTransitioning) {
        updateSlider(currentIndex - 1);
    }
});

const paginationContainer = document.querySelector('.swiper-pagination');
updatedSlides.forEach((_, index) => {
    if (index > 0 && index <= totalSlides) {
        const dot = document.createElement('span');
        dot.classList.add('pagination-dot');
        if (index === currentIndex) dot.classList.add('active');
        dot.addEventListener('click', () => updateSlider(index));
        paginationContainer.appendChild(dot);
    }
});

function updatePagination() {
    const dots = document.querySelectorAll('.pagination-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index + 1 === currentIndex);
    });
}

swiperWrapper.addEventListener('transitionend', updatePagination);

setInterval(() => {
    if (!isTransitioning) {
        updateSlider(currentIndex + 1);
    }
}, 5000);
