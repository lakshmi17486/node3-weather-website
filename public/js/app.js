const weatherForm = document.querySelector('form');

const search = document.querySelector('input');
const errorMessage = document.querySelector('#error');
const result = document.querySelector('#result');
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchValue = search.value;
    errorMessage.textContent = '';
    result.textContent = '';
    // console.log(searchValue);
    fetch('http://localhost:3000/weather?address='+ searchValue).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                errorMessage.textContent = data.error;
                console.log(data.error);
            } else {
                result.textContent = data.address + ' - ' + data.forecast;
                console.log(data.address, data.forecast);
            }
        });
});
})