
function validateForm() 
{
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorMessage = document.getElementById('errorMessage');

    if (username && password) {
      errorMessage.style.display = "none";
      window.location.href = "timetable.html"; 
      return false; 
    } else {
      errorMessage.style.display = "block";
      return false; 
    }
  
    /*if (username === '' || password === '') {
      errorMessage.style.display = 'block';
      return false;
    } else {
      errorMessage.style.display = 'none';
      alert('Login Successful'); 
      window.location.href = "timetable.html"; 
        }*/
}
