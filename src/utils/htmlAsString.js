export const htmlAsString = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hianime API - Premium Anime Data</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg-color: #0f1115;
            --card-bg: rgba(26, 29, 36, 0.6);
            --card-border: rgba(255, 255, 255, 0.08);
            --primary: #8b5cf6;
            --primary-hover: #7c3aed;
            --text-main: #ffffff;
            --text-secondary: #94a3b8;
            --accent-glow: rgba(139, 92, 246, 0.15);
            --success: #10b981;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Inter', sans-serif;
        }

        body {
            background-color: var(--bg-color);
            color: var(--text-main);
            min-height: 100vh;
            overflow-x: hidden;
            position: relative;
        }

        #canvas {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            background: radial-gradient(circle at 50% 50%, #1a1d26 0%, #0f1115 100%);
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
            position: relative;
            z-index: 1;
        }

        /* Navbar */
        nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.5rem 0;
            margin-bottom: 4rem;
        }

        .logo {
            font-size: 1.5rem;
            font-weight: 700;
            background: linear-gradient(to right, #fff, #94a3b8);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            letter-spacing: -0.5px;
        }

        .status-badge {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            background: rgba(16, 185, 129, 0.1);
            color: var(--success);
            padding: 0.5rem 1rem;
            border-radius: 999px;
            font-size: 0.875rem;
            font-weight: 500;
            border: 1px solid rgba(16, 185, 129, 0.2);
            backdrop-filter: blur(4px);
        }

        .status-dot {
            width: 8px;
            height: 8px;
            background-color: var(--success);
            border-radius: 50%;
            box-shadow: 0 0 8px var(--success);
        }

        /* Hero */
        .hero {
            text-align: center;
            margin-bottom: 5rem;
        }

        h1 {
            font-size: 4rem;
            font-weight: 800;
            line-height: 1.1;
            margin-bottom: 1.5rem;
            letter-spacing: -1px;
            text-shadow: 0 0 40px rgba(139, 92, 246, 0.3);
        }

        .gradient-text {
            background: linear-gradient(135deg, #a78bfa 0%, #34d399 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .subtitle {
            font-size: 1.25rem;
            color: var(--text-secondary);
            max-width: 600px;
            margin: 0 auto 2.5rem;
            line-height: 1.6;
        }

        .cta-group {
            display: flex;
            gap: 1rem;
            justify-content: center;
        }

        .btn {
            padding: 1rem 2rem;
            border-radius: 12px;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            font-size: 1rem;
        }

        .btn-primary {
            background: var(--primary);
            color: white;
            box-shadow: 0 4px 14px 0 rgba(139, 92, 246, 0.39);
        }

        .btn-primary:hover {
            background: var(--primary-hover);
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(139, 92, 246, 0.23);
        }

        .btn-secondary {
            background: rgba(255, 255, 255, 0.05);
            color: white;
            border: 1px solid var(--card-border);
            backdrop-filter: blur(4px);
        }

        .btn-secondary:hover {
            background: rgba(255, 255, 255, 0.1);
            transform: translateY(-2px);
        }

        /* Grid */
        .endpoints-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1.5rem;
            margin-top: 2rem;
        }

        .card {
            background: var(--card-bg);
            border: 1px solid var(--card-border);
            border-radius: 16px;
            padding: 1.5rem;
            transition: all 0.3s ease;
            backdrop-filter: blur(12px);
            position: relative;
            overflow: hidden;
        }

        .card:hover {
            transform: translateY(-5px);
            border-color: rgba(139, 92, 246, 0.5);
            box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
        }
        
        .card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.06), transparent 40%);
            opacity: 0;
            transition: opacity 0.5s;
            pointer-events: none;
        }

        .card:hover::before {
            opacity: 1;
        }

        .method {
            display: inline-block;
            font-size: 0.75rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            padding: 0.25rem 0.5rem;
            border-radius: 6px;
            margin-bottom: 1rem;
        }

        .get { background: rgba(52, 211, 153, 0.15); color: #34d399; }

        .endpoint-path {
            font-family: 'Monaco', 'Consolas', monospace;
            color: #e2e8f0;
            font-size: 0.95rem;
            margin-bottom: 0.5rem;
            display: block;
        }

        .card p {
            color: var(--text-secondary);
            font-size: 0.9rem;
            line-height: 1.5;
        }

        /* Section Header */
        .section-header {
            margin: 4rem 0 2rem;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
        }

        .section-header h2 {
            font-size: 2rem;
            font-weight: 700;
        }

        /* Footer */
        footer {
            margin-top: 6rem;
            padding: 2rem 0;
            border-top: 1px solid var(--card-border);
            color: var(--text-secondary);
            text-align: center;
            font-size: 0.9rem;
        }

        footer a {
            color: var(--text-secondary);
            text-decoration: none;
            transition: color 0.2s;
        }

        footer a:hover {
            color: white;
        }
        
        @media (max-width: 768px) {
            h1 { font-size: 2.5rem; }
            .container { padding: 1.5rem; }
        }
    </style>
</head>
<body>
    <canvas id="canvas"></canvas>
    <div class="container">
        <nav>
            <div class="logo">Hianime API</div>
            <div class="status-badge">
                <div class="status-dot"></div>
                <span>Operational</span>
            </div>
        </nav>

        <section class="hero">
            <h1>The Ultimate <span class="gradient-text">Anime API</span></h1>
            <p class="subtitle">
                A powerful, free, and open-source REST API to scrape anime data. 
                Built for developers, by developers.
            </p>
            <div class="cta-group">
                <a href="/doc" class="btn btn-primary">Try Interactive Docs</a>
                <a href="https://github.com/codewithjackson/hianime-API" class="btn btn-secondary" target="_blank">View on GitHub</a>
            </div>
        </section>

        <div class="section-header">
            <h2>Popular Endpoints</h2>
            <span style="color: var(--text-secondary)">Base URL: /api/v1</span>
        </div>

        <div class="endpoints-grid">
            <!-- Home -->
            <div class="card">
                <span class="method get">GET</span>
                <code class="endpoint-path">/home</code>
                <p>Get trending anime, latest episodes, top airing, and spotlight data in one request.</p>
            </div>

            <!-- Search -->
            <div class="card">
                <span class="method get">GET</span>
                <code class="endpoint-path">/search?keyword={query}</code>
                <p>Search for anime by title. Includes pagination and advanced filtering options.</p>
            </div>

            <!-- Info -->
            <div class="card">
                <span class="method get">GET</span>
                <code class="endpoint-path">/anime/{id}</code>
                <p>Retrieve detailed information about a specific anime, including synopsis, cast, and episodes.</p>
            </div>

            <!-- Episodes -->
            <div class="card">
                <span class="method get">GET</span>
                <code class="endpoint-path">/episodes/{id}</code>
                <p>List all available episodes for a specific anime ID.</p>
            </div>

            <!-- Stream -->
            <div class="card">
                <span class="method get">GET</span>
                <code class="endpoint-path">/stream?id={episodeId}</code>
                <p>Fetch HLS streaming links, subtitles, and server options for playback.</p>
            </div>

            <!-- Schedule -->
            <div class="card">
                <span class="method get">GET</span>
                <code class="endpoint-path">/schedule</code>
                <p>Get the estimated airing schedule for upcoming anime episodes.</p>
            </div>
        </div>

        <footer>
            <p>
                Unofficial API - Not affiliated with Hianime. 
                <br>
                Use responsibly. Created for educational purposes.
            </p>
        </footer>
    </div>

    <script>
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];
        
        // Configuration
        const particleCount = 60;
        const connectionDistance = 150;
        const mouseDistance = 200;

        let mouse = { x: null, y: null };

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.x;
            mouse.y = e.y;
            
            // Update cards hover effect
            for(const card of document.getElementsByClassName("card")) {
                const rect = card.getBoundingClientRect(),
                      x = e.clientX - rect.left,
                      y = e.clientY - rect.top;
                card.style.setProperty("--mouse-x", \`\${x}px\`);
                card.style.setProperty("--mouse-y", \`\${y}px\`);
            }
        });

        window.addEventListener('mouseleave', () => {
             mouse.x = null;
             mouse.y = null;
        });

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            initParticles();
        }

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 1;
                this.color = \`rgba(139, 92, 246, \${Math.random() * 0.5 + 0.1})\`; // purple tint
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off edges
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;

                // Mouse interaction
                if (mouse.x != null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < mouseDistance) {
                        const forceDirectionX = dx / distance;
                        const forceDirectionY = dy / distance;
                        const force = (mouseDistance - distance) / mouseDistance;
                        const directionX = forceDirectionX * force * 0.6;
                        const directionY = forceDirectionY * force * 0.6;
                        
                        this.vx += directionX * 0.05;
                        this.vy += directionY * 0.05;
                    }
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }

        function initParticles() {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);
            
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                // Connect particles
                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        ctx.beginPath();
                        ctx.strokeStyle = \`rgba(139, 92, 246, \${1 - distance / connectionDistance})\`;
                        ctx.lineWidth = 1;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
                
                // Connect to mouse
                if (mouse.x != null) {
                    const dx = particles[i].x - mouse.x;
                    const dy = particles[i].y - mouse.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < mouseDistance) {
                         ctx.beginPath();
                        ctx.strokeStyle = \`rgba(52, 211, 153, \${1 - distance / mouseDistance})\`; // Green tint for interaction
                        ctx.lineWidth = 1;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animate);
        }

        window.addEventListener('resize', resize);
        resize();
        animate();
    </script>
</body>
</html>
`;
