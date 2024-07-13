document.addEventListener('DOMContentLoaded', () => {
    const myButton = document.getElementById('myButton');
    
    myButton.addEventListener('click', () => {
      alert('Button was clicked!');
      console.log('Button was clicked!');
    });
  });