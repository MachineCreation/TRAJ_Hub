import { data } from '../json/api_base.js';


document.addEventListener('DOMContentLoaded', function () { 

    const heroImageForm = document.getElementById('hero-image-form');           // forms
    const primaryWeaponForm = document.getElementById('primary-weapon-form');
    const secondaryWeaponForm = document.getElementById('secondary-weapon-form');
    const equipForm =  document.getElementById('equipment');
    const perkForm = document.getElementById('perks');

    const primaryGunTypeInput = document.getElementById('primary-gun-type');    // primary weapons
    const primaryGunTypeSug = document.getElementById('primary-gun-type-sug');
    const primaryWeaponinput = document.getElementById('primary-weapon');
    const primaryWeaponSug = document.getElementById('primary-weapon-sug');
    const PATypeSug = document.getElementById('PA-type-sug');
    const PA1Typeinput = document.getElementById('PA1-type');
    const PA2Typeinput = document.getElementById('PA2-type');
    const PA3Typeinput = document.getElementById('PA3-type');
    const PA4Typeinput = document.getElementById('PA4-type');

    const secondaryGunTypeInput = document.getElementById('secondary-gun-type');    // secondary weapons
    const secondaryGunTypeSug = document.getElementById('secondary-gun-type-sug');
    const secondaryWeaponinput = document.getElementById('secondary-weapon');
    const secondaryWeaponSug = document.getElementById('secondary-weapon-sug');
    const SATypeSug = document.getElementById('SA-type-sug');
    const SA1Typeinput = document.getElementById('SA1-type');
    const SA2Typeinput = document.getElementById('SA2-type');
    const SA3Typeinput = document.getElementById('SA3-type');
    const SA4Typeinput = document.getElementById('SA4-type');

    const perks1EquipmentInput = document.getElementById('perks1');             // perks
    const perks2EquipmentInput = document.getElementById('perks2');
    const perks3EquipmentInput = document.getElementById('perks3');
    const perks4EquipmentInput = document.getElementById('perks4');
    const perks1_2Equipment = document.getElementById('perks1_2-list');
    const perks3Equipment = document.getElementById('perks3-list');
    const perks4Equipment = document.getElementById('perks4-list');

    const lethalEquipmentInput = document.getElementById('lethal');             // equpiment
    const tacticalEquipmentInput = document.getElementById('tactical');
    const lethalEquipment = document.getElementById("lethal-equipment-list");
    const tacticalEquipment = document.getElementById("tactical-equipment-list");

    function checkInputs(formId) {                                              // set initial enabled state for inputs 
        const inputs = formId.querySelectorAll('input[type="text"]');
    
        inputs.forEach((input, index) => {
            input.disabled = index > 0 && inputs[index - 1].value.trim() === "";
        });
    };
    

                                                                                // populate gun type datalists
    Object.keys(data.endpoints.weapons.response.weapons.class).forEach(gunClass => {
        const optionPrimary = document.createElement('option');
        optionPrimary.value = gunClass;
        primaryGunTypeSug.appendChild(optionPrimary);

        const optionSecondary = document.createElement('option');
        optionSecondary.value = gunClass;
        secondaryGunTypeSug.appendChild(optionSecondary);
    });

    const weaponslist = (weaponSlot, gunType) => {                              // populate gun lists
        weaponSlot.innerHTML = '';
        Object.keys(data.endpoints.weapons.response.weapons.class[gunType]).forEach(gun => {
            const option = document.createElement('option');
            option.value = gun;
            weaponSlot.appendChild(option);
        });
    };

    const attachmentsList = (sugList, weapon, weapontype) => {
        sugList.innerHTML = '';
        Object.keys(data.endpoints.weapons.response.weapons.class[weapontype][weapon]['attachments']).forEach(attachment => {
            const attachmentOption = document.createElement('option');
            attachmentOption.value = attachment
            console.log(attachment)
            sugList.appendChild(attachmentOption)
        })
        console.log(`{sugList}`)
    };

    const inputListeners = (weapon, check) => {
        weapon.querySelectorAll('input[class="PA-type"]').forEach((input) => {
            input.addEventListener('input', () => {
                checkInputs(check);
            })
        })
    };
    
    primaryGunTypeInput.addEventListener('input', () => {
        weaponslist(primaryWeaponSug, primaryGunTypeInput.value);
        checkInputs(primaryWeaponForm);
    });

    secondaryGunTypeInput.addEventListener('input', () => {
        weaponslist(secondaryWeaponSug, secondaryGunTypeInput.value);
        checkInputs(secondaryWeaponForm);
    });

    primaryWeaponinput.addEventListener('input', () => {
        inputListeners(primaryWeaponinput, primaryWeaponForm);
        attachmentsList(PATypeSug, primaryWeaponinput.value, primaryGunTypeInput.value)
        checkInputs(primaryWeaponForm)
    })
    
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
});
