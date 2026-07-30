// ===== OUR STORY — Interactive Script =====

let currentUserData = null;

document.addEventListener('DOMContentLoaded', () => {
    // Initialize welcome screen first
    initWelcomeScreen();
    initNotFoundScreen();
    initMusicPlayer();
});

// Called after successful name validation
function initStory() {
    // Reset nav dots container
    const navDots = document.getElementById('navDots');
    if (navDots) {
        navDots.innerHTML = '';
        navDots.style.display = 'flex';
    }

    const progressBar = document.getElementById('progressBar');
    if (progressBar) progressBar.style.display = 'block';

    // Bind User Top Navigation Bar
    const usernameEl = document.getElementById('utUsername');
    if (usernameEl) {
        usernameEl.textContent = 'Lemuria';
    }

    const logoutBtn = document.getElementById('utLogoutBtn');
    if (logoutBtn) logoutBtn.onclick = userLogout;

    const lemuriaStoryEl = document.getElementById('lemuriaStory');
    if (lemuriaStoryEl) lemuriaStoryEl.style.display = 'block';

    // Initialize interactive story modules
    initParticles();
    initNavDots();
    initScrollObserver();
    initProgressBar();
    initFollowButton();
    initCourageMeter();
    initGallery();
    initLightbox();
}

// ===== WELCOME SCREEN =====
function initWelcomeScreen() {
    createGlitterParticles('welcomeGlitter', 40);

    const input = document.getElementById('nameInput');
    const btn = document.getElementById('welcomeBtn');

    // Focus input after animations
    setTimeout(() => input && input.focus(), 1500);

    // Button click
    btn.addEventListener('click', () => handleNameSubmit());

    // Enter key
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleNameSubmit();
    });

    // Remove shake on typing
    input.addEventListener('input', () => {
        input.classList.remove('shake');
    });
}

function handleNameSubmit() {
    const input = document.getElementById('nameInput');
    const name = input.value.trim();

    if (!name) {
        input.classList.add('shake');
        setTimeout(() => input.classList.remove('shake'), 600);
        return;
    }

    const key = name.toLowerCase();

    // Check if admin (veerakumar)
    if (typeof isAdmin === 'function' && isAdmin(key)) {
        showAdminPanel();
        return;
    }

    // This website belongs ONLY to Lemuria
    if (key === 'lemuria') {
        let userData = (typeof getStory === 'function') ? getStory('lemuria') : { id: 'lemuria', displayName: 'Lemuria' };
        currentUserData = userData;
        showGreeting(userData);
        return;
    }

    // Any other name -> Custom 404 Story Not Found
    showNotFound();
}

function showGreeting(userData) {
    const welcomeOverlay = document.getElementById('welcomeOverlay');
    const greetingOverlay = document.getElementById('greetingOverlay');
    const greetingName = document.getElementById('greetingName');
    const greetingSub = document.getElementById('greetingSub');
    const greetingBurst = document.getElementById('greetingBurst');
    const greetingSparkles = document.getElementById('greetingSparkles');

    if (welcomeOverlay) {
        welcomeOverlay.classList.add('hidden', 'removed');
        welcomeOverlay.style.display = 'none';
    }

    if (greetingBurst) greetingBurst.innerHTML = '';
    if (greetingSparkles) greetingSparkles.innerHTML = '';

    if (greetingName) greetingName.textContent = userData.greeting || `Welcome, ${userData.displayName} ✨`;
    if (greetingSub) greetingSub.textContent = userData.subtitle || 'This story was written just for you...';

    if (greetingOverlay) {
        greetingOverlay.style.display = 'flex';
        greetingOverlay.classList.add('visible');
    }

    // Sparkles around name
    const sparkleChars = ['✦', '✧', '✨', '💫', '⭐', '🌟', '💕'];
    for (let i = 0; i < 12; i++) {
        const el = document.createElement('span');
        el.classList.add('g-sparkle');
        el.textContent = sparkleChars[Math.floor(Math.random() * sparkleChars.length)];
        el.style.cssText = `
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            font-size: ${Math.random() * 16 + 10}px;
            animation-duration: ${Math.random() * 2 + 1.5}s;
        `;
        if (greetingSparkles) greetingSparkles.appendChild(el);
    }

    // Heart burst
    const hearts = ['❤️', '💕', '💗', '💖', '✨'];
    hearts.forEach((h, i) => {
        const el = document.createElement('span');
        el.classList.add('burst-heart');
        el.textContent = h;
        el.style.animationDelay = `${0.3 + i * 0.1}s`;
        if (greetingBurst) greetingBurst.appendChild(el);
    });

    // Reveal story container after short greeting
    setTimeout(() => {
        if (greetingOverlay) {
            greetingOverlay.classList.add('fade-out');
            setTimeout(() => {
                greetingOverlay.style.display = 'none';
                greetingOverlay.classList.remove('visible', 'fade-out');
            }, 500);
        }

        const storyContainer = document.getElementById('storyContainer');
        if (storyContainer) {
            storyContainer.style.display = 'block';
            storyContainer.classList.add('revealed');
        }

        window.scrollTo({ top: 0, behavior: 'instant' });
        initStory();
    }, 2200);
}

