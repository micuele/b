// assets/js/script.js

// List of emojis representing various objects, along with their names.
const objectEmojis = [
    ['💡', "Light Bulb"], ['📦', "Package"], ['🔑', "Key"], ['📱', "Mobile Phone"],
    ['💻', "Laptop"], ['🕰️', "Mantelpiece Clock"], ['🔗', "Link"], ['🪑', "Chair"],
    ['☕', "Coffee Cup"], ['📚', "Books"], ['🖊️', "Pen"], ['✂️', "Scissors"],
    ['📌', "Pushpin"], ['💾', "Floppy Disk"], ['🗑️', "Wastebasket"], ['⚙️', "Gear"],
    ['🛡️', "Shield"], ['🔭', "Telescope"], ['🧸', "Teddy Bear"], ['🎁', "Gift"],
    ['🖼️', "Framed Picture"], ['🛒', "Shopping Cart"], ['🔋', "Battery"], ['📍', "Round Pushpin"],
    ['🔔', "Bell"], ['📊', "Bar Chart"], ['📮', "Postbox"], ['🪜', "Ladder"],
    ['🧰', "Toolbox"], ['🧼', "Soap"], ['🛍️', "Shopping Bags"], ['💎', "Gem Stone"],
    ['🧪', "Test Tube"], ['💵', "Dollar Banknote"], ['🧳', "Luggage"], ['🔎', "Magnifying Glass"],
    ['💰', "Money Bag"], ['✉️', "Envelope"], ['📏', "Straight Ruler"], ['📐', "Set Square"],
    ['🧩', "Puzzle Piece"], ['⏰', "Alarm Clock"], ['🗓️', "Spiral Calendar"], ['📅', "Calendar"],
    ['📰', "Newspaper"], ['🗞️', "Rolled-up Newspaper"], ['📜', "Scroll"], ['📖', "Open Book"],
    ['📕', "Red Book"], ['📗', "Green Book"], ['📘', "Blue Book"], ['📙', "Orange Book"],
    ['🗒️', "Notepad"], ['📄', "Page Facing Up"], ['📃', "Page Curl"], ['🧾', "Receipt"],
    ['📈', "Chart Increasing"], ['📉', "Chart Decreasing"], ['🖋️', "Fountain Pen"], ['✒️', "Black Nib"],
    ['✏️', "Pencil"], ['🖌️', "Paintbrush"], ['🖍️', "Crayon"], ['🗂️', "Card Index Dividers"],
    ['📁', "File Folder"], ['📂', "Open File Folder"], ['🗃️', "Card File Box"], ['🗄️', "File Cabinet"],
    ['💼', "Briefcase"], ['🎒', "Backpack"], ['🌂', "Closed Umbrella"], ['☂️', "Umbrella"],
    ['☔', "Umbrella With Rain Drops"], ['⛱️', "Umbrella On Ground"], ['🎄', "Christmas Tree"],
    ['🎆', "Sparkler"], ['🎇', "Firework"], ['✨', "Sparkles"], ['🎈', "Balloon"],
    ['🎉', "Party Popper"], ['🎊', "Confetti Ball"], ['🎀', "Ribbon"], ['🪄', "Magic Wand"],
    ['🔮', "Crystal Ball"], ['🪅', "Piñata"], ['🎋', "Tanabata Tree"], ['🎟️', "Admission Tickets"],
    ['🎫', "Ticket"], ['🏅', "Sports Medal"], ['🎖️', "Military Medal"], ['🎗️', "Reminder Ribbon"],
    ['🛢️', "Oil Drum"], ['🪣', "Bucket"], ['🚿', "Shower"], ['🛀', "Person Taking Bath"],
    ['🛁', "Bathtub"], ['🧼', "Soap"], ['🪥', "Toothbrush"], ['🚽', "Toilet"],
    ['🧻', "Roll of Toilet Paper"], ['🪞', "Mirror"], ['🪟', "Window"], ['🛏️', "Bed"],
    ['🛋️', "Couch and Lamp"], ['🚪', "Door"], ['🪧', "Placard"]
];

