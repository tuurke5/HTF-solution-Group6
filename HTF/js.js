let caughtPokemon = []
document.addEventListener("DOMContentLoaded", init);

function init(){
  showSuspects();
}

function showSuspects(){
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("https://htf-2021.zinderlabs.com/suspect", requestOptions)
        .then(response => response.json())
        .then(result => {
            let res = ``;
            result.forEach(el => {
                res += `
                <li id="${el.id}" class="sus"> ${el.name}
                    <img src="${el.imgSrc}" alt="${el.name}" title="${el.name}"/>
                </li>` 
            });
            document.querySelector("#suspects").innerHTML = res;
        })
        .then(document.querySelectorAll(".sus").forEach(item => {
            item.addEventListener('click',showOneSuspect);  
          }))
        .catch(error => console.log('error', error)); 
}

function showOneSuspect(e){
    e.preventDefault();
    console.log(e); 
}