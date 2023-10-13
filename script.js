var slideIndex = 1;
// showSlides(slideIndex);

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
    current_position = current_position - 285;
    container.style.left = current_position + "px";

    if (current_position <= 0) {
        container.style.right = calc((100% - current_position) - 115)
    }
}


function currentSlide(n) {
    showSlides(slideIndex = n);
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