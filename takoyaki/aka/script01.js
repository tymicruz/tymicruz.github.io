$(document).ready(function(){

	var i=0;
	var current_color = "WHITE";
	var colors = ["NAVY", "BLUE", "AQUA", "TEAL", "OLIVE", "GREEN", "LIME", "YELLOW","ORANGE","RED","MAROON","FUISHA","PURPLE", "BLACK","GRAY","SILVER"]; 
	var last_color = "WHITE";

	$('button#btn').click(function(){

		last_color = current_color;
		current_color = colors[i];

		$('body').css('background-color', current_color);
		$('h1#name').css('color', last_color);
		
		i++;

		if(i >= colors.length)
		{
			i = 0;
			shuffle(colors);

			if(current_color == colors[0])//we don't want repeats
			{
				//if last color is the same as the first in the next arrary,
				//then swap first and last
				colors[0] = colors[(colors.length) - 1];
				colors[(colors.length) - 1] = current_color;
		
			}
		}
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