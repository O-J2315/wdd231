const topics = [
    {
        topic: 'streches',
        detail: 'A stretch is a section delimited usualy ' +
            'by two terminal posts on each side. Do not forget to include angles of sides!'
    },
    {
        topic: 'terminals',
        detail: 'Terminal posts are set to be stretch points and are usually wider and taller. Count Every Corner!'
    },
    {
        topic: 'fence-height',
        detail: 'Chain Link Fabric Height!'
    },
    {
        topic: 'gauge',
        detail: 'Gauge is the width of the chainlink fabric. The lower -> the tickest'
    },
    {
        topic: 'grade-finish',
        detail: 'Grade defines the tickness of the chainlink and roboustnes. Finish is simply the color!'
    },
    {
        topic: 'gates',
        detail: 'To calculate correclty, enter the width of the gate and the number of gates of that same widht.' +
            ' Only use the other section if you have a different kind of gate in the same project.'
    },
    {
        topic: 'barbwire',
        detail: 'Adding barb-wire on top will add one extra feet height to terminal posts and 3 lines of barb-wire for more security!'
    },
    {
        topic: "privacyslats",
        detail: 'Very clever to add privacy! Do not let your neighbor know your next move!'
    }
]

document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.querySelector('.toggle-button');
    const navbarLinks = document.querySelector('.navbar-links');
    toggleButton.addEventListener('click', () => {
        navbarLinks.classList.toggle('show');
        toggleButton.classList.toggle('active');
    });
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => { if (link.getAttribute('href') === currentPage) { link.classList.add('current'); } });

    const lastModifiedElement = document.getElementById('lastModified');
    const lastModifiedDate = document.lastModified;
    lastModifiedElement.innerHTML = `Last Update: ${lastModifiedDate}`;
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    document.getElementById("currentYear").textContent = ` ${year}`;
});


// Variables
const types = ['commercial', 'residential'];
const heights = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
const gauges = [11.5, 11, 9, 8];
const grades = ['Commercial', 'Residential', 'Industrial'];
const finishes = ['Galvanized', 'Black', 'Green'];
const slats = ['Beige', 'Black', 'Brown', 'Gray', 'Green', 'Redwood', 'Royal Blue', 'Sky Blue', 'White', 'Yellow'];


//Select instancing 
const heightElement = document.getElementById('height');
heights.forEach(height => {
    const option = document.createElement('option');
    option.value = height;
    option.textContent = height;
    heightElement.appendChild(option);
});

const gaugeElement = document.getElementById('gauge');
gauges.forEach(gauge => {
    const option = document.createElement('option');
    option.value = gauge;
    option.textContent = gauge;
    gaugeElement.appendChild(option);
});

const gradeElement = document.getElementById('grade');
grades.forEach(grade => {
    const option = document.createElement('option');
    option.value = grade;
    option.textContent = grade;
    gradeElement.appendChild(option);
});

const finishElement = document.getElementById('finish');
finishes.forEach(finish => {
    const option = document.createElement('option');
    option.value = finish;
    option.textContent = finish;
    finishElement.appendChild(option);
});

const slatsElement = document.getElementById('slatType');
slats.forEach(slatColor => {
    const option = document.createElement('option');
    option.value = slatColor;
    option.textContent = slatColor;
    slatsElement.appendChild(option);
});

function toggleSlatType() {
    const checkBox = document.getElementById("privacyCheck");
    const slatType = document.getElementById("slatType");
    const slatTypeLabel = document.getElementById("slatTypeLabel");

    if (checkBox.checked) {
        slatType.style.display = "block";
        slatTypeLabel.style.display = "block";
    } else {
        slatType.style.display = "none";
        slatTypeLabel.style.display = "none";
    }
}

document.getElementById('resetButton').addEventListener('click', () => {
    const form = document.getElementById("myForm");
    form.reset();
    console.log("Form has been reset");
    console.clear();

    // Clear all result areas
    clearResultAreas();

    // Hide results initially
    document.getElementById('results').setAttribute('class', 'resultsHidden');
});

