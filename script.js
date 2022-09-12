const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

//Fetch random user and generate random money
async function getRandomUser() {
    const response = await fetch('https://randomuser.me/api');
    const data = await response.json();
    // console.log(data);
    const user = data.results[0];
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    };
    // console.log(newUser);
    addData(newUser);
}

//add newUser to data[]
function addData(obj) {
    data.push(obj);

    updateDOM();
}

function doubleMoney() {
    data = data.map((user) => {
        return { ...user, money: user.money * 2 };
    });

    updateDOM();
}

function sortByRichest() {
    data.sort((a, b) => {
        return b.money - a.money;
    });

    updateDOM();
}

function showMillionaires() {
    data = data.filter(user => user.money > 1000000);

    updateDOM();
}

function calculateWealth() {
    const total = data.reduce((acc, user) => (acc += user.money), 0);

    const totalEl = document.createElement('div');
    totalEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(total)}</strong></h3>`;
    main.appendChild(totalEl);
}

function updateDOM(providedData = data) { //here data[] is default parameter
    //clear main div
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

    providedData.forEach((person) => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${person.name}</strong> ${formatMoney(person.money)}`;
        main.appendChild(element);
    });
}

function formatMoney(money) {
    return '$' + money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

//Event listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);