import galleryItems from "./references/galleryItems.js"

import refs from "./references/refs.js"

const { list, modal, lightboxImage } = refs

function createItems(array) {    
    return array.map(elem => {        
        const { preview, original, description } = elem        
        return `<li class="gallery__item">
                    <a class="gallery__link" href=${original}>
                        <img class="gallery__image" src=${preview} data-source=${original} alt=${description}/>
                    </a>
                </li>`          
    }).join("")    
}
const markup = createItems(galleryItems)

list.insertAdjacentHTML("afterbegin", markup)

list.addEventListener("click", openByModal)

function openByModal(e) {
    console.dir(e.target.alt)
    e.preventDefault()        
    if (e.target.classList.contains("gallery__image")) {
        modal.classList.add("is-open")
        lightboxImage.src = e.target.dataset.source
        lightboxImage.alt = e.target.alt
    }    
}

function modalClose(element) {
    element.classList.remove("is-open")
    lightboxImage.src = "#"
    lightboxImage.alt = "#"
}

window.addEventListener("keydown", closeModalByKey)

function closeModalByKey(e){
    if (e.code === 'Escape') {
        modalClose(modal)
    }
}

modal.addEventListener("click", closeModalByClick)

function closeModalByClick(e){
    console.log(e.target.classList)
    if (e.target.classList.contains("lightbox__button") || e.target.classList.contains("lightbox__overlay")) {
        modalClose(modal)
    }           
}
    
if (modal.classList.contains("is-open")) {
    list.removeEventListener("click", openByModal)    
}