window.addEventListener("scroll", reveal);

function reveal() {
	var reveals = document.querySelectorAll(".reveal");

	for (var i = 0; i < reveals.length; i++) {
		var windowheight = window.innerHeight;
		var revealtop = reveals[i].getBoundingClientRect().top;
		var revealpoint = 150;

		if (revealtop < windowheight - revealpoint) {
			reveals[i].classList.add("reveal_active");
		} else {
			reveals[i].classList.remove("reveal_active");
		}
	}
}


async function createGalleryFromPinterest(boardUrl) {
    const container = document.querySelector(".G-galery");
    if (!container) {
        console.error("Container not found");
        return;
    }
    
    try {
        const response = await fetch(`https://api.pinterest.com/v1/boards/${boardUrl}/pins/?access_token=YOUR_ACCESS_TOKEN`);
        const data = await response.json();
        
        if (!data || !data.data) {
            console.error("Invalid data from Pinterest API");
            return;
        }
        
        const gallery = document.createElement("div");
        gallery.classList.add("pinterest-gallery");
        
        data.data.forEach(pin => {
            const item = document.createElement("div");
            item.classList.add("G-galery-item");
            
            const img = document.createElement("img");
            img.src = pin.image.original.url;
            img.alt = pin.note || "Pinterest Image";
            
            item.appendChild(img);
            gallery.appendChild(item);
        });
        
        container.appendChild(gallery);
    } catch (error) {
        console.error("Error fetching Pinterest data:", error);
    }
}

// Example usage:
// createGalleryFromPinterest("username/board-name");
