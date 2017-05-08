function jump(address) {
    window.location.href=address;
}
var second=0;
var minute=0;
function timing(level)
{
    switch (level){
        case 0:
            if (second>=10){
                alert("TIME OUT !!GG!!");
                clearInterval(int);
                card_all_face_on();
            }
            break;
        case 1:
            if(minute>=2){
                alert("TIME OUT !!GAME OVER!!");
                clearInterval(int);
                card_all_face_on();
            }
            break;
        case 2:
            if (minute>=4){
                alert("TIME OUT !!FIGHTING!!");
                clearInterval(int);
                card_all_face_on();
            }
            break;
    }
    second++;
    if (second<10)
    {
       document.getElementById("timing").innerHTML="0"+minute+":0"+second;
    }
    else if (second<60)
    {
        document.getElementById("timing").innerHTML="0"+minute+":"+second;
    }
   else if (second=60)
    {
        minute++;
        second=0;
        document.getElementById("timing").innerHTML="0"+minute+":00";
    }
}