function showNotFound() {
    const welcomeOverlay = document.getElementById('welcomeOverlay');
    const notfoundOverlay = document.getElementById('notfoundOverlay');

    if (welcomeOverlay) {
        welcomeOverlay.classList.add('hidden', 'removed');
        welcomeOverlay.style.display = 'none';
    }

    if (notfoundOverlay) {
        notfoundOverlay.style.display = 'flex';
        notfoundOverlay.classList.add('visible');
        createNotFoundParticles();
    }
}

function initNotFoundScreen() {
    const btn = document.getElementById('notfoundBtn');
    if (btn) {
        btn.onclick = () => {
            const notfoundOverlay = document.getElementById('notfoundOverlay');
            const welcomeOverlay = document.getElementById('welcomeOverlay');

            if (notfoundOverlay) {
                notfoundOverlay.classList.remove('visible');
                notfoundOverlay.style.display = 'none';
            }

            if (welcomeOverlay) {
                welcomeOverlay.classList.remove('hidden', 'removed');
                welcomeOverlay.style.display = 'flex';
                const input = document.getElementById('nameInput');
                if (input) {
                    input.value = '';
                    input.focus();
                }
            }
        };
    }

    createGlitterParticles('notfoundGlitter', 35);
}

// ===== GLITTER PARTICLE GENERATOR =====
function createGlitterParticles(containerId, count) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const chars = ['✦', '✧', '✵', '✶', '✷', '⋆', '·'];
    const colors = [
        'rgba(255,215,0,0.5)',
        'rgba(255,200,220,0.4)',
        'rgba(200,180,255,0.4)',
        'rgba(255,107,138,0.3)',
        'rgba(255,255,255,0.3)',
    ];

    for (let i = 0; i < count; i++) {
        const el = document.createElement('span');
        el.classList.add('glitter-sparkle');
        el.textContent = chars[Math.floor(Math.random() * chars.length)];
        el.style.cssText = `
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            font-size: ${Math.random() * 10 + 6}px;
            color: ${colors[Math.floor(Math.random() * colors.length)]};
            animation-duration: ${Math.random() * 4 + 3}s;
            animation-delay: ${Math.random() * 5}s;
        `;
        container.appendChild(el);
    }
}

function createNotFoundParticles() {
    const container = document.getElementById('notfoundParticles');
    if (!container || container.children.length > 0) return;

    const colors = [
        'rgba(255,107,138,0.3)',
        'rgba(168,85,247,0.25)',
        'rgba(255,215,0,0.2)',
    ];

    for (let i = 0; i < 20; i++) {
        const el = document.createElement('div');
        el.classList.add('nf-particle');
        const size = Math.random() * 4 + 2;
        el.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${Math.random() * 100}%;
            bottom: -10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            box-shadow: 0 0 ${size * 2}px currentColor;
            animation-duration: ${Math.random() * 8 + 6}s;
            animation-delay: ${Math.random() * 6}s;
        `;
        container.appendChild(el);
    }
}

// ===== PHOTO GALLERY =====
function initGallery() {
    const grid = document.getElementById('galleryGrid');
    const emptyState = document.getElementById('galleryEmpty');

    if (!currentUserData || !currentUserData.photos || currentUserData.photos.length === 0) {
        // Show empty state
        return;
    }

    // Hide empty state
    if (emptyState) emptyState.style.display = 'none';

    // Create gallery cards
    currentUserData.photos.forEach((photo, index) => {
        const card = document.createElement('div');
        card.classList.add('gallery-card');
        card.setAttribute('data-index', index);

        const img = document.createElement('img');
        img.src = photo.src;
        img.alt = photo.caption || `Memory ${index + 1}`;
        img.loading = 'lazy';
        if (photo.objectPosition) {
            img.style.objectPosition = photo.objectPosition;
        }

        // Handle image load error gracefully
        img.onerror = () => {
            card.style.background = 'linear-gradient(135deg, rgba(255,107,138,0.1), rgba(168,85,247,0.1))';
            card.innerHTML = `
                <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:8px;padding:20px;">
                    <span style="font-size:2rem;opacity:0.4;">📷</span>
                    <span style="font-size:0.75rem;color:var(--text-dim);text-align:center;">${photo.caption || 'Photo'}</span>
                </div>
            `;
        };

        const overlay = document.createElement('div');
        overlay.classList.add('gallery-card-overlay');

        const caption = document.createElement('p');
        caption.classList.add('gallery-card-caption');
        caption.textContent = photo.caption || '';

        overlay.appendChild(caption);
        card.appendChild(img);
        card.appendChild(overlay);

        card.addEventListener('click', () => openLightbox(index));

        grid.appendChild(card);
    });
}

// ===== LIGHTBOX =====
let lightboxIndex = 0;
let lightboxPhotos = [];

function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const closeBtn = document.getElementById('lightboxClose');
    const prevBtn = document.getElementById('lightboxPrev');
    const nextBtn = document.getElementById('lightboxNext');

    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', () => navigateLightbox(-1));
    nextBtn.addEventListener('click', () => navigateLightbox(1));

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('visible')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigateLightbox(-1);
        if (e.key === 'ArrowRight') navigateLightbox(1);
    });
}

function openLightbox(index) {
    if (!currentUserData || !currentUserData.photos) return;

    lightboxPhotos = currentUserData.photos;
    lightboxIndex = index;

    const lightbox = document.getElementById('lightbox');
    lightbox.classList.add('visible');
    document.body.style.overflow = 'hidden';

    updateLightboxContent();
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('visible');
    document.body.style.overflow = '';
}

function navigateLightbox(dir) {
    lightboxIndex = (lightboxIndex + dir + lightboxPhotos.length) % lightboxPhotos.length;
    updateLightboxContent();
}

function updateLightboxContent() {
    const photo = lightboxPhotos[lightboxIndex];
    const img = document.getElementById('lightboxImg');
    const caption = document.getElementById('lightboxCaption');

    img.src = photo.src;
    img.alt = photo.caption || '';
    caption.textContent = photo.caption || '';
}

// ===== FLOATING PARTICLES =====
function initParticles() {
    const container = document.getElementById('particles');
    const colors = [
        'rgba(255,107,138,0.4)',
        'rgba(168,85,247,0.3)',
        'rgba(255,215,0,0.3)',
        'rgba(34,211,238,0.2)',
        'rgba(255,255,255,0.15)'
    ];

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        const size = Math.random() * 4 + 1;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 15;

        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            left: ${left}%;
            animation-duration: ${duration}s;
            animation-delay: -${delay}s;
            box-shadow: 0 0 ${size * 3}px ${color};
        `;

        container.appendChild(particle);
    }
}

