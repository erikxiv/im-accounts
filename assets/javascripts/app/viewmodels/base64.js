define(['bootstrap-tabs', 'jquery-base64'], function (jq1, jq2) {
    return {
        displayName: 'Base64',
        attached: function (view, parent) {
			// Notify to tab change event (to encode/decode contents)
			$('a[data-toggle="tab"]').on('shown', function (e) {
				if ($(e.target).attr("href") == "#tab_text") {
					// Populate text tab with base64 decoded text
					$("#textarea_text")
					.val($.base64.decode($("#textarea_base64").val().replace(/\s/g,'')))
					.focus()
					.select();
				}
				else {
					// Populate base64 tab with base64 encoded text
					$("#textarea_base64")
					.val($.base64.encode($("#textarea_text").val()))
					.focus()
					.select();
				}
			});
			// Select first tab
			$('#myTab a:first').tab('show');
			// Wire up Encode/Decode buttons
			$('#tab_base64 > .btn').click(function (e) {
				$('#myTab a:last').tab('show');
			});
			$('#tab_text > .btn').click(function (e) {
				$('#myTab a:first').tab('show');
			});
        },
        compositionComplete: function(view, parent) {
        	// Make sure the caret is in the textbox on load
			$("#textarea_base64").focus().select();
        }
    };
});