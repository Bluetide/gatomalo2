'use strict'

jQuery(function($){

	var $modal_progress = $("#progressDialog")
	var $modal_fiscal_id = $("#getFiscalIDDialog")
	var $invoice_id_refund_field = $("#getFiscalIDDialog #invoice_id")
	var $fiscal_id_refund_field = $("#getFiscalIDDialog #fiscal_id")

	$modal_fiscal_id.on('show.bs.modal', function(event){
		var invoice_id = event.relatedTarget.dataset.invoiceId
		$invoice_id_refund_field.val(invoice_id)
	})

	var ajax_wrapper = function(url, extra_data){
		return $.post(url, extra_data)
			.always(function(){ $modal_progress.modal('hide')})
	}

	var $print_buttons = $(".print_invoice").click(function(event){
		var invoiceId = event.target.dataset.invoiceId
		$modal_progress.modal('show')
		ajax_wrapper("/api/invoice/"+invoiceId+"/print", {})
			.done(function(){ $("#row_" + invoiceId).addClass('table-success')})
	})
	var $test_buttons = $(".test_invoice").click(function(event){
		var invoiceId = event.target.dataset.invoiceId
		$modal_progress.modal('show')
		ajax_wrapper("/api/invoice/"+invoiceId+"/test", {})
	})
	var $refund_Button = $("#getFiscalIDDialog .submit-button").click(function(event){
		$modal_fiscal_id.modal('hide')
		var invoice_id = $invoice_id_refund_field.val()
		var fiscal_id = $fiscal_id_refund_field.val()
		ajax_wrapper("/api/invoice/"+invoice_id+"/refund", {legacy_id: fiscal_id})
	})

	// Activate Report Buttons
	var $report_x_button = $("#report-x-button")
	$report_x_button.click(function(event){
		$.post("/api/report/x")
	})
	var $report_y_button = $("#report-z-button")
	$report_y_button.click(function(event){
		$.post("/api/report/z")
	})

})
