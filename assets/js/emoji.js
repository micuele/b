// script.js

// List of emojis representing various objects, along with their names.
// Each element is now an array: [emoji_character, "Emoji Name"]
const objectEmojis = [
    ['💡', "Light Bulb"],
    ['📦', "Package"],
    ['🔑', "Key"],
    ['📱', "Mobile Phone"],
    ['💻', "Laptop"],
    ['🕰️', "Mantelpiece Clock"],
    ['🔗', "Link"],
    ['🪑', "Chair"],
    ['☕', "Coffee Cup"],
    ['📚', "Books"],
    ['🖊️', "Pen"],
    ['✂️', "Scissors"],
    ['📌', "Pushpin"],
    ['💾', "Floppy Disk"],
    ['🗑️', "Wastebasket"],
    ['⚙️', "Gear"],
    ['🛡️', "Shield"],
    ['🔭', "Telescope"],
    ['🧸', "Teddy Bear"],
    ['🎁', "Gift"],
    ['🖼️', "Framed Picture"],
    ['🛒', "Shopping Cart"],
    ['🔋', "Battery"],
    ['📍', "Round Pushpin"],
    ['🔔', "Bell"],
    ['📊', "Bar Chart"],
    ['📮', "Postbox"],
    ['🪜', "Ladder"],
    ['🧰', "Toolbox"],
    ['🧼', "Soap"],
    ['🛍️', "Shopping Bags"],
    ['💎', "Gem Stone"],
    ['🧪', "Test Tube"],
    ['💵', "Dollar Banknote"],
    ['🧳', "Luggage"],
    ['🔎', "Magnifying Glass"],
    ['💰', "Money Bag"],
    ['✉️', "Envelope"],
    ['📏', "Straight Ruler"],
    ['📐', "Set Square"],
    ['🧩', "Puzzle Piece"],
    ['⏰', "Alarm Clock"],
    ['🗓️', "Spiral Calendar"],
    ['📅', "Calendar"],
    ['📰', "Newspaper"],
    ['🗞️', "Rolled-up Newspaper"],
    ['📜', "Scroll"],
    ['📖', "Open Book"],
    ['📕', "Red Book"],
    ['📗', "Green Book"],
    ['📘', "Blue Book"],
    ['📙', "Orange Book"],
    ['🗒️', "Notepad"],
    ['📄', "Page Facing Up"],
    ['📃', "Page Curl"],
    ['🧾', "Receipt"],
    ['📈', "Chart Increasing"],
    ['📉', "Chart Decreasing"],
    ['🖋️', "Fountain Pen"],
    ['✒️', "Black Nib"],
    ['✏️', "Pencil"],
    ['🖌️', "Paintbrush"],
    ['🖍️', "Crayon"],
    ['🗂️', "Card Index Dividers"],
    ['📁', "File Folder"],
    ['📂', "Open File Folder"],
    ['🗃️', "Card File Box"],
    ['🗄️', "File Cabinet"],
    ['💼', "Briefcase"],
    ['🎒', "Backpack"],
    ['🌂', "Closed Umbrella"],
    ['☂️', "Umbrella"],
    ['☔', "Umbrella With Rain Drops"],
    ['⛱️', "Umbrella On Ground"],
    ['🎄', "Christmas Tree"],
    ['🎆', "Sparkler"],
    ['🎇', "Firework"],
    ['✨', "Sparkles"],
    ['🎈', "Balloon"],
    ['🎉', "Party Popper"],
    ['🎊', "Confetti Ball"],
    ['🎁', "Gift"],
    ['🎀', "Ribbon"],
    ['🪄', "Magic Wand"],
    ['🔮', "Crystal Ball"],
    ['🪅', "Piñata"],
    ['🎋', "Tanabata Tree"],
    ['🎟️', "Admission Tickets"],
    ['🎫', "Ticket"],
    ['🏅', "Sports Medal"],
    ['🎖️', "Military Medal"],
    ['🎗️', "Reminder Ribbon"],
    ['🛢️', "Oil Drum"],
    ['🪣', "Bucket"],
    ['🚿', "Shower"],
    ['🛀', "Person Taking Bath"],
    ['🛁', "Bathtub"],
    ['🧼', "Soap"],
    ['🪥', "Toothbrush"],
    ['🚽', "Toilet"],
    ['🧻', "Roll of Toilet Paper"],
    ['🪞', "Mirror"],
    ['🪟', "Window"],
    ['🛏️', "Bed"],
    ['🛋️', "Couch and Lamp"],
    ['🚪', "Door"],
    ['🪧', "Placard"]
];

// Get references to the HTML elements.
const emojiDisplay = document.getElementById('emoji-display');
const emojiNameDisplay = document.getElementById('emoji-name-display'); // New element for the name
const generateButton = document.getElementById('generate-button');
const messageArea = document.getElementById('message-area');

// Keys for storing data in localStorage.
const LAST_GENERATED_DATE_KEY = 'lastGeneratedEmojiDate';
const GENERATED_EMOJI_DATA_KEY = 'generatedEmojiData'; // Stores both emoji and name

