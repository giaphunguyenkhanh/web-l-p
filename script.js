
document.addEventListener("DOMContentLoaded", function() {
    const images = document.querySelectorAll(".gallery img");

    images.forEach(function(img) {
        img.addEventListener("click", function() {
            const popup = document.createElement("div");

            popup.style.position = "fixed";
            popup.style.inset = "0";
            popup.style.background = "#000000dd";
            popup.style.display = "flex";
            popup.style.alignItems = "center";
            popup.style.justifyContent = "center";
            popup.style.zIndex = "1000";
            popup.style.cursor = "pointer";

            const bigImage = document.createElement("img");
            bigImage.src = img.src;
            bigImage.style.maxWidth = "90%";
            bigImage.style.maxHeight = "85%";
            bigImage.style.borderRadius = "15px";

            popup.appendChild(bigImage);
            document.body.appendChild(popup);

            popup.addEventListener("click", function() {
                popup.remove();
            });
        });
    });
});