const clearResultAreas = () => {
    const resultIds = ['fabricPara', 'frameworkPara', 'fittingsPara', 'tiesPara', 'tensionwirePara', 'concretePara', 'barbwirePara', 'gatesPara', 'slatsPara'];
    resultIds.forEach(id => {
        document.getElementById(id).textContent = '';
    });
};

let StretchLinearLength = 0;
let stretchCounter = 0;

document.getElementById('submit').addEventListener('click', (event) => {
    event.preventDefault();

    // Reset previous results and inputs
    StretchLinearLength = 0;
    stretchCounter = 0;

    // Collect input values and update StretchLinearLength
    for (let i = 1; i <= 10; i++) {
        const value = document.getElementById(`s${i}`).value.trim();
        if (value && !isNaN(value)) {
            StretchLinearLength += parseFloat(value);
            stretchCounter += 1;
        }
    }

    // Show results after calculations
    document.getElementById('results').setAttribute('class', 'resultsDisplay');

    const chainlinkHeight = parseInt(document.getElementById('height').value);
    const fabricGauge = document.getElementById('gauge').value;
    const terminalPosts = parseInt(document.getElementById('tPosts').value);
    const isCommercial = document.getElementById('grade').value === 'commercial';

    let chainlinkTotalArea = chainlinkHeight * StretchLinearLength;
    let privacySlatsBags = Math.ceil(StretchLinearLength / 10);
    const fabricRolls = Math.ceil(StretchLinearLength / 50);
    const topRails = Math.ceil(StretchLinearLength / 21);
    let linePosts = Math.round(StretchLinearLength / 10) - (stretchCounter - 1);


    // Handle Barb Wire and Privacy Slats
    let barbWireHtml = getBarbWireHtml();
    let privacySlatsHtml = getPrivacySlatsHtml(privacySlatsBags);

    // Handle Post Dimensions Based on Commercial/Residential
    let { linePostsWidth, terminalPostsWidth, terminalPostsHeight } = getPostDimensions(isCommercial, chainlinkHeight);

    // Generate HTML for results
    document.getElementById('fabricPara').innerHTML = generateFabricHtml(fabricRolls, chainlinkHeight, fabricGauge, StretchLinearLength);
    document.getElementById('frameworkPara').innerHTML = generateFrameworkHtml(linePosts, linePostsWidth, terminalPosts, terminalPostsWidth, terminalPostsHeight, chainlinkHeight, topRails);
    document.getElementById('fittingsPara').innerHTML = generateFittingsHtml(linePosts, terminalPosts, stretchCounter, chainlinkHeight, linePostsWidth, terminalPostsWidth);
    document.getElementById('tiesPara').innerHTML = generateTiesHtml(linePosts, StretchLinearLength, chainlinkHeight, linePostsWidth);
    document.getElementById('tensionwirePara').innerHTML = generateTensionWireHtml(StretchLinearLength);
    document.getElementById('concretePara').innerHTML = generateConcreteHtml(linePosts, terminalPosts);
    document.getElementById("barbwirePara").innerHTML = barbWireHtml;
    document.getElementById('slatsPara').innerHTML = privacySlatsHtml;

    // Gate-related logic
    const gateParams = handleGates(chainlinkHeight); // Collect necessary gate info
    calculatePrice(
        chainlinkTotalArea,
        linePosts,
        terminalPosts,
        chainlinkHeight,
        privacySlatsBags,
        isCommercial,
        gateParams // Pass the gate params here
    );
});

const getBarbWireHtml = () => {
    const barbWireCheck = document.getElementById("barbWireCheck");
    if (barbWireCheck.checked) {
        return `<p><strong>${StretchLinearLength * 3}ft</strong> Barb Wire </p>`;
    }
    return '<p><strong>No Barb Wire</strong></p>';
};