// ===== NAVIGATION DOTS =====
function initNavDots() {
    const scenes = document.querySelectorAll('.scene');
    const navDots = document.getElementById('navDots');

    scenes.forEach((scene, index) => {
        const dot = document.createElement('button');
        dot.classList.add('nav-dot');
        dot.setAttribute('data-title', scene.dataset.title || `Scene ${index}`);
        dot.setAttribute('aria-label', `Go to ${scene.dataset.title || `Scene ${index}`}`);
        
        dot.addEventListener('click', () => {
            scene.scrollIntoView({ behavior: 'smooth' });
        });

        navDots.appendChild(dot);
    });
}

// ===== SCROLL OBSERVER =====
function initScrollObserver() {
    const scenes = document.querySelectorAll('.scene');
    const navDots = document.querySelectorAll('.nav-dot');

    const observerOptions = {
        root: null,
        threshold: 0.3,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible class for animations
                entry.target.classList.add('visible');

                // Update nav dots
                const index = Array.from(scenes).indexOf(entry.target);
                navDots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === index);
                });

                // Trigger specific scene animations
                triggerSceneAnimations(entry.target);
            }
        });
    }, observerOptions);

    scenes.forEach(scene => observer.observe(scene));
}

// ===== SCENE-SPECIFIC ANIMATIONS =====
function triggerSceneAnimations(scene) {
    const id = scene.id;

    switch (id) {
        case 'scene-2': // Queue scene - animate dialogue bubbles sequentially
            animateDialogueSequence(scene);
            break;
        case 'scene-5': // Madman scene - intensify effects
            animateMadmanScene(scene);
            break;
        case 'scene-6': // Return scene - voice echoes
            animateVoiceEchoes(scene);
            break;
        case 'scene-8': // Insta scene - courage meter + search
            animateInstaScene(scene);
            break;
        case 'scene-10': // Found scene - animate dialogues
            animateDialogueSequence(scene);
            break;
        case 'scene-12': // Follow scene - follow button interaction
            animateFollowScene(scene);
            break;
    }
}

function animateDialogueSequence(scene) {
    const dialogues = scene.querySelectorAll('.dialogue');
    dialogues.forEach((d, i) => {
        d.style.opacity = '0';
        d.style.transform = d.classList.contains('her') ? 'translateX(30px)' : 'translateX(-30px)';
        d.style.transition = `all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${0.6 + i * 0.4}s`;

        setTimeout(() => {
            d.style.opacity = '1';
            d.style.transform = 'translateX(0)';
        }, 100);
    });
}

function animateMadmanScene(scene) {
    const thoughts = scene.querySelectorAll('.thought');
    thoughts.forEach((t, i) => {
        t.style.opacity = '0';
        setTimeout(() => {
            t.style.transition = 'opacity 0.5s ease';
            t.style.opacity = '';
        }, 800 + i * 300);
    });
}

function animateVoiceEchoes(scene) {
    // Echoes are handled by CSS, but we can add extra effects
    const heartCenter = scene.querySelector('.heart-center');
    if (heartCenter) {
        heartCenter.style.opacity = '0';
        setTimeout(() => {
            heartCenter.style.transition = 'opacity 1s ease';
            heartCenter.style.opacity = '1';
        }, 2000);
    }
}

function animateInstaScene(scene) {
    // Animate search typing effect
    const searchEl = document.getElementById('searchTyping');
    if (searchEl && !searchEl.dataset.animated) {
        searchEl.dataset.animated = 'true';
        const texts = ['Searching...', 'Found her! ✨'];
        let index = 0;

        const typeInterval = setInterval(() => {
            index = (index + 1) % texts.length;
            searchEl.textContent = texts[index];
        }, 2500);

        // Clear interval when scene leaves view
        const observer = new IntersectionObserver((entries) => {
            if (!entries[0].isIntersecting) {
                clearInterval(typeInterval);
                searchEl.dataset.animated = '';
                observer.disconnect();
            }
        });
        observer.observe(scene);
    }
}

