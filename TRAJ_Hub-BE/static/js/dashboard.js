import { data } from '../json/api_base.js';

document.addEventListener('DOMContentLoaded', function () {
    const primaryGunTypeInput = document.getElementById('primary-gun-type');
    const primaryGunTypeSug = document.getElementById('primary-gun-type-sug');
    const primaryGunNameInput = document.createElement('input');
    const primaryGunNameSug = document.createElement('datalist');
    const primaryAttachmentsContainer = document.getElementById('primary-attachments-container');

    const secondaryGunTypeInput = document.getElementById('secondary-gun-type');
    const secondaryGunTypeSug = document.getElementById('secondary-gun-type-sug');
    const secondaryGunNameInput = document.createElement('input');
    const secondaryGunNameSug = document.createElement('datalist');
    const secondaryAttachmentsContainer = document.getElementById('secondary-attachments-container');

    const lethalEquipment = document.getElementById("lethal-equipment-list")
    const tacticalEquipment = document.getElementById("tactical-equipment-list")
    const perks1_2Equipment = document.getElementById('perks1_2-list')
    const perks3Equipment = document.getElementById('perks3-list')
    const perks4Equipment = document.getElementById('perks4-list')



    // Populate gun types in the datalist
    Object.keys(data.endpoints.weapons.response.weapons.class).forEach(gunClass => {
        const optionPrimary = document.createElement('option');
        optionPrimary.value = gunClass;
        primaryGunTypeSug.appendChild(optionPrimary);

        const optionSecondary = document.createElement('option');
        optionSecondary.value = gunClass;
        secondaryGunTypeSug.appendChild(optionSecondary);
    });
    
    // Populate Lethal options
    data.endpoints.weapons.response.Lethal.forEach(lethal => {
        const optionLethal = document.createElement('option');
        optionLethal.value = lethal.name;
        lethalEquipment.appendChild(optionLethal);
    });

    // Populate tactical options
    data.endpoints.weapons.response.Tactical.forEach(tactical => {
        const optiontactical = document.createElement('option');
        optiontactical.value = tactical.name;
        tacticalEquipment.appendChild(optiontactical);
    });
    
    // Populate perks 1 & 2 options
    data.endpoints.weapons.response.Perks.perks1_2.forEach(perks1_2 => {
        const optionperks1_2 = document.createElement('option');
        optionperks1_2.value = perks1_2.name;
        perks1_2Equipment.appendChild(optionperks1_2);
    });

    // Populate perks 3 options
    data.endpoints.weapons.response.Perks.perks3.forEach(perks3 => {
        const optionperks3 = document.createElement('option');
        optionperks3.value = perks3.name;
        perks3Equipment.appendChild(optionperks3);
    });

    // Populate perks 4 options
    data.endpoints.weapons.response.Perks.perks4.forEach(perks4 => {
        const optionperks4 = document.createElement('option');
        optionperks4.value = perks4.name;
        perks4Equipment.appendChild(optionperks4);
    });

    const createGunNameInput = (context, container) => {
        const div = document.createElement('div');
        const label = document.createElement('label');
        label.setAttribute('for', `${context}-gun-name`);
        label.textContent = `${context.charAt(0).toUpperCase() + context.slice(1)} Gun Name`;
        const input = context === 'primary' ? primaryGunNameInput : secondaryGunNameInput;
        const datalist = context === 'primary' ? primaryGunNameSug : secondaryGunNameSug;
        input.setAttribute('type', 'text');
        input.setAttribute('id', `${context}-gun-name`);
        input.setAttribute('name', `${context}-gun-name`);
        input.setAttribute('list', `${context}-gun-name-sug`);
        datalist.id = `${context}-gun-name-sug`;
        div.appendChild(label);
        div.appendChild(input);
        div.appendChild(datalist);
        container.appendChild(div);
    };

    // Function to create attachment input
    const createAttachmentInput = (type, context, container, gun) => {
        const div = document.createElement('div');
        const label = document.createElement('label');
        label.textContent = `${type}`;
        const select = document.createElement('select');
        select.id = `${context}-${type.toLowerCase()}-type`;
        select.name = `${context}-${type.toLowerCase()}-type`;

        const defaultOption = document.createElement('option');
        defaultOption.value = "";
        defaultOption.textContent = "Select attachment type";
        select.appendChild(defaultOption);

        const attachmentTypes = Object.keys(gun.attachments); // Adjust based on your weapon structure
        attachmentTypes.forEach(attachmentType => {
            const option = document.createElement('option');
            option.value = attachmentType;
            option.textContent = attachmentType;
            select.appendChild(option);
        });

        const attachmentNameDiv = document.createElement('div');
        attachmentNameDiv.style.display = 'none'; // Initially hidden

        const attachmentNameLabel = document.createElement('label');
        attachmentNameLabel.textContent = "Name:";
        const attachmentNameSelect = document.createElement('select');
        attachmentNameSelect.name = `${context}-${type.toLowerCase()}-name`;

        attachmentNameDiv.appendChild(attachmentNameLabel);
        attachmentNameDiv.appendChild(attachmentNameSelect);

        select.addEventListener('change', function () {
            const selectedType = this.value;
            if (selectedType) {
                attachmentNameDiv.style.display = 'block';
                attachmentNameSelect.innerHTML = ''; // Clear previous options

                const defaultNameOption = document.createElement('option');
                defaultNameOption.value = "";
                defaultNameOption.textContent = "Select attachment name";
                attachmentNameSelect.appendChild(defaultNameOption);

                const attachments = gun.attachments[selectedType]; // Adjust based on your weapon structure
                attachments.forEach(attachment => {
                    const nameOption = document.createElement('option');
                    nameOption.value = attachment.name;
                    nameOption.textContent = attachment.name;
                    attachmentNameSelect.appendChild(nameOption);
                });
            } else {
                attachmentNameDiv.style.display = 'none';
            }
        });

        div.appendChild(label);
        div.appendChild(select);
        div.appendChild(attachmentNameDiv);
        container.appendChild(div);
    };

    const updateGunNames = (context, gunClass) => {
        const gunNameInput = context === 'primary' ? primaryGunNameInput : secondaryGunNameInput;
        const gunNameSug = context === 'primary' ? primaryGunNameSug : secondaryGunNameSug;
        gunNameSug.innerHTML = ''; // Clear previous suggestions

        if (data.endpoints.weapons.response.weapons.class[gunClass]) {
            Object.keys(data.endpoints.weapons.response.weapons.class[gunClass]).forEach(gunName => {
                const option = document.createElement('option');
                option.value = gunName;
                gunNameSug.appendChild(option);
            });

            gunNameInput.addEventListener('input', function () {
                const selectedGun = this.value;
                populateAttachments(context, gunClass, selectedGun);
            });
        }
    };

    // Populate sections with attachments
    const populateAttachments = (context, gunType, gunName) => {
        const refGunType = data.endpoints.weapons.response.weapons.class[gunType]
        const container = context === 'primary' ? primaryAttachmentsContainer : secondaryAttachmentsContainer;
        container.innerHTML = ''; // Clear previous attachments

        if (refGunType[gunName]) {
            const gunData = refGunType[gunName];
            for (let i = 1; i <= 5; i++) {
                createAttachmentInput(`Attachment ${i}`, context, container, refGunType[gunName]);
            }
        }
    };

    // Add event listeners to gun type inputs
    primaryGunTypeInput.addEventListener('input', function () {
        const selectedGunClass = this.value;
        createGunNameInput('primary', primaryAttachmentsContainer);
        updateGunNames('primary', selectedGunClass);
    });

    secondaryGunTypeInput.addEventListener('input', function () {
        const selectedGunClass = this.value;
        createGunNameInput('secondary', secondaryAttachmentsContainer);
        updateGunNames('secondary', selectedGunClass);
    });

});