const getPrivacySlatsHtml = (privacySlatsBags) => {
    if (document.getElementById("privacyCheck").checked) {
        return `<p><strong>${privacySlatsBags}</strong> Privacy Slats Bags</p>
                <p><strong>Color ${document.getElementById('slatType').value}</strong> Privacy Slats</p>`;
    }
    return '<p><strong>No Privacy Slats</strong></p>';
};

const getPostDimensions = (isCommercial, chainlinkHeight) => {
    let linePostsWidth = "1-7/8";
    let terminalPostsWidth = "2-3/8";
    let terminalPostsHeight = chainlinkHeight + 2;

    if (isCommercial) {
        linePostsWidth = "2-3/8";
        terminalPostsWidth = "2-7/8";
        terminalPostsHeight = chainlinkHeight + 2;
    } else {
        terminalPostsHeight = chainlinkHeight + 2;
    }

    // console.log('Returned post dimensions:', { linePostsWidth, terminalPostsWidth, terminalPostsHeight });
    return { linePostsWidth, terminalPostsWidth, terminalPostsHeight };
};

const generateFabricHtml = (fabricRolls, chainlinkHeight, fabricGauge, StretchLinearLength) => {
    return `<p><strong>${fabricRolls}</strong> -> ${chainlinkHeight}' high x ${fabricGauge}ga. Chain Link Fabric. 50' Roll. For ${StretchLinearLength}ft Chain Link</p>`;
};

const generateFrameworkHtml = (linePosts, linePostsWidth, terminalPosts, terminalPostsWidth, terminalPostsHeight, chainlinkHeight, topRails) => {
    return `<p><strong>${topRails}</strong> -> 1-5/8" x 21' Top Rails • SS20 </p>
            <p><strong id="linePostsLine">${linePosts}</strong> -> ${linePostsWidth} x ${chainlinkHeight + 2}' Line Posts • SS20 </p>
            <p><strong>${terminalPosts}</strong> -> ${terminalPostsWidth} x ${terminalPostsHeight}' Terminal Posts • CQ40 </p>`;
};

const generateFittingsHtml = (linePosts, terminalPosts, stretchCounter, chainlinkHeight, linePostsWidth, terminalPostsWidth) => {
    const braceBands = 4 * stretchCounter;
    const tensionBands = (chainlinkHeight - 1) * (stretchCounter * 2);

    return `<p><strong>${linePosts}</strong> -> Eye Tops / Barb Arms - ${linePostsWidth}</p>
            <p><strong>${terminalPosts}</strong> -> Post Caps - ${terminalPostsWidth}</p>
            <p><strong>${braceBands}</strong> -> ${terminalPostsWidth} Brace Bands - Round</p>
            <p><strong>${stretchCounter * 2}</strong> -> Rail Ends - 1-5/8"</p>
            <p><strong>${stretchCounter * 2}</strong> -> ${chainlinkHeight}' Tension Bars</p>
            <p><strong>${tensionBands}</strong> -> Tension Bands - ${terminalPostsWidth}</p>
            <p><strong>${tensionBands + braceBands}</strong> -> Carriage Bolts & Nuts</p>`;
};

const generateTiesHtml = (linePosts, StretchLinearLength, chainlinkHeight, linePostsWidth) => {
    return `<p><strong>${StretchLinearLength}</strong> -> Easy Twist Ties - 1-5/8"</p>
            <p><strong>${chainlinkHeight * linePosts}</strong> -> Easy Twist Ties - ${linePostsWidth}</p>
            <p><strong>${StretchLinearLength}</strong> -> Hog Ring Ties</p>`;
};

const generateTensionWireHtml = (StretchLinearLength) => {
    return `<p><strong>${StretchLinearLength}</strong>ft -> Tension Wire</p>`;
};

