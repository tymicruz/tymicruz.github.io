$(document).ready(function(){

	var i=0;
	var shapes = ["star", "square", "triangle", "circle"]; 
	var num_shapes = shapes.length;

	next_shape = $("div#shapes span#target").html();

	$("img.shape").click(function(){

		var shape = $(this).attr('id');
		var target = $("div#shapes span#target").html();//.toLowerCase();

		console.log("clicked "+shape);

		if(shape == target){

			do
			{
				i = Math.floor((Math.random() * num_shapes) + 1);
				console.log(next_shape + " " + shapes[i-1]);
			}while(next_shape == shapes[i-1]);

			//console.log("done");
			next_shape = shapes[i-1];

			$("div#shapes span#target").text(next_shape);
			var src = "css/img/"+shape+".png";
			$(this).attr("src", src);
		}
	});

	$("img.shape").mouseover(function(){
		
		//console.log(this);
		var shape = $(this).attr('id');
		var target = $("div#shapes span#target").html();//.toLowerCase();
		var src = "css/img/"+shape;

		console.log(shape);
		console.log(target);

		if(shape == target){

			src += "green.png";
			$(this).attr("src", src);

		}
		else{

			src += "red.png";
			$(this).attr("src", src);
		}

	});

		//when mouse leaves, go back to original image
		$("img.shape").mouseout(function(){
		
		//console.log(next_planet);
		/*$("span#target").text(next_planet);*/

		var shape = $(this).attr('id');

		var src = "css/img/"+shape+".png";

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