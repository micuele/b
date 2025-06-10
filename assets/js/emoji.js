// assets/js/emoji.js (Content for your emoji.js file)

// List of emojis representing various objects, along with their names.
const objectEmojis = [
    ['💡', "Light Bulb"], ['📦', "Package"], ['🔑', "Key"], ['📱', "Mobile Phone"],
    ['💻', "Laptop"], ['🕰️', "Mantelpiece Clock"], ['🔗', "Link"], ['🪑', "Chair"],
    ['☕', "Coffee Cup"], ['📚', "Books"], ['🖊️', "Pen"], ['✂️', "Scissors"],
    ['📌', "Pushpin"], ['💾', "Floppy Disk"], ['🗑️', "Wastebasket"], ['⚙️', "Gear"],
    ['🛡️', "Shield"], ['🔭', "Telescope"], ['🧸', "Teddy Bear"], ['🎁', "Gift"],
    ['🖼️', "Framed Picture"], ['🛒', "Shopping Cart"], ['🔋', "Battery"], ['📍', "Round Pushpin"],
    ['🔔', "Bell"], ['📊', "Bar Chart"], ['📮', "Postbox"], ['🪜', "Ladder"],
    ['🧰', "Toolbox"], ['🧼', "Soap"], ['🛍️", "Shopping Bags"], ['💎', "Gem Stone"],
    ['🧪', "Test Tube"], ['💵', "Dollar Banknote"], ['🧳", "Luggage"], ['🔎', "Magnifying Glass"],
    ['💰', "Money Bag"], ['✉️', "Envelope"], ['📏", "Straight Ruler"], ['📐", "Set Square"],
    ['🧩', "Puzzle Piece"], ['⏰', "Alarm Clock"], ['🗓️", "Spiral Calendar"], ['📅', "Calendar"],
    ['📰', "Newspaper"], ['🗞️', "Rolled-up Newspaper"], ['📜', "Scroll"], ['📖', "Open Book"],
    ['📕', "Red Book"], ['📗', "Green Book"], ['📘', "Blue Book"], ['📙', "Orange Book"],
    ['🗒️', "Notepad"], ['📄', "Page Facing Up"], ['📃", "Page Curl"], ['🧾', "Receipt"],
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
const messageArea = document.getElementById('message-area'); 

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
 * Displays the emoji and its associated messages in the UI.
 * @param {string} emojiChar - The emoji character (e.g., '💡').
 * @param {string} emojiName - The descriptive name of the emoji (e.g., "Light Bulb").
 * @param {boolean} isNewGeneration - True if this emoji was just randomly generated for today.
 */
function displayEmojiAndMessage(emojiChar, emojiName, isNewGeneration) {
    if (!emojiDisplay || !emojiNameDisplay || !messageArea) {
        console.error("JavaScript Error: One or more required HTML elements were not found.");
        console.log("Debug: emojiDisplay =", emojiDisplay, "emojiNameDisplay =", emojiNameDisplay, "messageArea =", messageArea);
        return;
    }

    emojiDisplay.textContent = emojiChar;
    emojiNameDisplay.textContent = `You are ${emojiName}`;

    // IMPORTANT: Always clear the message area - this should make sure no text appears.
    messageArea.textContent = ""; 
}

// This function runs automatically once the entire HTML document is loaded.
document.addEventListener('DOMContentLoaded', () => {
    const todayDate = getTodayDateString();
    const lastGeneratedDate = localStorage.getItem(LAST_GENERATED_DATE_KEY);
    const storedEmojiDataString = localStorage.getItem(GENERATED_EMOJI_DATA_KEY);

    let storedEmoji = null;
    let storedEmojiName = null;

    if (storedEmojiDataString) {
        try {
            const data = JSON.parse(storedEmojiDataString);
            if (data && typeof data.char === 'string' && typeof data.name === 'string') {
                storedEmoji = data.char;
                storedEmojiName = data.name;
            } else {
                console.warn("Stored emoji data is malformed or incomplete. Generating a new emoji.");
                localStorage.removeItem(GENERATED_EMOJI_DATA_KEY);
                localStorage.removeItem(LAST_GENERATED_DATE_KEY);
            }
        } catch (e) {
            console.error("Error parsing stored emoji data from localStorage:", e);
            localStorage.removeItem(GENERATED_EMOJI_DATA_KEY);
            localStorage.removeItem(LAST_GENERATED_DATE_KEY);
        }
    }

    if (lastGeneratedDate === todayDate && storedEmoji && storedEmojiName) {
        displayEmojiAndMessage(storedEmoji, storedEmojiName, false);
    } else {
        const randomIndex = Math.floor(Math.random() * objectEmojis.length);
        const [newEmojiChar, newEmojiName] = objectEmojis[randomIndex];

        localStorage.setItem(GENERATED_EMOJI_DATA_KEY, JSON.stringify({ char: newEmojiChar, name: newEmojiName }));
        localStorage.setItem(LAST_GENERATED_DATE_KEY, todayDate);

        displayEmojiAndMessage(newEmojiChar, newEmojiName, true);
    }
});
