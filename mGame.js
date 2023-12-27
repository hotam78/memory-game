function init(){
    const originalArr = ['./img/R&H--0014.jpg','./img/R&H--0111.jpg','./img/R&H--0934.jpg','./img/R&H--1579.jpg','./img/R&H--1611.jpg','./img/R&H--1043.jpg'] ;
    const arr = originalArr.concat(originalArr) ;
    let lastArr = shuffle(arr) ; 
    document.getElementById("sumCards").innerText = ` / ${lastArr.length}`;
    let nikudSum = 0 ;
    let open = [];
    let finish = 0 ;
    let endTime = document.createElement("div");
    let fAlert = document.createElement("h1");
    fAlert.innerText= "FINISH THE TIME"

 
    lastArr.forEach((v,i) => {
        const boardElement = document.getElementsByClassName("board")[0] ;
        const cardElement = document.createElement("div") ;
        cardElement.className="card" ;
        cardElement.value = v ;
        boardElement.appendChild(cardElement);
  
        cardElement.onclick= (e) => {
            finish ++ ;
            if(finish == 1){
                
                setInterval (() => {
                    let time = document.getElementById("timeRun") ;
                    time.innerText -- ;
                    if (time.innerText == 56) {
                        // alert('finish') ;
                        // let endTime = `<div id="endTime"><h1>end time</h1></div>` ;
                        // let block = document.createElement("div");
                        // block.id = "endTime" ;
                        // endTime.appendChild(fAlert);
                        let body = document.getElementsByTagName('body') ;
                        // body.appendChild(endTime);
                        body.innerHTML = "";

                    }
                }, 1000);
            }
            if(!open.includes(cardElement) && open.length < 2) {
                cardElement.style.backgroundImage = `url(${v})`;
                cardElement.classList.toggle('front');
                cardElement.classList.toggle('back');
                open.push(cardElement);
            }
            
            if (open.length === 2){
                if(checkIfSame(open[0].value , open[1].value)){
                    nikudSum = addTwoPoints(nikudSum) ;
                    open[0].onclick = '';
                    open[1].onclick = '';
                    open = [] ;
                    if(nikudSum == lastArr.length){
                        const owner = `<div id="owner"><h2>you win!!!!</h2></div>` ;
                        let body = document.getElementsByTagName('body') ;
                        body.appendChild(owner) ;
                    };
                    
                }
                else {
                    setTimeout(() => {
                        cardElement.classList.toggle('front')
                        cardElement.classList.toggle('back')
                        closeCards(open) ;
                        open = [] ;
                    }, "1300"); 
                } 
                            
            }
        }; 
    });
} ;

init()


function addTwoPoints (sumNow) {
    let sum = sumNow + 2 ;
    document.getElementById("nikud").innerText = sum ;
    return sum ;
}


// 
function shuffle (arr) {
    for (let i  = arr.length -1 ; i > 0 ; i--){
        let nIn = Math.floor(Math.random() * (i+1)) ;
        let j = arr[i] ;
        arr[i] = arr[nIn] ;
        arr[nIn] = j ;
    } return arr ;
} ;

// 
function checkIfSame(a , b) {
    return a === b
}


 
function closeCards (arr){
    arr[0].style.backgroundImage = '' ;
    arr[1].style.backgroundImage = '' ;
}
