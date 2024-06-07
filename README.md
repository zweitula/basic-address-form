# basic-address-form
Basic address form that transfers user input to server and processed data back to client with Ajax. Server-side processing is just a dummy function to close the entire loop of the AJAX-call!
## requirements
 - Bootstrap V5.0
 - jQuery
## environment
- WordPress
## notes
- uses bootstrap's floating labels
- labels and placeholders are in German
- autocomplete attributes refer to [developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) recommendations
- client-side form validation uses [Constraint Validation API](https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation) with feedback in German
- server-side rudimentary exception handling is located in tcs_data_processing() called via try/catch from tcs_address_input_func()
- error messages to input fields are rendered via bootstrap tooltips
- output of processed data via console.log for debugging
