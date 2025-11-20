// ==================== BOOK COVER LOGIC ====================
const bookCoverContainer = document.getElementById('bookCoverContainer');
const bookCover = document.getElementById('bookCover');
const openBookBtn = document.getElementById('openBookBtn');
const backgroundMusic = document.getElementById('backgroundMusic');
const musicBtn = document.getElementById('musicBtn');

// Khai báo biến trạng thái nhạc
let isPlaying = false;

// Hàm thử phát nhạc tự động
function tryAutoPlayMusic() {
    if (backgroundMusic && backgroundMusic.readyState >= 2) {
        backgroundMusic.play()
            .then(() => {
                musicBtn.textContent = '🎵';
                isPlaying = true;
                console.log('Nhạc nền đã tự động phát');
            })
            .catch(e => {
                console.log('Autoplay bị chặn, sẽ phát khi người dùng tương tác:', e);
                musicBtn.textContent = '🔇';
                isPlaying = false;
            });
    } else {
        // Nếu audio chưa sẵn sàng, chờ một chút rồi thử lại
        setTimeout(tryAutoPlayMusic, 100);
    }
}

// Thiết lập volume nhạc nền (30% để không quá to)
if (backgroundMusic) {
    backgroundMusic.volume = 0.3;
    // Thử phát khi audio đã sẵn sàng
    backgroundMusic.addEventListener('canplay', () => {
        if (!isPlaying) {
            tryAutoPlayMusic();
        }
    });
}

// Thử autoplay khi trang đã load
window.addEventListener('load', () => {
    if (backgroundMusic) {
        backgroundMusic.volume = 0.3;
        // Thử phát nhạc tự động
        tryAutoPlayMusic();
    }
});

// Cũng thử khi DOM ready (nhanh hơn)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (backgroundMusic) {
            backgroundMusic.volume = 0.3;
        }
    });
} else {
    if (backgroundMusic) {
        backgroundMusic.volume = 0.3;
    }
}

// Thử phát nhạc khi có bất kỳ tương tác nào của người dùng (một lần duy nhất)
function onUserInteraction() {
    if (backgroundMusic && !isPlaying) {
        tryAutoPlayMusic();
    }
}
// Lắng nghe các sự kiện tương tác để phát nhạc (nếu autoplay bị chặn)
document.addEventListener('click', onUserInteraction, { once: true });
document.addEventListener('touchstart', onUserInteraction, { once: true });
document.addEventListener('keydown', onUserInteraction, { once: true });

openBookBtn.addEventListener('click', () => {
    bookCover.classList.add('open');
    // Đảm bảo nhạc phát ngay khi click mở thiệp (đã có tương tác của người dùng)
    if (backgroundMusic) {
        backgroundMusic.play().then(() => {
            musicBtn.textContent = '🎵';
            isPlaying = true;
        }).catch(e => {
            console.log('Lỗi phát nhạc:', e);
            musicBtn.textContent = '🔇';
            isPlaying = false;
        });
    }

    // Ẩn book cover sau khi animation hoàn tất
    setTimeout(() => {
        bookCoverContainer.classList.add('hidden');
        // Kích hoạt particle animation
        initParticles();
        createConfetti();
        // Bắt đầu hiệu ứng hình ảnh rơi
        startFallingImagesEffect();
    }, 2000);
});

// ==================== MUSIC CONTROL ====================
musicBtn.addEventListener('click', () => {
    if (isPlaying) {
        backgroundMusic.pause();
        musicBtn.textContent = '🔇';
        isPlaying = false;
    } else {
        backgroundMusic.play().then(() => {
            musicBtn.textContent = '🎵';
            isPlaying = true;
        }).catch(e => {
            console.log('Lỗi phát nhạc:', e);
        });
    }
});

