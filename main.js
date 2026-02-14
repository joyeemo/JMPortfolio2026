// 全局变量
let allImages = [];
let displayedImages = [];
let currentCategory = 'All';
let loadedImagesCount = 0;
let imagesPerLoad = 6;
let isLoading = false;

// DOM 元素
const artworkGrid = document.getElementById('artwork-grid');
const loadingIndicator = document.getElementById('loading-indicator');
const loadMoreBtn = document.getElementById('load-more-btn');
const categoryFilters = document.querySelectorAll('.category-filter');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxDescription = document.getElementById('lightbox-description');
const lightboxCategory = document.getElementById('lightbox-category');
const lightboxDate = document.getElementById('lightbox-date');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxBg = document.getElementById('lightbox-bg');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

async function initializeApp() {
    try {
        // 加载图片数据
        await loadImagesData();
        
        // 初始化动画
        initHeroAnimations();
        
        // 绑定事件监听器
        bindEventListeners();
        
        // 加载初始图片
        loadInitialImages();
        
        // 初始化滚动动画
        initScrollAnimations();
        
    } catch (error) {
        console.error('初始化失败:', error);
    }
}

// 加载图片数据
async function loadImagesData() {
    try {
        const response = await fetch('resources/data/images.json');
        const data = await response.json();
        allImages = data.images;
        imagesPerLoad = data.loadMoreCount || 6;
    } catch (error) {
        console.error('加载图片数据失败:', error);
        使用备用数据
        allImages = getFallbackImages();
        imagesPerLoad = 6;
    }
}

// 备用图片数据
function getFallbackImages() {
    return [
        {
            id: 1,
            title: "Mystical Forest",
            url: "resources/illustration1.png",
            category: "Fantasy",
            date: "2024-09-15",
            description: "An ethereal forest scene with glowing fireflies and ancient trees.",
            tags: ["fantasy", "nature", "digital art", "atmospheric"],
            width: 1024,
            height: 1536
        },
        {
            id: 2,
            title: "Cyberpunk Portrait",
            url: "resources/illustration2.png",
            category: "Sci-Fi",
            date: "2024-10-02",
            description: "A futuristic character portrait showcasing cybernetic enhancements.",
            tags: ["cyberpunk", "portrait", "sci-fi", "character design"],
            width: 1024,
            height: 1536
        },
        {
            id: 3,
            title: "Art Nouveau Elegance",
            url: "resources/illustration3.png",
            category: "Classical",
            date: "2024-08-20",
            description: "An elegant interpretation of Art Nouveau style with flowing organic forms.",
            tags: ["art nouveau", "classical", "elegant", "decorative"],
            width: 1024,
            height: 1536
        },
        {
            id: 4,
            title: "Surreal Underwater Temple",
            url: "resources/illustration4.png",
            category: "Surreal",
            date: "2024-09-28",
            description: "A dreamlike underwater scene featuring a submerged ancient temple.",
            tags: ["surreal", "underwater", "mythology", "dreamlike"],
            width: 1024,
            height: 1536
        },
        {
            id: 5,
            title: "Liquid Metal Abstract",
            url: "resources/illustration5.png",
            category: "Abstract",
            date: "2024-10-05",
            description: "Contemporary abstract composition exploring metallic forms.",
            tags: ["abstract", "contemporary", "metallic", "geometric"],
            width: 1024,
            height: 1536
        }
    ];
}

// 初始化Hero区域动画
function initHeroAnimations() {
    const heroTitle = document.getElementById('hero-title');
    const heroSubtitle = document.getElementById('hero-subtitle');
    const heroCta = document.getElementById('hero-cta');
    
    // 标题动画
    anime({
        targets: heroTitle,
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 1000,
        delay: 500,
        easing: 'easeOutExpo'
    });
    
    // 副标题动画
    anime({
        targets: heroSubtitle,
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 800,
        delay: 800,
        easing: 'easeOutExpo'
    });
    
    // CTA按钮动画
    anime({
        targets: heroCta,
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 600,
        delay: 1200,
        easing: 'easeOutExpo'
    });
}

