var comenzar = new Date ();


function minTranscurridos(inicio, fin){
    
    timeElapsed=fin.getTime()-inicio.getTime();
//    delete now;
    secsElapsed=0;
    
    out="";
    secsElapsed=Math.floor(timeElapsed/1000);
    minElapsed=Math.floor(secsElapsed/60);
    out+=minElapsed;
    
    return out;
}

setInterval (function() {
    console.log(minTranscurridos(comenzar, new Date()));
}, 1000);
