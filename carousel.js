const createCarousel = config => {
    const {
        selector,
        images,
        trigger
    } = config

    const even = images.length % 2 === 0
    const activeImageIndex = Math.floor(images.length / 2)
    const container = document.querySelector(selector)
    const html = `
        <ul${even ? ' class="even"' : ''}>
            ${images.map((image, index) => `
                <li${index === activeImageIndex ? ' class="active"' : ''}>
                    <img
                        data-target="img"
                        src="${image.src}"
                        alt="${image.alt}"
                    />
                </li$>
            `).join('')}
        </ul>
        <div class="arrows">
            <span class="left" data-target="left">⬅️</span>
            <span class="right" data-target="right">➡️</span>
        </div>
    `

    let transform = even ? -250 : 0
    let index = activeImageIndex
    
    container.innerHTML = html

    container.addEventListener('click', event => {
        const target = event.target
        const carousel = container.querySelector('ul')
        const activeElement = container.querySelector('.active')

        switch (target.dataset.target) {
            case 'img':
                if (trigger !== 'hover') {
                    target.classList.toggle('zoom')
                } 
            break
            case 'left':
                if (index !== 0) {
                    index--
                    transform += 500
                    carousel.style.transform = `translateX(${transform}px)`
    
                    activeElement.classList.remove('active')
                    activeElement.previousElementSibling.classList.add('active')
                }
            break
            case 'right':
                if (index !== images.length - 1) {
                    index++
                    transform -= 500
                    carousel.style.transform = `translateX(${transform}px)`
    
                    activeElement.classList.remove('active')
                    activeElement.nextElementSibling.classList.add('active')
                }
            break
        }
    })

    if (trigger === 'hover') {
        container.addEventListener('mouseover', event => {
            if (event.target.dataset.target === 'img') {
                event.target.classList.add('zoom')
            }
        })

        container.addEventListener('mouseout', event => {
            if (event.target.dataset.target === 'img') {
                event.target.classList.remove('zoom')
            }
        })
    }
}

const images = [
    {
        src: 'image1.jpg',
        alt: '',
    },
    {
        src: 'image2.jpg',
        alt: '',
    },
    {
        src: 'image3.jpg',
        alt: '',
    },
    {
        src: 'image1.jpg',
        alt: '',
    },
    {
        src: 'image2.jpg',
        alt: '',
    },
    {
        src: 'image3.jpg',
        alt: '',
    },
    {
        src: 'image1.jpg',
        alt: '',
    }
]

createCarousel({
    selector: '.carousel',
    trigger: 'click',
    images
})