function animateFollowScene(scene) {
    const followBtn = document.getElementById('followBtn');
    const followDone = document.getElementById('followDone');

    if (followBtn && !followBtn.dataset.autoTriggered) {
        followBtn.dataset.autoTriggered = 'true';

        setTimeout(() => {
            followBtn.classList.add('clicked');
            followDone.classList.add('show');

            // Animate chat messages after follow
            const chatMsgs = scene.querySelectorAll('.chat-msg');
            chatMsgs.forEach((msg, i) => {
                msg.style.opacity = '0';
                msg.style.transform = 'translateY(10px)';
                msg.style.transition = `all 0.5s ease ${0.5 + i * 0.8}s`;
                setTimeout(() => {
                    msg.style.opacity = '1';
                    msg.style.transform = 'translateY(0)';
                }, 100);
            });
        }, 1500);
    }
}

// ===== PROGRESS BAR =====
function initProgressBar() {
    const progressBar = document.getElementById('progressBar');

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = `${scrollPercent}%`;
    }, { passive: true });
}

// ===== FOLLOW BUTTON (Manual Click) =====
function initFollowButton() {
    const followBtn = document.getElementById('followBtn');
    const followDone = document.getElementById('followDone');

    if (followBtn) {
        followBtn.addEventListener('click', () => {
            followBtn.classList.add('clicked');
            followDone.classList.add('show');

            // Create heart burst
            createHeartBurst(followBtn);
        });
    }
}

