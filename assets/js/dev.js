
jQuery(document).ready(function ($) {
// TRADEMARK

	$('.tdname_check').click(function () {
		if ($(this).attr("value") == "tdname") {
			$(".tdname_fld").show();
			$(".tdlogo_fld").hide();
			$(".tdslogan_fld").hide();
					$(".variety_field").hide();
			$(".logo_name").hide();
			$(".vc_color").hide();
			$(".variety_field_label").hide();
		}  
	});
	
	
	
	$('.tdslogan_check').click(function () {
		if ($(this).attr("value") == "tdslogan") {
			$(".tdslogan_fld").show();
			$(".tdname_fld").hide();
			$(".tdlogo_fld").hide();
			$(".variety_field").hide();
			$(".logo_name").hide();
			$(".vc_color").hide();
			$(".variety_field_label").hide();
		}  
	});
	$('.v_color_yes').click(function () {
		if ($(this).attr("value") == "v_color_yes") {
			$(".logo_name").show();
			$(".variety_field").hide(); 
		}  
	});
	
	$('.v_color_no').click(function () {
		if ($(this).attr("value") == "v_color_no") {
			$(".logo_name").show();
			$(".variety_field").show(); 
		}  
	});
	
	
	
	$('.tdlogo_check').click(function () {
		if ($(this).attr("value") == "tdlogo") {
			$(".tdlogo_fld").show();
			// $(".variety_field").show();
			$(".logo_name").show();
			$(".vc_color").show();
			$(".tdslogan_fld").hide();
			$(".tdname_fld").hide();
			$(".variety_field_label").show();
		} 
	});
	$('.markyes').click(function () {
		if ($(this).attr("value") == "yes") {
			$(".name_mark").show(); 
			$(".markchecked_fld2").show(); 
			$(".markchecked_fld2_opt").show(); 
	 
		} 
	}); 
	$('.markno').click(function () {
		if ($(this).attr("value") == "no") {
			$(".name_mark").hide(); 
			$(".markchecked_fld2").hide(); 
			$(".markchecked_fld2_opt").hide();  
			 $(".markchecked_fld2_opt2").hide();
		} 
	});
	$('.markyes2').click(function () {
		if ($(this).attr("value") == "yes") {
			$(".markchecked_fld").show(); 
			$(".markchecked_fld2").hide();
			$(".markchecked_fld2_opt").hide();
			 
		} 
	});
	$('.markyes4').click(function () {
		if ($(this).attr("value") == "yes") {
			$(".eng-translation").show();  
			 
		} 
	});
	 
	 $('.markno4').click(function () {
		if ($(this).attr("value") == "no") {
			$(".eng-translation").hide();  
			$(".eng-translation input").attr("required", false); 
			 
		}else{
			$(".eng-translation").show();  
			$(".eng-translation input").attr("required", true); 
		} 
	});
	$('.markno2').click(function () {
		if ($(this).attr("value") == "no") {
			$(".markchecked_fld").hide();  
			// $(".name_mark").hide();  
			$(".markchecked_fld2_opt").show(); 
			$(".markchecked_fld2").show();
		} 
	});
	
	$('.markyes3').click(function () {
		if ($(this).attr("value") == "yes") {
			// $(".phide").show();  
			$(".markchecked_fld2_name_mark").show();  
		} 
	});
	$('.markyes5').click(function () {
		if ($(this).attr("value") == "yes") {
			$(".first_use_any").show();    
			$("#first_use_anywhere").show();    
			$("#first_use_anywhere2").show();    
			$(".first_use_com").show();   
					$(".phide2").hide();  
	
		} 
	});
	
	$('.markno3').click(function () {
		if ($(this).attr("value") == "no") {
			// $(".phide").hide();   
			$(".markchecked_fld2_name_mark").hide(); 
		} 
	});
	
	
	$('.markno4').click(function () {
		if ($(this).attr("value") == "no") {
			$(".eng-translation").hide();    
			$(".eng-translation input").attr("required", false); 
			 
		}else{
			$(".eng-translation").show();  
			$(".eng-translation input").attr("required", true); 
		} 
	});
	$('.markno5').click(function () {
		if ($(this).attr("value") == "no") {
			$(".first_use_any").hide();    
			$("#first_use_anywhere").hide();    
			$("#first_use_anywhere2").hide();    
			$(".first_use_com").hide();    
			$(".phide2").show();    
		} 
	});
});