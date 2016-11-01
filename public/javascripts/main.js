'use strict'

jQuery(function($){

	var $print_buttons = $(".print_invoice").click(function(event){

		var invoiceId = event.target.dataset.invoiceId
		$.post("/api/invoice/"+invoiceId+"/print").done(console.log)

	})

})
