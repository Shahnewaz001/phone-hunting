const loadPhone = async (searchText)=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhoes(phones);
}
const displayPhoes = phones =>{
    console.log(phones);

    const phoneContainer = document.getElementById('phone-container');
    //clear phone container befor adding new cards
    phoneContainer.textContent='';

    //display show all button if there are more than 9 phones
    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length >9){
        showAllContainer.classList.remove('hidden');
    }else{
        showAllContainer.classList.add('hidden')
    }

    //display only first 9 phones
    phones =phones.slice(0,9);
    
    phones.forEach(phone =>{
        // console.log(phone);
        //create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList =`card p-4 shadow-xl bg-gray-100 m-4`;
        phoneCard.innerHTML=`
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>use iphone and be the smartest person</p>
          <div class="card-actions justify-end">
            <button onclick="hendleShowDetails('${phone.slug}')" class="btn btn-primary">Show details</button>
          </div>
        </div>
        `
        phoneContainer.appendChild(phoneCard)
    })

    toggleLoadingSpinner(false)
}

 const hendleShowDetails =async(id)=>{
     //console.log('clicked show details:',id);
     //loaded data:
     const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
     const data = await res.json();
     const phone = data.data;
     showPhoneDetails(phone);
 }

const showPhoneDetails = (phone)=>{
    console.log(phone);
    const phoneName = document.getElementById('show-detail-phone-name');
    phoneName.innerText =phone.name;
    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML=`
    <img src="${phone.image}" alt=""/>
    <p>${phone.brand}</p>
    <p><span>storage:</span>${phone?.mainFeatures?.storage}</p>
    <p><span>storage:</span>${phone.mainFeatures.memory}</p>
    <p>${phone?.mainFeatures?.displaySize}</p>
    <p>${phone?.releaseDate}</p>
    `


    //show the modal
    show_details_modal. showModal();
}


//search button
const hendleSearch = () =>{
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText);
}

const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden')
    }else{
        loadingSpinner.classList.add ('hidden')
    }
}



// loadPhone();