function createHeartBurst(element) {
    const hearts = ['❤️', '💕', '💗', '💖', '✨'];
    const rect = element.getBoundingClientRect();

    for (let i = 0; i < 8; i++) {
        const heart = document.createElement('span');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.cssText = `
            position: fixed;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top}px;
            font-size: ${Math.random() * 16 + 12}px;
            pointer-events: none;
            z-index: 1000;
            animation: heartBurst 1s ease-out forwards;
            --x: ${(Math.random() - 0.5) * 100}px;
            --y: ${-Math.random() * 80 - 20}px;
        `;

        document.body.appendChild(heart);

        // Add dynamic keyframes
        heart.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(var(--x), var(--y)) scale(0)`, opacity: 0 }
        ], {
            duration: 1000,
            easing: 'ease-out',
            fill: 'forwards'
        });

        setTimeout(() => heart.remove(), 1100);
    }
}

// ===== COURAGE METER =====
function initCourageMeter() {
    const meterText = document.querySelector('.meter-text');
    const scene = document.getElementById('scene-8');

    if (!scene || !meterText) return;

    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            const stages = [
                { time: 0, text: 'Building up...' },
                { time: 600, text: '💪 Getting there...' },
                { time: 1200, text: '😤 Almost...' },
                { time: 1800, text: '🔥 NOW OR NEVER!' },
                { time: 2200, text: '✅ Asked! 🎉' }
            ];

            stages.forEach(({ time, text }) => {
                setTimeout(() => {
                    meterText.textContent = text;
                }, time);
            });
        }
    }, { threshold: 0.3 });

    observer.observe(scene);
}

// ===== SMOOTH PARALLAX ON SCROLL =====
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            updateParallax();
            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });

function updateParallax() {
    const scrollY = window.scrollY;
    const scenes = document.querySelectorAll('.scene-bg');

    scenes.forEach(bg => {
        const parent = bg.parentElement;
        const rect = parent.getBoundingClientRect();
        const speed = 0.15;

        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const offset = (rect.top * speed);
            bg.style.transform = `translateY(${offset}px)`;
        }
    });
}

// ===== TRAIN PAUSE ON HOVER =====
const train = document.getElementById('movingTrain');
if (train) {
    train.addEventListener('mouseenter', () => {
        train.style.animationPlayState = 'paused';
    });
    train.addEventListener('mouseleave', () => {
        train.style.animationPlayState = 'running';
    });
}

// ===== DYNAMIC USER STORY RENDERER & DATA ISOLATION =====
function renderUserStory(userData) {
    const lemuriaStoryEl = document.getElementById('lemuriaStory');
    const emptyStoryEl = document.getElementById('emptyStoryView');
    const usernameEl = document.getElementById('utUsername');
    const navDots = document.getElementById('navDots');
    const progressBar = document.getElementById('progressBar');

    if (usernameEl) {
        usernameEl.textContent = userData ? (userData.displayName || userData.id) : 'Guest';
    }

    const userId = (userData && userData.id) ? userData.id.toLowerCase() : '';
    const isLemuria = (userId === 'lemuria');
    const hasStory = isLemuria || (userData && ((userData.chapters && userData.chapters.length > 0) || (userData.photos && userData.photos.length > 0)));

    if (!hasStory) {
        // Isolated Empty Story View ("No story found. Start creating your own story.")
        if (lemuriaStoryEl) lemuriaStoryEl.style.display = 'none';
        if (emptyStoryEl) emptyStoryEl.style.display = 'flex';
        if (navDots) navDots.style.display = 'none';
        if (progressBar) progressBar.style.display = 'none';

        const esCreateBtn = document.getElementById('esCreateBtn');
        const esLogoutBtn = document.getElementById('esLogoutBtn');
        if (esCreateBtn) esCreateBtn.onclick = openUserStoryModal;
        if (esLogoutBtn) esLogoutBtn.onclick = userLogout;
    } else {
        // Show Lemuria's Railway Love Story (or custom user story)
        if (emptyStoryEl) emptyStoryEl.style.display = 'none';
        if (lemuriaStoryEl) lemuriaStoryEl.style.display = 'block';
        if (navDots) navDots.style.display = 'flex';
        if (progressBar) progressBar.style.display = 'block';

        // Update custom titles if present
        const heroTitle = document.getElementById('heroTitleText');
        const heroSub = document.getElementById('heroSubtitleText');
        const heroTag = document.getElementById('heroTaglineText');

        if (heroTitle && userData.title) {
            heroTitle.innerHTML = `<span class="line1">${escapeHtml(userData.title)}</span>`;
        }
        if (heroSub && userData.subtitle) {
            heroSub.textContent = userData.subtitle;
        }
        if (heroTag && userData.tagline) {
            heroTag.textContent = userData.tagline;
        }
    }
}

// ===== USER LOGOUT & USER MODAL LOGIC =====
function userLogout() {
    currentUserData = null;
    const storyContainer  = document.getElementById('storyContainer');
    const welcomeOverlay  = document.getElementById('welcomeOverlay');
    const notfoundOverlay = document.getElementById('notfoundOverlay');
    const adminOverlay    = document.getElementById('adminOverlay');
    const greetingOverlay = document.getElementById('greetingOverlay');

    if (storyContainer) {
        storyContainer.classList.remove('revealed');
        storyContainer.style.display = 'none';
    }
    if (notfoundOverlay) {
        notfoundOverlay.classList.remove('visible');
        notfoundOverlay.style.display = 'none';
    }
    if (adminOverlay) {
        adminOverlay.classList.remove('visible');
        adminOverlay.style.display = 'none';
    }
    if (greetingOverlay) {
        greetingOverlay.classList.remove('visible', 'fade-out');
        greetingOverlay.style.display = 'none';
    }
    if (welcomeOverlay) {
        welcomeOverlay.classList.remove('hidden', 'removed');
        welcomeOverlay.style.display = 'flex';
    }

    // Scroll back to top
    window.scrollTo({ top: 0, behavior: 'instant' });

    const input = document.getElementById('nameInput');
    if (input) {
        input.value = '';
        input.focus();
    }
}

function initUserStoryModal() {
    const modal = document.getElementById('userStoryModal');
    const closeBtn = document.getElementById('usmCloseBtn');
    const cancelBtn = document.getElementById('usmCancelBtn');
    const form = document.getElementById('userStoryForm');
    const addUrlBtn = document.getElementById('usmAddPhotoUrlBtn');
    const uploadInput = document.getElementById('usmPhotoUpload');

    if (closeBtn) closeBtn.onclick = closeUserStoryModal;
    if (cancelBtn) cancelBtn.onclick = closeUserStoryModal;

    if (addUrlBtn) {
        addUrlBtn.onclick = () => addUsmPhotoEntry('', '');
    }

    if (uploadInput) {
        uploadInput.onchange = (e) => {
            const files = e.target.files;
            if (!files || files.length === 0) return;
            Array.from(files).forEach(file => {
                if (!file.type.startsWith('image/')) return;
                const reader = new FileReader();
                reader.onload = (ev) => {
                    addUsmPhotoEntry(ev.target.result, file.name.replace(/\.[^/.]+$/, ''));
                };
                reader.readAsDataURL(file);
            });
            e.target.value = '';
        };
    }

    if (form) {
        form.onsubmit = (e) => {
            e.preventDefault();
            if (!currentUserData) return;

            const title = document.getElementById('usmTitle').value.trim();
            const tagline = document.getElementById('usmTagline').value.trim();
            const greeting = document.getElementById('usmGreeting').value.trim();

            const photoEntries = document.querySelectorAll('#usmPhotosList .photo-entry');
            const photos = [];
            photoEntries.forEach(entry => {
                const src = entry.querySelector('.photo-src')?.value.trim();
                const caption = entry.querySelector('.photo-caption')?.value.trim();
                if (src) photos.push({ src, caption });
            });

            // If user has no chapters, initialize default chapter
            let chapters = currentUserData.chapters || [];
            if (chapters.length === 0) {
                chapters = [
                    {
                        number: "Chapter I",
                        title: title || `${currentUserData.displayName}'s Story`,
                        paragraphs: [
                            tagline || "Welcome to my story written in the stars."
                        ]
                    }
                ];
            }

            currentUserData.title = title || `${currentUserData.displayName}'s Story`;
            currentUserData.tagline = tagline || 'A story written in the stars';
            currentUserData.greeting = greeting || `Welcome, ${currentUserData.displayName} ✨`;
            currentUserData.photos = photos;
            currentUserData.chapters = chapters;

            // Save under user's unique ID
            if (typeof updateStory === 'function') {
                updateStory(currentUserData.id, currentUserData);
            }

            closeUserStoryModal();

            // Re-render user story and update views
            renderUserStory(currentUserData);
            initNavDots();
            initScrollObserver();
            initGallery();
            initLightbox();
        };
    }
}

