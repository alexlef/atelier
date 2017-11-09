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

	$i = 2;
	$('#addImage').on('click touch',function(e){
						if($i<4){
							$('<br><input id=\"image\" type=\'file\' name=\'image'+ $i +' \' value=\"\"></input>').insertBefore($('#addImage'));
							$i += 1;
						}
	});
});
