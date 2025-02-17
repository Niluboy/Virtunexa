document.addEventListener("DOMContentLoaded", function() {
    const exhibitButtons = document.querySelectorAll('.exhibit');
    const exhibitDescription = document.getElementById('exhibitDescription');
    const exhibitImage = document.getElementById('exhibitImageDisplay');
    const startTourButton = document.getElementById('startTour');
    const tourSection = document.getElementById('tour');
    const nextButton = document.getElementById('nextButton');
    const previousButton = document.getElementById('previousButton');
    const tourTitle = document.getElementById('tourTitle');
    const tourDescription = document.getElementById('tourDescription');

    let currentExhibit = null;
    let currentStep = 0;
    let steps = [];

    // descriptions and tours
    const exhibitData = {
        exhibit1: {
            description: "Ancient Artifacts - A collection of artifacts from ancient civilizations.",
            image: "./ancient.jpg", 
            tour: [
                "This exhibit showcases pottery, jewelry, and tools from early human history.",
                "Each artifact has a story behind its use in daily life.",
                "Some of the pottery was used for ceremonial purposes."
            ]
        },
        exhibit2: {
            description: "Renaissance Art - Discover masterpieces from the Renaissance period.",
            image: "./rennaicence.jpg", 
            tour: [
                "This collection features paintings, sculptures, and sketches from famous artists.",
                "The Renaissance marked a period of great innovation in art and science.",
                "Explore works by Leonardo da Vinci and Michelangelo."
            ]
        },
        exhibit3: {
            description: "Space Exploration - Explore humanity's journey beyond Earth.",
            image: "./space.jpeg", 
            tour: [
                "Learn about the first moon landing and the technology behind space travel.",
                "This section includes space suits, rockets, and lunar samples.",
                "Discover the history of space exploration from its beginnings to modern-day missions."
            ]
        }
    };

    exhibitButtons.forEach(button => {
        button.addEventListener('click', function() {
            const exhibitId = button.getAttribute('data-exhibit');
            currentExhibit = exhibitId;
            exhibitDescription.textContent = exhibitData[exhibitId].description;
            exhibitImage.src = exhibitData[exhibitId].image;
            exhibitImage.classList.remove('hidden');
            startTourButton.classList.remove('hidden');
            steps = exhibitData[exhibitId].tour;
            currentStep = 0;
        });
    });

    startTourButton.addEventListener('click', function() {
        if (!currentExhibit) return;

        tourSection.classList.remove('hidden');
        showStep();
    });

    nextButton.addEventListener('click', function() {
        currentStep++;
        if (currentStep >= steps.length) {
            currentStep = steps.length - 1;
        }
        showStep();
    });

    previousButton.addEventListener('click', function() {
        currentStep--;
        if (currentStep < 0) {
            currentStep = 0;
        }
        showStep();
    });

    function showStep() {
        tourTitle.textContent = exhibitData[currentExhibit].description;
        tourDescription.textContent = steps[currentStep];

        if (currentStep === 0) {
            previousButton.classList.add('hidden');
        } else {
            previousButton.classList.remove('hidden');
        }

        if (currentStep === steps.length - 1) {
            nextButton.textContent = "Finish Tour";
        } else {
            nextButton.textContent = "Next";
        }
    }
});