function openUserStoryModal() {
    if (!currentUserData) return;
    const modal = document.getElementById('userStoryModal');
    if (!modal) return;

    document.getElementById('usmTitle').value = currentUserData.title || '';
    document.getElementById('usmTagline').value = currentUserData.tagline || '';
    document.getElementById('usmGreeting').value = currentUserData.greeting || '';

    const list = document.getElementById('usmPhotosList');
    if (list) {
        list.innerHTML = '';
        if (currentUserData.photos && currentUserData.photos.length > 0) {
            currentUserData.photos.forEach(p => addUsmPhotoEntry(p.src, p.caption));
        }
    }

    modal.classList.add('visible');
}

function closeUserStoryModal() {
    const modal = document.getElementById('userStoryModal');
    if (modal) modal.classList.remove('visible');
}

function addUsmPhotoEntry(src = '', caption = '') {
    const list = document.getElementById('usmPhotosList');
    if (!list) return;

    const entry = document.createElement('div');
    entry.classList.add('photo-entry');

    const placeholderImg = src || 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50"><rect width="50" height="50" fill="%23222"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23666" font-size="20">📷</text></svg>';

    entry.innerHTML = `
        <img class="photo-thumb-preview" src="${escapeHtml(placeholderImg)}" alt="Preview">
        <div class="photo-entry-inputs">
            <input type="text" class="photo-src" value="${escapeHtml(src)}" placeholder="Image URL, base64 or path">
            <input type="text" class="photo-caption" value="${escapeHtml(caption)}" placeholder="Photo caption">
        </div>
        <button type="button" class="photo-remove-btn">✕</button>
    `;

    const srcInput = entry.querySelector('.photo-src');
    const thumbImg = entry.querySelector('.photo-thumb-preview');
    srcInput.addEventListener('input', () => {
        if (srcInput.value.trim()) thumbImg.src = srcInput.value.trim();
    });

    entry.querySelector('.photo-remove-btn').onclick = () => entry.remove();
    list.appendChild(entry);
}

// ===== EASTER EGG: Konami-like code (type "love") =====
let secretBuffer = '';
document.addEventListener('keydown', (e) => {
    secretBuffer += e.key.toLowerCase();
    if (secretBuffer.length > 10) secretBuffer = secretBuffer.slice(-10);

    if (secretBuffer.includes('love')) {
        secretBuffer = '';
        triggerLoveMode();
    }
});

