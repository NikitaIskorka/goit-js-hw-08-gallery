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
  document.body.style.overflow = 'hidden';

  lightBoxRef.classList.add('is-open');
  lightBoxImageRef.src = event.target.dataset.source;

  lightBoxImageRef.index = event.target.dataset.index;
  lightBoxImageRef.alt = event.target.alt;

  window.addEventListener('keydown', closeLightboxOnEsc);
  lightBoxRef.addEventListener('click', closeLightbox);
  window.addEventListener('keydown', event => {
    const galleriItemsUrl = galleryItems.map(item => item.original);
    let currentIndex = galleriItemsUrl.indexOf(lightBoxImageRef.src);
    function setModalImg(index) {
      lightBoxImageRef.src = galleriItemsUrl[index];
    }
    if (event.code === 'ArrowRight' && currentIndex < 8) {
      currentIndex += 1;
      console.log(currentIndex);
    } else if (event.code === 'ArrowLeft' && currentIndex > 0) {
      currentIndex -= 1;
      console.log(currentIndex);
    }
    setModalImg(currentIndex);
  });
});
function closeLightboxOnEsc(event) {
  if (event.code === 'Escape') {
    removeClassIsOpen(lightBoxRef);
    clearSrcOfImage(lightBoxImageRef);
    window.removeEventListener('keydown', closeLightboxOnEsc);
    document.body.style.overflow = 'auto';
  }
}

function closeLightbox(event) {
  if (event.target.nodeName !== 'IMG') {
    removeClassIsOpen(lightBoxRef);
    clearSrcOfImage(lightBoxImageRef);
    lightBoxRef.removeEventListener('click', closeLightbox);
    document.body.style.overflow = 'auto';
  }
}

function removeClassIsOpen(lightBox) {
  lightBox.classList.remove('is-open');
}
function clearSrcOfImage(image) {
  image.src = '';
  image.alt = '';
}
// const addImageLightBox = (src, alt) => {
//   lightBoxImageRef.src = src;
//   lightBoxImageRef.alt = alt;
// };
// function changeImgOnArrowKeypres(event) {
//   const reversedGallery = [...galleryItems].reverse();
//   const galleryArray =
//     event.code === 'ArrowLeft' ? [...galleryItems] : reversedGallery;

//   for (let i = 0; i < galleryArray.length; i += 1) {
//     if (galleryArray[i].original === lightBoxImageRef.src && i > 0) {
//       const lightBoxImageSrc = galleryArray[i - 1].original;
//       const ligthboxImageAlt = galleryArray[i - 1].description;
//       addImageLightBox(lightBoxImageSrc, ligthboxImageAlt);
//     }
//   }
// }
