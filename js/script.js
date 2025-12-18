
AOS.init({
    duration: 1000,
    once: true
});

function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });
});
function preventScroll(e) {
    e.preventDefault();
}

function orderWA(productName) {
    const hour = new Date().getHours();

    if (hour >= 23 || hour < 15) {
        document.body.classList.add('no-scroll');
        document.body.addEventListener('touchmove', preventScroll, { passive: false });
        document.getElementById('closedModal').style.display = 'block';
        return;
    }

    window.selectedProduct = productName;
    document.getElementById('paymentModal').style.display = 'block';
}


function closeModal() {
    document.getElementById('paymentModal').style.display = 'none';
    document.body.classList.remove('no-scroll');
    document.body.removeEventListener('touchmove', preventScroll, { passive: false });
}

function closeClosedModal() {
    document.getElementById('closedModal').style.display = 'none';
    document.body.classList.remove('no-scroll');
    document.body.removeEventListener('touchmove', preventScroll, { passive: false });
}

function sendProofWA() {
    const productName = window.selectedProduct;
    const number = "6285240667124";

    const hour = new Date().getHours();

    let greeting = "Pagi";
    if (hour >= 15 && hour < 19) greeting = "Sore";
    else if (hour >= 19) greeting = "Malam";

    const text = `Halo Admin, selamat ${greeting}.%0A%0ASaya telah melakukan pembayaran untuk menu *${productName}*.%0A%0ABerikut adalah bukti pembayaran saya.`;

    window.open(`https://api.whatsapp.com/send?phone=${number}&text=${text}`, '_blank');
    closeModal();
}

window.onclick = function(event) {
    const paymentModal = document.getElementById('paymentModal');
    const closedModal = document.getElementById('closedModal');
    if (event.target == paymentModal) {
        paymentModal.style.display = 'none';
        document.body.classList.remove('no-scroll');
        document.body.removeEventListener('touchmove', preventScroll, { passive: false });
    }
    if (event.target == closedModal) {
        closedModal.style.display = 'none';
        document.body.classList.remove('no-scroll');
        document.body.removeEventListener('touchmove', preventScroll, { passive: false });
    }
}

const defaultTestimonials = [
    { name: "Andi Pratama", text: "Rasanya pecah banget di mulut! Pisangnya manis, kejunya gak pelit. Fix langganan!", rating: 5, userAdded: false },
    { name: "Sarah Amelia", text: "Cocok banget buat temen ngopi sore. Pengirimannya juga cepet banget.", rating: 5, userAdded: false },
    { name: "Budi Santoso", text: "Enak, harga terjangkau. Varian Tiramisunya juara sih.", rating: 4, userAdded: false }
];

function loadTestimonials() {
    let testimonials = JSON.parse(localStorage.getItem('testimonials')) || defaultTestimonials;
    if (!localStorage.getItem('testimonials')) {
        localStorage.setItem('testimonials', JSON.stringify(testimonials));
    }
    renderTestimonials(testimonials);
}

function renderTestimonials(testimonials) {
    const list = document.querySelector('.testimonial-list');
    list.innerHTML = '';
    testimonials.forEach((testimonial) => {
        let starsHtml = '';
        for(let i=0; i<testimonial.rating; i++) starsHtml += '★';

        const reviewHtml = `
            <div class="review-card" data-aos="fade-up">
                <div class="review-stars">${starsHtml}</div>
                <p>"${testimonial.text}"</p>
                <h5>- ${testimonial.name}</h5>
            </div>
        `;
        list.insertAdjacentHTML('beforeend', reviewHtml);
    });
}

let currentSlide = 0;
const slides = document.querySelectorAll('.gallery-slider img');
const totalSlides = slides.length;

function showSlide(index) {
    const slider = document.querySelector('.gallery-slider');
    if (index >= totalSlides) currentSlide = 0;
    else if (index < 0) currentSlide = totalSlides - 1;
    else currentSlide = index;
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

document.addEventListener('DOMContentLoaded', function() {
    loadTestimonials();
    showSlide(currentSlide);

    document.querySelector('#closedModal .close').addEventListener('click', closeClosedModal);
    document.querySelector('#closedModal .btn-primary').addEventListener('click', closeClosedModal);

    document.getElementById('testimonialForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const text = document.getElementById('testimonial').value;
        const ratingEl = document.querySelector('input[name="rating"]:checked');

        if(!ratingEl) {
            alert("Mohon pilih rating bintang!");
            return;
        }

        const rating = parseInt(ratingEl.value);
        const newTestimonial = { name, text, rating, userAdded: true };

        let testimonials = JSON.parse(localStorage.getItem('testimonials')) || defaultTestimonials;
        testimonials.unshift(newTestimonial);

        localStorage.setItem('testimonials', JSON.stringify(testimonials));

        renderTestimonials(testimonials);

        this.reset();
        alert("Terima kasih! Ulasan Anda telah ditambahkan.");
    });
});
