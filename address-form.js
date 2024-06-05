(function($){
	if( $('form.custom-form').length ) {
		const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
		const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
		
		$(document).on('shown.bs.tooltip', function(){
			let tooltipId = $('.tooltip').attr('id');
			let errorMsg = $('.custom-form').find('[aria-describedby=' + tooltipId + ']').attr('data-bs-title');
			$('#' + tooltipId + ' .tooltip-inner').text(errorMsg);
		}); 
			
		function getErrorMessage( input ) {
			if(input.validity.valueMissing) {
				return "Pflichtfeld";
			} else if(input.validity.typeMismatch) {
				return "ungültige Eingabe";
			} else if(input.validity.patternMismatch) {
				return "ungültiges Format";
			} else if(input.validity.tooShort) {
				return "Eingabe zu kurz";
			} else if(input.validity.tooLong) {
				return "Eingabe zu lang";
			} else if(input.validity.rangeOverflow) {
				return "über dem Bereich";
			} else if(input.validity.rangeUnderflow) {
				return "unter dem Bereich";
		 	} else {
			  return "ungültige Eingabe";
			}
		}
		
		function checkFormValidity( formId ) {
			let isValid = true;
			$('#' + formId + ' .check-validity').each( function(){
				let inputId = $(this).attr('id');
				let input = document.getElementById( inputId );
				let errorMsg = $(this).siblings('.error-msg');
				if ( !input.validity.valid ) {
					$(this).addClass('not-valid');
					$(this).siblings('.error-msg').attr('data-bs-title', getErrorMessage( input ) );
					$(this).siblings('.error-msg').removeClass('d-none');
					isValid = false;
				} else {
					$(this).removeClass('not-valid');
					$(this).siblings('.error-msg').addClass('d-none');
					$(this).siblings('.error-msg').attr('data-bs-title', ' ');
				}
			});
			return isValid;
		}	
	}

	if( $('form#address_data').length ) {
		$('form#address_data').on('submit', function(e){
			e.preventDefault();
			let feedback = $(this).find('.feedback');
			let spinner = $(this).find('.spinner-border');
			feedback.text('Daten werden verarbeitet...');
			feedback.removeClass('text-danger');
			spinner.removeClass('d-none');
			let formData = $(this).serializeArray();
			let isValidForm = checkFormValidity( $(this).attr('id') );
			let	dataObj = {};
			dataObj['action'] = $(this).attr('action');
			for (let i = 0; i < formData.length; i++) {
				let input = formData[i];
				dataObj[input['name']] = input['value'];
			}
			if( isValidForm ) {
				$.ajax({
					type: 'POST',
					dataType: 'json',
					url: '/wp-admin/admin-ajax.php',
					data: dataObj,
					beforeSend : function ( xhr ) {
						feedback.text('Daten werden gesendet...');
					},
					success: function(data) {
						spinner.addClass('d-none');	
						if( data.success == true ) {
							console.log(data.response);
							feedback.text(data.successMsg);
						} else {
							feedback.addClass('text-danger');
							feedback.text(data.errorMsg);
						}
					}
				});
			} else {
				spinner.addClass('d-none');
				feedback.addClass('text-danger');
				feedback.text('Markierte Felder überprüfen.');
			}
		});
	}
})(jQuery)
