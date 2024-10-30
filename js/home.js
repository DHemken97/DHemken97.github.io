const canvas = document.getElementById("canvas1");
const canvasCtx = canvas.getContext('2d');

this.isMobile = false;
this.isPortrate = false;
function resizeCanvas(firstResize) {
    canvas.width = window.innerWidth ;
    canvas.height = window.innerHeight ;

    this.isMobile = (canvas.height<600 || canvas.width<800)   
    this.isPortrate =  (canvas.height > canvas.width);


    this.textBaseY = 0;
    if (firstResize) return;
    initParticles();
    initLinks();
}
resizeCanvas(true)
this.textBaseY = 0;

window.addEventListener('resize', e => resizeCanvas(false));

const mouse = {
    x: null,
    y: null,
    radius: 80
};

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

class Particle {
    constructor(x, y, size, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.baseSize = size;
        this.color = color;
        this.baseX = x;
        this.baseY = y;
        this.density = Math.random() * 30 + 1;
        this.velocityX = 0;
        this.velocityY = 0;
        this.damping = 0.9;
    }

    draw() {
        canvasCtx.beginPath();
        canvasCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        canvasCtx.fillStyle = this.color;
        canvasCtx.fill();
    }

    update() {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        this.size = this.baseSize + Math.sin(Date.now() * 0.005 + this.density) * 1;

        if (distance < mouse.radius) {
            const angle = Math.atan2(dy, dx);
            const force = (mouse.radius - distance) / mouse.radius;
            const repulsionX = Math.cos(angle) * force * this.density;
            const repulsionY = Math.sin(angle) * force * this.density;

            this.x -= repulsionX;
            this.y -= repulsionY;
        } else {
            const returnDx = this.baseX - this.x;
            const returnDy = this.baseY - this.y;

            this.velocityX *= this.damping;
            this.velocityY *= this.damping;

            this.velocityX += returnDx / 20;
            this.velocityY += returnDy / 20;

            this.x += this.velocityX;
            this.y += this.velocityY;
        }
    }
}

const particlesArray = [];
const colors = ["rgba(173, 216, 230, 0.8)", "rgba(255, 255, 255, 0.9)", "rgba(138, 43, 226, 0.8)", "rgba(255, 182, 193, 0.8)"];
const numberOfParticles = 1000;

function initParticles() {
    particlesArray.length = 0;
    for (let i = 0; i < numberOfParticles; i++) {
        const size = Math.random() * 5 + 1;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const color = colors[Math.floor(Math.random() * colors.length)];
        particlesArray.push(new Particle(x, y, size, color));
    }
}
initParticles();

// Define planets with links and sizes
const planetData = [];
function initLinks(){
    planetData.length = 0;
    if (isMobile){
        if (isPortrate){
            planetData.push(   
                { text: "Home", radius: 60, x: canvas.width/7, y: 30, url: "./" },
                { text: "About", radius: 60, x: canvas.width/7*2, y: 70, url: "./about.html" },
                { text: "Contact", radius: 60, x: canvas.width/7*3, y: 30, url: "./contact.html" },
                { text: "Projects", radius: 60, x: canvas.width/7*4, y: 70, url: "./projects.html" },
                { text: "GitHub", radius: 60, x: canvas.width/7*5, y: 30, url: "https://github.com/DHemken97" },
                { text: "More", radius: 60, x: canvas.width/7*6, y: 70, url: "./more.html" },
                 
                 
                )
        }
        else{
            planetData.push(   
                { text: "Home", radius: 60, x: canvas.width/7, y: canvas.height/2 - 30, url: "./" },
                { text: "About", radius: 60, x: canvas.width/7*2, y: canvas.height/2 - 30, url: "./about.html" },
                { text: "Contact", radius: 60, x: canvas.width/7*2 - 40, y: canvas.height/2 + 20, url: "./contact.html" },
                { text: "More", radius: 60, x: canvas.width/7*5 + 40, y: canvas.height/2 + 40, url: "./more.html" },
                { text: "GitHub", radius: 60, x: canvas.width/7*5, y: canvas.height/2, url: "https://github.com/DHemken97" },
                { text: "Projects", radius: 60, x: canvas.width/7*6, y: canvas.height/2, url: "./projects.html" },
                 
                 
                )
        }
    }
    else
    {
    planetData.push(    { text: "Home", radius: 60, x: canvas.width / 4, y: canvas.height / 2, url: "./" },
        { text: "About", radius: 80, x: (canvas.width / 2)-(canvas.width/10), y: canvas.height/8, url: "./about.html" },
        { text: "Contact", radius: 80, x: (canvas.width / 2)+(canvas.width/10), y: canvas.height/8, url: "./contact.html" },
        { text: "Projects", radius: 70, x: (canvas.width * 3) / 4, y: canvas.height / 2, url: "./projects.html" },
        
        { text: "GitHub", radius: 80, x: (canvas.width / 2)-(canvas.width/10), y: canvas.height*0.9, url: "https://github.com/DHemken97" },
        { text: "More", radius: 80, x: (canvas.width / 2)+(canvas.width/10), y: canvas.height*0.9, url: "./more.html" },
        )
    }
}

