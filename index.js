var carouselInner = document.querySelector(".carousel .carousel-inner");
var nextBtn = document.querySelector(".carousel .carousel-nav .next");
var prevBtn = document.querySelector(".carousel .carousel-nav .prev");

var carouselWidth = carouselInner.clientWidth;
var totalWidth = carouselWidth * carouselInner.children.length;
var position = 0;

nextBtn.addEventListener("click", function () {
    if (Math.abs(position) + carouselWidth >= totalWidth) {
        return;
    }
    position -= carouselWidth;
    carouselInner.style.translate = `${position}px`;
    updateDots();
});

prevBtn.addEventListener("click", function () {
    if (Math.abs(position) === 0) {
        return;
    }
    position += carouselWidth;
    carouselInner.style.translate = `${position}px`;
    updateDots();
});

var itemEL = document.querySelectorAll(".item");
var dotEl = document.querySelectorAll(".carousel-dots span");
var carouseldotEl = document.querySelector(".carousel-dots");

function initializeDots() {
    itemEL.forEach(function (item, index) {
        if (index >= dotEl.length) {
            var newDot = document.createElement("span");
            carouseldotEl.appendChild(newDot);
        }
    });

    dotEl = document.querySelectorAll(".carousel-dots span");
}

function updateDots() {
    var index = Math.abs(position / carouselWidth);
    dotEl.forEach((dot, idx) => {
        dot.classList.toggle("active", idx === index);
    });
}

function handleDotClick() {
    dotEl.forEach((dot, idx) => {
        dot.addEventListener("click", function () {
            position = -carouselWidth * idx;
            carouselInner.style.translate = `${position}px`;
            updateDots();
        });
    });
}

initializeDots();
updateDots();
handleDotClick();

var startX = 0;
var isDragging = false;
var initialPosition = 0;
var position = 0;
var deltaX = 0;

carouselInner.addEventListener("mousedown", function (e) {
    if (e.which === 1) {
        e.preventDefault();
        isDragging = true;
        startX = e.clientX;
        initialPosition = position;
        document.addEventListener("mousemove", handleDrag);
        document.addEventListener("mouseup", handleEnd);
        carouselInner.style.cursor = "all-scroll";
    }
});

function handleDrag(e) {
    if (isDragging) {
        deltaX = e.clientX - startX;
        carouselInner.style.translate = `${initialPosition + deltaX}px`; // Thay `translate` bằng `translate`
    }
}
var totalWidth = carouselWidth * carouselInner.children.length;

function handleEnd(e) {
    if (isDragging) {
        isDragging = false;
        document.removeEventListener("mousemove", handleDrag);
        document.removeEventListener("mouseup", handleEnd);
        carouselInner.style.cursor = "default";

        var percentageMove = Math.abs(deltaX) / carouselWidth;

        if (percentageMove >= 0.2) {
            if (deltaX < 0) {
                if (position <= -totalWidth + carouselWidth) {
                    position = -totalWidth + carouselWidth;
                } else {
                    position -= carouselWidth;
                }
            } else {
                if (position >= 0) {
                    position = 0;
                } else {
                    position += carouselWidth;
                }
            }

            carouselInner.style.translate = `${position}px`;
            updateDots();
        } else {
            return;
        }
    }
}
