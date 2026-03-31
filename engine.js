/**
 * BAZODIAC Canvas Engine
 * Handles complex vortex, ring, and radar visualizations
 */

const isMobile = window.innerWidth < 768;

class ConnectedVortex {
    constructor(canvasId, config) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.nodes = [];
        this.mouse = { x: -2000, y: -2000 };
        this.config = {
            nodeCount: isMobile ? 40 : 90,
            attractRadius: 450,
            attractForce: 0.28,
            tangentForce: 0.75,
            friction: 0.96,
            baseSpeed: 0.12,
            cursorLineColor: '99, 102, 241',
            dotColor: '212, 175, 55',
            maxCursorAlpha: 0.28,
            maxNodeAlpha: 0.09,
            cursorLineWidth: 0.7,
            ...config
        };
        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        for (let i = 0; i < this.config.nodeCount; i++) {
            this.nodes.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5
            });
        }
        this.animate();
    }

    resize() {
        if (!this.canvas.parentElement) return;
        const rect = this.canvas.parentElement.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.nodes.forEach(node => {
            const dx = this.mouse.x - node.x;
            const dy = this.mouse.y - node.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < this.config.attractRadius) {
                const force = (1 - dist / this.config.attractRadius) * this.config.attractForce;
                node.vx += dx * force * 0.02;
                node.vy += dy * force * 0.02;


                node.vx += (dy / dist) * this.config.tangentForce;
                node.vy -= (dx / dist) * this.config.tangentForce;


                const alpha = (1 - dist / this.config.attractRadius) * this.config.maxCursorAlpha;
                this.ctx.beginPath();
                this.ctx.strokeStyle = `rgba(${this.config.cursorLineColor}, ${alpha})`;
                this.ctx.lineWidth = this.config.cursorLineWidth;
                this.ctx.moveTo(node.x, node.y);
                this.ctx.lineTo(this.mouse.x, this.mouse.y);
                this.ctx.stroke();
            }

            node.x += node.vx + this.config.baseSpeed;
            node.y += node.vy;
            node.vx *= this.config.friction;
            node.vy *= this.config.friction;


            if (node.x > this.canvas.width) node.x = 0;
            if (node.x < 0) node.x = this.canvas.width;
            if (node.y > this.canvas.height) node.y = 0;
            if (node.y < 0) node.y = this.canvas.height;


            this.ctx.fillStyle = `rgba(${this.config.dotColor}, 0.5)`;
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, 1, 0, Math.PI * 2);
            this.ctx.fill();
        });

        requestAnimationFrame(() => this.animate());
    }
}

class ZodiacRing {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.angleOuter = 0;
        this.angleInner = 0;
        this.animate();
    }

    drawRing(radius, angle, ticks, opacity) {
        this.ctx.save();
        this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
        this.ctx.rotate(angle);
        this.ctx.strokeStyle = `rgba(212, 175, 55, ${opacity})`;
        this.ctx.lineWidth = 0.5;
        
        // Main Circle
        this.ctx.beginPath();
        this.ctx.arc(0, 0, radius, 0, Math.PI * 2);
        this.ctx.stroke();

        // Horology Ticks
        for (let i = 0; i < ticks; i++) {
            const a = (i * (360 / ticks)) * Math.PI / 180;
            const isMajor = i % (ticks / 12) === 0;
            const len = isMajor ? 12 : 5;
            this.ctx.beginPath();
            this.ctx.moveTo(Math.cos(a) * radius, Math.sin(a) * radius);
            this.ctx.lineTo(Math.cos(a) * (radius - len), Math.sin(a) * (radius - len));
            this.ctx.lineWidth = isMajor ? 1 : 0.5;
            this.ctx.stroke();
        }
        this.ctx.restore();
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.angleOuter += 0.003;
        this.angleInner -= 0.0015;
        const scale = this.canvas.width / 600;
        this.drawRing(260 * scale, this.angleOuter, 60, 0.4);
        this.drawRing(230 * scale, this.angleInner, 24, 0.2);
        requestAnimationFrame(() => this.animate());
    }
}

