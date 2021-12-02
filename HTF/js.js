document.addEventListener("DOMContentLoaded", init);

function init(){
  showSuspects();
}

async function showSuspects(){
      var myHeaders = new Headers();
      myHeaders.append("userId", "matrixcoders991");
  
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      var cars;
      await fetch("https://htf-2021.zinderlabs.com/car", requestOptions)
        .then(response => response.json())
        .then(result => cars = result)
        .catch(error => console.log('error', error));

      var motives;
      await fetch("https://htf-2021.zinderlabs.com/motive/", requestOptions)
      .then(response => response.json())
      .then(result => motives = result)
      .catch(error => console.log('error', error));

      var alibis;
      await fetch("https://htf-2021.zinderlabs.com/alibi", requestOptions)
      .then(response => response.json())
      .then(result => alibis = result)
      .catch(error => console.log('error', error));

      
      
      await fetch("https://htf-2021.zinderlabs.com/suspect", requestOptions)
        .then(response => response.json())
        .then(result => {
            let suspects = ``;
            result.forEach(el => {
                let lp = cars.find(el2 => el2.owner === el.name)
                if(lp == null){
                  lp = "no car found"
                }
                let mtv = motives.find(el3 => el3.suspectId === el.id)
                if(mtv == null){
                  mtv= {text:"no motive"}
                }
                let alb = alibis.find(el4 => el4.suspectId === el.id)
                if(alb == null){
                  alb= {description:"geen alibi 🧐"}
                }
                suspects += `
                <div class="col s2" id="${el.id}" style="height:60rem;">
                  <div class="card">
                    <div class="card-image">
                      <img src="${el.imgSrc}" style="height:13rem; width:12.8rem">
                    </div>
                    <div class"card-content" style="height:37.2rem">
                      <span class="card-title">${el.name}</span>
                      <p>licenseplate: ${lp["licenseplate"]}<p>
                      <p>motive: ${mtv["text"]}
                      <p>alibi: ${alb["description"]}
                    </div>    
                  </div>
                </div>
                `
            });
            document.querySelector("#suspects").innerHTML = suspects;
        })
        .catch(error => console.log('error', error)); 
}
