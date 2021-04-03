import galleryItems from './gallery-items.js';

function makeGalleryMarkup(galleryObject) {
  return galleryObject
    .map(
      galleryItem => `
    <li class="gallery__item">
  <a
    class="gallery__link"
    href="${galleryItem.original}"
  >
    <img
      class="gallery__image"
      src="${galleryItem.preview}"
      data-source="${galleryItem.original}"
      data-index="${galleryItem.index}"
      
      alt="${galleryItem.description}"
    />
  </a>
  
</li>
    `,
    )
    .join('');
}
const galleryContainerRef = document.querySelector('.js-gallery');
const lightBoxRef = document.querySelector('.js-lightbox');
const lightBoxImageRef = document.querySelector('.lightbox__image');
const lightBoxClosebtn = document.querySelector(
  '[data-action="close-lightbox"]',
);
const lightBoxOverlay = document.querySelector('.lightbox__overlay');

galleryContainerRef.insertAdjacentHTML(
  'beforeend',
  makeGalleryMarkup(galleryItems),
);

galleryContainerRef.addEventListener('click', event => {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }

  lightBoxRef.classList.add('is-open');
  lightBoxImageRef.src = event.target.dataset.source;

  lightBoxImageRef.index = event.target.dataset.index;
  lightBoxImageRef.alt = event.target.alt;

  window.addEventListener('keydown', closeLightboxOnEsc);
  lightBoxRef.addEventListener('click', closeLightbox);
  window.addEventListener('keydown', event => {
    if (event.code === 'ArrowRight') {
      console.log('Pressed Right arrow!');
    }

    if (event.code === 'ArrowLeft') {
      console.log('Pressed left arrow!');
    }
  });
});
function closeLightboxOnEsc(event) {
  if (event.code === 'Escape') {
    removeClassIsOpen(lightBoxRef);
    clearSrcOfImage(lightBoxImageRef);
    window.removeEventListener('keydown', closeLightboxOnEsc);
  }
}
// lightBoxClosebtn.addEventListener('click', () => {
//   removeClassIsOpen(lightBoxRef);
//   clearSrcOfImage(lightBoxImageRef);
// });
// lightBoxOverlay.addEventListener('click', event => {
//   if (event.target === lightBoxOverlay) {
//     removeClassIsOpen(lightBoxRef);
//     clearSrcOfImage(lightBoxImageRef);
//   }
// });

function closeLightbox(event) {
  if (event.target.nodeName !== 'IMG') {
    removeClassIsOpen(lightBoxRef);
    clearSrcOfImage(lightBoxImageRef);
    lightBoxRef.removeEventListener('click', closeLightbox);
  }
}

function removeClassIsOpen(lightBox) {
  lightBox.classList.remove('is-open');
}
function clearSrcOfImage(image) {
  image.src = '';
  image.alt = '';
}
