export class ProductRecommender {
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

    // Loading user preferences from cart and wishlist
    loadUserPreferences() {
        // Getting cart and wishlist data from localStorage 
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const wishlistItems = JSON.parse(localStorage.getItem('wishlistItems')) || [];

        // Combining items for analysis, giving more weight to cart items
        const userItems = [
            ...cartItems.map(item => ({ ...item, weight: 2 })), 
            ...wishlistItems.map(item => ({ ...item, weight: 1 }))
        ];
        
        if (userItems.length === 0) return false;

        // Resetting weights
        this.categoryWeights.clear();
        this.brandWeights.clear();
        this.colorWeights.clear();

        // Analyzeing preferences with weights
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

        // Analyzing price preferences
        const prices = userItems.map(item => item.price);
        this.priceRange = {
            min: Math.min(...prices),
            max: Math.max(...prices),
            avg: prices.reduce((a, b) => a + b, 0) / prices.length
        };

        return true;
    }

    // Score a product, based on user preferences
    scoreProduct(product, userItems) {
        let score = 0;
        const userItemIds = new Set(userItems.map(item => item.id));

        // Ignoring items already in cart or wishlist
        if (userItemIds.has(product.id)) {
            return -1;
        }

        // Category matching 
        const productCategories = product.category.split(',').map(c => c.trim());
        productCategories.forEach(category => {
            if (this.categoryWeights.has(category)) {
                score += 3 * (this.categoryWeights.get(category));
            }
        });

        // Brand matching 
        if (this.brandWeights.has(product.brand)) {
            score += 2 * (this.brandWeights.get(product.brand));
        }

        // Color matching
        if (this.colorWeights.has(product.color)) {
            score += 1.5 * (this.colorWeights.get(product.color));
        }

        // Price matching 
        const priceRange = this.priceRange.avg * 0.2;
        if (Math.abs(product.price - this.priceRange.avg) <= priceRange) {
            score += 2;
        }

        // Small rating bonus 
        if (product.rating && product.rating.rate >= 4.0) {
            score += 0.5;
        }

        return score;
    }

    getRecommendations(numRecommendations = 5) {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const wishlistItems = JSON.parse(localStorage.getItem('wishlistItems')) || [];
        const userItems = [...cartItems, ...wishlistItems];

        const hasPreferences = this.loadUserPreferences();

        // If no user preferences, return high-rated items 
        if (!hasPreferences) {
            const seenCategories = new Set();
            return this.products
                .sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0))
                .filter(product => {
                    const mainCategory = product.category.split(',')[0].trim();
                    if (!seenCategories.has(mainCategory)) {
                        seenCategories.add(mainCategory);
                        return true;
                    }
                    return false;
                })
                .slice(0, numRecommendations)
                .map(product => ({
                    ...product,
                    reason: "Popular item in " + product.category.split(',')[0].trim()
                }));
        }

        // Scoring all products based on user preferences
        const scoredProducts = this.products
            .map(product => ({
                ...product,
                score: this.scoreProduct(product, userItems),
                reason: this.getRecommendationReason(product)
            }))
            .filter(product => product.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, numRecommendations);

        return scoredProducts;
    }

    // Get recommendation reason
    getRecommendationReason(product) {
        const reasons = [];

        // Check category match (primary reason)
        const productCategories = product.category.split(',').map(c => c.trim());
        const hasMatchingCategory = productCategories.some(category => 
            this.categoryWeights.has(category));
        if (hasMatchingCategory) {
            reasons.push("Similar to items you're interested in");
        }

        // Check brand match
        if (this.brandWeights.has(product.brand)) {
            reasons.push(`from similar brands that you like`);
        }

        // Check price match
        if (Math.abs(product.price - this.priceRange.avg) <= this.priceRange.avg * 0.2) {
            reasons.push("within your preferred price range");
        }

        // Check color match
        if (this.colorWeights.has(product.color)) {
            reasons.push(`in ${product.color} that matches your style`);
        }

        return reasons.length > 0 
            ? reasons.join(" and ")
            : "recommended based on your interests";
    }
}