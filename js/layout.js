// Function to load external HTML files into a specified element
function loadComponent(elementId, filePath) {
    fetch(filePath)
      .then(response => {
        if (!response.ok) throw new Error(`Could not load ${filePath}`);
        return response.text();
      })
      .then(data => {
        document.getElementById(elementId).innerHTML = data;
      })
      .catch(error => console.error(error));
  }
  
  // Load header and footer
  loadComponent('header', 'header.html');
  loadComponent('footer', 'footer.html');
  