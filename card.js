function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}

function filterGenres(category) {
    const cards = document.querySelectorAll('.subgenre-card');
    const buttons = document.querySelectorAll('.filter-btn');
    
    // Update active button
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Filter cards
    cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.5s ease';
        } else {
            card.style.display = 'none';
        }
    });
}

function showRegionInfo(region) {
    const info = {
        'Scandinavia': 'Scandinavia gave birth to black metal in the early 1990s, with Norwegian bands like Mayhem, Burzum, and Darkthrone pioneering the raw, atmospheric sound that defined the genre.',
        'UK': 'The UK launched the New Wave of British Heavy Metal (NWOBHM) in the late 1970s, with bands like Iron Maiden, Judas Priest, and Saxon influencing metal worldwide.',
        'Germany': 'Germany became the epicenter of power metal with bands like Helloween and Blind Guardian, known for their melodic, fantasy-themed approach to metal.',
        'USA': 'The United States birthed thrash metal in the 1980s with the "Big Four": Metallica, Megadeth, Slayer, and Anthrax, revolutionizing metal with speed and aggression.',
        'Brazil': 'Brazil developed a unique metal scene with bands like Sepultura and Angra, blending metal with local musical influences and becoming South America\'s metal capital.'
    };
    
    alert(info[region]);
}

// Add CSS animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);

// Add scroll animations
window.addEventListener('scroll', () => {
    const cards = document.querySelectorAll('.subgenre-card');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            card.style.transform = 'translateY(0)';
            card.style.opacity = '1';
        }
    });
});

// Initialize card animations
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.subgenre-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.6s ease';
        card.style.transitionDelay = `${index * 0.1}s`;
    });
});