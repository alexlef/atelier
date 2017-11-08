$(function() {
	$('#ordiNav').on('click touch', function(e){
            $('.dropdownOrdi').slideToggle();
  });

	$('#drop').on('click touch', function(e){
						$('.dropdown').slideToggle();
	});

	$('#imgDropdown').on('click touch', function(e){
						$('.dropdown').slideToggle();
	});

	$('#imgDropdownOrdi').on('click touch', function(e){
						$('.dropdown').slideToggle();
	});
});

$(document).ready(function() {
  $('.adj').val('A\nJ\nO\nU\nT\nE\nR');   
});