// Get references to the HTML elements.
const emojiDisplay = document.getElementById('emoji-display');
const emojiNameDisplay = document.getElementById('emoji-name-display');
const messageArea = document.getElementById('message-area'); // Still for the daily limit message

// Keys for storing data in localStorage.
const LAST_GENERATED_DATE_KEY = 'dailyEmojiDate';
const GENERATED_EMOJI_DATA_KEY = 'dailyGeneratedEmojiData';

/**
 * Returns today's date in 'YYYY-MM-DD' format.
 */
function getTodayDateString() {
    const today = new Date();
    return today.toISOString().split('T')[0];
}

/**
 * Handles the logic for displaying the emoji and message.
 * @param {string} emojiChar - The emoji character to display.
 * @param {string} emojiName - The name of the emoji.
 * @param {boolean} isNewGeneration - True if this is a newly generated emoji for today.
 */
function displayEmojiAndMessage(emojiChar, emojiName, isNewGeneration) {
    if (!emojiDisplay || !emojiNameDisplay || !messageArea) {
        console.error("Missing one or more required HTML elements for daily emoji app.");
        return;
    }

    emojiDisplay.textContent = emojiChar;
    emojiNameDisplay.textContent = `You are ${emojiName}`; // Directly set "You are X emoji"

    if (isNewGeneration) {
        messageArea.textContent = "Enjoy your daily object emoji!"; // Message for a new emoji
        // Optional: Add animation class only for new generations
        // emojiDisplay.classList.remove('animate');
        // void emojiDisplay.offsetWidth;
        // emojiDisplay.classList.add('animate');
    } else {
        messageArea.textContent = "Come back tomorrow for a new one!"; // Message if already generated today
    }
}

// Initialize the app when the DOM is fully loaded.
document.addEventListener('DOMContentLoaded', () => {
    const todayDate = getTodayDateString();
    const lastGeneratedDate = localStorage.getItem(LAST_GENERATED_DATE_KEY);
    const storedEmojiDataString = localStorage.getItem(GENERATED_EMOJI_DATA_KEY);

    let storedEmoji = null;
    let storedEmojiName = null;

    // Attempt to parse stored emoji data if it exists.
    if (storedEmojiDataString) {
        try {
            const data = JSON.parse(storedEmojiDataString);
            if (data && typeof data.char === 'string' && typeof data.name === 'string') {
                storedEmoji = data.char;
                storedEmojiName = data.name;
            } else {
                console.warn("Stored emoji data is malformed. Will generate new.");
                localStorage.removeItem(GENERATED_EMOJI_DATA_KEY);
                localStorage.removeItem(LAST_GENERATED_DATE_KEY);
            }
        } catch (e) {
            console.error("Error parsing stored emoji data from localStorage:", e);
            localStorage.removeItem(GENERATED_EMOJI_DATA_KEY);
            localStorage.removeItem(LAST_GENERATED_DATE_KEY);
        }
    }

    // Logic to determine whether to display stored or generate new
    if (lastGeneratedDate === todayDate && storedEmoji && storedEmojiName) {
        // If an emoji was already generated for today, display it.
        displayEmojiAndMessage(storedEmoji, storedEmojiName, false);
    } else {
        // If no emoji generated today, or data is missing/corrupted, generate a new one.
        const randomIndex = Math.floor(Math.random() * objectEmojis.length);
        const [newEmojiChar, newEmojiName] = objectEmojis[randomIndex];

        // Store the newly generated emoji data and today's date.
        localStorage.setItem(GENERATED_EMOJI_DATA_KEY, JSON.stringify({ char: newEmojiChar, name: newEmojiName }));
        localStorage.setItem(LAST_GENERATED_DATE_KEY, getTodayDateString());

        displayEmojiAndMessage(newEmojiChar, newEmojiName, true);
    }
});
