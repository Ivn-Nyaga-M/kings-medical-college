//  typeWriter effect
  const text = "May intake is ongoing. Apply now!";
  let index = 0;
  function typeWriter() {
    if (index < text.length) {
      document.getElementById("typewriter").innerHTML += text.charAt(index);
      index++;
      setTimeout(typeWriter, 100);
    }
  }
window.onload = typeWriter;


// typeWriter calculation
  const typewriter = document.getElementById('typewriter');

  function positionTypewriter() {
    const topBarHeight = document.getElementById('topBar').offsetHeight;
    const mainNavHeight = document.getElementById('mainNav').offsetHeight;
    const totalOffset = topBarHeight + mainNavHeight;
    typewriter.parentElement.style.top = `${totalOffset + 10}px`; // add a little breathing space
  }
// Run on load & resize
  window.addEventListener('load', positionTypewriter);
  window.addEventListener('resize', positionTypewriter);
// hero swiper initialization
const heroSwiper = new Swiper('.heroSwiper', {
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  effect: 'fade',
  fadeEffect: {
    crossFade: true
  }
});


// testimonials swiper initialization
const testimonialSwiper = new Swiper(".testimonialSwiper", {
  loop: true,
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});


  let lastScrollY = 0;
  const mainNav = document.getElementById('mainNav');
  const topBar = document.getElementById('topBar');

  function getTopBarHeight() {
    return topBar.offsetHeight;
  }

  function showMainNav() {
    mainNav.style.top = `${getTopBarHeight()}px`;
  }

  function hideMainNav() {
    mainNav.style.top = `-${mainNav.offsetHeight}px`;
  }

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const isMenuOpen = document.querySelector('.navbar-collapse.show');

    if (isMenuOpen) return;

    if (currentScroll > lastScrollY && currentScroll > 60) {
      hideMainNav();
    } else {
      showMainNav();
    }

    lastScrollY = currentScroll;
  });

  // Ensure correct positioning on load and resize
  window.addEventListener('load', showMainNav);
  window.addEventListener('resize', showMainNav);

