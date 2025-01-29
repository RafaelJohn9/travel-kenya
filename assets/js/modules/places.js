class GooglePlaces {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://maps.googleapis.com/maps/api/place';
    }

    async fetchPlaceDetails(placeId) {
        const fields = 'name,rating,formatted_address,reviews,photos,geometry,opening_hours,price_level';
        const url = `${this.baseUrl}/details/json?place_id=${placeId}&fields=${fields}&key=${this.apiKey}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            if (data.status !== "OK") {
                throw new Error(`Error fetching place details: ${data.status}`);
            }

            return data.result;
        } catch (error) {
            console.error('Error in fetchPlaceDetails:', error);
            return null;
        }
    }

    async getPlaceReviews(placeId) {
        try {
            const details = await this.fetchPlaceDetails(placeId);
            if (!details) {
                return [];
            }
            console.log(placeId)

            return details.reviews || [];
        } catch (error) {
            console.error('Error fetching reviews:', error);
            return [];
        }
    }

    async getPlaceId(placeName) {
        const url = `${this.baseUrl}/findplacefromtext/json?input=${encodeURIComponent(placeName)}&inputtype=textquery&fields=place_id&key=${this.apiKey}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            if (data.status !== "OK") {
                throw new Error(`Error fetching place ID: ${data.status}`);
            }

            if (data.candidates && data.candidates.length > 0) {
                return data.candidates[0].place_id;
            } else {
                throw new Error('Place not found');
            }
        } catch (error) {
            console.error('Error in getPlaceId:', error);
            return null;
        }
    }
    async getPlaceImages(placeId) {
        try {
            const details = await this.fetchPlaceDetails(placeId);
            if (!details || !details.photos) {
                return [];
            }

            const photoUrls = details.photos.map(photo => {
                return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${photo.photo_reference}&key=${this.apiKey}`;
            });

            return photoUrls;
        } catch (error) {
            console.error('Error fetching place images:', error);
            return [];
        }
    }
}

// Usage example (ensure your API key is secure)
const googlePlaces = new GooglePlaces('AIzaSyCyeaFxaelGZ4sH4x9SUz0OcyYnS7lgxf0');

(async () => {
    try {
        const placeId = await googlePlaces.getPlaceId('Lake Naivasha ');
        if (placeId) {
            const reviews = await googlePlaces.getPlaceReviews(placeId);
            console.log('Reviews for Lake Naivasha:', reviews);
        }
        const placeDetails = await googlePlaces.fetchPlaceDetails(placeId);
        if (placeDetails) {
            console.log('Details for Lake Naivasha:', placeDetails);
        }
        const images = await googlePlaces.getPlaceImages(placeId);
        console.log('Images for Lake Naivasha:', images);

    } catch (error) {
        console.error(error);
    }
})();
