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