const generateConcreteHtml = (linePosts, terminalPosts) => {
    return `<p><strong>${(linePosts + terminalPosts) * 2}</strong> -> 50lbs Fast Setting Concrete Bags</p>`;
};

const handleGates = (chainlinkHeight) => {
    let gatesHtml = '';

    // Retrieve values for number of gates, gate types, and gate widths
    const numGates01 = parseInt(document.getElementById('gates01').value) || 0; // Default to 0 if not a valid number
    const numGates02 = parseInt(document.getElementById('gates02').value) || 0;
    const gate1Type = document.querySelector('input[name="gate1Type"]:checked')?.value;
    const gate2Type = document.querySelector('input[name="gate2Type"]:checked')?.value;
    const widthGates01 = parseFloat(document.getElementById("widthGate1").value) || 0; // Default to 0 if not a valid number
    const widthGates02 = parseFloat(document.getElementById("widthGate2").value) || 0;

    // Generate HTML for Gate 1
    if (numGates01 > 0) {
        gatesHtml += generateGateHtml(gate1Type, numGates01, widthGates01, chainlinkHeight);
    } else {
        gatesHtml += `<p><strong>No gates for Gate 1</strong></p>`;
    }

    // Generate HTML for Gate 2
    if (numGates02 > 0) {
        gatesHtml += generateGateHtml(gate2Type, numGates02, widthGates02, chainlinkHeight);
    } else {
        gatesHtml += `<p><strong>No gates for Gate 2</strong></p>`;
    }

    // Insert gates HTML into the document
    document.getElementById("gatesPara").innerHTML = gatesHtml;

    // Return all the necessary parameters as an object
    return {
        numGates01,
        numGates02,
        gate1Type,
        gate2Type,
        widthGates01,
        widthGates02,
    };
};

const generateGateHtml = (gateType, numGates, gateWidth, chainlinkHeight) => {
    if (gateType === 'rolling') {
        return `<p><strong>Fittings for ${numGates} ${gateType} gate ${gateWidth}ft x ${chainlinkHeight}ft</strong></p>
                <p><strong>${numGates * 2}</strong> -> Wheels with Brackets</p>
                <p><strong>${numGates * 2 * 3}</strong> -> Rail Connectors with Brackets</p>
                <p><strong>${numGates}</strong> -> Gate latch with hole</p>`;
    } else if (gateType === 'door') {
        return `<p><strong>Fittings for ${numGates} ${gateType} gate ${gateWidth}ft x ${chainlinkHeight}ft</strong></p>
                <p><strong>${numGates * 2}</strong> -> 180° Hinge Brackets</p>
                <p><strong>${numGates}</strong> -> Gate latch with hole</p>`;
    }
    return '';
};

const calculatePrice = (chainlinkTotalArea, linePosts, terminalPosts, chainlinkHeight, privacySlatsBags, isCommercial, gateParams) => {
    const residentialSQFT = 2.26;
    const residentialTerminalPost = 8.33;
    const residentialChainLinkGate = 23.31;
    const residentialLabor = 550;

    const commercialSQFT = 3.06;
    const commercialTerminalPost = 10.09;
    const commercialChainLinkGate = 21.65;
    const commercialLabor = 416.25;

    const BLPrivacySlats = 3.33;

    let chainLinkCost = 0;
    let terminalPostsCost = 0;
    let laborCost = 0;
    let slatsCost = 0;
    let gatesCost = 0;
    let totalCost = 0;

    const { numGates01, numGates02, widthGates01, widthGates02 } = gateParams;

    // Check if privacy slats are selected
    const addSlats = document.getElementById('privacyCheck')?.checked;

    // Perform calculations based on whether it's a commercial or residential project
    if (isCommercial) {
        chainLinkCost = chainlinkTotalArea * commercialSQFT;
        terminalPostsCost = terminalPosts * (chainlinkHeight + 2) * commercialTerminalPost;
        laborCost = commercialLabor;
        if (addSlats) {
            slatsCost = chainlinkTotalArea * BLPrivacySlats;
        }
        gatesCost = calculateGatesCost(numGates01, numGates02, widthGates01, widthGates02, commercialChainLinkGate, chainlinkHeight);
        totalCost = chainLinkCost + terminalPostsCost + laborCost + slatsCost + gatesCost;
    } else {
        chainLinkCost = chainlinkTotalArea * residentialSQFT;
        terminalPostsCost = terminalPosts * (chainlinkHeight + 2) * residentialTerminalPost;
        laborCost = residentialLabor;
        if (addSlats) {
            slatsCost = chainlinkTotalArea * BLPrivacySlats;
        }
        gatesCost = calculateGatesCost(numGates01, numGates02, widthGates01, widthGates02, residentialChainLinkGate, chainlinkHeight);
        totalCost = chainLinkCost + terminalPostsCost + laborCost + slatsCost + gatesCost;
    }

    console.log(gatesCost);
    console.log(totalCost);

    // Update HTML with calculated prices
    updatePriceDisplay(chainLinkCost, terminalPostsCost, laborCost, slatsCost, gatesCost, totalCost);
};

