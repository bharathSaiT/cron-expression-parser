

function daysToNum (value){

    const days ={
        "MON":"1",
        "TUE":"2",
        "WED":"3",
        "THU":"4",
        "FRI":"5",
        "SAT":"6",
        "SUN":"0"
    }

    for( let day in days){
        value = value.replace( new RegExp(day,'i') ,days[day]); //   /MON/i
    }

    return value;
}


module.exports={daysToNum}