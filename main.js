let btn = document.querySelector("#themeButton");
let nav = document.querySelector("nav");
let sections = document.querySelectorAll("section");

btn.addEventListener("click", () => {

    if (nav.classList.contains("bg-dark")) {

        nav.classList.replace("bg-dark", "bg-white");
        nav.classList.replace("navbar-dark", "navbar-light");
        nav.classList.add("text-dark");
        nav.classList.remove("bg-opacity-75");
        nav.classList.add("bg-opacity-25");
        
        sections.forEach(section => {
            section.classList.replace("bg-dark", "bg-light");
            section.classList.replace("text-white", "text-dark");
            // section.classList.replace("text-white", "text-dark");
        });       
       

        document.body.classList.replace("bg-dark", "bg-light");
        document.body.classList.replace("text-white", "text-dark");
        
    } else {
        
        nav.classList.replace("bg-white", "bg-dark");
        nav.classList.replace("navbar-light", "navbar-dark");
        nav.classList.remove("text-dark", "border-bottom");
        
        nav.classList.remove("bg-opacity-25");
        nav.classList.add("bg-opacity-75");


        document.body.classList.replace("bg-light", "bg-dark");
        document.body.classList.replace("text-dark", "text-white");
        
    }
});


const observerOptions = {
  threshold: 0.1,  
  rootMargin: "0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Când elementul intră în ecran
      entry.target.classList.add('visible');
    } else {
      // Când elementul iese din ecran (resetăm animația)
      entry.target.classList.remove('visible');
    }
  });
}, observerOptions);

// Aplicăm pe toate elementele selectate
document.querySelectorAll('.animate-on-scroll').forEach(el => {
  observer.observe(el);
});

window.onscroll = function() {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    document.getElementById("scroll-progress").style.width = scrolled + "%";
};

document.querySelectorAll('.btn-primary, #themeButton').forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const position = button.getBoundingClientRect();
        
        const x = e.clientX - position.left; 
        const y = e.clientY - position.top;
        
        const centerX = position.width / 2;
        const centerY = position.height / 2;
        
        // Valoarea 0.2 face butonul "mai greu". 
        // Cu cat e mai mica, cu atat e mai greu de miscat.
        const deltaX = (x - centerX) * 0.2; 
        const deltaY = (y - centerY) * 0.2;
        
        button.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    });
    
    button.addEventListener('mouseleave', () => {
        // Revenire ultra-lina
        button.style.transform = 'translate(0px, 0px)';
    });
}); 

document.querySelectorAll('article.card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--x', `${x}px`);
        card.style.setProperty('--y', `${y}px`);
        
        // Cream un mic element pentru spotlight dacă nu există
        if (!card.querySelector('.card-spotlight')) {
            const light = document.createElement('div');
            light.classList.add('card-spotlight');
            card.appendChild(light);
        }
    });
}); 