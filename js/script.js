// Init Animation
AOS.init({
    duration: 1000,
    once: true
});

// Toggle Mobile Menu
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Auto Close Mobile Menu when link clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });
});

// Smart WhatsApp Ordering with Payment Modal
function orderWA(productName) {
    // Store the selected product for later use
    window.selectedProduct = productName;
    // Open the payment modal
    document.getElementById('paymentModal').style.display = 'block';
}

// Close the modal
function closeModal() {
    document.getElementById('paymentModal').style.display = 'none';
}

// Send proof of payment via WhatsApp
function sendProofWA() {
    const productName = window.selectedProduct;
    const number = "6285240667124";

    // Set Greeting based on time
    const hour = new Date().getHours();
    // Check if closed
    if (hour >= 11 && hour < 15) {
        alert("Maaf, toko sedang tutup. Buka kembali pukul 15.00.");
        return;
    }
    let greeting = "Pagi";
    if (hour >= 15 && hour < 19) greeting = "Sore";
    else if (hour >= 19) greeting = "Malam";

    const text = `Halo Admin, selamat ${greeting}.%0A%0ASaya telah melakukan pembayaran untuk menu *${productName}*.%0A%0ABerikut adalah bukti pembayaran saya.`;

    window.open(`https://api.whatsapp.com/send?phone=${number}&text=${text}`, '_blank');
    // Close the modal after sending
    closeModal();
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('paymentModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Testimonial Logic
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

document.addEventListener('DOMContentLoaded', loadTestimonials);