function triggerLoveMode() {
    // Shower the screen with hearts
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = ['❤️', '💕', '💗', '💖', '🥰', '✨'][Math.floor(Math.random() * 6)];
            heart.style.cssText = `
                position: fixed;
                left: ${Math.random() * 100}%;
                top: -30px;
                font-size: ${Math.random() * 24 + 16}px;
                pointer-events: none;
                z-index: 10000;
                animation: heartRain 3s ease-in forwards;
            `;
            document.body.appendChild(heart);

            heart.animate([
                { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
                { transform: `translateY(${window.innerHeight + 50}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
            ], {
                duration: 3000 + Math.random() * 2000,
                easing: 'ease-in',
                fill: 'forwards'
            });

            setTimeout(() => heart.remove(), 5500);
        }, i * 100);
    }
}

// ===================================================
//              ADMIN PANEL MODULE
// ===================================================

let deleteTargetKey = null;

function showAdminPanel() {
    const welcomeOverlay = document.getElementById('welcomeOverlay');
    const adminOverlay = document.getElementById('adminOverlay');
    const greetingOverlay = document.getElementById('greetingOverlay');

    if (welcomeOverlay) {
        welcomeOverlay.classList.add('hidden', 'removed');
        welcomeOverlay.style.display = 'none';
    }
    if (greetingOverlay) {
        greetingOverlay.style.display = 'none';
    }

    if (adminOverlay) {
        adminOverlay.style.display = 'flex';
        adminOverlay.classList.add('visible');
        createGlitterParticles('adminGlitter', 30);
        renderStoriesList();
        initAdminEvents();
    }
}

function initAdminEvents() {
    // Logout
    const logoutBtn = document.getElementById('adminLogout');
    if (logoutBtn) logoutBtn.onclick = adminLogout;

    // Create new
    const createBtn = document.getElementById('adminCreateBtn');
    if (createBtn) createBtn.onclick = () => showForm('create');

    // Back to list
    const backBtn = document.getElementById('adminBackBtn');
    if (backBtn) backBtn.onclick = showList;

    // Cancel form
    const cancelBtn = document.getElementById('formCancelBtn');
    if (cancelBtn) cancelBtn.onclick = showList;

    // Form submit
    const form = document.getElementById('adminForm');
    if (form) form.onsubmit = handleFormSubmit;

    // Add photo button
    const addPhotoBtn = document.getElementById('addPhotoBtn');
    if (addPhotoBtn) addPhotoBtn.onclick = addPhotoEntry;

    // File upload handler for computer images
    const fileInput = document.getElementById('uploadPhotoInput');
    if (fileInput) fileInput.onchange = handleFileUpload;

    // Delete modal buttons
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    if (confirmDeleteBtn) confirmDeleteBtn.onclick = confirmDelete;

    const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
    if (cancelDeleteBtn) cancelDeleteBtn.onclick = cancelDeleteModal;
}

function adminLogout() {
    const adminOverlay = document.getElementById('adminOverlay');
    const welcomeOverlay = document.getElementById('welcomeOverlay');

    if (adminOverlay) {
        adminOverlay.classList.remove('visible');
        adminOverlay.style.display = 'none';
    }

    if (welcomeOverlay) {
        welcomeOverlay.classList.remove('hidden', 'removed');
        welcomeOverlay.style.display = 'flex';
        const input = document.getElementById('nameInput');
        if (input) {
            input.value = '';
            input.focus();
        }
    }
}

// ===== STORIES LIST =====
function renderStoriesList() {
    const list = document.getElementById('adminStoriesList');
    const db = getAllStories();
    const keys = Object.keys(db);

    list.innerHTML = '';

    if (keys.length === 0) {
        list.innerHTML = `
            <div class="admin-empty">
                <span class="admin-empty-icon">📭</span>
                <p>No stories yet. Create your first love story!</p>
            </div>
        `;
        return;
    }

    keys.forEach(key => {
        const story = db[key];
        const photoCount = (story.photos && story.photos.length) || 0;

        const card = document.createElement('div');
        card.classList.add('admin-story-card');
        card.innerHTML = `
            <div class="story-card-info">
                <div class="story-card-avatar">
                    ${getInitial(story.displayName || key)}
                </div>
                <div class="story-card-details">
                    <div class="story-card-name">${escapeHtml(story.displayName || key)}</div>
                    <div class="story-card-key">key: "${escapeHtml(key)}"</div>
                </div>
            </div>
            <div class="story-card-meta">
                📸 ${photoCount} photo${photoCount !== 1 ? 's' : ''}
            </div>
            <div class="story-card-actions">
                <button class="card-action-btn edit-btn" data-key="${escapeHtml(key)}" title="Edit">✏️</button>
                <button class="card-action-btn delete-btn" data-key="${escapeHtml(key)}" title="Delete">🗑️</button>
            </div>
        `;

        // Edit handler
        card.querySelector('.edit-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            showForm('edit', key);
        });

        // Delete handler
        card.querySelector('.delete-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            promptDelete(key, story.displayName || key);
        });

        list.appendChild(card);
    });
}

function getInitial(name) {
    return name.charAt(0).toUpperCase();
}

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// ===== SHOW FORM (Create / Edit) =====
function showForm(mode, key = null) {
    const listPanel = document.getElementById('adminListPanel');
    const formPanel = document.getElementById('adminFormPanel');
    const formTitle = document.getElementById('adminFormTitle');
    const formName = document.getElementById('formName');
    const formDisplayName = document.getElementById('formDisplayName');
    const formGreeting = document.getElementById('formGreeting');
    const formSubtitle = document.getElementById('formSubtitle');
    const formEditKey = document.getElementById('formEditKey');
    const photosList = document.getElementById('photosListEditor');

    listPanel.style.display = 'none';
    formPanel.style.display = 'block';

    // Clear photo entries
    photosList.innerHTML = '';

    if (mode === 'edit' && key) {
        const story = getStory(key);
        if (!story) return;

        formTitle.textContent = '✏️ Edit Story';
        formEditKey.value = key;
        formName.value = key;
        formName.disabled = true;
        formDisplayName.value = story.displayName || '';
        formGreeting.value = story.greeting || '';
        formSubtitle.value = story.subtitle || '';

        // Populate photos
        if (story.photos && story.photos.length > 0) {
            story.photos.forEach(photo => {
                addPhotoEntry(null, photo.src, photo.caption);
            });
        }
    } else {
        formTitle.textContent = '✨ Create New Story';
        formEditKey.value = '';
        formName.value = '';
        formName.disabled = false;
        formDisplayName.value = '';
        formGreeting.value = '';
        formSubtitle.value = '';
    }
}

function showList() {
    const listPanel = document.getElementById('adminListPanel');
    const formPanel = document.getElementById('adminFormPanel');

    formPanel.style.display = 'none';
    listPanel.style.display = 'block';

    renderStoriesList();
}

// ===== PHOTO ENTRIES =====
function addPhotoEntry(e, src = '', caption = '') {
    const photosList = document.getElementById('photosListEditor');

    const entry = document.createElement('div');
    entry.classList.add('photo-entry');
    entry.innerHTML = `
        <div class="photo-entry-inputs">
            <input type="text" class="photo-src" value="${escapeHtml(src)}" placeholder="Photo path (e.g. photos/1.jpg)">
            <input type="text" class="photo-caption" value="${escapeHtml(caption)}" placeholder="Caption (e.g. The first meeting)">
        </div>
        <button type="button" class="photo-remove-btn" title="Remove">✕</button>
    `;

    entry.querySelector('.photo-remove-btn').addEventListener('click', () => {
        entry.remove();
    });

    photosList.appendChild(entry);
}

// ===== FORM SUBMIT =====
function handleFormSubmit(e) {
    e.preventDefault();

    const editKey = document.getElementById('formEditKey').value;
    const nameVal = document.getElementById('formName').value.trim().toLowerCase();
    const displayName = document.getElementById('formDisplayName').value.trim();
    const greeting = document.getElementById('formGreeting').value.trim();
    const subtitle = document.getElementById('formSubtitle').value.trim();

    if (!nameVal || !displayName) {
        showToast('❌', 'Name and Display Name are required!');
        return;
    }

    // Don't allow creating a story with admin name
    if (!editKey && isAdmin(nameVal)) {
        showToast('❌', 'Cannot create a story with the admin name!');
        return;
    }

    // Collect photos
    const photoEntries = document.querySelectorAll('#photosListEditor .photo-entry');
    const photos = [];
    photoEntries.forEach(entry => {
        const src = entry.querySelector('.photo-src').value.trim();
        const caption = entry.querySelector('.photo-caption').value.trim();
        if (src) {
            photos.push({ src, caption });
        }
    });

    const storyData = {
        displayName,
        greeting: greeting || `Welcome, ${displayName} ✨`,
        subtitle: subtitle || 'This story was written just for you...',
        photos
    };

    if (editKey) {
        // Update existing
        updateStory(editKey, storyData);
        showToast('✅', `${displayName}'s story updated!`);
    } else {
        // Check if key already exists
        if (getStory(nameVal)) {
            showToast('❌', `A story for "${nameVal}" already exists!`);
            return;
        }
        createStory(nameVal, storyData);
        showToast('✅', `${displayName}'s story created!`);
    }

    showList();
}

// ===== DELETE =====
function promptDelete(key, displayName) {
    deleteTargetKey = key;
    const nameEl = document.getElementById('deleteStoryName');
    if (nameEl) nameEl.textContent = displayName;

    const modal = document.getElementById('deleteModal');
    if (modal) {
        modal.style.display = 'flex';
        modal.classList.add('visible');
    }

    const confirmBtn = document.getElementById('confirmDeleteBtn');
    if (confirmBtn) confirmBtn.onclick = confirmDelete;

    const cancelBtn = document.getElementById('cancelDeleteBtn');
    if (cancelBtn) cancelBtn.onclick = cancelDeleteModal;
}

function cancelDeleteModal() {
    deleteTargetKey = null;
    const modal = document.getElementById('deleteModal');
    if (modal) {
        modal.classList.remove('visible');
        modal.style.display = 'none';
    }
}

function confirmDelete() {
    if (deleteTargetKey) {
        const name = deleteTargetKey;
        deleteStory(name);
        deleteTargetKey = null;

        const modal = document.getElementById('deleteModal');
        if (modal) {
            modal.classList.remove('visible');
            modal.style.display = 'none';
        }

        showToast('🗑️', `Story "${name}" deleted successfully.`);
        renderStoriesList();
    }
}

// ===== TOAST =====
function showToast(icon, text) {
    const toast = document.getElementById('adminToast');
    const toastIcon = document.getElementById('toastIcon');
    const toastText = document.getElementById('toastText');

    toastIcon.textContent = icon;
    toastText.textContent = text;

    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}

// ===================================================
//          FLOATING MUSIC PLAYER MODULE
// ===================================================

function initMusicPlayer() {
    const player    = document.getElementById('musicPlayer');
    const discWrap  = document.getElementById('mpDiscWrap');
    const audio     = document.getElementById('bgAudio');

    if (!player || !discWrap || !audio) return;

    // Set audio source from Supabase Storage
    const audioSource = document.getElementById('bgAudioSource');
    if (audioSource && typeof MEDIA !== 'undefined') {
        audioSource.src = MEDIA.music('song.mp3');
        audio.load();
    }

    let isPlaying = false;
    let panelTimer = null;

    // Click the disc to toggle play / pause
    discWrap.addEventListener('click', () => {
        if (isPlaying) {
            pauseMusic();
        } else {
            playMusic();
        }
    });

    function playMusic() {
        const promise = audio.play();
        if (promise !== undefined) {
            promise.then(() => {
                isPlaying = true;
                player.classList.add('playing');
                expandPanel();
            }).catch(() => {
                // Autoplay blocked — user needs to interact first
                console.log('Music: Autoplay prevented by browser. User interaction needed.');
            });
        }
    }

    function pauseMusic() {
        audio.pause();
        isPlaying = false;
        player.classList.remove('playing');
        expandPanel();
    }

    function expandPanel() {
        player.classList.add('expanded');
        clearTimeout(panelTimer);
        panelTimer = setTimeout(() => {
            player.classList.remove('expanded');
        }, 3500);
    }

    // Show panel briefly on hover
    discWrap.addEventListener('mouseenter', () => {
        expandPanel();
    });

    // Keep audio state across visibility changes
    document.addEventListener('visibilitychange', () => {
        if (document.hidden && isPlaying) {
            // Let it keep playing in background
        }
    });
}
