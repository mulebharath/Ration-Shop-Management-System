const toggle_btn = document.querySelector(".toggle_btn");
const menu = document.querySelector(".toggle_btn i");
// const action_btn = document.querySelector(".action_btn");
const dropdown_menu = document.querySelector(".dropdown_menu"); 

toggle_btn.onclick=function(){
  dropdown_menu.classList.toggle('open')
  const is_opened = dropdown_menu.classList.contains('open')
  menu.classList=is_opened ? 'fa-solid fa-xmark' :'fa-solid fa-bars'
}


function login() {
    // Get the input values
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Check credentials
    if (username.toLowerCase() === 'admin@gmail.com' && password === 'admin123') {
        window.location.href = 'Admin.html';
    } else if (username.toLowerCase() === 'company@gmail.com' && password === 'company123') {
        window.location.href = 'Company.html';
    } else {
        alert('Wrong username or password. Please try again.');
    }
}

function showpassword(){
    var x= document.getElementById("password");
    if(x.type==="password"){
        x.type="text";
    }
    else{
        x.type="password";
    }
}

