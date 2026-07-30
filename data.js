// ===== STORY DATABASE =====
// Isolated story storage per user ID.
// Admin user: veerakumar

const ADMIN_NAME = "veerakumar";

// Default seed stories
const DEFAULT_STORIES = {
    "lemuria": {
        id: "lemuria",
        displayName: "Lemuria",
        greeting: "Welcome, Lemuria ✨",
        subtitle: "This story was written just for you...",
        title: "Where Strangers Became Something More",
        tagline: "A love story that began at a railway station",
        chapters: [
            {
                number: "Chapter I",
                title: "The Railway Station",
                paragraphs: [
                    "It was just another ordinary day at the railway station. The crowd buzzing, announcements echoing through the halls, and the smell of chai lingering in the air.",
                    "I stood in the ticket queue, lost in my own world…"
                ],
                accent: "Until a voice broke through the noise."
            },
            {
                number: "Chapter II",
                title: "The First Words",
                dialogues: [
                    { speaker: "her", text: "Excuse me… where can I get a ticket?" },
                    { speaker: "me", text: "This is the line! You're in the right place." }
                ],
                feeling: "At first sight, something stirred inside me. A feeling I couldn't name. I brushed it off — 'Just imagination,' I told myself."
            },
            {
                number: "Chapter III",
                title: "Walking Together",
                paragraphs: [
                    "After getting my ticket, I waited. I don't know why.",
                    "Maybe I wanted just a few more moments. So we walked together — two strangers sharing the same path, the same platform, headed for the same train."
                ],
                accent: "For a brief while, the world felt perfectly aligned."
            },
            {
                number: "Chapter IV",
                title: "The Separation",
                paragraphs: [
                    "Then came the fork in the path. We went in separate directions — but to the same train.",
                    "As she walked away, the realization hit me like a wave."
                ],
                realization: "This feeling… it's not ordinary. It's something special."
            },
            {
                number: "Chapter V",
                title: "Lost in Frustration",
                paragraphs: [
                    "Standing there, watching her disappear into the crowd, I must have looked like a madman.",
                    "Heart racing. Thoughts spiraling. The chance — slipping away."
                ]
            },
            {
                number: "Chapter VI",
                title: "The Voice From Behind",
                paragraphs: [
                    "But then — suddenly —",
                    "I turned around. And there she was. She had come to my side."
                ],
                accent: "Her voice echoed not just in my ears… but in my heart."
            },
            {
                number: "Chapter VII",
                title: "The Phone Call",
                paragraphs: [
                    "We walked a few more precious steps together. Then her phone rang.",
                    "Grandma.",
                    "She learned she had been walking in the opposite direction all along."
                ]
            },
            {
                number: "Chapter VIII",
                title: "Collecting Courage",
                paragraphs: [
                    "Before she could leave, I gathered every ounce of courage I had…"
                ],
                dialogues: [
                    { speaker: "me", text: "Can I get your Instagram ID?" },
                    { speaker: "her", text: "✨ *gives her ID* ✨" },
                    { speaker: "me", text: "What's your name?" },
                    { speaker: "her", text: "It's Lemuria. Spell it correctly!" },
                    { speaker: "me", text: "*tries to spell... fails* 😅" }
                ],
                accent: "Anyway… I have Instagram. I'll spell it right there."
            },
            {
                number: "Chapter IX",
                title: "Wrong Direction",
                paragraphs: [
                    "I searched for my friends — all 9 of them — nowhere to be found.",
                    "A quick phone call confirmed my fear:"
                ],
                friendCall: "Bro… you're also going in the wrong direction!",
                accent: "I ran. Ran as fast as I could. I had to find her before she disappeared into her family."
            },
            {
                number: "Chapter X",
                title: "Found You",
                paragraphs: [
                    "Luckily — I found her."
                ],
                dialogues: [
                    { speaker: "her", text: "What happened?" },
                    { speaker: "me", text: "Turns out I was also in the wrong direction… because of our conversation 😄" },
                    { speaker: "her", text: "Haha! What's your coach number?" }
                ],
                paragraphsAfter: [
                    "She went with her family. And just like that… we silently separated again."
                ]
            },
            {
                number: "Chapter XI",
                title: "On The Train",
                paragraphs: [
                    "I found my seat. The train began to move.",
                    "And the very first thing I did?"
                ]
            },
            {
                number: "Chapter XII",
                title: "The Follow",
                paragraphs: [
                    "Followed her. Started chatting.",
                    "But to get a follow back… I knew I had to do something unique. Something that would make her remember the stranger from the railway station."
                ]
            },
            {
                number: "Chapter XIII",
                title: "So I Built This",
                subtitle: "A website. For us. For our story.",
                quote: "Some people cross your path for a reason.\nSome meetings are written in the stars.\nAnd some strangers… are meant to become something more."
            }
        ],
        photos: [
            { src: MEDIA.photo("file_00000000b8ac8207a2d6c380e17e5e26.png"), caption: "Where it all began — the railway station", objectPosition: "center center" },
            { src: MEDIA.photo("IMG_20260727_10482537.jpeg"), caption: "The ticket queue moment", objectPosition: "center 15%" },
            { src: MEDIA.photo("IMG_20260727_10483567.jpeg"), caption: "Walking together", objectPosition: "center 10%" },
            { src: MEDIA.photo("IMG_20260727_10483959.jpeg"), caption: "The voice from behind", objectPosition: "center center" },
            { src: MEDIA.photo("IMG_20260727_105728.jpg"), caption: "Found you again", objectPosition: "center 2%" },
            { src: MEDIA.photo("IMG_20260727_105805.jpg"), caption: "A memory to cherish", objectPosition: "center 5%" },
            { src: MEDIA.photo("IMG_20260727_105832.jpg"), caption: "The moment I knew", objectPosition: "center 15%" },
            { src: MEDIA.photo("IMG_20260727_105908.jpg"), caption: "Hearts aligned", objectPosition: "center 15%" },
            { src: MEDIA.photo("IMG_20260727_105930.jpg"), caption: "Written in the stars", objectPosition: "center 10%" },
            { src: MEDIA.photo("IMG_20260727_110002.jpg"), caption: "Our beautiful journey", objectPosition: "center 15%" },
            { src: MEDIA.photo("IMG_20260727_110035.jpg"), caption: "Every second with you", objectPosition: "center 10%" },
            { src: MEDIA.photo("IMG_20260727_110113.jpg"), caption: "Forever begins here", objectPosition: "center 5%" }
        ]
    }
};

