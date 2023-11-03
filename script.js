/* =========Slider============= */

var slideIndex = 1;

var current_position = 0;

function plusSlides(n) {
    var container = document.getElementById("team_slider");

    if(current_position >= 0){
        return 
    }

    current_position = current_position + 285;

    if (current_position >=  0){
        current_position = 0;
    }
    container.style.left = current_position + "px";
    
}


function minusSlides(n) {
    var container = document.getElementById("team_slider");

    // console.log("W", container.offsetWidth);
    // console.log("CP", current_position);
    var cardsWidth = (9 * 285) - 25;
    var containerWidth = container.offsetWidth;
    var limit = containerWidth - cardsWidth;
    // var limit = (-1) * ( ( (9 * 265) - 25 ) - (container.offsetWidth) );

    current_position = current_position - 285;

    // console.log(current_position, limit);

    if(current_position < limit) {
        current_position = limit;
    }

    container.style.left = current_position + "px";

}


function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("team_card")
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++){
        slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "block";
}

/* =========Slider============= */

/* ===========Form============= */

document.addEventListener("DOMContentLoaded", function(event) {
    const TOKEN = '6664897908:AAFVP_fsMB7tIYF9-9gk2Z40Cs-qMr1eC0Y';
    const CHAT_ID = "-1001976793988";
    const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

    document.getElementById('tg_btn').addEventListener('click', function(e) {
        e.preventDefault();

        let name = document.getElementById('name');
        let type = document.getElementById('type');
        let phone = document.getElementById('phone');

        let alert = document.getElementById('alert');

        let message = `<b>Заявка с сайта!</b>\n`;
        message += `<b>Отправитель: </b> ${ name.value}\n`;
        message += `<b>Направление: </b> ${ type.value}\n`;
        message += `<b>Номер телефона: </b> ${ phone.value}\n`;

        axios.post(URI_API, {
            chat_id: CHAT_ID,
            parse_mode: 'html',
            text: message
        })
        .then((res) => {
            name.value = "";
            type.value = "";
            phone.value = "";
            alert.innerHTML = 'Спасибо! Ваша заявка отправлена! С вами скоро свяжутся!';
            alert.style.display = 'block';
            setTimeout(() => {
                alert.style.display = 'none';
            },2000)
        })
        .catch((err) => {
            console.log(err)
        })
    })
});

/* ===========Form============= */


/* ===========Mobile Nav============= */

const navBtn = document.querySelector('.nav-icon-btn');

const navIcon = document.querySelector('.nav-icon');

const nav = document.querySelector('.header__top-row');

navBtn.onclick = function () {
    navIcon.classList.toggle('nav-icon__active');
    nav.classList.toggle("header__top-row--mobile");
    document.body.classList.toggle('no-scroll');
}



/* ===========Mobile Nav============= */

/* ==========Slider2========*/

const initSlider = () => {
    const imageList = document.querySelector(".image-list");
    const sliderButtons = document.querySelectorAll(".slider-button");
    const sliderScrollbar = document.querySelector(".slider-scrollbar");
    const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

    // Handle scrollbar thumb drag
    scrollbarThumb.addEventListener("mousedown", (e) => {
        const startX = e.clientX;
        const thumbPosition = scrollbarThumb.offsetLeft;
        const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;

        // Update thumb position on mouse move
        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX;

            // Ensure the scrollbar thumb stays within bounds
            const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
            const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;

            scrollbarThumb.style.left = `${boundedPosition}px`;
            imageList.scrollLeft = scrollPosition;
        }


        // Remove event listeners on mouse up
        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        }

        //Add event listeners for drag interaction
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    });

    //Slide images according to the slide button clicks
    sliderButtons.forEach(button => {
        button.addEventListener("click", () => {
            console.log(button);
            const directon = button.id === "prev-slide" ? -1 : 1;
            const scrollAmount = imageList.clientWidth * directon;
            imageList.scrollBy({ left: scrollAmount, behavior: "smooth"});
        });
    });

    // Show or hide slide buttons based on scroll position
    const handleSlideButtons = () => {
        sliderButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "flex";
        sliderButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "flex";
    }

    //Update scrollbar thumb position based on image scroll
    const updateScrollThumbPosition = () => {
        const scrollPosition = imageList.scrollLeft;
        const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left = `${thumbPosition}px`;
    }

    // Call these two functions when image list scrolls
    imageList.addEventListener("scroll", () => {
        updateScrollThumbPosition();
        handleSlideButtons();
    });
}

window.addEventListener("resize", initSlider);
window.addEventListener("load", initSlider);