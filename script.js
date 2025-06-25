// Theme functionality removed for cleaner design

// Sidebar Navigation Management
function initSidebarNavigation() {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const contentSections = document.querySelectorAll('.content-section');
    // Removed dynamic title updating since we have a static header
    const sectionHeaders = document.querySelectorAll('.section-header');
    
    // Mobile menu toggle
    let mobileToggle = document.querySelector('.mobile-menu-toggle');
    if (!mobileToggle) {
        mobileToggle = document.createElement('button');
        mobileToggle.className = 'mobile-menu-toggle';
        mobileToggle.innerHTML = '☰';
        document.body.appendChild(mobileToggle);
    }
    
    // Toggle sidebar on mobile
    function toggleSidebar() {
        sidebar.classList.toggle('open');
    }
    
    sidebarToggle.addEventListener('click', toggleSidebar);
    mobileToggle.addEventListener('click', toggleSidebar);
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && 
            sidebar.classList.contains('open') && 
            !sidebar.contains(e.target) && 
            !mobileToggle.contains(e.target)) {
            sidebar.classList.remove('open');
        }
    });
    
    // Handle expandable sections
    sectionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const isExpanded = content.classList.contains('expanded');
            
            if (isExpanded) {
                content.classList.remove('expanded');
                header.classList.add('collapsed');
            } else {
                content.classList.add('expanded');
                header.classList.remove('collapsed');
            }
        });
    });
    
    // Handle navigation clicks
    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetSection = link.getAttribute('data-section');
            
            // Update active states
            sidebarLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Show target section
            contentSections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetSection) {
                    section.classList.add('active');
                }
            });
            
            // No longer updating dynamic titles - we have a static header
            
            // Close sidebar on mobile after selection
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('open');
            }
            
            // Scroll to top of content
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
    
    // Remove progress bar functionality since we're not using it in this design
}

// Token Demo
function initTokenDemo() {
    const tokenInput = document.getElementById('tokenInput');
    const tokenOutput = document.getElementById('tokenOutput');
    
    if (!tokenInput || !tokenOutput) return;
    
    tokenInput.addEventListener('input', (e) => {
        const text = e.target.value;
        
        if (!text) {
            tokenOutput.innerHTML = '';
            return;
        }
        
        // Use the GPT tokenizer
        if (typeof GPTTokenizer_o200k_base !== 'undefined') {
            try {
                const { encode, decode } = GPTTokenizer_o200k_base;
                
                // Encode text to token IDs
                const tokenIds = encode(text);
                
                // Decode each token ID to see the actual text chunks
                const tokens = tokenIds.map(id => {
                    try {
                        return decode([id]);
                    } catch (e) {
                        return `[${id}]`;
                    }
                });
                
                // Display the tokens
                tokenOutput.innerHTML = `
                    <div class="token-demo">
                        ${tokens.map(t => `<span class="token">[${t}]</span>`).join('')}
                    </div>
                    <p>${tokens.length} token${tokens.length !== 1 ? 's' : ''} ${text.toLowerCase() === 'strawberry' ? '- AI sees tokens, not letters!' : ''}</p>
                `;
            } catch (error) {
                console.error('Tokenization error:', error);
                fallbackTokenization(text);
            }
        } else {
            fallbackTokenization(text);
        }
    });
    
    function fallbackTokenization(text) {
        // Fallback to simple tokenization if library not loaded
        const tokens = text.match(/.{1,4}/g) || [];
        tokenOutput.innerHTML = `
            <div class="token-demo">
                ${tokens.map(t => `<span class="token">[${t}]</span>`).join('')}
            </div>
            <p>${tokens.length} tokens (approximate - tokenizer not loaded)</p>
        `;
    }
}

// Copy code functionality
function copyCode(button) {
    const codeBlock = button.parentElement;
    const code = codeBlock.querySelector('code').textContent;
    
    navigator.clipboard.writeText(code).then(() => {
        button.textContent = 'Copied!';
        setTimeout(() => {
            button.textContent = 'Copy';
        }, 2000);
    });
}

