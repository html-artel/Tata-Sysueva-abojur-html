const slides = document.querySelectorAll('.slider__container'),
      prev = document.getElementById('btn-prev'),
      next = document.getElementById('btn-next');

const feedback = document.querySelector('.promo__btn'),
      modalFeedback = document.querySelector('.modal'),
      modalClose = modalFeedback.querySelector('.modal__close'),
      feedbackForm = modalFeedback.querySelector('.modal__form'),
      feedbackName = modalFeedback.querySelector('.modal__field--name'),
      feedbackEmail = modalFeedback.querySelector('.modal__field--tel');

const menu = document.querySelector('.menu'),
      menuBtn = document.querySelector('.header__button');

/*slider*/

let index = 0;

const activeSlide = (n) => {
  for (const slide of slides) {
    slide.classList.remove('slider__container--current');
  }
  slides[n].classList.add('slider__container--current');
};

const prepareCurrentSlide = (ind) => {
  activeSlide(ind);
};

const nextSlide = () => {
  if (index === slides.length - 1) {
    index = 0;
    prepareCurrentSlide(index);
  } else {
    index++;
    prepareCurrentSlide(index);
  }
};

const prevSlide = () => {
  if (index === 0) {
    index = slides.length - 1;
    prepareCurrentSlide(index);
  } else {
    index--;
    prepareCurrentSlide(index);
  }
};

next.addEventListener('click', nextSlide);
prev.addEventListener('click', prevSlide);

/*feedback*/

let isStorageSupport = true;
let storage = '';

try {
  storage = localStorage.getItem('user-name');
} catch (err) {
  isStorageSupport = false;
}

feedback.addEventListener('click', function (evt) {
  evt.preventDefault();
  modalFeedback.classList.add('modal--show');

  if (storage) {
    feedbackName.value = storage;
    feedbackEmail.focus();
  } else {
    feedbackName.focus();
  }
});

modalClose.addEventListener('click', function (evt) {
  evt.preventDefault();
  modalFeedback.classList.remove('modal--show');
  modalFeedback.classList.remove('modal--error');
});

feedbackForm.addEventListener('submit', function (evt) {
  if (!feedbackName.value || !feedbackEmail.value) {
    evt.preventDefault();
    modalFeedback.classList.remove('modal--error');
    modalFeedback.offsetWidth = modalFeedback.offsetWidth;
    modalFeedback.classList.add('modal--error');
  } else {
    if (isStorageSupport) {
      localStorage.setItem('user-name', feedbackName.value);
    }
  }
});

window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    if (modalFeedback.classList.contains('modal--show')) {
      evt.preventDefault();
      modalFeedback.classList.remove('modal--show');
      modalFeedback.classList.remove('modal--error');
    }
  }
});

/* menu */

menuBtn.addEventListener('click', function (evt) {
  evt.preventDefault();

  if (menu.classList.contains('menu--show')) {
    menu.classList.remove('menu--show');
  } else {
    menu.classList.add('menu--show');
  }
});