// ==================== PARTICLE ANIMATION ====================
function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.color = `hsl(${Math.random() * 60 + 300}, 70%, 70%)`;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ==================== TYPING EFFECT ====================
const letterText = `Kính gửi Thầy/Cô,

Nhân dịp Ngày Nhà Giáo Việt Nam 20/11, tụi em xin gửi đến Thầy/Cô những lời chúc tốt đẹp nhất, những lời tri ân sâu sắc nhất từ tận đáy lòng.

Thầy/Cô đã dành cho tụi em không chỉ là những bài giảng hay, mà còn là tình yêu thương, sự quan tâm, và những bài học quý giá về cuộc sống. Mỗi lời giảng, mỗi cử chỉ của Thầy/Cô đều in sâu trong tâm trí tụi em, trở thành hành trang theo tụi em suốt cuộc đời.

Những ngày tháng được học tập dưới sự dìu dắt của Thầy/Cô là những khoảnh khắc đáng quý nhất. Thầy/Cô không chỉ là người truyền đạt kiến thức, mà còn là người thắp sáng ước mơ, khơi gợi đam mê và định hướng tương lai cho tụi em.

Tụi em biết rằng, công việc giảng dạy không phải là điều dễ dàng. Nó đòi hỏi sự kiên nhẫn, tâm huyết và tình yêu thương vô bờ bến. Thầy/Cô đã dành cả cuộc đời để chăm sóc, nuôi dưỡng những thế hệ học trò, để tụi em có thể vững bước trên con đường tri thức.

Hôm nay, tụi em muốn nói lời cảm ơn chân thành nhất đến Thầy/Cô. Cảm ơn Thầy/Cô đã luôn kiên nhẫn, cảm ơn Thầy/Cô đã luôn tin tưởng, và cảm ơn Thầy/Cô đã luôn yêu thương tụi em.

Tụi em mong rằng Thầy/Cô sẽ luôn khỏe mạnh, hạnh phúc và tiếp tục truyền cảm hứng cho nhiều thế hệ học trò khác. Những công lao của Thầy/Cô sẽ mãi mãi được ghi nhớ và trân trọng.

Chúc Thầy/Cô một Ngày Nhà Giáo thật ý nghĩa, đầy ắp niềm vui và hạnh phúc!`;

let typingIndex = 0;
let typingStarted = false;
let typingFinished = false;
const typingAudio = document.getElementById('typingAudio');
if (typingAudio) {
    typingAudio.volume = 0.18; // âm lượng nhẹ nhàng
}

function typeText() {
    if (typingIndex < letterText.length) {
        const typingElement = document.getElementById('typingText');
        typingElement.textContent = letterText.substring(0, typingIndex + 1);
        typingIndex++;
        setTimeout(typeText, 30);
    } else {
        // Xóa cursor sau khi hoàn thành
        const cursor = document.querySelector('.typing-cursor');
        if (cursor) cursor.remove();
        typingFinished = true;
        // Dừng âm typing khi hoàn thành
        if (typingAudio && !typingAudio.paused) {
            typingAudio.pause();
            typingAudio.currentTime = 0;
        }
    }
}

// ==================== INTERSECTION OBSERVER ====================
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Letter Section
            if (entry.target.id === 'letterContainer') {
                entry.target.classList.add('visible');
                if (!typingStarted) {
                    typingStarted = true;
                    setTimeout(typeText, 500);
                    // Bắt đầu phát âm typing khi bắt đầu gõ
                    if (typingAudio) {
                        typingAudio.play().catch(() => {});
                    }
                } else if (!typingFinished) {
                    // Nếu đang gõ và vào lại viewport, tiếp tục phát âm
                    if (typingAudio && typingAudio.paused) {
                        typingAudio.play().catch(() => {});
                    }
                }
            }
            // Timeline Title
            if (entry.target.id === 'timelineTitle') {
                entry.target.classList.add('visible');
                // Animate timeline line
                setTimeout(() => {
                    document.getElementById('timelineLine').classList.add('animate');
                }, 300);
            }
            // Timeline Items
            if (entry.target.classList.contains('timeline-item')) {
                entry.target.classList.add('visible');
            }
            // Gallery Title
            if (entry.target.id === 'galleryTitle') {
                entry.target.classList.add('visible');
            }
            // Polaroid Items
            if (entry.target.classList.contains('polaroid')) {
                entry.target.classList.add('visible');
                const rotation = entry.target.getAttribute('data-rotation');
                entry.target.style.setProperty('--rotation', rotation + 'deg');
            }
        } else {
            // Khi rời khỏi viewport
            if (entry.target.id === 'letterContainer') {
                // Tạm dừng âm typing nếu rời khỏi vùng thư
                if (typingAudio && !typingAudio.paused) {
                    typingAudio.pause();
                }
            }
        }
    });
}, observerOptions);

// Observe elements
const letterContainer = document.getElementById('letterContainer');
const timelineTitle = document.getElementById('timelineTitle');
const timelineItems = document.querySelectorAll('.timeline-item');
const galleryTitle = document.getElementById('galleryTitle');
const polaroids = document.querySelectorAll('.polaroid');

