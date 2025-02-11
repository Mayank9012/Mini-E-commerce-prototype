export class ContextProductRecommender {
    constructor(productData) {
        this.products = productData;
        this.categoryWeights = new Map();
        this.brandWeights = new Map();
        this.colorWeights = new Map();
        this.priceRange = {
            min: 0,
            max: 0,
            avg: 0
        };
    }

    loadPreferences(currentProduct) {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const wishlistItems = JSON.parse(localStorage.getItem('wishlistItems')) || [];

        const userItems = [
            // Current product has highest weight
            { ...currentProduct, weight: 3 },
            // Cart items have second highest weight
            ...cartItems.map(item => ({ ...item, weight: 2 })),
            // Wishlist items have normal weight
            ...wishlistItems.map(item => ({ ...item, weight: 1 }))
        ];

        // Resetting weights
        this.categoryWeights.clear();
        this.brandWeights.clear();
        this.colorWeights.clear();

        // Analyzing preferences with weights
        userItems.forEach(item => {
            // Category analysis
            const categories = item.category.split(',').map(c => c.trim());
            categories.forEach(category => {
                this.categoryWeights.set(
                    category,
                    (this.categoryWeights.get(category) || 0) + item.weight
                );
            });

            // Brand analysis
            this.brandWeights.set(
                item.brand,
                (this.brandWeights.get(item.brand) || 0) + item.weight
            );

            // Color analysis
            this.colorWeights.set(
                item.color,
                (this.colorWeights.get(item.color) || 0) + item.weight
            );
        });

        // Setting price range based on current product and user preferences
        const prices = userItems.map(item => item.price);
        this.priceRange = {
            min: Math.min(...prices),
            max: Math.max(...prices),
            avg: prices.reduce((a, b) => a + b, 0) / prices.length
        };

        return userItems;
    }

    scoreProduct(product, currentProduct, userItems) {
        let score = 0;
        const userItemIds = new Set(userItems.map(item => item.id));

        // Ignoring current product or items in cart/wishlist
        if (product.id === currentProduct.id || userItemIds.has(product.id)) {
            return -1;
        }

        // Category matching (highest weight)
        const productCategories = product.category.split(',').map(c => c.trim());
        const currentProductCategories = currentProduct.category.split(',').map(c => c.trim());
        
        productCategories.forEach(category => {
            if (currentProductCategories.includes(category)) {
                score += 4;
            }
            // Matching user preferences
            if (this.categoryWeights.has(category)) {
                score += 3 * (this.categoryWeights.get(category));
            }
        });

        // Brand matching
        if (product.brand === currentProduct.brand) {
            score += 3;
        } else if (this.brandWeights.has(product.brand)) {
            score += 2 * (this.brandWeights.get(product.brand));
        }

        // Color matching
        if (product.color === currentProduct.color) {
            score += 2;
        } else if (this.colorWeights.has(product.color)) {
            score += 1.5 * (this.colorWeights.get(product.color));
        }

        // Price similarity
        const priceDiff = Math.abs(product.price - currentProduct.price);
        if (priceDiff <= currentProduct.price * 0.2) {
            score += 2;
        }

        // Rating bonus 
        if (product.rating && product.rating.rate >= 4.0) {
            score += 0.5;
        }

        return score;
    }

    getRecommendationReason(product, currentProduct) {
        const reasons = [];

        // Category match 
        const productCategories = product.category.split(',').map(c => c.trim());
        const currentProductCategories = currentProduct.category.split(',').map(c => c.trim());
        const sharedCategories = productCategories.filter(cat => 
            currentProductCategories.includes(cat));
            
        if (sharedCategories.length > 0) {
            reasons.push(`Similar ${sharedCategories[0]}`);
        }

        // Brand match
        if (product.brand === currentProduct.brand) {
            reasons.push(`also from ${product.brand}`);
        }

        // Color match
        if (product.color === currentProduct.color) {
            reasons.push(`matching ${product.color} color`);
        }

        // Price similarity
        const priceDiff = Math.abs(product.price - currentProduct.price);
        if (priceDiff <= currentProduct.price * 0.2) {
            reasons.push("similar price range");
        }

        return reasons.length > 0 
            ? reasons.join(" and ")
            : "you might also like";
    }

    getContextRecommendations(currentProduct, numRecommendations = 4) {
        const userItems = this.loadPreferences(currentProduct);

        const scoredProducts = this.products
            .map(product => ({
                ...product,
                score: this.scoreProduct(product, currentProduct, userItems),
                reason: this.getRecommendationReason(product, currentProduct)
            }))
            .filter(product => product.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, numRecommendations);

        return scoredProducts;
    }
}