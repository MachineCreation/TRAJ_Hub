document.addEventListener('DOMContentLoaded', function () { 

    const primaryWeaponForm = document.getElementById('primary-weapon-form');   // forms
    const secondaryWeaponForm = document.getElementById('secondary-weapon-form');

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
    const SATypeInputList = [SA1Typeinput, SA2Typeinput, SA3Typeinput, SA4Typeinput, SA5Typeinput];
    const SASugList = [SA1Sug, SA2Sug, SA3Sug, SA4Sug, SA5Sug];
    const SAInputList = [SA1, SA2, SA3, SA4, SA5];

    const perks1_2Equipment = document.getElementById('perks1_2-list');         // perks var
    const perks3Equipment = document.getElementById('perks3-list');
    const perks4Equipment = document.getElementById('perks4-list');

    const P1Input = document.getElementById('perks1');
    const P2Input = document.getElementById('perks2');
    const P3Input = document.getElementById('perks3');
    const P4Input = document.getElementById('perks4');

    const perksList = [P1Input, P2Input, P3Input, P4Input];
             
    const lethalEquipment = document.getElementById("lethal-equipment-list");   // equipment var
    const tacticalEquipment = document.getElementById("tactical-equipment-list");
    const lethalInput = document.getElementById('lethal');
    const tacticalInput = document.getElementById('tactical');
    
    const equipmentList = [lethalInput, tacticalInput];

    function checkInputs(formId) {                                              // set initial enabled state for inputs 
        const inputs = formId.querySelectorAll('input[type="text"]');
    
        inputs.forEach((input, index) => {
            input.disabled = index > 0 && inputs[index - 1].value.trim() === "";
        });
    };

    // Utility function to fetch data from the new API
    const fetchData = async (endpoint) => {
        try {
            const response = await fetch(`/api-proxy/${endpoint}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("An error occurred while fetching data:", error);
            return null;
        }
    }

    // Populate gun type datalists
    const populateGunTypeLists = async () => {
        const data = await fetchData('/weapon-types');
        if (data && data.weapon_types) {
            data.weapon_types.forEach(gunClass => {
                const optionPrimary = document.createElement('option');
                optionPrimary.value = gunClass;
                primaryGunTypeSug.appendChild(optionPrimary);

                const optionSecondary = document.createElement('option');
                optionSecondary.value = gunClass;
                secondaryGunTypeSug.appendChild(optionSecondary);
            });
        }
    };

    const weaponslist = async (weaponSlot, gunType) => {  // Populate gun lists
        weaponSlot.innerHTML = '';
        const data = await fetchData(`/weapons/${gunType}`);
        if (data && data.weapons) {
            data.weapons.forEach(gun => {
                const option = document.createElement('option');
                option.value = gun;
                weaponSlot.appendChild(option);
            });
        }
    };

    const attachmentTypeList = async (sugList, weapon, weaponType, form) => {  // Populate attachment types and weapon stats
        sugList.innerHTML = '';
        const data = await fetchData(`/weapon/${weaponType}/${weapon}`);
        if (data && data.attachment_types) {
            data.attachment_types.forEach(type => {
                const typeOption = document.createElement('option');
                typeOption.value = type;
                sugList.appendChild(typeOption);
            });
        }
        const weaponStatsSelect = form.querySelector('input[class="weapon_stats"]');
        weaponStatsSelect.value = JSON.stringify(data.stats || {});
    };

    const attachmentList = async (attachmentSugList, weaponType, weapon, attachmentType, form) => {  // Populate specific gun attachments
        const data = await fetchData(`/attachment_type/${weaponType}/${weapon}/${attachmentType}`);
        if (data && data.attachments) {
            const fragment = document.createDocumentFragment();
            data.attachments.forEach(attachment => {
                const attachmentOption = document.createElement('option');
                attachmentOption.value = attachment;
                fragment.appendChild(attachmentOption);
            });
            attachmentSugList.replaceChildren(fragment);
            checkInputs(form);
        }
    };

    const PAattachmentStats = async (attachment, weaponType, weapon, index) => {  // Get primary attachment stats
        const attachType = document.getElementById(`PA${index}-type`);
        const data = await fetchData(`/attachment/${weaponType}/${weapon}/${attachType.value}/${attachment.value}`);
        const statsInput = document.getElementById(`PA${index}-stats`);
        statsInput.value = JSON.stringify(data.stats || {"stats": "none"});
    };

    const SAattachmentStats = async (attachment, weaponType, weapon, index) => {  // Get secondary attachment stats
        const attachType = document.getElementById(`SA${index}-type`);
        const data = await fetchData(`/attachment/${weaponType}/${weapon}/${attachType.value}/${attachment.value}`);
        const statsInput = document.getElementById(`SA${index}-stats`);
        statsInput.value = JSON.stringify(data.stats || {"stats": "none"});
    };

    const equipmentStats = async (slot) => {   // Get equipment stats
        const equipName = slot.getAttribute('name');
        const data = await fetchData(`/${equipName}/${slot.value}`);
        const equipStatsInput = document.getElementById(`${equipName}-stats`);
        equipStatsInput.value = JSON.stringify(data.description || {"stats": "none"});
    };

    const perksStats = async (slot) => {  // Get perks stats
        const perkName = slot.getAttribute('name');
        let endpoint = '';

        if (perkName === 'perks1' || perkName === 'perks2') {
            endpoint = `/perks1_2/${slot.value}`;
        } else if (perkName === 'perks3') {
            endpoint = `/perks3/${slot.value}`;
        } else if (perkName === 'perks4') {
            endpoint = `/perks4/${slot.value}`;
        }

        const data = await fetchData(endpoint);
        const perkStatsInput = document.getElementById(`${perkName}-stats`);
        perkStatsInput.value = JSON.stringify(data.description || {"stats": "none"});
    };

    primaryGunTypeInput.addEventListener('input', () => {  // Input event listeners
        weaponslist(primaryWeaponSug, primaryGunTypeInput.value);
        checkInputs(primaryWeaponForm);
    });

    primaryWeaponinput.addEventListener('input', () => {
        attachmentTypeList(PATypeSug, primaryWeaponinput.value, primaryGunTypeInput.value, primaryWeaponForm);
        checkInputs(primaryWeaponForm);
    });

    PATypeInputList.forEach((type, index) => {
        type.addEventListener('input', () => {
            attachmentList(PASugList[index], primaryGunTypeInput.value, primaryWeaponinput.value, type.value, primaryWeaponForm);
            checkInputs(primaryWeaponForm);
        });
    });

    PAInputList.forEach((attachmentInput, index) => {
        attachmentInput.addEventListener('input', () => {
            PAattachmentStats(attachmentInput, primaryGunTypeInput.value, primaryWeaponinput.value, index + 1);
            checkInputs(primaryWeaponForm);
        });
    });

    secondaryGunTypeInput.addEventListener('input', () => {
        weaponslist(secondaryWeaponSug, secondaryGunTypeInput.value);
        checkInputs(secondaryWeaponForm);
    });

    secondaryWeaponinput.addEventListener('input', () => {
        attachmentTypeList(SATypeSug, secondaryWeaponinput.value, secondaryGunTypeInput.value, secondaryWeaponForm);
        checkInputs(secondaryWeaponForm);
    });

    SATypeInputList.forEach((type, index) => {
        type.addEventListener('input', () => {
            attachmentList(SASugList[index], secondaryGunTypeInput.value, secondaryWeaponinput.value, type.value, secondaryWeaponForm);
            checkInputs(secondaryWeaponForm);
        });
    });

    SAInputList.forEach((attachmentInput, index) => {
        attachmentInput.addEventListener('input', () => {
            SAattachmentStats(attachmentInput, secondaryGunTypeInput.value, secondaryWeaponinput.value, index + 1);
            checkInputs(secondaryWeaponForm);
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
    const populateLethalOptions = async () => {
        const data = await fetchData('/Lethal-equipment');
        if (data && data.Lethal_equipment) {
            data.Lethal_equipment.forEach(lethal => {
                const optionLethal = document.createElement('option');
                optionLethal.value = lethal;
                lethalEquipment.appendChild(optionLethal);
            });
        }
    };

    // Populate Tactical options
    const populateTacticalOptions = async () => {
        const data = await fetchData('/tactical-equipment');
        if (data && data.tactical_equipment) {
            data.tactical_equipment.forEach(tactical => {
                const optionTactical = document.createElement('option');
                optionTactical.value = tactical;
                tacticalEquipment.appendChild(optionTactical);
            });
        }
    };

    // Populate Perks 1 & 2 options
    const populatePerks1_2Options = async () => {
        const data = await fetchData('/perks1_2/names');
        if (data && data.perks1_2_names) {
            data.perks1_2_names.forEach(perk => {
                const optionPerk = document.createElement('option');
                optionPerk.value = perk;
                perks1_2Equipment.appendChild(optionPerk);
            });
        }
    };

    // Populate Perks 3 options
    const populatePerks3Options = async () => {
        const data = await fetchData('/perks3/names');
        if (data && data.perks3_names) {
            data.perks3_names.forEach(perk => {
                const optionPerk = document.createElement('option');
                optionPerk.value = perk;
                perks3Equipment.appendChild(optionPerk);
            });
        }
    };

    // Populate Perks 4 options
    const populatePerks4Options = async () => {
        const data = await fetchData('/perks4/names');
        if (data && data.perks4_names) {
            data.perks4_names.forEach(perk => {
                const optionPerk = document.createElement('option');
                optionPerk.value = perk;
                perks4Equipment.appendChild(optionPerk);
            });
        }
    };

    // Initialize and populate lists
    populateGunTypeLists();
    populateLethalOptions();
    populateTacticalOptions();
    populatePerks1_2Options();
    populatePerks3Options();
    populatePerks4Options();
});