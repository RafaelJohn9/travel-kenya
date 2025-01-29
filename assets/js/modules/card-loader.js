import GooglePlaces from './places.js';

const googlePlaces = new GooglePlaces('AIzaSyCyeaFxaelGZ4sH4x9SUz0OcyYnS7lgxf0');

async function renderCards(payload) {
    const container = document.createElement('div');
    container.className = 'card-container';

    for (const placeName of payload) {
        const placeId = await googlePlaces.getPlaceId(placeName);
        if (placeId) {
            const placeDetails = await googlePlaces.fetchPlaceDetails(placeId);
            const images = await googlePlaces.getPlaceImages(placeId);

            const card = document.createElement('div');
            card.className = 'card';

            const cardImage = document.createElement('div');
            cardImage.className = 'card-image';
            const img = document.createElement('img');
            img.src = images[0] || 'assets/images/default.jpg';
            img.alt = placeName;
            img.className = 'actual_image';
            img.style = 'width: 100%; height: auto; border-radius: 6px 6px 6px 6px;';
            cardImage.appendChild(img);

            const category = document.createElement('div');
            category.className = 'category';
            category.textContent = placeDetails.name;

            const county = document.createElement('div');
            county.className = 'category';
            county.id = 'county';
            county.innerHTML = `<i>${placeDetails.formatted_address}</i>`;

            const ratings = document.createElement('div');
            ratings.className = 'ratings';
            const rating = Math.round(placeDetails.rating);
            for (let i = 0; i < 5; i++) {
                const star = document.createElement('img');
                star.src = i < rating ? 'assets/images/star.svg' : 'assets/images/halfstar.svg';
                star.alt = 'Ratings';
                star.style = 'width: 3%;';
                ratings.appendChild(star);
            }

            const author = document.createElement('div');
            author.className = 'author';
            const link = document.createElement('a');
            link.href = `https://maps.app.goo.gl/${placeId}`;
            link.textContent = placeDetails.name;
            author.appendChild(link);

            card.appendChild(cardImage);
            card.appendChild(category);
            card.appendChild(county);
            card.appendChild(ratings);
            card.appendChild(author);

            container.appendChild(card);
        }
    }

    document.body.appendChild(container);
}

// // Example usage
// const places = [
//     "Mount Kenya",
//     "Lake Nakuru",
//     "Hell's Gate National Park",
//     "Lake Turkana",
//     "Menengai Crater",
//     "Chalbi Desert",
//     "Fourteen Falls",
//     "Crying Stone of Kakamega"
// ];

// renderCards(places);