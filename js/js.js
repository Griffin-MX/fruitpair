function jump(address) {
    window.location.href=address;
}
var int=setInterval("timing()",1000);
var second=0;
var minute=0;
function timing()
{
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
