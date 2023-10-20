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

// function currentSlide(n) {
//     showSlides(slideIndex = n);
// }

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



