// ===== SUPABASE STORAGE CONFIG =====
// All media (photos, music) is hosted on Supabase Storage.

const SUPABASE_URL = 'https://svqcfbqaliijfpyudouj.supabase.co';

// Public bucket base URLs
const MEDIA = {
    photo: (filename) => `${SUPABASE_URL}/storage/v1/object/public/photos/${filename}`,
    music: (filename) => `${SUPABASE_URL}/storage/v1/object/public/music/${filename}`,
};
