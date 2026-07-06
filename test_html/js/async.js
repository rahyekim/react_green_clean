
function myDisplayer(some){

    document.getElementById('async').innerHTML += some + " ";

}

function myFirst(){

    myDisplayer("nobody")
    
}


function mySecond(){

    myDisplayer("help me")
    
}

myFirst();

mySecond();


setTimeout(myBomb, 3000)

function myBomb(){
    document.getElementById('time').innerHTML = "Bomb!!!🔥"
}
