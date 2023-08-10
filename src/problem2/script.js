const formTabs = {
    'home': 0,
    'otp': 1
}

let currentTab = formTabs['home'];

function confirmTransaction() {
    if (validateETHAddress() && validateAmount()) {
        showTab(formTabs['otp']);
    }
}

document.getElementById('confirmBtn').addEventListener('click', confirmTransaction);

function sendTokens() {
    if (validateOTP()) {
        const loadFor = 1800
        showLoader(loadFor);
        setTimeout(() => {
            showFinished();
        }, loadFor)

    }
}

document.getElementById('sendTokensBtn').addEventListener('click', sendTokens);

function showLoader(milliseconds) {
    const main = document.getElementById("main");
    const loader = document.getElementById("loader");
    main.classList.add("blur");
    loader.classList.remove("hidden");
    setTimeout(() => {
        main.classList.remove("blur");
        loader.classList.add("hidden");
    }, milliseconds);
}

function showFinished() {
    const main = document.getElementById("main");
    const checkmark = document.getElementById("checkmark");
    const checkbox = document.getElementById("checkbox");

    main.classList.add("blur");
    checkmark.classList.remove("hidden");
    checkbox.classList.remove("hidden");
    setTimeout(() => {
        location.reload();
    }, 1500)
}

function showTab(n) {
    const tabs = document.getElementsByClassName("form-tab");
    tabs[currentTab].classList.add("hidden");
    tabs[n].classList.remove("hidden");
    currentTab = n;

    showLoader(1500);
}

function validateETHAddress() {
    const input = document.getElementById("input-address");
    let valid = ethers.utils.isAddress(input.value);

    if (!valid) { input.classList.add("invalid"); }

    return valid;
}

function validateAmount() {
    const input = document.getElementById("input-amount");
    let valid = input.value != "" && Number.parseFloat(input.value) >= 0;

    if (!valid) { input.classList.add("invalid"); }

    return valid;
}

function validateOTP() {
    const inputs = document.getElementsByClassName("otp-input");

    let valid = true;
    for (const input of inputs) {
        if (isNaN(input.value) || input.value == "" || input.value < 0 || input.value > 9) {
            valid = false;
            input.classList.add("invalid");
        }
    }

    return valid;
}