// 绑定事件监听器
function bindEventListeners() {
    // 分类筛选
    categoryFilters.forEach(filter => {
        filter.addEventListener('click', handleCategoryFilter);
    });
    
    // 加载更多按钮
    loadMoreBtn.addEventListener('click', loadMoreImages);
    
    // Lightbox关闭
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxBg.addEventListener('click', closeLightbox);
    
    // ESC键关闭Lightbox
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) {
            closeLightbox();
        }
    });
    
    // 移动端菜单
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    
    // 滚动加载更多
    window.addEventListener('scroll', handleScroll);
    
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 加载初始图片
function loadInitialImages() {
    displayedImages = [];
    loadedImagesCount = 0;
    artworkGrid.innerHTML = '';
    
    loadMoreImages();
}

// 加载更多图片
async function loadMoreImages() {
    if (isLoading) return;
    
    isLoading = true;
    loadingIndicator.classList.remove('hidden');
    loadMoreBtn.style.display = 'none';
    
    // 模拟加载延迟
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const filteredImages = getFilteredImages();
    const remainingImages = filteredImages.slice(loadedImagesCount);
    const imagesToLoad = remainingImages.slice(0, imagesPerLoad);
    
    if (imagesToLoad.length === 0) {
        loadingIndicator.classList.add('hidden');
        loadMoreBtn.style.display = 'none';
        isLoading = false;
        return;
    }
    
    imagesToLoad.forEach((image, index) => {
        setTimeout(() => {
            createArtworkItem(image);
            displayedImages.push(image);
        }, index * 150);
    });
    
    loadedImagesCount += imagesToLoad.length;
    
    setTimeout(() => {
        loadingIndicator.classList.add('hidden');
        
        if (loadedImagesCount < filteredImages.length) {
            loadMoreBtn.style.display = 'inline-block';
        }
        
        isLoading = false;
    }, imagesToLoad.length * 150 + 500);
}

// 获取筛选后的图片
function getFilteredImages() {
    if (currentCategory === 'All') {
        return allImages;
    }
    return allImages.filter(image => image.category === currentCategory);
}

