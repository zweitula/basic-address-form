// Copy this code to your functions.php of your wordpress theme for example 

function tcs_data_processing( $data = array(
) ) {
	if( empty( $data ) ) {
		throw new Exception("Keine Daten!");
	}
	elseif( $data['fullname'] == '' ) {
		throw new Exception("Name fehlt!");
	}
	return $data;
}

function tcs_address_input_func(
) {
	check_ajax_referer('address-data', 'security');
	unset($_POST['security']);
	unset($_POST['action']);
	unset($_POST['_wp_http_referer']);
	$input = array();
	foreach( $_POST as $key => $value ) {
		$input[$key] = sanitize_text_field($value);
	}
	try {
		$output = tcs_data_processing( $input );
		echo json_encode( array( 'success' => true, 'successMsg'=>'Erfolgreich gesendet!', 'response' => $output ) );
	}
	catch(Exception $e) {
		echo json_encode( array( 'success' => false, 'errorMsg' => $e->getMessage() ) );
	}
	die();
}
add_action('wp_ajax_address_input', 'tcs_address_input_func');
add_action('wp_ajax_nopriv_address_input', 'tcs_address_input_func');
