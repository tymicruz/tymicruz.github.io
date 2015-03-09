$(document).ready(function(){

	$("div.colorSpace").mouseover(function(){

		$(this).find('p').removeClass("hidden");
		$(this).css('height', "60px");
	});

	$("div.colorSpace").mouseout(function(){
		
		$(this).find('p').addClass("hidden");
		$(this).css('height', "50px");

	});

});