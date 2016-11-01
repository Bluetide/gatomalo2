'use strict'

jQuery(function($){

	$.get("/api", function(data){
		$("#main_container").text(data)
	})

})