const astronautImg = new Image();
astronautImg.src = "./img/spaceman.png";
astronautImg.onload = () => {
    astronautImg.width /= 2;
    astronautImg.height /= 2;
};

let hoverDirection = 1;
let hoverAmplitude = 20;
let hoverSpeed = 0.002;
let rotationAngle = Math.PI / 12;



function drawPlanet(x, y, radius, text, patternIndex) {
    // Generate moving gradient texture
    const gradient = canvasCtx.createRadialGradient(x, y, 0, x, y, radius);
    const patterns = [
        `rgba(255, 204, 0, ${Math.abs(Math.sin(Date.now() * 0.001))})`,
        `rgba(255, 153, 51, ${Math.abs(Math.sin(Date.now() * 0.001 + Math.PI / 4))})`,
        `rgba(255, 153, 51, ${Math.abs(Math.sin(Date.now() * 0.001 + Math.PI / 4))})`,
        `rgba(51, 204, 255, ${Math.abs(Math.sin(Date.now() * 0.001 + Math.PI / 2))})`,
        `rgba(51, 204, 255, ${Math.abs(Math.sin(Date.now() * 0.001 + Math.PI / 2))})`,
        `rgba(51, 204, 255, ${Math.abs(Math.sin(Date.now() * 0.001 + Math.PI / 2))})`,
    ];

    gradient.addColorStop(0, patterns[patternIndex]);
    gradient.addColorStop(1, "rgba(0, 0, 0, 0.1)");

    canvasCtx.beginPath();
    canvasCtx.arc(x, y, radius, 0, Math.PI * 2);
    canvasCtx.fillStyle = gradient;
    canvasCtx.fill();

    // Draw the text inside the planet
    canvasCtx.fillStyle = "rgba(255, 255, 255, 0.9)";
    canvasCtx.font = `${Math.max(12, radius / 3)}px Arial`; // Adjusted size
    canvasCtx.textAlign = "center";
    canvasCtx.fillText(text, x, y + radius / 6); // Adjust y position for centering

    // Create a clickable area
    canvasCtx.beginPath();
    canvasCtx.arc(x, y, radius, 0, Math.PI * 2);
    canvasCtx.closePath();
    canvasCtx.fillStyle = "rgba(255, 255, 255, 0.0)"; // Invisible fill for clickable area
    canvasCtx.fill();
}

canvas.addEventListener("click", (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    planetData.forEach(planet => {
        const distance = Math.sqrt((mouseX - planet.x) ** 2 + (mouseY - planet.y) ** 2);
        if (distance < planet.radius) {
            window.location.href = planet.url; // Redirect to the planet's link
        }
    });
});

function animate() {
    const gradient = canvasCtx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "#000033");
    gradient.addColorStop(1, "#000011");
    canvasCtx.fillStyle = gradient;
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

    particlesArray.forEach(particle => {
        particle.draw();
        particle.update();
    });

    // Draw planets with text links
    planetData.forEach((planet, index) => {
        drawPlanet(planet.x, planet.y, planet.radius, planet.text, index);
    });

    const astronautY = canvas.height / 2 + Math.sin(Date.now() * hoverSpeed) * hoverAmplitude;

    if (this.textBaseY === 0) this.textBaseY = (canvas.height / 2) - 120;
    canvasCtx.fillStyle = "rgba(255, 255, 255, 0.9)";
    if (!this.isMobile)
    canvasCtx.font = "75px Arial";
    else
    {
        var maxFont = canvas.width / 10;

        canvasCtx.font = maxFont&"px Arial";
    }    
    canvasCtx.textAlign = "center";
    canvasCtx.fillText("Dominic Hemken", canvas.width / 2, this.textBaseY);
    canvasCtx.fillText("Full Stack Developer", canvas.width / 2, this.textBaseY + 275);
    canvasCtx.fillText("IT Consultant", canvas.width / 2, this.textBaseY + 360);

    if (astronautImg.complete) {
        canvasCtx.save();
        canvasCtx.translate(canvas.width / 2, astronautY);
        canvasCtx.rotate(rotationAngle);
        canvasCtx.scale(-1, 1);
        canvasCtx.drawImage(
            astronautImg,
            -astronautImg.width / 2,
            -astronautImg.height / 2,
            astronautImg.width,
            astronautImg.height
        );
        canvasCtx.restore();
    }

    requestAnimationFrame(animate);
}

window.addEventListener('load', (event) => {
    // Code to execute after everything is loaded
    initLinks();
    
    console.log("Page is fully loaded");
  });
animate();
