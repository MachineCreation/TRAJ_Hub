// static/js/dashboard.js
document.addEventListener('DOMContentLoaded', function () {
    const data = {
        "guns": {
            "assault rifle": ["muzzle", "barrel", "underbarrel", "laser", "sights", "magazine", "Rear-grip", "Stock", "Conversion"],
            "LMG": ["muzzle", "barrel", "underbarrel", "laser", "sights", "magazine", "Rear-grip", "Stock", "Conversion"],
            "marksman rifle": ["muzzle", "barrel", "laser", "sights", "magazine", "sling", "Rear-grip", "Stock", "Conversion"],
            "pistol": ["muzzle", "barrel", "underbarrel", "laser", "sights", "magazine", "Rear-grip", "Conversion"]
        },
        "muzzle": {
            "supressor": "description",
            "flash-hider": "description"
        },
        "barrel": {
            "long": "description",
            "short": "description"
        },
        "underbarrel": {
            "Bruen heavy support grip": "description",
            "Crowin grip": "description"
        },
        "laser": {
            "3mw": "description",
            "7mw": "description"
        },
        "sights": {
            "Reflex": "description",
            "Scope": "description"
        },
        "magazine": {
            "Extended": "description",
            "Drum": "description"
        },
        "Rear-grip": {
            "Rubberized": "description",
            "Granulated": "description"
        },
        "Stock": {
            "Adjustable": "description",
            "Fixed": "description"
        },
        "Conversion": {
            "9mm": "description",
            "45ACP": "description"
        }
    };

    const primaryGunTypeInput = document.getElementById('primary-gun-type');
    const primaryGunTypeSug = document.getElementById('primary-gun-type-sug');
    const primaryPartsContainer = document.getElementById('primary-parts-container');

    const secondaryGunTypeInput = document.getElementById('secondary-gun-type');
    const secondaryGunTypeSug = document.getElementById('secondary-gun-type-sug');
    const secondaryPartsContainer = document.getElementById('secondary-parts-container');

    // Populate gun types in the datalist
    Object.keys(data.guns).forEach(gunType => {
        const optionPrimary = document.createElement('option');
        optionPrimary.value = gunType;
        primaryGunTypeSug.appendChild(optionPrimary);

        const optionSecondary = document.createElement('option');
        optionSecondary.value = gunType;
        secondaryGunTypeSug.appendChild(optionSecondary);
    });

    // Function to update suggestions
    const updateSuggestions = (part, datalistElement) => {
        datalistElement.innerHTML = ''; // Clear previous suggestions
        Object.keys(data[part]).forEach(item => {
            const option = document.createElement('option');
            option.value = item;
            if (item === '') {
                option.textContent = 'None'; // Display 'None' for empty string option
            }
            datalistElement.appendChild(option);
        });
    };

    // Function to create input elements for gun parts
    const createPartInput = (part, container, context) => {
        const div = document.createElement('div');
        const label = document.createElement('label');
        label.setAttribute('for', `${context}-${part}`);
        label.textContent = part.charAt(0).toUpperCase() + part.slice(1);
        const input = document.createElement('input');
        input.type = 'text';
        input.id = `${context}-${part}`;
        input.name = `${context}-${part}`;
        input.setAttribute('list', `${context}-${part}-sug`);
        input.setAttribute('autocomplete', 'on');
        input.value = ''; // Set default value to empty string
        const datalist = document.createElement('datalist');
        datalist.id = `${context}-${part}-sug`;
        div.appendChild(label);
        div.appendChild(input);
        div.appendChild(datalist);
        container.appendChild(div);
        updateSuggestions(part, datalist);
    };

    // Handle gun type selection and populate the sections
    const populateSections = (gunType, container, context) => {
        if (data.guns[gunType]) {
            container.innerHTML = ''; // Clear previous parts
            data.guns[gunType].forEach(part => {
                createPartInput(part, container, context);
            });
        }
    };

    // Add event listeners to gun type inputs
    primaryGunTypeInput.addEventListener('input', function () {
        const selectedGun = this.value;
        populateSections(selectedGun, primaryPartsContainer, 'primary');
    });

    secondaryGunTypeInput.addEventListener('input', function () {
        const selectedGun = this.value;
        populateSections(selectedGun, secondaryPartsContainer, 'secondary');
    });

    // Function to handle image preview
    const handleImagePreview = (input, preview) => {
        input.addEventListener('change', function () {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    preview.src = e.target.result;
                    preview.style.display = 'block';
                };
                reader.readAsDataURL(file);
            }
        });
    };

    const primaryInput = document.getElementById('primary');
    const primaryPreview = document.getElementById('primary-preview');
    const secondaryInput = document.getElementById('secondary');
    const secondaryPreview = document.getElementById('secondary-preview');

    handleImagePreview(primaryInput, primaryPreview);
    handleImagePreview(secondaryInput, secondaryPreview);
});
