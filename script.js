
function populateDropdowns() {
    const fromSelect = document.querySelector(".from select");
    const toSelect = document.querySelector(".to select");

    // now were dynamically builindg our options yey ✌
    let optionsHTML = "";
    Object.keys(countryList).forEach((currencyCode, index) => {
        optionsHTML += `<option id="${index}" value="${currencyCode}">${currencyCode}</option>`;
    });

    // Populate both from and to 
    fromSelect.innerHTML = optionsHTML;
    toSelect.innerHTML = optionsHTML;
}

// Calling  the function to populate the options  
populateDropdowns();

function getSelectedValues() {
    const fromSelect = document.querySelector(".from select");
    const toSelect = document.querySelector(".to select");
    const amount = document.querySelector("#inputAmt").value;

    // Get the selected values
    const fromCurr = fromSelect.value;
    const toCurr = toSelect.value;

    console.log("From Currency:", fromCurr);
    console.log("To Currency:", toCurr);
    console.log(amount);
    return { fromCurr, toCurr , amount };
}

//we will Call this function when the "Convert" button is clicked
async function convertRates() {
    const { fromCurr, toCurr ,amount } = getSelectedValues();
    const ans = document.querySelector(".finalAmt");
    let response = await fetch(`https://api.exconvert.com/convert?access_key=cb70f9ec-d20814ad-fbd94b88-039a13f1&from=${fromCurr}&to=${toCurr}&amount=${amount}`);
    let data  =await response.json();
    console.log(response);
    console.log(data);
    let finalAmt = data.result[toCurr];
    finalAmt = finalAmt.toFixed(5);
    console.log(finalAmt);
    ans.textContent=`${amount} ${fromCurr} = ${finalAmt} ${toCurr}`;
}

document.querySelector("button").addEventListener("click", (event) => {
    event.preventDefault(); // Prevent form submission directly the form tag 
    convertRates();
});