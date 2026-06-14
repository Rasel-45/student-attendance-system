var user="admin";
var pass="0245";

function login(){

    var username=document.getElementById("username").value;

    var password=document.getElementById("password").value;

    if(username==user && password==pass){
        document.getElementById("msg").innerHTML="Login success";

        window.location="Main.html";
    }
    else{
        document.getElementById("msg").innerHTML="Worng Username or Password";

    }



}