// 创建作品项
function createArtworkItem(image) {
    const item = document.createElement('div');
    item.className = 'artwork-item bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer transition-all duration-500 hover:shadow-2xl';
    item.dataset.category = image.category;
    
    const aspectRatio = (image.height / image.width) * 100;
    
    item.innerHTML = `
        <div class="relative overflow-hidden">
            <img 
                src="${image.url}" 
                alt="${image.title}"
                class="w-full h-auto object-cover transition-transform duration-500 hover:scale-110"
                loading="lazy"
                style="aspect-ratio: ${image.width}/${image.height}"
            >
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div class="absolute bottom-4 left-4 right-4">
                    <h3 class="text-white font-bold text-lg mb-1">${image.title}</h3>
                    <p class="text-gray-300 text-sm mb-2 line-clamp-2">${image.description}</p>
                    <div class="flex items-center justify-between">
                        <span class="bg-yellow-500 text-black px-2 py-1 rounded text-xs font-medium">${image.category}</span>
                        <span class="text-gray-400 text-xs">${formatDate(image.date)}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // 添加点击事件
    item.addEventListener('click', () => openLightbox(image));
    
    artworkGrid.appendChild(item);
    
    // 图片加载完成后添加动画类
    const img = item.querySelector('img');
    img.addEventListener('load', () => {
        setTimeout(() => {
            item.classList.add('loaded');
        }, 100);
    });
}

// 处理分类筛选
function handleCategoryFilter(e) {
    const category = e.target.dataset.category;
    
    // 更新活动状态
    categoryFilters.forEach(filter => {
        filter.classList.remove('active');
        filter.classList.add('border-gray-600', 'text-gray-400');
        filter.classList.remove('border-yellow-500', 'text-yellow-400');
    });
    
    e.target.classList.add('active');
    e.target.classList.remove('border-gray-600', 'text-gray-400');
    e.target.classList.add('border-yellow-500', 'text-yellow-400');
    
    // 更新当前分类
    currentCategory = category;
    
    // 重新加载图片
    loadInitialImages();
}

// 打开Lightbox
function openLightbox(image) {
    lightboxImg.src = image.url;
    lightboxImg.alt = image.title;
    lightboxTitle.textContent = image.title;
    lightboxDescription.textContent = image.description;
    lightboxCategory.textContent = image.category;
    lightboxDate.textContent = formatDate(image.date);
    
    lightbox.classList.remove('hidden');
    lightbox.classList.add('flex');
    
    // 阻止背景滚动
    document.body.style.overflow = 'hidden';
    
    // 淡入动画
    anime({
        targets: lightbox,
        opacity: [0, 1],
        duration: 300,
        easing: 'easeOutQuad'
    });
    
    anime({
        targets: lightboxImg,
        scale: [0.8, 1],
        opacity: [0, 1],
        duration: 400,
        delay: 100,
        easing: 'easeOutBack'
    });
}

// 关闭Lightbox
function closeLightbox() {
    anime({
        targets: lightbox,
        opacity: [1, 0],
        duration: 200,
        easing: 'easeInQuad',
        complete: () => {
            lightbox.classList.add('hidden');
            lightbox.classList.remove('flex');
            document.body.style.overflow = '';
        }
    });
}

// 处理滚动加载
function handleScroll() {
    const scrollTop = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    // 检查是否滚动到底部
    if (scrollTop + windowHeight >= documentHeight - 1000) {
        const filteredImages = getFilteredImages();
        if (loadedImagesCount < filteredImages.length && !isLoading) {
            loadMoreImages();
        }
    }
}

// 切换移动端菜单
function toggleMobileMenu() {
    mobileMenu.classList.toggle('hidden');
}

// 初始化滚动动画
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 观察需要动画的元素
    document.querySelectorAll('.artwork-item').forEach(item => {
        observer.observe(item);
    });
}

// 格式化日期
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// 添加一些实用的工具函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 优化滚动性能
const debouncedScrollHandler = debounce(handleScroll, 100);
window.removeEventListener('scroll', handleScroll);
window.addEventListener('scroll', debouncedScrollHandler);

// 图片预加载
function preloadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = url;
    });
}

// 添加键盘导航支持
document.addEventListener('keydown', function(e) {
    if (lightbox.classList.contains('flex')) {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            e.preventDefault();
            navigateLightbox(e.key === 'ArrowRight' ? 1 : -1);
        }
    }
});

// Lightbox导航
function navigateLightbox(direction) {
    const currentIndex = displayedImages.findIndex(img => img.title === lightboxTitle.textContent);
    let newIndex = currentIndex + direction;
    
    if (newIndex < 0) newIndex = displayedImages.length - 1;
    if (newIndex >= displayedImages.length) newIndex = 0;
    
    const newImage = displayedImages[newIndex];
    if (newImage) {
        // 淡出当前图片
        anime({
            targets: lightboxImg,
            opacity: 0,
            scale: 0.9,
            duration: 200,
            easing: 'easeInQuad',
            complete: () => {
                // 更新内容
                lightboxImg.src = newImage.url;
                lightboxImg.alt = newImage.title;
                lightboxTitle.textContent = newImage.title;
                lightboxDescription.textContent = newImage.description;
                lightboxCategory.textContent = newImage.category;
                lightboxDate.textContent = formatDate(newImage.date);
                
                // 淡入新图片
                anime({
                    targets: lightboxImg,
                    opacity: 1,
                    scale: 1,
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            }
        });
    }
}

// 添加触摸手势支持
let touchStartX = 0;
let touchEndX = 0;

lightbox.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

lightbox.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchEndX - touchStartX;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
        if (swipeDistance > 0) {
            navigateLightbox(-1); // 向右滑动，显示上一张
        } else {
            navigateLightbox(1); // 向左滑动，显示下一张
        }
    }
}

// 性能优化：图片懒加载
function initLazyLoading() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// 错误处理
window.addEventListener('error', function(e) {
    console.error('发生错误:', e.error);
});

// 页面可见性API - 优化性能
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // 页面不可见时暂停动画
        anime.running.forEach(animation => animation.pause());
    } else {
        // 页面可见时恢复动画
        anime.running.forEach(animation => animation.play());
    }
});

console.log('插画作品集网站已加载完成 🎨');