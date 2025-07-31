// 3D Background
try {
    if (typeof THREE !== "undefined") {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("bgCanvas"), alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);

        const particlesCount = 500;
        const geometry = new THREE.BufferGeometry();
        const positions = [];
        for (let i = 0; i < particlesCount; i++) {
            positions.push((Math.random() - 0.5) * 20);
            positions.push((Math.random() - 0.5) * 20);
            positions.push((Math.random() - 0.5) * 20);
        }
        geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
        const material = new THREE.PointsMaterial({ size: 0.03, color: "#58a6ff" });
        const points = new THREE.Points(geometry, material);
        scene.add(points);
        camera.position.z = 5;

        document.addEventListener("mousemove", (e) => {
            const x = (e.clientX / window.innerWidth) - 0.5;
            const y = -(e.clientY / window.innerHeight) + 0.5;
            camera.position.x = x * 2;
            camera.position.y = y * 2;
        });

        function animate() {
            requestAnimationFrame(animate);
            points.rotation.y += 0.001;
            renderer.render(scene, camera);
        }
        animate();
    }
} catch (err) {
    console.warn("3D background disabled:", err);
}

// Typing Effect
document.getElementById("footerYear").textContent = new Date().getFullYear();
const typingElement = document.getElementById("typing");
let i = 0, j = 0, isDeleting = false;
function typeEffect() {
    let currentText = personalInfo.titles[i];
    typingElement.textContent = currentText.substring(0, j);
    if (!isDeleting && j < currentText.length) { j++; setTimeout(typeEffect, 100); }
    else if (isDeleting && j > 0) { j--; setTimeout(typeEffect, 50); }
    else if (!isDeleting && j === currentText.length) { isDeleting = true; setTimeout(typeEffect, 1500); }
    else { isDeleting = false; i = (i + 1) % personalInfo.titles.length; setTimeout(typeEffect, 500); }
}
typeEffect();

// About Me
document.getElementById("aboutText").textContent = personalInfo.about;

// Load Skills
const skillsContainer = document.getElementById("skillsList");
skills.forEach(skill => {
    const skillBar = document.createElement("div");
    skillBar.classList.add("skill-bar", "reveal");
    skillBar.innerHTML = `
        <p>${skill.name}</p>
        <div class="progress"><span data-width="${skill.level}"></span></div>
    `;
    skillsContainer.appendChild(skillBar);
});

// Load Projects
const projectContainer = document.getElementById("projectGrid");
projects.forEach(project => {
    const card = document.createElement("div");
    card.classList.add("project-card", "reveal");
    card.innerHTML = `
        <img src="${project.image}" alt="${project.title}">
        <div class="project-info">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
        </div>
    `;
    card.addEventListener("click", () => window.open(project.link, "_blank"));
    projectContainer.appendChild(card);
});

// Reveal Animation
function reveal() {
    document.querySelectorAll(".reveal").forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 100) {
            el.classList.add("active");
            if (el.querySelector("span")) {
                el.querySelector("span").style.width = el.querySelector("span").dataset.width;
            }
        }
    });
}
window.addEventListener("scroll", reveal);
window.addEventListener("load", reveal);
