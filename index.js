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
});
lightBoxClosebtn.addEventListener('click', event => {
  lightBoxRef.classList.remove('is-open');
  lightBoxImageRef.src = '';
});