const calculateGatesCost = (numGates01, numGates02, widthGates01, widthGates02, gateCost, chainlinkHeight) => {
    console.log(gateCost);
    console.log(chainlinkHeight);
    console.log(numGates01);
    console.log(numGates02);
    console.log(widthGates01);
    console.log(widthGates02);

    // Calculate costs for both Gate 1 and Gate 2
    let costGates1 = 0;
    let costGates2 = 0;

    if (numGates01 <= 0) {
        costGates1 = 0;
    } else {
        costGates1 = numGates01 * widthGates01 * chainlinkHeight * gateCost;
    }

    if (numGates02 <= 0) {
        costGates2 = 0;
    } else {
        costGates2 = numGates02 * widthGates02 * chainlinkHeight * gateCost;
    }

    console.log(costGates1);
    console.log("Gate cost: " + (costGates1 + costGates2));

    // Return the total gate cost
    return costGates1 + costGates2;
};

const updatePriceDisplay = (chainLinkCost, terminalPostsCost, laborCost, slatsCost, gatesCost, totalCost) => {
    document.getElementById('chainLinkCostPara').innerHTML = `<p><strong>$${chainLinkCost.toFixed(2)}</strong> -> Chain Link Cost</p>`;
    document.getElementById('terminalPostsCostPara').innerHTML = `<p><strong>$${terminalPostsCost.toFixed(2)}</strong> -> Terminal Posts Cost</p>`;
    document.getElementById('laborCostPara').innerHTML = `<p><strong>$${laborCost.toFixed(2)}</strong> -> Labor Cost</p>`;
    document.getElementById('slatsCostPara').innerHTML = `<p><strong>$${slatsCost.toFixed(2)}</strong> -> Slats Cost</p>`;
    document.getElementById('gatesCostPara').innerHTML = `<p><strong>$${gatesCost.toFixed(2)}</strong> -> Gates Cost</p>`;
    document.getElementById('totalCostPara').innerHTML = `<p><strong>$${totalCost.toFixed(2)}</strong> -> Total Cost</p>`;
};


function displaySupportingDetails(selectedTopic) {
    let modalContent = document.getElementById("supporting-details");
    modalContent.innerHTML = '';

    const topic = topics.find(topic => topic.topic === selectedTopic);

    if (topic) {
        modalContent.innerHTML = `
        <button id="closeModalButton">❌</button>
        <h2>Details:</h2>
        <p>${topic.detail}</p>
        `;
    } else {
        modalContent.innerHTML = `<p>Nothing to be displayed at this time!</p>`;
    }

    document.getElementById("supporting-details").showModal();

    document.getElementById("closeModalButton").addEventListener("click", () => {
        document.getElementById("supporting-details").close();
    });
}