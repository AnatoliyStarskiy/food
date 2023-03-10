function slider({
    container, 
    slide,
    nextArrow,
    prevArrow,
    totalCuunter,
    currentCounter,
    wrapper, 
    field
}) {
     // Slider
     let slideIndex = 1;
     let offset = 0;
 
     const slides = document.querySelectorAll(slide);
     const slider = document.querySelector(container);
     const prev = document.querySelector(prevArrow);
     const next = document.querySelector(nextArrow);
     const total = document.querySelector(totalCuunter);
     const current = document.querySelector(currentCounter);
     const slidesWrapper = document.querySelector(wrapper);
     const slidesField = document.querySelector(field);
     const width = window.getComputedStyle(slidesWrapper).width;
 
 
     if (slides.length < 10) {
         total.textContent = `0${slides.length}`;
         current.textContent = `0${slideIndex}`;
     } else {
         total.textContent = slides.length;
         current.textContent = `${slideIndex}`;
     }
 
 
     slidesField.style.width = 100 * slides.length + "%";
     slidesField.style.display = 'flex';
     slidesField.style.transition = '0.5s all';
 
     slidesWrapper.style.overflow = 'hidden';
 
     slides.forEach(slide => {
         slide.style.width = width;
     });
 
     slider.style.position = 'relative';
 
     const indicator = document.createElement('ol');
     const dots = [];
     indicator.classList.add('carousel-indicators');
 
 
 
     slider.append(indicator);
 
     for (let i = 0; i < slides.length; i++) {
         const dot = document.createElement('li');
         dot.setAttribute('data-slide-to', i + 1);
         dot.classList.add('dot');
         if (i == 0) {
             dot.style.opacity = 1;
         }
         indicator.append(dot);
         dots.push(dot);
     }
 
     function deleteNotDigits(str) {
         return +str.replace(/\D/g, '');
     }
 
     next.addEventListener('click', () => {
 
         if (offset == deleteNotDigits(width) * (slides.length - 1)) {
             offset = 0;
         } else {
             offset += deleteNotDigits(width);
         }
 
         slidesField.style.transform = `translateX(-${offset}px)`;
 
         if (slideIndex == slides.length) {
             slideIndex = 1;
         } else {
             slideIndex++;
         }
 
         if (slides.length < 10) {
             current.textContent = `0${slideIndex}`;
         } else {
             current.textContent = `${slideIndex}`;
         }
 
         dots.forEach(dot => dot.style.opacity = '.5');
         dots[slideIndex - 1].style.opacity = '1';
     });
 
     prev.addEventListener('click', () => {
 
         if (offset == 0) {
             offset = deleteNotDigits(width) * (slides.length - 1);
         } else {
             offset -= deleteNotDigits(width);
         }
 
         slidesField.style.transform = `translateX(-${offset}px)`;
 
         if (slideIndex == 1) {
             slideIndex = slides.length;
         } else {
             slideIndex--;
         }
 
         if (slides.length < 10) {
             current.textContent = `0${slideIndex}`;
         } else {
             current.textContent = `${slideIndex}`;
         }
         dots.forEach(dot => dot.style.opacity = '.5');
         dots[slideIndex - 1].style.opacity = '1';
     });
 
     dots.forEach(dot => {
         dot.addEventListener('click', (e) => {
             const slideTo = e.target.getAttribute('data-slide-to');
 
             slideIndex = slideTo;
             offset = deleteNotDigits(width) * (slideTo - 1);
 
             slidesField.style.transform = `translateX(-${offset}px)`;
 
             if (slides.length < 10) {
                 current.textContent = `0${slideIndex}`;
             } else {
                 current.textContent = `${slideIndex}`;
             }
 
             dots.forEach(dot => dot.style.opacity = '.5');
             dots[slideIndex - 1].style.opacity = '1';
         });
     });
 
}

export default slider;