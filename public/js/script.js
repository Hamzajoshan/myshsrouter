
window.onscroll = function() {myFunction()};

function myFunction() {
  if (document.documentElement.scrollTop > 150 ) {
    document.getElementById("mynav").className = "mynav1";
  } else {
    document.getElementById("mynav").className = "mynav";
  }
}
// $('.mynav .menu').hide()
$('.mynav .bars').click(function()
{

  $('.mynav .menu').toggle();
  
})