observer.observe(letterContainer);
observer.observe(timelineTitle);
timelineItems.forEach(item => observer.observe(item));
observer.observe(galleryTitle);
polaroids.forEach(polaroid => observer.observe(polaroid));

// Staggered animation for polaroids
polaroids.forEach((polaroid, index) => {
    polaroid.style.animationDelay = `${index * 0.1}s`;
});

// ==================== GALLERY LIGHTBOX SETUP ====================
// Tạo array chứa các ảnh và caption trong gallery
// Lưu ý: Sử dụng getAttribute để lấy relative path gốc, tránh encoding issues
const galleryImages = Array.from(polaroids).map((polaroid, index) => {
    const img = polaroid.querySelector('img');
    const caption = polaroid.querySelector('.polaroid-caption');
    
    // Ưu tiên lấy từ attribute để có relative path gốc
    let src = null;
    if (img) {
        src = img.getAttribute('src');
        // Nếu không có attribute, fallback về property nhưng normalize
        if (!src) {
            src = img.src;
            // Nếu là absolute URL, extract relative path
            try {
                const url = new URL(src);
                src = url.pathname + url.search;
                // Remove leading slash nếu cần
                if (src.startsWith('/')) {
                    src = src.substring(1);
                }
            } catch (e) {
                // Nếu không parse được, giữ nguyên
            }
        }
    }
    
    return {
        src: src,
        caption: caption ? caption.textContent : '',
        element: img // Lưu element để có thể lấy lại src gốc nếu cần
    };
}).filter(item => item.src !== null);

// Hàm mở lightbox cho gallery với caption
function openGalleryLightbox(index) {
    if (index < 0 || index >= galleryImages.length) return;
    
    // Truyền toàn bộ galleryImages array (có cả caption) thay vì chỉ src
    openImageLightbox(index, galleryImages);
}

// Gắn event listener cho mỗi polaroid để mở lightbox
polaroids.forEach((polaroid, index) => {
    const rotation = polaroid.getAttribute('data-rotation');
    polaroid.style.setProperty('--rotation', rotation + 'deg');
    
    // Thêm cursor pointer và click handler
    polaroid.style.cursor = 'pointer';
    polaroid.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        // Mở lightbox với gallery images array
        openGalleryLightbox(index);
    });
});

