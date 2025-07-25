const instrumentsData = {
    gnawa: [
        {
            name: "Guembri",
            price: 1200,
            image: "images/instruments/guembri.jpg",
            description: "Traditional three-stringed lute with a wooden body covered in camel skin."
        },
        {
            name: "Qraqeb",
            price: 300,
            image: "images/instruments/qraqeb.jpg",
            description: "Metal castanets used to create rhythmic patterns in Gnawa music."
        }
    ],
    ahwach: [
        {
            name: "Bendir",
            price: 450,
            image: "images/instruments/bendir.jpg",
            description: "Traditional frame drum used in Amazigh music."
        },
        {
            name: "Nafir",
            price: 800,
            image: "images/instruments/nafir.jpg",
            description: "Traditional trumpet used in ceremonial music."
        }
    ],  

    hwara: [
        {
            name: "Big Talount",
            price: 450,
            image: "images/instruments/Big.jpg",
            description: "Traditional frame drum used in Amazigh music."
        },
        {
            name: "Small Talount",
            price: 800,
            image: "images/instruments/Small.jpg",
            description: "Traditional trumpet used in ceremonial music."
        }
    ]
    // Add more categories and instruments
};

let cart = [];

function initializeStore() {
    Object.keys(instrumentsData).forEach(category => {
        const container = document.querySelector(`#${category} .instruments-grid`);
        
        instrumentsData[category].forEach(instrument => {
            const card = createInstrumentCard(instrument);
            container.appendChild(card);
        });
    });
}

function createInstrumentCard(instrument) {
    const card = document.createElement('div');
    card.className = 'instrument-card';
    card.innerHTML = `
        <img src="${instrument.image}" alt="${instrument.name}" class="instrument-image">
        <div class="instrument-info">
            <h3 class="instrument-name">${instrument.name}</h3>
            <p class="instrument-price">${instrument.price} MAD</p>
            <p class="instrument-description">${instrument.description}</p>
            <button class="buy-button" onclick="addToCart(${JSON.stringify(instrument)})">
                Add to Cart
            </button>
        </div>
    `;
    return card;
}

function addToCart(instrument) {
    cart.push(instrument);
    updateCartCount();
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length;
}

// Initialize store when page loads
document.addEventListener('DOMContentLoaded', initializeStore);
