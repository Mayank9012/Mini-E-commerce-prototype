export class MostLovedRecommender {
    constructor(productData) {
        this.products = productData;
    }

    // Getting recommendations based on high rating rate and count
    getRecommendations(numRecommendations = 6) {
        return this.products
            .filter(product => product.rating && product.rating.rate >= 4.0 && product.rating.count >= 50) // Filter high-rated products
            .sort((a, b) => (b.rating.rate * b.rating.count) - (a.rating.rate * a.rating.count)) // Sort by rating rate and count
            .slice(0, numRecommendations)
            .map(product => ({
                ...product,
                reason: "Highly rated product"
            }));
    }
}