class RadarChart {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.values = [0.6, 0.8, 0.5, 0.9, 0.7]; // Wood, Fire, Earth, Metal, Water
        this.targetValues = [...this.values];
        this.labels = ['WOOD', 'FIRE', 'EARTH', 'METAL', 'WATER'];
        this.init();
    }

    init() {
        setInterval(() => {
            this.targetValues = this.values.map(() => 0.4 + Math.random() * 0.5);
        }, 3000);
        this.animate();
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        const center = this.canvas.width / 2;
        const radius = 120;


        this.ctx.strokeStyle = 'rgba(212, 175, 55, 0.1)';
        this.ctx.lineWidth = 1;
        for (let r = 1; r <= 3; r++) {
            this.ctx.beginPath();
            for (let i = 0; i < 5; i++) {
                const angle = (i * 72 - 90) * Math.PI / 180;
                const x = center + Math.cos(angle) * (radius * (r / 3));
                const y = center + Math.sin(angle) * (radius * (r / 3));
                if (i === 0) this.ctx.moveTo(x, y);
                else this.ctx.lineTo(x, y);
            }
            this.ctx.closePath();
            this.ctx.stroke();
        }


        this.ctx.beginPath();
        this.ctx.fillStyle = 'rgba(212, 175, 55, 0.15)';
        this.ctx.strokeStyle = 'rgba(212, 175, 55, 0.6)';
        
        for (let i = 0; i < 5; i++) {
            this.values[i] += (this.targetValues[i] - this.values[i]) * 0.05;
            const angle = (i * 72 - 90) * Math.PI / 180;
            const x = center + Math.cos(angle) * (radius * this.values[i]);
            const y = center + Math.sin(angle) * (radius * this.values[i]);
            
            if (i === 0) this.ctx.moveTo(x, y);
            else this.ctx.lineTo(x, y);


            this.ctx.font = '8px monospace';
            this.ctx.fillStyle = 'rgba(212, 175, 55, 0.6)';
            const lx = center + Math.cos(angle) * (radius + 25);
            const ly = center + Math.sin(angle) * (radius + 25);
            this.ctx.fillText(this.labels[i], lx - 15, ly);
        }
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.stroke();

        requestAnimationFrame(() => this.animate());
    }
}

class FusionRing {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.time = 0;
        this.animate();
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.time += 0.01;
        const center = { x: 200, y: 200 };

        this.ctx.lineWidth = 1.5;
        

        this.ctx.strokeStyle = 'rgba(99, 102, 241, 0.4)';
        this.ctx.beginPath();
        this.ctx.ellipse(center.x, center.y, 160, 80 + Math.sin(this.time) * 10, this.time * 0.2, 0, Math.PI * 2);
        this.ctx.stroke();


        this.ctx.strokeStyle = 'rgba(212, 175, 55, 0.6)';
        this.ctx.beginPath();
        this.ctx.ellipse(center.x, center.y, 120, 60 + Math.cos(this.time) * 5, -this.time * 0.4, 0, Math.PI * 2);
        this.ctx.stroke();


        const grad = this.ctx.createRadialGradient(center.x, center.y, 0, center.x, center.y, 40);
        grad.addColorStop(0, 'rgba(212, 175, 55, 0.2)');
        grad.addColorStop(1, 'transparent');
        this.ctx.fillStyle = grad;
        this.ctx.beginPath();
        this.ctx.arc(center.x, center.y, 40, 0, Math.PI * 2);
        this.ctx.fill();

        requestAnimationFrame(() => this.animate());
    }
}


document.addEventListener('DOMContentLoaded', () => {
    new ConnectedVortex('hero-vortex', {
        cursorLineColor: '99, 102, 241', dotColor: '212, 175, 55'
    });
    new ConnectedVortex('cta-vortex', {
        dotColor: '212, 175, 55', cursorLineColor: '212, 175, 55'
    });
    new ZodiacRing('zodiac-ring');
    new ZodiacRing('cta-ring');
    new RadarChart('fufire-radar');
    new FusionRing('fusion-ring'); 
});
