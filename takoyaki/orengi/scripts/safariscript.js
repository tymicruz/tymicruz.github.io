$(document).ready(function(){

	var i=0;
	var animals = ["giraffe", "elephant", "zebra"]; 
	var num_animals = animals.length;

	next_animal = $("span#targetSafari").html();

	$("img.animal").click(function(){

		var animal = $(this).attr('id');
		var target = $("span#targetSafari").html();//.toLowerCase();

		console.log("clicked "+animal);

		if(animal == target){

			do
			{
				i = Math.floor((Math.random() * num_animals) + 1);
				console.log(next_animal + " " + animals[i-1]);
			}while(next_animal == animals[i-1]);

			//console.log("done");
			next_animal = animals[i-1];

			$("span#targetSafari").text(next_animal);
			var src = "css/img/"+animal+".png";
			$(this).attr("src", src);
		}
	});

	$("img.animal").mouseover(function(){
		
		//console.log(this);
		var animal = $(this).attr('id');
		var target = $("span#targetSafari").html();//.toLowerCase();
		var src = "css/img/"+animal;

		console.log(animal);
		console.log(target);

		if(animal == target){

			src += "green.png";
			$(this).attr("src", src);

		}
		else{

			src += "red.png";
			$(this).attr("src", src);
		}

		


	});

		//when mouse leaves, go back to original image
		$("img.animal").mouseout(function(){
		
		//console.log(next_planet);
		/*$("span#target").text(next_planet);*/

		var animal = $(this).attr('id');

		var src = "css/img/"+animal+".png";

		$(this).attr("src", src);

		

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