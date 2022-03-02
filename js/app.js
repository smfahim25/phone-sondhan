const toggoleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}
const NoResultsFound = displayStyle => {
    document.getElementById('no-results').style.display = displayStyle;
}
const writeSomething = displayStyle => {
    document.getElementById('write-something').style.display = displayStyle;
}
const searchPhone = () => {
    toggoleSpinner('block');
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    searchField.value = '';
    if (searchText == '') {
        writeSomething('block');
    }
    else {
        writeSomething('none');
        NoResultsFound('none');
        toggoleSpinner('none');
    }
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    // console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.data))
}
const displaySearchResult = phones => {
    document.getElementById('phone-details').innerHTML = '';
    const searchResult = document.getElementById('search-result');
    searchResult.innerHTML = '';
    if (!phones.length) {
        NoResultsFound('block');
        toggoleSpinner('block');
    }
    else {
        NoResultsFound('none');
    }
    const firstTwenty = phones.slice(0, 20);
    firstTwenty?.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = ` 
        <div class="card h-100 shadow rounded">
            <img class="container w-75 p-3" src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body ms-3">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text"> <span class="fw-bold">Brand:</span> ${phone.brand}</p>
            <a href="#" onclick="loadPhoneDetail('${phone.slug}')" class="btn btn-primary">Explore</a>
            </div>
        </div>
        `;
        searchResult.appendChild(div);
        toggoleSpinner('none');
    })
}
const loadPhoneDetail = phoneId => {
    // console.log(phoneId);
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data.data))
    toggoleSpinner('block');
}
const displayPhoneDetails = phone => {
    // console.log(phone);
    toggoleSpinner('block');
    const phoneDetails = document.getElementById('phone-details');
    const div = document.createElement('div');
    div.classList.add('card');
    phoneDetails.innerHTML = '';
    div.innerHTML = `
    <div class="row g-0 p-3">
        <div class="col-md-4 mt-5 p-3">
            <img src="${phone.image}" class="img-fluid rounded-start container" alt="">
        </div>
        <div class="col-md-8">
                <div class="card-body ms-2">
                    <h5 class="card-title fw-bolder">${phone.name}</h5>
                    <p class="card-text"> <span class="fw-bold">Brand:</span> ${phone.brand}.</p>
                    <p class="card-text"><span class="fw-bold">Release Date:</span> ${phone.releaseDate ? phone.releaseDate : 'Release Date Not Found'}.</p>
                    <h4 class="fw-bolder mt-2">Main Features:</h4>
                    <p class="card-text"><span class="fw-bold">Chipset:</span> ${phone.mainFeatures.chipSet}.</p>
                    <p class="card-text"><span class="fw-bold">Display Size:</span> ${phone.mainFeatures.displaySize}.</p>
                    <p class="card-text"><span class="fw-bold">Memory:</span> ${phone.mainFeatures.memory}.</p>
                    <p class="card-text"><span class="fw-bold">Storage:</span> ${phone.mainFeatures.storage}.</p> 
                    <p class="card-text"><span class="fw-bold">Storage:</span> ${phone.mainFeatures.sensors.join()}.</p>
                    <h4 class="fw-bolder mt-2">Others Features:</h4>
                    <p class="card-text"><span class="fw-bold">Bluetooth:</span> ${phone.others?.Bluetooth ? phone.others.Bluetooth : 'Data not Found'}.</p>
                    <p class="card-text"><span class="fw-bold">GPS:</span> ${phone.others?.GPS ? phone.others.GPS : 'Data not Found'}.</p>
                    <p class="card-text"><span class="fw-bold">NFC:</span> ${phone.others?.NFC ? phone.others.NFC : 'Data not Found'}.</p>
                    <p class="card-text"><span class="fw-bold">Radio:</span> ${phone.others?.Radio ? phone.others.Radio : 'Data not Found'}.</p>
                    <p class="card-text"><span class="fw-bold">USB:</span> ${phone.others?.USB ? phone.others.USB : 'Data not Found'}.</p>
                    <p class="card-text"><span class="fw-bold">WLAN:</span> ${phone.others?.WLAN ? phone.others.WLAN : 'Data not Found'}.</p>
                </div>
        </div>
    </div>
    `;
    phoneDetails.appendChild(div);
    toggoleSpinner('none');
}