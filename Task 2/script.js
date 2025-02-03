document.addEventListener('DOMContentLoaded', () => {
    const postcardForm = document.getElementById('postcardForm');
    const postcardPreview = document.getElementById('postcard');
    const imageUpload = document.getElementById('imageUpload');
    const postcardMessage = document.getElementById('postcardMessage');
    const animationSelect = document.getElementById('animationSelect');
    const postcardText = document.getElementById('postcardText');
    const postcardImage = document.getElementById('postcardImage');
    const shareButton = document.getElementById('shareButton');
  
    // image upload handling
    imageUpload.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
          postcardImage.src = event.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  
    // form submission
    postcardForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const message = postcardMessage.value.trim();
      if (!message) {
        alert('Please write a message!');
        return;
      }
  
      postcardText.textContent = message;
  
      // animation 
      const animation = animationSelect.value;
      postcardPreview.classList.remove('fadeIn', 'zoomIn');
      if (animation !== 'none') {
        postcardPreview.classList.add(animation);
      }
  
      shareButton.style.display = 'block';
    });
  
    // share
    shareButton.addEventListener('click', () => {
      alert('Your postcard has been shared!');
    });
  });
  