// ==================== PARALLAX EFFECT ====================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    
    parallaxLayers.forEach((layer, index) => {
        const speed = (index + 1) * 0.3;
        layer.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ==================== FALLING IMAGES EFFECT ====================
const fallingImagesContainer = document.getElementById('fallingImagesContainer');
const imageResources = [
    'Image_Student/Author.png',
    'Image_Student/Công.jpeg',
    'Image_Student/Dũng.jpeg',
    'Image_Student/Hoa.png',
    'Image_Student/Hoài.jpeg',
    'Image_Student/Hoàn.png',
    'Image_Student/Hoàng Anh.png',
    'Image_Student/Hoàng.jpeg',
    'Image_Student/Hà.jpeg',
    'Image_Student/Hằng.png',
    'Image_Student/Khánh.png',
    'Image_Student/Kiên.png',
    'Image_Student/Linh.jpeg',
    'Image_Student/Liên.png',
    'Image_Student/Ly.jpeg',
    'Image_Student/Lân.jpeg',
    'Image_Student/Lân.png',
    'Image_Student/Minh Trung.jpeg',
    'Image_Student/Minh.png',
    'Image_Student/Nam.jpeg',
    'Image_Student/Nguyên.png',
    'Image_Student/Nguyễn Tuyền.png',
    'Image_Student/Ngọ.png',
    'Image_Student/Nhung.jpeg',
    'Image_Student/Như Quỳnh.JPEG',
    'Image_Student/Nhẫn.jpeg',
    'Image_Student/Quang Trung.png',
    'Image_Student/Quý.jpeg',
    'Image_Student/Thu Thảo.png',
    'Image_Student/Thu.png',
    'Image_Student/Thuỷ.png',
    'Image_Student/Thơm.jpeg',
    'Image_Student/Toàn.jpeg',
    'Image_Student/Trang.jpeg',
    'Image_Student/Trường.jpeg',
    'Image_Student/Vũ Tuyền.png',
    'Image_Student/Xuân.png',
    'Image_Student/Yến.jpeg',
    'Image_Student/Độ.png'
];

let fallingImagesInterval = null;
let interactionCount = 0;
const INTERACTION_THRESHOLD = 5;
const TRIGGER_PROBABILITY = 0.15; // 15% chance
let currentImageIndexSequential = 0; // Index để theo dõi hình ảnh hiện tại theo thứ tự

function createFallingImage() {
    if (!fallingImagesContainer) return;

    // Lấy hình ảnh theo thứ tự tuần tự
    const imageIndex = currentImageIndexSequential;
    const imageSrc = imageResources[imageIndex];

    // Tăng index và quay lại đầu nếu hết danh sách
    currentImageIndexSequential = (currentImageIndexSequential + 1) % imageResources.length;

    // Tạo wrapper cho hình ảnh và caption
    const wrapper = document.createElement('div');
    wrapper.className = 'falling-image-item';

    // Tạo element img
    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = 'Falling image';
    img.classList.add('falling-image', 'falling-image-spin');

    // Tạo caption từ tên file (không extension)
    const caption = document.createElement('span');
    caption.className = 'falling-image-caption';
    const imageName = imageSrc.replace(/^.*[\\/]/, '').replace(/\.[^/.]+$/, '');
    caption.textContent = imageName;

    // Ngẫu nhiên hóa kích thước (60px - 100px) - Đảm bảo hình tròn hoàn hảo
    const size = 60 + Math.random() * 40;
    img.style.width = `${size}px`;
    img.style.height = `${size}px`;
    img.style.aspectRatio = '1';

    // Ngẫu nhiên hóa vị trí xuất phát ngang (tránh mép màn hình)
    const maxLeft = window.innerWidth - (size + 40);
    const startLeft = Math.max(20, Math.random() * Math.max(maxLeft, 50));
    wrapper.style.left = `${startLeft}px`;

    // Ngẫu nhiên hóa tốc độ rơi (5-10 giây)
    const duration = 5 + Math.random() * 5;
    wrapper.style.animationDuration = `${duration}s`;
    img.style.animationDuration = `${duration}s`;

    // Ngẫu nhiên hóa độ trễ (0-1 giây) để tạo hiệu ứng phân tán
    const delay = Math.random() * 1;
    wrapper.style.animationDelay = `${delay}s`;
    img.style.animationDelay = `${delay}s`;

    // Ngẫu nhiên hóa góc xoay (1-3 vòng, có thể theo chiều kim đồng hồ hoặc ngược)
    const rotationDirection = Math.random() > 0.5 ? 1 : -1;
    const rotationAmount = (1 + Math.random() * 2) * 360 * rotationDirection;
    img.style.setProperty('--rotation-angle', `${rotationAmount}deg`);

    // Lưu đường dẫn hình ảnh gốc vào data attribute để sử dụng khi phóng to
    wrapper.setAttribute('data-image-index', String(imageIndex));
    wrapper.setAttribute('data-original-src', imageSrc);

    // Lắp ráp wrapper
    wrapper.appendChild(img);
    wrapper.appendChild(caption);

    // Thêm vào container
    fallingImagesContainer.appendChild(wrapper);

    // Thêm event listener để mở lightbox khi click
    wrapper.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        openImageLightbox(imageIndex);
    }, true); 

    // Xóa hình ảnh sau khi animation kết thúc
    wrapper.addEventListener('animationend', () => {
        if (wrapper.parentNode) {
            wrapper.remove();
        }
    });

    // Xử lý lỗi nếu hình ảnh không tải được
    img.addEventListener('error', () => {
        if (wrapper.parentNode) {
            wrapper.remove();
        }
    });
}

function triggerFallingImages() {
    // Số lượng hình ảnh rơi: 1-3
    const numImages = Math.floor(Math.random() * 3) + 1;
    
    for (let i = 0; i < numImages; i++) {
        // Thêm độ trễ nhỏ giữa các hình ảnh trong cùng một lần kích hoạt
        setTimeout(() => {
            createFallingImage();
        }, i * 200);
    }
}

function handleUserInteraction() {
    interactionCount++;
    
    // Kiểm tra sau mỗi INTERACTION_THRESHOLD tương tác
    if (interactionCount >= INTERACTION_THRESHOLD) {
        // Xác suất kích hoạt: TRIGGER_PROBABILITY (15%)
        if (Math.random() < TRIGGER_PROBABILITY) {
            triggerFallingImages();
        }
        interactionCount = 0; // Reset counter
    }
}

