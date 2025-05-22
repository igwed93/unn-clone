const slider = document.querySelector('.slider');
const figures = document.querySelectorAll('.slider figure');
const dotsContainer = document.querySelector('.slider-dots');
const transparentBar = document.querySelector('.transparent-bar');
const captions = Array.from(figures).map(fig => fig.querySelector('figcaption')?.textContent || "");
let index = 0;

// Create caption element if not present
let captionDiv = transparentBar.querySelector('.slider-caption');
if (!captionDiv) {
    captionDiv = document.createElement('div');
    captionDiv.className = 'slider-caption';
    dotsContainer.prepend(captionDiv);
}

// Create dots
figures.forEach((_, idx) => {
    const dot = document.createElement('span');
    dot.classList.add('slider-dot');
    if (idx === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(idx));
    dotsContainer.appendChild(dot);
});

function updateDots(index) {
    const dots = dotsContainer.querySelectorAll('.slider-dot');
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[index]) dots[index].classList.add('active');
}

function updateCaption(index) {
    captionDiv.textContent = captions[index];
}

function goToSlide(idx) {
    slider.style.transform = `translateX(-${idx * 100}%)`;
    index = idx;
    updateDots(idx);
    updateCaption(idx);
}

// Auto-slide function
function slideImages() {
    index = (index + 1) % figures.length;
    goToSlide(index);
}

goToSlide(0); // Initialize caption and dot
setInterval(slideImages, 5000);

// Show "arrow-up" only when user is near the bottom of the page
window.addEventListener('scroll', function () {
    const arrowUp = document.querySelector('.arrow-up');
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const fullHeight = document.body.offsetHeight;

    // Show only when user is near the bottom (within 150px of bottom)
    if (scrollY + viewportHeight >= fullHeight - 150) {
        arrowUp.style.opacity = '1';
        arrowUp.style.pointerEvents = 'auto';
    } else {
        arrowUp.style.opacity = '0';
        arrowUp.style.pointerEvents = 'none';
    }
});

// smoth scroll for arrow up button
document.querySelector('.arrow-up').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
});


// advanced sticky header on scroll
const bar = document.querySelector('.sticky-header-bar');
const placeholder = document.createElement('div');
placeholder.style.height = `${bar.offsetHeight}px`;
placeholder.style.display = 'none';
bar.parentNode.insertBefore(placeholder, bar);

// Get the bar's original vertical position
const barOffsetTop = bar.offsetTop;

window.addEventListener('scroll', function () {
    if (window.scrollY >= barOffsetTop) {
        bar.classList.add('fixed-bar');
        placeholder.style.display = 'block';
    } else {
        bar.classList.remove('fixed-bar');
        placeholder.style.display = 'none';
    }
});