// ===== STORAGE ENGINE (localStorage-backed) =====
const STORAGE_KEY = 'railway_love_stories';

function loadStoryDatabase() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch (e) {
            console.warn('Failed to parse stored stories, using defaults.');
        }
    }
    // First load — seed with defaults
    saveStoryDatabase(DEFAULT_STORIES);
    return { ...DEFAULT_STORIES };
}

function saveStoryDatabase(db) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
}

function getStory(name) {
    if (!name) return null;
    const db = loadStoryDatabase();
    return db[name.toLowerCase()] || null;
}

function getAllStories() {
    return loadStoryDatabase();
}

function createStory(key, data) {
    const db = loadStoryDatabase();
    const cleanKey = key.toLowerCase();
    db[cleanKey] = {
        id: cleanKey,
        displayName: data.displayName || key,
        greeting: data.greeting || `Welcome, ${data.displayName || key} ✨`,
        subtitle: data.subtitle || 'This story was written just for you...',
        title: data.title || `${data.displayName || key}'s Story`,
        tagline: data.tagline || 'A story written in the stars',
        chapters: data.chapters || [],
        photos: data.photos || []
    };
    saveStoryDatabase(db);
    return db[cleanKey];
}

function updateStory(key, data) {
    const db = loadStoryDatabase();
    const cleanKey = key.toLowerCase();
    if (db[cleanKey]) {
        db[cleanKey] = { ...db[cleanKey], ...data };
        saveStoryDatabase(db);
        return true;
    }
    return false;
}

function deleteStory(key) {
    const db = loadStoryDatabase();
    const cleanKey = key.toLowerCase();
    if (db[cleanKey]) {
        delete db[cleanKey];
        saveStoryDatabase(db);
        return true;
    }
    return false;
}

function isAdmin(name) {
    return name && name.toLowerCase() === ADMIN_NAME;
}
