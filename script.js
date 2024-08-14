var password = document.getElementById("password");

function genPassword() {
    var passwordlength = 16;
    var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    var password = "";
    for (var i=0; i < passwordlength; i++){
        var randomNumber = Math.floor(Math.random() * charset.length);
        password += charset.substring(randomNumber, randomNumber+1);
    }

    document.getElementById("password").value = password;
}

// copy password to clipboard

function copyPassword(){
    var copyText = document.getElementById("password");
    copyText.select();
    copyText.setSelectionRange(0, 9999);
    document.execCommand("copy");

}