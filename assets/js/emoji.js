// script.js

// Array of emojis representing objects
const objectEmojis = [
    '💡', // Light Bulb
    '📦', // Package
    '🔑', // Key
    '📱', // Mobile Phone
    '💻', // Laptop
    '🕰️', // Mantelpiece Clock
    '🔗', // Link
    '🪑', // Chair
    '☕', // Coffee Cup
    '📚', // Books
    '🖊️', // Pen
    '✂️', // Scissors
    '📌', // Pushpin
    '💾', // Floppy Disk (classic object!)
    '🗑️', // Wastebasket
    '⚙️', // Gear
    '🛡️', // Shield
    '🔭', // Telescope
    '🧸', // Teddy Bear
    '🎁', // Gift
    '🖼️', // Framed Picture
    '🛒', // Shopping Cart
    '🔋', // Battery
    '📍', // Round Pushpin
    '🔔', // Bell
    '📊', // Bar Chart
    '📮', // Postbox
    '🪜', // Ladder
    '🧰', // Toolbox
    '🧼', // Soap
    '🛍️', // Shopping Bags
    '💎', // Gem Stone
    '🧪', // Test Tube
    '💵', // Dollar Banknote
    '🧳'  // Luggage
];

const emojiDisplay = document.getElementById('emoji-display');
const generateButton = document.getElementById('generate-button');

// Function to get and display a random object emoji
function generateRandomEmoji() {
    const randomIndex = Math.floor(Math.random() * objectEmojis.length);
    emojiDisplay.textContent = objectEmojis[randomIndex];
}

// Add an event listener to the button
generateButton.addEventListener('click', generateRandomEmoji);

// Optional: Display a random emoji when the page first loads
document.addEventListener('DOMContentLoaded', generateRandomEmoji);
