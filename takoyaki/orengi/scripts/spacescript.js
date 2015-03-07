$(document).ready(function(){

	var i=0;
	var current_color = "NONE";
	var planets = ["mercury", "venus", "earth", "mars", "jupiter", "saturn", "uranus", "neptune","pluto"]; 
	var num_planets = planets.length;

	next_planet = $("span#targetSpace").html();

	$("div.circle").click(function(){

		var planet = $(this).attr('id');
		var target = $("span#targetSpace").html();//.toLowerCase();

		console.log("clicked "+planet);

		if(planet == target){

			do
			{
				i = Math.floor((Math.random() * num_planets) + 1);
				console.log(next_planet + " " + planets[i-1]);
			}while(next_planet == planets[i-1]);

			//console.log("done");
			next_planet = planets[i-1];

			$("span#targetSpace").text(next_planet);
			var url = "url(css/img/"+planet+".png)";
			$(this).css("background-image", url);
		}
	});

	$("div.circle").mouseover(function(){
		
		//console.log(this);
		var planet = $(this).attr('id');
		var target = $("span#targetSpace").html();//.toLowerCase();

		//console.log(target);

		if(planet == target){

			if(planet != "saturn")
			{
				$(this).css("background-image", "url(css/img/planetgreen.png)");
			}
			else
			{
				$(this).css("background-image", "url(css/img/saturngreen.png)");
			}

		}
		else{

			if(planet != "saturn")
			{
				$(this).css("background-image", "url(css/img/planetred.png)");
			}
			else
			{
				$(this).css("background-image", "url(css/img/saturnred.png)");
			}
		}

		


	});

		//when mouse leaves, go back to original image
		$("div.circle").mouseout(function(){
		
		//console.log(next_planet);
		/*$("span#target").text(next_planet);*/

		var planet = $(this).attr('id');

		var url = "url(css/img/"+planet+".png)";

		$(this).css("background-image", url);

		

	});
});

//fisher yates shuffle
function shuffle(array) {
    var counter = array.length, temp, index;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}