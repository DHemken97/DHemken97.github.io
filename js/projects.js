async function fetchProjects() {
    try {
        const response = await fetch('./api/GetProjectData.json');
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching projects:', error);
    }
}


function generateTimeline(projects) {
    const container = document.getElementById('timeline-container');
    projects.forEach((project, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        timelineItem.setAttribute('data-project', `project${index + 1}`);
        let optionals = ''
        if (project.img) //Use Image Template
        optionals+=`<img src="${project.img}" alt="Project Image"/>\r\n`
        if (project.gitUrl) //Use Image Template
        optionals+=`<button class="github-button" onclick="openGitHubRepo(${project.gitUrl})">View on GitHub</button>\r\n`
        

        
        timelineItem.innerHTML = `
            <div class="timeline-content">
                <h2>${project.title}</h2>
                <span class="date">${project.date}</span>
            </div>
            <div class="details">
                <p>${project.description}</p>
                ${optionals}
                <p><strong>Technologies:</strong> ${project.technologies}</p>
            </div>
        `; 
        container.appendChild(timelineItem);
    });
}

function addEventListeners() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.addEventListener('click', () => {
            const details = item.querySelector('.details');
            if (details.style.display === 'block') {
                details.style.display = 'none';
            } else {
                // Close any open details before opening a new one
                document.querySelectorAll('.details').forEach(detail => {
                    detail.style.display = 'none';
                });
                details.style.display = 'block';
            }
        });
    });


    document.addEventListener('mousemove', (event) => {
        const peeker = document.getElementById('peeker-container');
        const leftEye = document.getElementById('left-eye');
        const rightEye = document.getElementById('right-eye');
        const isLandscape = window.innerHeight < window.innerWidth;
        const isMobile = (isLandscape ? window.innerHeight : window.innerWidth) < 900;
        // Get the bounding rectangle of the peeker container
        const rect = peeker.getBoundingClientRect();
    
        // Calculate the mouse position relative to the eyes
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
    
        // Eye movement parameters
        const eyeDistance = isMobile? isLandscape? 4:8:8; // Distance of pupils from the center of the eye
        const leftEyeX = leftEye.offsetLeft + leftEye.offsetWidth / 2 ;
        const leftEyeY = leftEye.offsetTop + leftEye.offsetHeight / 2;
        
        const rightEyeX = rightEye.offsetLeft + rightEye.offsetWidth / 2;
        const rightEyeY = rightEye.offsetTop + rightEye.offsetHeight / 2;
    
        // Calculate angle for left pupil
        const leftAngle = Math.atan2(mouseY - leftEyeY, mouseX - leftEyeX);
        const leftPupilX = Math.cos(leftAngle) * eyeDistance;
        const leftPupilY = Math.sin(leftAngle) * eyeDistance;
    
        // Update left pupil position
        const leftPupil = document.getElementById('left-pupil');
        leftPupil.style.transform = `translate(${leftPupilX}px, ${leftPupilY}px)`;
        leftPupil.style.left = `50%`; // Center the pupil in the eye
        leftPupil.style.top = `50%`;  // Center the pupil in the eye
        leftPupil.style.transform += ` translate(-50%, -50%)`; // Adjust for centering
    
        // Calculate angle for right pupil
        const rightAngle = Math.atan2(mouseY - rightEyeY, mouseX - rightEyeX);
        const rightPupilX = Math.cos(rightAngle) * eyeDistance;
        const rightPupilY = Math.sin(rightAngle) * eyeDistance;
    
        // Update right pupil position
        const rightPupil = document.getElementById('right-pupil');
        rightPupil.style.transform = `translate(${rightPupilX}px, ${rightPupilY}px)`;
        rightPupil.style.left = `50%`; // Center the pupil in the eye
        rightPupil.style.top = `50%`;  // Center the pupil in the eye
        rightPupil.style.transform += ` translate(-50%, -50%)`; // Adjust for centering
    });
    
}

fetchProjects().then(projects => {

    generateTimeline(projects);
    addEventListeners();
});


function openGitHubRepo(url) {
    window.open(url, "_blank");
}


