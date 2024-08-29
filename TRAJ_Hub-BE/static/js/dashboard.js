import { data } from '../json/api_base.js';


document.addEventListener('DOMContentLoaded', function () { 

           
    const primaryWeaponForm = document.getElementById('primary-weapon-form');   // forms
    const secondaryWeaponForm = document.getElementById('secondary-weapon-form');
    const heroForm = document.getElementById('hero-image-form');
    const equipmentForm = document.getElementById('equipment');
    const perksForm = document.getElementById('perks');

    const primarySubmitButton = primaryWeaponForm.querySelector('button[type="submit"]');
    const secondarySubmitButton = secondaryWeaponForm.querySelector('button[type="submit"]');
    const heroSubmitButton = heroForm.querySelector('button[type="submit"]');
    const equipmentSubmitButton = equipmentForm.querySelector('button[type="submit"]');
    const perksSubmitButtn = perksForm.querySelector('button[type="submit"]');

    const primaryGunTypeInput = document.getElementById('primary-gun-type');    // primary weapons
    const primaryGunTypeSug = document.getElementById('primary-gun-type-sug');
    const primaryWeaponinput = document.getElementById('primary-weapon');
    const primaryWeaponSug = document.getElementById('primary-weapon-sug');
    const PATypeSug = document.getElementById('PA-type-sug');
    const PA1Typeinput = document.getElementById('PA1-type');
    const PA2Typeinput = document.getElementById('PA2-type');
    const PA3Typeinput = document.getElementById('PA3-type');
    const PA4Typeinput = document.getElementById('PA4-type');
    const PA5Typeinput = document.getElementById('PA5-type');
    const PA1 = document.getElementById('PA1');
    const PA2 = document.getElementById('PA2');
    const PA3 = document.getElementById('PA3');
    const PA4 = document.getElementById('PA4');
    const PA5 = document.getElementById('PA5');
    const PA1Sug = document.getElementById('PA1-sug');
    const PA2Sug = document.getElementById('PA2-sug');
    const PA3Sug = document.getElementById('PA3-sug');
    const PA4Sug = document.getElementById('PA4-sug');
    const PA5Sug = document.getElementById('PA5-sug');

                                                                                // primary lists
    const PATypeInputList = [PA1Typeinput, PA2Typeinput, PA3Typeinput, PA4Typeinput, PA5Typeinput];
    const PASugList = [PA1Sug, PA2Sug, PA3Sug, PA4Sug, PA5Sug];
    const PAInputList = [PA1, PA2, PA3, PA4, PA5]

    const secondaryGunTypeInput = document.getElementById('secondary-gun-type');    // secondary weapons
    const secondaryGunTypeSug = document.getElementById('secondary-gun-type-sug');
    const secondaryWeaponinput = document.getElementById('secondary-weapon');
    const secondaryWeaponSug = document.getElementById('secondary-weapon-sug');
    const SATypeSug = document.getElementById('SA-type-sug');
    const SA1Typeinput = document.getElementById('SA1-type');
    const SA2Typeinput = document.getElementById('SA2-type');
    const SA3Typeinput = document.getElementById('SA3-type');
    const SA4Typeinput = document.getElementById('SA4-type');
    const SA5Typeinput = document.getElementById('SA5-type');
    const SA1 = document.getElementById('SA1');
    const SA2 = document.getElementById('SA2');
    const SA3 = document.getElementById('SA3');
    const SA4 = document.getElementById('SA4');
    const SA5 = document.getElementById('SA5');
    const SA1Sug = document.getElementById('SA1-sug');
    const SA2Sug = document.getElementById('SA2-sug');
    const SA3Sug = document.getElementById('SA3-sug');
    const SA4Sug = document.getElementById('SA4-sug');
    const SA5Sug = document.getElementById('SA5-sug');

                                                                                // secondary lists
    const SATypeInputList = [SA1Typeinput, SA2Typeinput, SA3Typeinput, SA4Typeinput, SA5Typeinput]
    const SASugList = [SA1Sug, SA2Sug, SA3Sug, SA4Sug, SA5Sug]
    const SAInputList = [SA1, SA2, SA3, SA4, SA5]

    
    const perks1_2Equipment = document.getElementById('perks1_2-list');         // perks var
    const perks3Equipment = document.getElementById('perks3-list');
    const perks4Equipment = document.getElementById('perks4-list');

    const P1Input = document.getElementById('perks1');
    const P2Input = document.getElementById('perks2');
    const P3Input = document.getElementById('perks3');
    const P4Input = document.getElementById('perks4');

    const perksList = [P1Input, P2Input, P3Input, P4Input]
             
    const lethalEquipment = document.getElementById("lethal-equipment-list");   // equpiment var
    const tacticalEquipment = document.getElementById("tactical-equipment-list");
    const lethalInput = document.getElementById('lethal');
    const tacticalInput = document.getElementById('tactical');
    
    const equipmentList = [lethalInput, tacticalInput]



    const submitForm = async (e, form, slot) => {                                      // Form submitions
        e.preventDefault();
        const formData = new FormData(form);

        try {
            const uploadResponse = await fetch(`/${slot}-image-upload`, {
                method: 'POST',
                body: formData
            });
    
            if (uploadResponse.ok) {
                const urlResponse = await fetch(`/${slot}-url`, {
                    method: 'POST',
                    body: formData
                });
        
                if (urlResponse.ok) {
                    window.location.reload();
                } else {
                    console.error("Failed to upload URL");
                }
            } else {
                console.error("Failed to upload image");
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    const submitEquipment = async () => {
        const formdata = new FormData(equipmentForm)

        await fetch ('/equipment-form', {
            method: 'POST',
            body: formdata
        })
    };

    const submitPerks = async () => {
        const formdata = new FormData(perksForm)

        await fetch ('/perks-form', {
            method: 'POST',
            body: formdata
        })
    }

    heroSubmitButton.addEventListener('click', (e) => {                          // Submit button event listeners
        submitForm(e, heroForm, 'hero');
    });

    primarySubmitButton.addEventListener('click', (e) => {
        submitForm(e, primaryWeaponForm, 'weapon');
    });

    secondarySubmitButton.addEventListener('click', (e) => {
        submitForm(e, secondaryWeaponForm, 'weapon');
    });

    equipmentSubmitButton.addEventListener('click', () => {
        submitEquipment()
    });

    perksSubmitButtn.addEventListener('click', () => {
        submitPerks()
    })


    
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

    const attachmentTypeList = (sugList, weapon, weapontype, form) => {         // populate attachment types and weapon stats
        sugList.innerHTML = '';
        Object.keys(data.endpoints.weapons.response.weapons.class[weapontype][weapon]['attachments']).forEach(type => {
            const typeOption = document.createElement('option');
            typeOption.value = type
            // console.log(type)
            sugList.appendChild(typeOption)
        });
        const weaponStatsSelect = form.querySelector('input[class="weapon_stats"]')
        const stats = data.endpoints.weapons.response.weapons.class[weapontype][weapon]['stats']
        const jstats = JSON.stringify(stats)
        weaponStatsSelect.value = jstats
        console.log(weaponStatsSelect.value)
    };
                                                                                // populate spesific gun attachments
    const attachmentList = (attachmentSugList, weapontype, weapon, attachmentType, form) =>{
        const fragment = document.createDocumentFragment();
        data.endpoints.weapons.response.weapons.class[weapontype][weapon].attachments[attachmentType].forEach(attachment => {
            const attachmentOption = document.createElement('option')
            attachmentOption.value = attachment.name;
            // console.log(attachment.name);
            fragment.appendChild(attachmentOption)
        });
        attachmentSugList.replaceChildren(fragment)
        checkInputs(form)
    };

    const PAattachmentStats = (attachment, weaponType, weapon, index) => {      // get primary attachment stats
        const statsInput = document.getElementById(`PA${index}-stats`);
        const attachType = document.getElementById(`PA${index}-type`);
        const stats = JSON.stringify(data.endpoints.weapons.response.weapons.class[weaponType][weapon].attachments[attachType.value].find(att => att.name === attachment.value).stats);
        if (stats) {
            statsInput.value = stats
            console.log(statsInput.value)
        }
        else {
            statsInput.value = {"stats": "none"}
        };
    };

    const SAattachmentStats = (attachment, weaponType, weapon, index) => {      // get secondary attachment stats
        const statsInput = document.getElementById(`SA${index}-stats`);
        const attachType = document.getElementById(`SA${index}-type`);
        const stats = JSON.stringify(data.endpoints.weapons.response.weapons.class[weaponType][weapon].attachments[attachType.value].find(att => att.name === attachment.value).stats);
        if (stats) {
            statsInput.value = stats
            console.log(statsInput.value)
        }
        else {
            statsInput.value = {"stats": "none"}
        };
    };

    const equipmentStats = (slot) => {   
        // console.log(slot)                                       // get equipment stats
        const equipId = `${slot.value}`;
        // console.log(equipId)
        const equipName = `${slot.getAttribute('name')}`;
        // console.log(equipName)
        const equipStatsInput = document.getElementById(`${equipName}-stats`);
        const stats = JSON.stringify(data.endpoints.weapons.response[equipName].find(att => att.name === equipId).description);
        if (stats) {
            equipStatsInput.value = stats
            console.log(stats)
        } else {
            equipStatsInput.value = {"stats": "none"};
        };
    };

    const perksStats = (slot) => {                                              // get perks stats
        const perkId = slot.value;
        // console.log(perkId)
        const perkName = `${slot.getAttribute('name')}`;
        // console.log(perkName)
        const perkStatsInput = document.getElementById(`${perkName}-stats`);
        console.log(`${perkName}-stats`)
        let stats = ''

        if (perkName === 'perks1' || perkName === 'perks2') {
            stats = JSON.stringify(data.endpoints.weapons.response.Perks['perks1_2'].find(att => att.name === perkId).description);
        } else {
            stats = JSON.stringify(data.endpoints.weapons.response.Perks[perkName].find(perk => perk.name === perkId).description);
        };
        if (stats) {
            perkStatsInput.value = stats
            console.log(stats)
        } else {
            perkStatsInput.value = {"stats": "none"};
        };
    };
    
    primaryGunTypeInput.addEventListener('input', () => {                       // input event listeners
        weaponslist(primaryWeaponSug, primaryGunTypeInput.value);
        checkInputs(primaryWeaponForm);
    });
    
    primaryWeaponinput.addEventListener('input', () => {
        attachmentTypeList(PATypeSug, primaryWeaponinput.value, primaryGunTypeInput.value, primaryWeaponForm)
        checkInputs(primaryWeaponForm)
    });

    PATypeInputList.forEach((type, index) => {
        type.addEventListener('input', () => {
            attachmentList(PASugList[index], primaryGunTypeInput.value, primaryWeaponinput.value, type.value, primaryWeaponForm);
            checkInputs(primaryWeaponForm);
        });
    });

    PAInputList.forEach((attachmentInput, index) => {
        attachmentInput.addEventListener('input', () => {
            PAattachmentStats(attachmentInput, primaryGunTypeInput.value, primaryWeaponinput.value, index + 1)
            checkInputs(primaryWeaponForm)
        });
    });

    secondaryGunTypeInput.addEventListener('input', () => {
        weaponslist(secondaryWeaponSug, secondaryGunTypeInput.value);
        checkInputs(secondaryWeaponForm);
    });

    secondaryWeaponinput.addEventListener('input', () => {
        attachmentTypeList(SATypeSug, secondaryWeaponinput.value, secondaryGunTypeInput.value, secondaryWeaponForm)
        checkInputs(secondaryWeaponForm)
    });

    SATypeInputList.forEach((type, index) => {
        type.addEventListener('input', () => {
            attachmentList(SASugList[index], secondaryGunTypeInput.value, secondaryWeaponinput.value, type.value, secondaryWeaponForm);
            checkInputs(secondaryWeaponForm);
        });
    });

    SAInputList.forEach((attachmentInput, index) => {
        attachmentInput.addEventListener('input', () => {
            SAattachmentStats(attachmentInput, secondaryGunTypeInput.value, secondaryWeaponinput.value, index + 1)
            checkInputs(secondaryWeaponForm)
        });
    });

    perksList.forEach((perk) => {
        perk.addEventListener('input', () => {
            perksStats(perk);
        });
    });

    equipmentList.forEach((equip) => {
        equip.addEventListener('input', () => {
            equipmentStats(equip);
        });
    });
    
                                                                                // Populate Lethal options
    data.endpoints.weapons.response.lethal.forEach(lethal => {
        const optionLethal = document.createElement('option');
        optionLethal.value = lethal.name;
        lethalEquipment.appendChild(optionLethal);
    });

                                                                                // Populate tactical options
    data.endpoints.weapons.response.tactical.forEach(tactical => {
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