/**
 * Returns today's date in 'YYYY-MM-DD' format.
 * This is used to check if an emoji has already been generated today.
 */
function getTodayDateString() {
    const today = new Date();
    // Use toISOString and split to get just the date part,
    // ensuring consistent formatting regardless of local time zone.
    return today.toISOString().split('T')[0];
}

/**
 * Updates the UI (button text, disabled state, message) based on
 * whether an emoji has already been generated for the current day.
 * @param {boolean} hasGeneratedToday - True if an emoji was generated today.
 */
function updateUIForDailyLimit(hasGeneratedToday) {
    if (hasGeneratedToday) {
        generateButton.textContent = "Generated For Today!";
        generateButton.disabled = true; // Disable button to prevent re-generation
        messageArea.textContent = "You've already generated your daily emoji!";
    } else {
        generateButton.textContent = "Generate Daily Emoji";
        generateButton.disabled = false; // Enable button
        messageArea.textContent = "Click to reveal your daily object emoji.";
    }
}

/**
 * Generates a random object emoji and its name, displays them,
 * and saves them and the current date to localStorage.
 */
function generateRandomEmoji() {
    // Optional: Add a simple animation effect by removing and re-adding a class.
    // Ensure you have a '.animate' class and '@keyframes popIn' in your CSS
    // for this to have a visual effect.
    if (emojiDisplay) { // Check if emojiDisplay exists before manipulating classes
        emojiDisplay.classList.remove('animate');
        // This line forces a reflow, allowing the animation to reset for repeated clicks.
        void emojiDisplay.offsetWidth;
        emojiDisplay.classList.add('animate');
    }

    // Pick a random emoji entry (array of [emoji, name]) from the list.
    const randomIndex = Math.floor(Math.random() * objectEmojis.length);
    const [newEmojiChar, newEmojiName] = objectEmojis[randomIndex];

    // Update the emoji display.
    if (emojiDisplay) {
        emojiDisplay.textContent = newEmojiChar;
    }
    // Update the emoji name display.
    if (emojiNameDisplay) {
        emojiNameDisplay.textContent = `To you are ${newEmojiName}`;
    }


    // Store the generated emoji and today's date in the user's browser storage.
    // We store an object now to keep emoji character and name together.
    localStorage.setItem(GENERATED_EMOJI_DATA_KEY, JSON.stringify({ char: newEmojiChar, name: newEmojiName }));
    localStorage.setItem(LAST_GENERATED_DATE_KEY, getTodayDateString());

    // Update the button state immediately after generation.
    updateUIForDailyLimit(true);
}

// This code runs once the entire HTML document is loaded.
document.addEventListener('DOMContentLoaded', () => {
    const todayDate = getTodayDateString();
    const lastGeneratedDate = localStorage.getItem(LAST_GENERATED_DATE_KEY);
    const storedEmojiDataString = localStorage.getItem(GENERATED_EMOJI_DATA_KEY);

    let storedEmoji = null;
    let storedEmojiName = null;

    if (storedEmojiDataString) {
        try {
            const data = JSON.parse(storedEmojiDataString);
            storedEmoji = data.char;
            storedEmojiName = data.name;
        } catch (e) {
            console.error("Error parsing stored emoji data from localStorage:", e);
            // Clear corrupted data to allow new generation
            localStorage.removeItem(GENERATED_EMOJI_DATA_KEY);
            localStorage.removeItem(LAST_GENERATED_DATE_KEY);
        }
    }


    // Check if an emoji was already generated for today.
    if (lastGeneratedDate === todayDate && storedEmoji && storedEmojiName) {
        // If yes, display the stored emoji and its name, and disable the button.
        if (emojiDisplay) {
            emojiDisplay.textContent = storedEmoji;
        }
        if (emojiNameDisplay) {
            emojiNameDisplay.textContent = `To you are ${storedEmojiName}`;
        }
        updateUIForDailyLimit(true);
    } else {
        // If no, display a placeholder and enable the button.
        if (emojiDisplay) {
            emojiDisplay.textContent = '❓'; // Placeholder emoji
        }
        if (emojiNameDisplay) {
            emojiNameDisplay.textContent = "Click to reveal your daily object emoji."; // Initial message for the name area
        }
        updateUIForDailyLimit(false);
    }

    // Attach the event listener to the button.
    if (generateButton) {
        generateButton.addEventListener('click', generateRandomEmoji);
    } else {
        console.error("Generate button not found. Make sure an element with ID 'generate-button' exists.");
    }
    if (!emojiDisplay) {
        console.error("Emoji display area not found. Make sure an element with ID 'emoji-display' exists.");
    }
    // The emoji name display is new, so also check for it.
    if (!emojiNameDisplay) {
        console.error("Emoji name display area not found. Make sure an element with ID 'emoji-name-display' exists.");
    }
    if (!messageArea) {
        console.error("Message area not found. Make sure an element with ID 'message-area' exists.");
    }
});