// Tokenization Animation
function initTokenizationAnimation() {
    const tokenSplitter = document.getElementById('tokenSplitter');
    if (!tokenSplitter) return;
    
    const words = [
        'understanding', 'artificial', 'intelligence', 'development', 'strawberry', 'programming', 'tokenization',
        'playground', 'keyboard', 'password', 'screenshot', 'download', 'JavaScript', 'frontend', 'backend',
        'localhost', 'webhook', 'dropdown', 'backgroundColor', 'getElementById', 'addEventListener',
        'localStorage', 'setTimeout', 'innerHTML', 'className', 'preventDefault', 'appendChild',
        'querySelector', 'XMLHttpRequest', 'getElementsByTagName', 'requestAnimationFrame',
        'encodeURIComponent', 'database', 'timestamp', 'namespace', 'multiprocessing'
    ];
    let wordIndex = 0;
    
    function animateWord() {
        const word = words[wordIndex];
        
        // Use actual GPT tokenization
        if (typeof GPTTokenizer_o200k_base !== 'undefined') {
            try {
                const { encode, decode } = GPTTokenizer_o200k_base;
                
                // Encode the word to token IDs
                const tokenIds = encode(word);
                
                // Decode each token ID to see the actual text chunks
                const tokens = tokenIds.map(id => {
                    try {
                        return decode([id]);
                    } catch (e) {
                        return `[${id}]`;
                    }
                });
                
                displayTokens(word, tokens);
            } catch (error) {
                console.error('Tokenization error:', error);
                // Fallback
                const tokens = word.match(/.{1,4}/g) || [];
                displayTokens(word, tokens);
            }
        } else {
            // Fallback to simple tokenization
            const tokens = word.match(/.{1,4}/g) || [];
            displayTokens(word, tokens);
        }
        
        // Randomize next word selection
        wordIndex = Math.floor(Math.random() * words.length);
    }
    
    function displayTokens(originalWord, tokens) {
        // Fade out existing content
        const existingContent = tokenSplitter.querySelector('.token-word');
        if (existingContent) {
            existingContent.style.opacity = '0';
            existingContent.style.transition = 'opacity 0.5s ease-out';
            
            setTimeout(() => {
                tokenSplitter.innerHTML = '';
                createNewContent();
            }, 500);
        } else {
            createNewContent();
        }
        
        function createNewContent() {
            const wordElement = document.createElement('div');
            wordElement.className = 'token-word';
            wordElement.style.opacity = '0';
            
            // First show the original word
            const wordSpan = document.createElement('span');
            wordSpan.textContent = originalWord;
            wordSpan.style.fontWeight = 'bold';
            wordSpan.style.color = '#333';
            wordElement.appendChild(wordSpan);
            
            // Add arrow
            const arrow = document.createElement('span');
            arrow.textContent = '→';
            arrow.style.margin = '0 0.75rem';
            arrow.style.color = '#666';
            wordElement.appendChild(arrow);
            
            // Then show tokens
            tokens.forEach((token, index) => {
                const span = document.createElement('span');
                span.textContent = `[${token}]`;
                span.style.padding = '0.2rem 0.4rem';
                span.style.background = 'rgba(196, 40, 40, 0.1)';
                span.style.border = '1px solid var(--primary)';
                span.style.borderRadius = '4px';
                span.style.fontSize = '0.85rem';
                span.style.color = 'var(--primary)';
                wordElement.appendChild(span);
            });
            
            tokenSplitter.appendChild(wordElement);
            
            // Fade in new content
            setTimeout(() => {
                wordElement.style.transition = 'opacity 0.5s ease-in';
                wordElement.style.opacity = '1';
            }, 50);
        }
    }
    
    // Initial animation
    animateWord();
    setInterval(animateWord, 5000); // Slower transition - 5 seconds
}

// Context Window Growth Animation
function initContextAnimation() {
    const contextGrowth = document.getElementById('contextGrowth');
    if (!contextGrowth) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                contextGrowth.innerHTML = '';
                
                setTimeout(() => {
                    const bar1 = document.createElement('div');
                    bar1.className = 'context-window-bar grow-8k';
                    bar1.textContent = '8K';
                    contextGrowth.appendChild(bar1);
                }, 500);
                
                setTimeout(() => {
                    contextGrowth.innerHTML = '';
                    const bar2 = document.createElement('div');
                    bar2.className = 'context-window-bar grow-128k';
                    bar2.textContent = '128K';
                    contextGrowth.appendChild(bar2);
                }, 2000);
                
                setTimeout(() => {
                    contextGrowth.innerHTML = '';
                    const bar3 = document.createElement('div');
                    bar3.className = 'context-window-bar grow-2m';
                    bar3.textContent = '2M+';
                    contextGrowth.appendChild(bar3);
                }, 3500);
                
                observer.unobserve(entry.target);
            }
        });
    });
    
    observer.observe(contextGrowth);
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initSidebarNavigation();
    
    // Wait a bit for the tokenizer library to load
    setTimeout(() => {
        // Check if tokenizer loaded
        if (typeof GPTTokenizer_o200k_base !== 'undefined') {
            console.log('GPT Tokenizer loaded successfully');
        } else {
            console.warn('GPT Tokenizer not loaded - using fallback');
        }
        
        initTokenDemo();
        initTokenizationAnimation();
    }, 500);
    
    initContextAnimation();
});