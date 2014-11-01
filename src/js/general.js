// JavaScript Setup

// jQuery Init
jQuery.noConflict();
jQuery(function($) { 
	
	
	
	
	// Back to top section links for non-IE browsers
	if ( ! $.browser.msie ) {
		$('.section').children('h3').append("<a href='#jump-top' class='scrollTop hidden' title='Back to Top'>Back to Top</a>");
		$(".section").hover(
			function(){
				$(this).find(".scrollTop").css('display', 'block');
			},
			function(){
				$(this).find(".scrollTop").css('display', 'none');
			}
		);
	}
	
	
	// Panel Toggle in Header
	$("#panel_toggle").click(function(){
	  $("#panel").slideToggle(300, function(){ $("#panel_toggle").toggleClass("panel_active"); });	  
	});
		
	
	
	// *****************************	
	// Start - jQuery Fancybox setup


		// How tos at http://fancybox.net/
		$('a[href$="jpg"], a[href$="jpeg"], a[href$="png"], a[href$="gif"]').fancybox();
		
		// Fancybox - Youtube
		// <a class="youtube" title="The Social Network" href="http://www.youtube.com/watch?v=lB95KLmpLR4">Try now</a>
		$(".youtube").click(function() {
			$.fancybox({
					'padding'		: 0,
					'autoScale'		: false,
					'transitionIn'	: 'none',
					'transitionOut'	: 'none',
					'title'			: this.title,
					'width'			: 680,
					'height'		: 495,
					'href'			: this.href.replace(new RegExp("watch\\?v=", "i"), 'v/'),
					'type'			: 'swf',
					'swf'			: {
						 'wmode'		: 'transparent',
						'allowfullscreen'	: 'true'
					}
				});
		
			return false;
		});
		
		// Fancybox - Vimeo
		// <a class="vimeo" href="http://vimeo.com/20534171">vimeo test #2</a>
		$(".vimeo").click(function() {
			$.fancybox({
				'padding'		: 0,
				'autoScale'		: false,
				'transitionIn'	: 'none',
				'transitionOut'	: 'none',
				'title'			: this.title,
				'width'			: 400,
				'height'		: 265,
				'href'			: this.href.replace(new RegExp("([0-9])","i"),'moogaloop.swf?clip_id=$1'),
				'type'			: 'swf'
			});
	
			return false;
		});
		
		// iFrames
		// <a class="youtube" title="The Social Network" href="http://www.youtube.com/watch?v=lB95KLmpLR4">Try now</a>
		$(".iframe").fancybox({
			'width'				: '75%',
			'height'			: '75%',
			'autoScale'     	: false,
			'transitionIn'		: 'none',
			'transitionOut'		: 'none',
			'type'				: 'iframe'
		});

		
	// End - Query Fancybox setup
	// *****************************	
	
	
	
	
	// Clear form field on click
	$("form.standard .textbox,form.standard .textarea").focus(function() {
		if( this.value == this.defaultValue ) {
			this.value = "";
		}
	}).blur(function() {
		if( !this.value.length ) {
			this.value = this.defaultValue;
		}
	});
	
	
	
	
	
	
	
	
	
	// Used to scroll to a specific position.
	// Edit the variables below to adjust speed and positioning
	var scrollDuration = 500; // 1000 = 1 second
	var scrollGap = 0; // in Pixels, the gap left above the scroll to point
	$('a[href*=#jump-]').click(function() 
	{
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) 
		{
			var $target = $(this.hash);
			$target = $target.length && $target || $('[name=' + this.hash.slice(1) +']');
			if ($target.length) 
			{
				var targetOffset = $target.offset().top - scrollGap;
				$('html,body').animate
					(
					{scrollTop: targetOffset}, 
					scrollDuration
					);
				return false;
			}
		}
	});

	
	
		
	// Softbutton = soft fade on hover, used for social media icons
	$(".softbutton").stop().fadeTo("fast", 0.4);
	$(".softbutton").hover(
		function(){
			$(this).stop().fadeTo("fast", 1);
		},
		function(){
			$(this).stop().fadeTo("fast", 0.4);
		}
	);
	
	
	// Toggle Content!
	$(".hidden").hide();
	$("a.toggle").click(function(event){
		if( $(this).text() == 'Show More' ) {
			$(this).text("Show Less");
		}else{
			$(this).text("Show More");
		}
		$(this).parents(".toggle-container").find(".hidden").slideToggle("normal");
		return false;
	});


	
	
	
	// contact form
	// Stop form from traditionally submitting if JavaScript is enabled
	$("#contact_form form").attr("action","");
	
	$("#cf_submit").click(function() {
		var name = $("#cf_name").val();
		var email = $("#cf_email").val();
		var email_2 = $("#cf_email_2").val();
		// var phone = $("#cf_phone").val();
		var message = $("#cf_message").val();		
		var hasError = false;
		var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		
		if(name == '' || name == 'Name') {
			$("#error-name").fadeIn();
			hasError = true;
		}else{
			$("#error-name").fadeOut();
		}
		
		if(email == '' || email == 'Email') {
			$("#error-email").fadeIn();
			hasError = true;
		}else if(!emailReg.test(email)) {
			$("#error-email").fadeIn();
			hasError = true;
		}else{
			$("#error-email").fadeOut();
		}
		
		if(message == '' || message == 'Message...') {
			$("#error-message").fadeIn();
			hasError = true;
		}else{
			$("#error-message").fadeOut();
		}
			
		if(hasError == true)
		{
			return false;
		}
				
		var formData = 'cf_name='+ name + '&cf_email=' + email + '&cf_message=' + message + '&cf_email_2=' + email_2;
		var successPlaceholder = "<div id='message'></div>";
		var successHTML = "<h4>Contact Form Submitted!</h4><p>We will be in touch soon.</p>";
		
		$.ajax({
			type: "POST",
			url: "mail.php",
			data: formData,
			success: function() {
				$('#contact_form').html(successPlaceholder);
				$('#message').html(successHTML);
			}
		}); // end ajax post
		return false;
	});
	// end contact form
	
	
});