//var exports = module.exports = {
var EMAIL_REGEX=/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;


function signUp(){  //is activated when the "sig up" button is clicked
    var email           = document.getElementById("reg_email").value;
    var nickname        = document.getElementById("reg_nickname").value;
    var password        = document.getElementById("reg_password").value;
    var passwordConfirm = document.getElementById("reg_password_confirm").value;
    var mailValid       = checkEmail(email);
    var passValid       = checkPassword(password, passwordConfirm);
    var nickValid       = checkNickname(nickname);


    if(mailValid && passValid && nickValid){
        $.post("/signUp",
            {
                email: email,
                password: password,
                nickname: nickname
            })
            .done( function(data,status){
                alert("Data loaded: " + data + "\nStatus: " + status);
            });
        $("#backgroundPopup").fadeOut("slow");
        $("#newUserPopup").fadeOut("slow");

    }
}


//Validates the email
function checkEmail(email){
    var validEmail = EMAIL_REGEX.test(email);
    if(email.length<1) {
        alert("Error: Email cannot be blank!");
        return false;
    }
    if(!validEmail) {
        alert("Error: Email is not valid, please try again");
        return false;
    }
    return true
}

//validate password
function checkPassword(password, passwordConfirmed) {
    if(password.length>0 && password === passwordConfirmed) {
        console.log('ok password');
    } else {
        alert("Error: Please check that you've entered and confirmed your password!");
        return false;
    }
    return true;
}

//validate nickname
function checkNickname(nick){
    if (nick.length<1){
        console.log('You need a nickname');
        return false
    }return true;
}
