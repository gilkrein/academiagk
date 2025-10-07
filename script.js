document.addEventListener('DOMContentLoaded', function()
{
    
  
    const menuIcon = document.querySelector('.menu-icon');  /* "menu hambúrguer" */

    const navMenu = document.querySelector('.nav-menu');

    if (menuIcon)
    {
        menuIcon.addEventListener('click', function()
        {
            navMenu.classList.toggle('active');
        });
    }

    /*modal/carrossel*/

    const openModalButtons = document.querySelectorAll('.open-modal-btn');

    const modalOverlay = document.getElementById('modal-overlay');

    const modal = document.getElementById('modal');

    const closeModalButton = document.getElementById('close-button');

    const modalTitle = document.getElementById('modal-title');

    const modalDescription = document.getElementById('modal-description');

    const carouselImagesContainer = document.querySelector('.carousel-images');

    const prevButton = document.querySelector('.carousel-button.prev');

    const nextButton = document.querySelector('.carousel-button.next');
    
    let currentImages = [];

    let currentImageIndex = 0;


    function showImage(index)
    {
        const images = carouselImagesContainer.querySelectorAll('img');

        images.forEach(img => img.classList.remove('active'));

        if (images[index])
        {
            images[index].classList.add('active');
        }
    }


    function openModal(button)
    {
        const title = button.getAttribute('data-title');

        const description = button.getAttribute('data-description');

        const images_str = button.getAttribute('data-images');
        
        currentImages = images_str.split(',');

        currentImageIndex = 0;

        modalTitle.textContent = title;

        modalDescription.textContent = description;

        carouselImagesContainer.innerHTML = '';

        currentImages.forEach(src =>
        {
            const img = document.createElement('img');
            img.src = src.trim();
            img.alt = title;
            carouselImagesContainer.appendChild(img);
        });
        
        showImage(currentImageIndex);

        modalOverlay.classList.remove('hidden');
    }



    function closeModal()
    {
        modalOverlay.classList.add('hidden');
    }

    openModalButtons.forEach(button =>
    {
        button.addEventListener('click', () =>
        {
            openModal(button);
        });
    });

    closeModalButton.addEventListener('click', closeModal);
    
    modalOverlay.addEventListener('click', (event) =>
    {
        if (event.target === modalOverlay)
        {
            closeModal();
        }
    });

    document.addEventListener('keydown', (event) =>
    {
        if (event.key === 'Escape' && !modalOverlay.classList.contains('hidden'))
        {
            closeModal();
        }
    });

    nextButton.addEventListener('click', () =>
    {
        currentImageIndex++;
        if (currentImageIndex >= currentImages.length)
        {
            currentImageIndex = 0;
        }

        showImage(currentImageIndex);
    });

    prevButton.addEventListener('click', () =>
    {
        currentImageIndex--;

        if (currentImageIndex < 0)
        {
            currentImageIndex = currentImages.length - 1;
        }

        showImage(currentImageIndex);
    });


    /* botão ToTop*/

    const backToTopButton = document.getElementById('back-to-top-btn');

    function toggleBackToTopButton()
    {
        if (window.scrollY > 300)
        {
            backToTopButton.classList.add('show');

        } else
        {
            backToTopButton.classList.remove('show');
        }
    }

    function scrollToTop(event)
    {
        event.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    window.addEventListener('scroll', toggleBackToTopButton);

    backToTopButton.addEventListener('click', scrollToTop);

}); 