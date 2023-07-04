import './style.scss';

const baseUrl = 'http://localhost:3000/fruits';

let fruits;
const searchInput = document.querySelector('.search');
const searchOptions = document.querySelector('.options');
function onResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

fetch(baseUrl)
    .then(onResponse)
    .then(data => {
        fruits = data;
    });

function getOptions(word, fruits) {
    const regex = new RegExp(word, 'gi');
    return fruits.filter(fruit => {
        // Check if entered word matches fruit name inside fruits array
        return fruit.name.match(regex);
    })
}

const displayOptions = (event) => {

    const options = getOptions(event.target.value, fruits);
    const html = options
        .map(fruit => {
            const regex = new RegExp(event.target.value, 'gi');
            const fruitName = fruit.name.replace(regex, matched =>
                `<span class="hl">${matched}</span>`
            )

            return `<li class="options__item"><span class="options__item-name">${fruitName}</span></li>`;
        })
        .slice(0, 10)
        .join('');

    searchOptions.innerHTML = event.target.value ? html : null;
};

searchInput.addEventListener('change', displayOptions);
searchInput.addEventListener('keyup', displayOptions);
searchInput.addEventListener('click', (evt) => {
    if (evt.target.value) {
        const len = evt.target.value.length;
        evt.target.setSelectionRange(0, len);
    }
    searchOptions.classList.add('show');
});
searchInput.addEventListener('focusin', () => searchOptions.classList.add('show'));
searchInput.addEventListener('focusout', () => {
    searchOptions.classList.remove('show');
});
