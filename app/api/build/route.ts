import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Mock data based on user request
        const baseItems = [
            { id: 1, name: 'Burrito', base_price: 10.00 },
            { id: 2, name: 'Bowl', base_price: 10.00 },
            { id: 3, name: 'Quesadilla', base_price: 11.00 },
            { id: 4, name: 'Taco (2ct)', base_price: 9.00 },
        ];

        const modifiers = {
            'Rice & Base': {
                max_selection: 1,
                options: [
                    { id: 101, name: 'Spicy Rice', price: 0, modifierId: 10 },
                    { id: 102, name: 'Cilantro Rice', price: 0, modifierId: 10 },
                    { id: 103, name: 'Greens', price: 0, modifierId: 10 },
                    { id: 104, name: 'Nachos', price: 0, modifierId: 10 },
                    { id: 105, name: 'Potato Chips', price: 0, modifierId: 10 },
                ]
            },
            'Protein': {
                max_selection: 1,
                options: [
                    { id: 201, name: 'Grilled Chicken', price: 0, modifierId: 20 },
                    { id: 202, name: 'Shrimp', price: 2.00, modifierId: 20 },
                    { id: 203, name: 'Spicy Chicken', price: 0, modifierId: 20 },
                    { id: 204, name: 'Ground Beef', price: 0, modifierId: 20 },
                    { id: 205, name: 'Barbacoa', price: 1.50, modifierId: 20 },
                    { id: 206, name: 'Falafel', price: 0, modifierId: 20 },
                ]
            },
            'Toppings': {
                max_selection: 5,
                options: [
                    { id: 301, name: 'Lettuce', price: 0, modifierId: 30 },
                    { id: 302, name: 'Pineapple', price: 0, modifierId: 30 },
                    { id: 303, name: 'Lime Quarters', price: 0, modifierId: 30 },
                    { id: 304, name: 'Monterey Cheese', price: 0, modifierId: 30 },
                    { id: 305, name: 'Corn Salsa', price: 0, modifierId: 30 },
                    { id: 306, name: 'Pico de Gallo', price: 0, modifierId: 30 },
                    { id: 307, name: 'Grilled Onions', price: 0, modifierId: 30 },
                    { id: 308, name: 'Red Onions', price: 0, modifierId: 30 },
                    { id: 309, name: 'Mango Salsa', price: 0, modifierId: 30 },
                    { id: 310, name: 'Black Beans', price: 0, modifierId: 30 },
                    { id: 311, name: 'Peppers', price: 0, modifierId: 30 },
                    { id: 312, name: 'Hummus', price: 0, modifierId: 30 },
                ]
            },
            'Sauces': {
                max_selection: 2,
                options: [
                    { id: 401, name: 'White Sauce', price: 0, modifierId: 40 },
                    { id: 402, name: 'Tahini', price: 0, modifierId: 40 },
                    { id: 403, name: 'Mango Habanero', price: 0, modifierId: 40 },
                    { id: 404, name: 'Honey Garlic', price: 0, modifierId: 40 },
                    { id: 405, name: 'Green Sauce', price: 0, modifierId: 40 },
                    { id: 406, name: 'Sour Cream', price: 0, modifierId: 40 },
                    { id: 407, name: 'Sriracha', price: 0, modifierId: 40 },
                    { id: 408, name: 'Red Sauce', price: 0, modifierId: 40 },
                    { id: 409, name: 'Nashville Hot', price: 0, modifierId: 40 },
                    { id: 410, name: 'Boom-Boom', price: 0, modifierId: 40 },
                    { id: 411, name: 'Orange Ginger', price: 0, modifierId: 40 },
                ]
            },
            'Add-ons': {
                max_selection: 3,
                options: [
                    { id: 501, name: 'Ranch', price: 0.50, modifierId: 50 },
                    { id: 502, name: 'Blue Cheese', price: 0.50, modifierId: 50 },
                    { id: 503, name: 'Caesar', price: 0.50, modifierId: 50 },
                    { id: 504, name: 'Greek', price: 0.50, modifierId: 50 },
                    { id: 505, name: 'Thousand Island', price: 0.50, modifierId: 50 },
                    { id: 506, name: 'Honey Mustard', price: 0.50, modifierId: 50 },
                    { id: 507, name: 'Sweet and Sour', price: 0.50, modifierId: 50 },
                ]
            },
            'Extras': {
                max_selection: 10,
                options: [
                    { id: 601, name: 'Guacamole', price: 2.50, modifierId: 60 },
                    { id: 602, name: 'Queso', price: 2.00, modifierId: 60 },
                    { id: 603, name: 'Jalapeno', price: 0.50, modifierId: 60 },
                    { id: 604, name: 'Banana Pepper', price: 0.50, modifierId: 60 },
                    { id: 605, name: 'Nachos', price: 4.00, modifierId: 60 },
                    { id: 606, name: 'Nachos w/ Guacamole', price: 6.00, modifierId: 60 },
                    { id: 607, name: 'Nachos w/ Queso', price: 5.50, modifierId: 60 },
                    { id: 608, name: 'Tortilla Extra', price: 1.00, modifierId: 60 },
                ]
            }
        };

        return NextResponse.json({
            baseItems,
            modifiers
        });
    } catch (error) {
        console.error('Error in /api/build:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