function startFallingImagesEffect() {
    // Tránh tạo nhiều interval
    if (fallingImagesInterval) {
        return;
    }

    // Kích hoạt dựa trên tương tác người dùng
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('scroll', handleUserInteraction, { passive: true });
    document.addEventListener('keydown', handleUserInteraction);

    // Kích hoạt định kỳ với xác suất thấp (mỗi 8-12 giây)
    fallingImagesInterval = setInterval(() => {
        if (Math.random() < TRIGGER_PROBABILITY) {
            triggerFallingImages();
        }
    }, 8000 + Math.random() * 4000); // 8-12 giây

    // Kích hoạt lần đầu sau 3 giây (với xác suất 30%) để người dùng thấy hiệu ứng sớm
    setTimeout(() => {
        if (Math.random() < 0.3) {
            triggerFallingImages();
        }
    }, 3000);
}

function stopFallingImagesEffect() {
    if (fallingImagesInterval) {
        clearInterval(fallingImagesInterval);
        fallingImagesInterval = null;
    }
    document.removeEventListener('click', handleUserInteraction);
    document.removeEventListener('scroll', handleUserInteraction);
    document.removeEventListener('keydown', handleUserInteraction);
}

// ==================== IMAGE LIGHTBOX FUNCTIONALITY ====================
const imageLightbox = document.getElementById('imageLightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const lightboxCaption = document.getElementById('lightboxCaption');

// State management
let currentImageIndex = null;
let currentImageArray = null; // Array hiện tại đang xem (falling images hoặc gallery)
let isLightboxOpening = false; // Flag để ngăn đóng ngay sau khi mở
let lightboxClickHandler = null; // Lưu handler để có thể remove sau

function getImageNameFromSrc(src) {
    return src.replace(/^.*[\\/]/, '').replace(/\.[^/.]+$/, '');
}

function openImageLightbox(index, imageArray = imageResources) {
    if (!imageLightbox || !lightboxImage) return;
    if (typeof index !== 'number' || index < 0 || index >= imageArray.length) return;

    // Set flag để ngăn đóng ngay
    isLightboxOpening = true;
    
    // Lấy image source - xử lý cả object (gallery) và string (falling images)
    let imageSrc = imageArray[index];
    let imageItem = null;
    
    // Nếu là object (từ gallery), lấy src từ object
    if (typeof imageSrc === 'object' && imageSrc.src) {
        imageItem = imageSrc;
        imageSrc = imageSrc.src;
    }
    
    // Đảm bảo imageSrc là string
    if (typeof imageSrc !== 'string') {
        console.error('Invalid image source:', imageSrc);
        isLightboxOpening = false;
        return;
    }
    
    const imageName = getImageNameFromSrc(imageSrc);
    const wasActive = imageLightbox.classList.contains('active');
    const isChangingImage = wasActive && currentImageIndex !== null && currentImageIndex !== index;

    // Nếu đang chuyển ảnh, thêm fade effect
    if (isChangingImage && lightboxImage) {
        lightboxImage.style.opacity = '0';
        lightboxImage.style.transform = 'scale(0.95)';
    }

    currentImageArray = imageArray;
    currentImageIndex = index;

    // Reset error handler trước khi set src mới
    lightboxImage.onerror = null;
    lightboxImage.onload = null;

    // Set image source - sử dụng relative path từ attribute
    lightboxImage.src = imageSrc;
    lightboxImage.alt = imageName;
    
    // Set caption nếu có từ gallery item
    if (lightboxCaption) {
        if (imageItem && imageItem.caption) {
            lightboxCaption.textContent = imageItem.caption;
        } else {
            lightboxCaption.textContent = imageName;
        }
    }
    
    // Show lightbox trước khi load ảnh
    if (!wasActive) {
        imageLightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Reset flag sau khi animation hoàn tất
    setTimeout(() => {
        isLightboxOpening = false;
    }, 400);

    lightboxImage.onload = function() {
        this.style.imageRendering = 'auto';
        // Fade in khi ảnh đã load - sử dụng CSS variable cho transition
        if (isChangingImage) {
            setTimeout(() => {
                this.style.transition = 'opacity 280ms cubic-bezier(0.4, 0, 0.2, 1), transform 280ms cubic-bezier(0.4, 0, 0.2, 1)';
                this.style.opacity = '1';
                this.style.transform = 'scale(1)';
            }, 50);
        } else {
            // Đảm bảo opacity = 1 cho lần đầu mở
            this.style.opacity = '1';
            this.style.transform = 'scale(1)';
        }
    };

    lightboxImage.onerror = function() {
        console.error('Không thể tải hình ảnh:', imageSrc);
        
        // Nếu có element gốc, thử lấy lại src từ element
        if (imageItem && imageItem.element) {
            const fallbackSrc = imageItem.element.getAttribute('src');
            if (fallbackSrc && fallbackSrc !== imageSrc) {
                console.log('Thử lại với src từ element:', fallbackSrc);
                this.src = fallbackSrc;
                return;
            }
        }
        
        // Nếu vẫn lỗi sau 1 giây, đóng lightbox
        setTimeout(() => {
            if (this.complete === false || this.naturalWidth === 0) {
                console.error('Không thể tải hình ảnh sau nhiều lần thử');
                closeImageLightbox();
            }
        }, 1000);
    };
}

function closeImageLightbox() {
    if (!imageLightbox || isLightboxOpening) return;

    // Ẩn lightbox
    imageLightbox.classList.remove('active');
    currentImageIndex = null;
    currentImageArray = null;

    // Khôi phục scroll
    document.body.style.overflow = '';

    // Xóa đường dẫn hình ảnh sau khi animation kết thúc
    setTimeout(() => {
        if (lightboxImage) {
            lightboxImage.src = '';
        }
        if (lightboxCaption) {
            lightboxCaption.textContent = '';
        }
    }, 300);
}

function showAdjacentLightboxImage(step) {
    if (currentImageIndex === null || !currentImageArray) return;
    const total = currentImageArray.length;
    const newIndex = (currentImageIndex + step + total) % total;
    
    // Mở ảnh tiếp theo - openImageLightbox sẽ tự xử lý caption nếu là gallery
    openImageLightbox(newIndex, currentImageArray);
}

// Setup event listeners (chỉ một lần)
function setupLightboxEvents() {
    // Đóng lightbox khi click vào nút close
    if (lightboxClose) {
        lightboxClose.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            closeImageLightbox();
        });
    }

    // Đóng lightbox khi click vào overlay (background) - chỉ dùng bubbling phase
    if (imageLightbox) {
        // Remove handler cũ nếu có
        if (lightboxClickHandler) {
            imageLightbox.removeEventListener('click', lightboxClickHandler);
        }
        
        // Tạo handler mới
        lightboxClickHandler = (e) => {
            // Nếu đang mở thì không đóng
            if (isLightboxOpening) {
                return;
            }
            
            // Chỉ đóng nếu click vào chính overlay (background), không phải các element con
            if (e.target === imageLightbox) {
                e.stopPropagation();
                closeImageLightbox();
            }
        };
        
        imageLightbox.addEventListener('click', lightboxClickHandler);

        // Ngăn đóng lightbox khi click vào content hoặc hình ảnh
        const lightboxContent = imageLightbox.querySelector('.image-lightbox-content');
        if (lightboxContent) {
            lightboxContent.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
        
        // Ngăn đóng khi click vào hình ảnh
        if (lightboxImage) {
            lightboxImage.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
    }

    // Đóng lightbox khi nhấn phím ESC
    document.addEventListener('keydown', function lightboxKeyHandler(e) {
        if (!imageLightbox || !imageLightbox.classList.contains('active')) {
            return;
        }
        if (e.key === 'Escape') {
            e.stopPropagation();
            e.preventDefault();
            closeImageLightbox();
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            showAdjacentLightboxImage(-1);
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            showAdjacentLightboxImage(1);
        }
    });

    // Navigation buttons
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            showAdjacentLightboxImage(-1);
        });
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            showAdjacentLightboxImage(1);
        });
    }
}

// Initialize lightbox events
setupLightboxEvents();

// ==================== CONFETTI EFFECT ====================
function createConfetti() {
    const confettiContainer = document.getElementById('confettiContainer');
    const colors = ['#FFB6C1', '#DDA0DD', '#FFE4B5', '#B0E0E6', '#FFD700', '#FF7F50'];
    const confettiCount = 200;

    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = (Math.random() * 12 + 8) + 'px';
            confetti.style.height = (Math.random() * 12 + 8) + 'px';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0%';
            confetti.style.setProperty('--drift', (Math.random() * 200 - 100) + 'px');
            confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            confettiContainer.appendChild(confetti);

            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }, i * 10);
    }
}

const ctaButton = document.getElementById('ctaButton');
ctaButton.addEventListener('click', () => {
    createConfetti();
    // Scroll to top với hiệu ứng
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
