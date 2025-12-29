export const restaurants = [
    {
        id: 1,
        name: "The Pizza Haven",
        rating: 4.5,
        cuisine: "Italian, Pizza",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1000",
        deliveryTime: "25-30 min",
        priceRange: "₹₹",
        menu: [
            { id: 101, name: "Margherita Pizza", price: 499, image: "https://images.unsplash.com/photo-1574126154517-d1e0d89ef734?q=80&w=500", description: "Classic tomato sauce, mozzarella, and fresh basil." },
            { id: 102, name: "Pepperoni Feast", price: 649, image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=500", description: "Loaded with pepperoni and extra cheese." },
            { id: 103, name: "Garlic Bread", price: 199, image: "https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?q=80&w=500", description: "Toasted bread with garlic butter and herbs." },
            { id: 104, name: "BBQ Chicken Pizza", price: 749, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=500", description: "Grilled chicken, BBQ sauce, and red onions." },
            { id: 105, name: "Truffle Pasta", price: 599, image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?q=80&w=500", description: "Creamy pasta with black truffle oil and parmesan." }
        ]
    },
    {
        id: 2,
        name: "Burger Empire",
        rating: 4.2,
        cuisine: "American, Burgers",
        image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=1000",
        deliveryTime: "20-25 min",
        priceRange: "₹",
        menu: [
            { id: 201, name: "Classic Cheeseburger", price: 249, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=500", description: "Juicy beef patty with cheddar cheese and lettuce." },
            { id: 202, name: "Bacon BBQ Burger", price: 349, image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?q=80&w=500", description: "Topped with crispy bacon and tangy BBQ sauce." },
            { id: 203, name: "French Fries", price: 149, image: "https://images.unsplash.com/photo-1573016608244-7d5cf347ed70?q=80&w=500", description: "Golden crispy fries with sea salt." },
            { id: 204, name: "Onion Rings", price: 179, image: "https://images.unsplash.com/photo-1639024471283-03518883512d?q=80&w=500", description: "Crispy beer-battered onion rings." },
            { id: 205, name: "Veggie Burger Supreme", price: 299, image: "https://images.unsplash.com/photo-1512152272829-e3139592d56f?q=80&w=500", description: "Plant-based patty with avocado and sprouts." }
        ]
    },
    {
        id: 3,
        name: "Sushi Zen",
        rating: 4.8,
        cuisine: "Japanese, Sushi",
        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1000",
        deliveryTime: "35-40 min",
        priceRange: "₹₹₹",
        menu: [
            { id: 301, name: "Salmon Nigiri", price: 899, image: "https://images.unsplash.com/photo-1583623025817-d180a2221d0a?q=80&w=500", description: "Fresh salmon over seasoned rice." },
            { id: 302, name: "California Roll", price: 749, image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=500", description: "Crab, avocado, and cucumber." },
            { id: 303, name: "Miso Soup", price: 299, image: "https://images.unsplash.com/photo-1607330289024-1535c6b4e1c1?q=80&w=500", description: "Traditional Japanese soup with tofu and seaweed." },
            { id: 304, name: "Dragon Roll", price: 999, image: "https://images.unsplash.com/photo-1559466273-d95e72debaf8?q=80&w=500", description: "Shrimp tempura topped with avocado and eel sauce." },
            { id: 305, name: "Tuna Sashimi", price: 1199, image: "https://images.unsplash.com/photo-1534422298391-e4f8c170db0a?q=80&w=500", description: "Premium grade sliced raw tuna." }
        ]
    },
    {
        id: 4,
        name: "Spice Garden",
        rating: 4.4,
        cuisine: "Indian, Curry",
        image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=1000",
        deliveryTime: "30-35 min",
        priceRange: "₹₹",
        menu: [
            { id: 401, name: "Butter Chicken", price: 449, image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=500", description: "Creamy tomato-based chicken curry." },
            { id: 402, name: "Garlic Naan", price: 79, image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?q=80&w=500", description: "Soft bread with garlic and butter." },
            { id: 403, name: "Paneer Tikka", price: 349, image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=500", description: "Grilled marinated cottage cheese cubes." },
            { id: 404, name: "Chicken Biryani", price: 399, image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=500", description: "Aromatic basmati rice with spiced chicken." },
            { id: 405, name: "Mango Lassi", price: 149, image: "https://images.unsplash.com/photo-1626132644529-56e94e93fc9a?q=80&w=500", description: "Chilled yogurt drink with sweet mango pulp." }
        ]
    },
    {
        id: 5,
        name: "Green Bowl Co.",
        rating: 4.6,
        cuisine: "Healthy, Salads",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1000",
        deliveryTime: "15-20 min",
        priceRange: "₹₹",
        menu: [
            { id: 501, name: "Quinoa Buddha Bowl", price: 399, image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=500", description: "Quinoa, kale, chickpeas, and tahini dressing." },
            { id: 502, name: "Avocado Toast XL", price: 299, image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=500", description: "Sourdough bread topped with mashed avocado and poached egg." },
            { id: 503, name: "Berry Smoothie", price: 199, image: "https://images.unsplash.com/photo-1464454709131-ffd692591ee5?q=80&w=500", description: "Mixed berries, almond milk, and honey." }
        ]
    }
];

export const offers = [
    {
        id: 1,
        title: "50% OFF",
        description: "On your first order from Pizza Haven",
        code: "FIRST50",
        restaurantId: 1,
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=500"
    },
    {
        id: 2,
        title: "BUY 1 GET 1",
        description: "On all Classic Cheeseburgers",
        code: "BOGO",
        restaurantId: 2,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=500"
    },
    {
        id: 3,
        title: "FREE DELIVERY",
        description: "On orders above ₹500 at Sushi Zen",
        code: "FREESHIP",
        restaurantId: 3,
        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=500"
    }
];
