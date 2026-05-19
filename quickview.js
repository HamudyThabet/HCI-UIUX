//quick view
function attachQuickViewListeners() {
    const quickView = document.getElementById('quickViewModal'); //get modal
    const carouselDots = document.getElementById('carouselDots'); //get dots
    const starContainer = document.getElementById('quickViewStars'); //get stars
    const slideTrack = document.getElementById('carouselSlideTrack'); //get track
    let hideTimeout; //timeout for hiding

    //loop through product cards
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            const name = card.dataset.name; //get name
            const rating = parseFloat(card.dataset.rating) || 0; //get rating
            const images = [card.dataset.set, card.dataset.prod, card.dataset.box]; //get images

            document.getElementById('quickViewName').textContent = name; //set name

            //set star rating
            starContainer.innerHTML = "★ " + card.dataset.rating;

            //set quick view details
            document.getElementById('quickViewDetails').innerHTML = `
                        <div class="perfume-details">
                            <p><strong>Scent:</strong> ${card.dataset.scent}</p>
                            <p><strong>Vibe:</strong> ${card.dataset.vibe}</p>
                            <p><strong>Longevity:</strong> ${card.dataset.longevity}</p>
                            <p><strong>Best for:</strong> ${card.dataset.best}</p>
                        </div>
                    `;

            //set up carousel images
            slideTrack.innerHTML = ''; //clear images
            images.forEach(src => {
                const img = document.createElement('img'); //create img
                img.src = src; //set src
                img.style.width = `${100 / images.length}%`; //set width
                slideTrack.appendChild(img); //add to track
            });
            slideTrack.style.width = `${images.length * 100}%`; //set total width

            let currentIndex = 0; //current img
            function updateCarousel(index) {
                slideTrack.style.transform = `translateX(-${index * (100 / images.length)}%)`; //move carousel
                document.querySelectorAll('.carousel-dots span').forEach((dot, i) => {
                    dot.classList.toggle('active', i === index); //highlight active dot
                });
            }

            //carousel navigation
            document.getElementById("carouselLeftBtn").onclick = () => {
                currentIndex = (currentIndex - 1 + images.length) % images.length; //move left
                updateCarousel(currentIndex); //update
            };
            document.getElementById("carouselRightBtn").onclick = () => {
                currentIndex = (currentIndex + 1) % images.length; //move right
                updateCarousel(currentIndex); //update
            };

            //set up carousel dots
            carouselDots.innerHTML = ''; //clear dots
            images.forEach((_, i) => {
                const dot = document.createElement('span'); //create dot
                if (i === 0) dot.classList.add('active'); //mark first active
                dot.onclick = () => {
                    currentIndex = i; //set index
                    updateCarousel(currentIndex); //update
                };
                carouselDots.appendChild(dot); //add dot
            });

            updateCarousel(0); //init carousel

            //position quick view modal
            const rect = card.getBoundingClientRect(); //get card position
            const modalWidth = quickView.offsetWidth || 250; //get modal width
            const spaceRight = window.innerWidth - (rect.right + window.scrollX); //space right
            const spaceLeft = rect.left + window.scrollX; //space left

            //position modal based on space
            if (spaceRight >= modalWidth + 20) {
                quickView.style.left = `${rect.left + window.scrollX + card.offsetWidth + 10}px`;
            } else {
                quickView.style.left = `${rect.left + window.scrollX - modalWidth - 10}px`;
            }
            quickView.style.top = `${rect.top + window.scrollY}px`; //set top
            quickView.style.display = 'block'; //show modal

            clearTimeout(hideTimeout); //clear hide timeout
        });

        //hide quick view on mouse leave
        card.addEventListener('mouseleave', () => {
            hideTimeout = setTimeout(() => {
                if (!quickView.matches(':hover')) { //if not hovering
                    quickView.style.display = 'none'; //hide modal
                }
            }, 200); //delay
        });

        //keep quick view visible on hover
        quickView.addEventListener('mouseenter', () => {
            clearTimeout(hideTimeout); //clear timeout
        });

        //hide quick view on mouse leave
        quickView.addEventListener('mouseleave', () => {
            quickView.style.display = 'none'; //hide modal
        });
    });
}

//observe cards on scroll for fade in effect
function observeCardsOnScroll() {
    const cards = document.querySelectorAll('.product-card'); //get cards
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { //if in view
                entry.target.classList.add('visible'); //add visible class
                observer.unobserve(entry.target); //stop observing
            }
        });
    }, {
        threshold: 0.1 //trigger when 10% visible
    });

    cards.forEach(card => observer.observe(card)); //observe each card
}