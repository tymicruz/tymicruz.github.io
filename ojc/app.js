(function(){

	var app = angular.module('ojc', []);

	app.controller('OjcController', function(){ 
		this.members = ojc;

		this.ChangePic = function(name)
			{
				console.log("try to change " + name + "'s pic.");
				for(var i = 0; i < this.members.length; i++)
				{
					if(this.members[i].name == name)
					{
						if(this.members[i].pic_index == "thumbnail")
						{
							var id = "#" + name;

							var img = "imgs/" + this.members[i].images['regular'];

							    $(id).fadeOut(500, function() {
							        $(id).attr("src", img);
							        $(id).fadeIn(500);
							    });

							this.members[i].pic_index = "regular";
						}
						else{

							var id = "#" + name;

							var img = "imgs/" + this.members[i].images['thumbnail'];

							    $(id).fadeOut(500, function() {
							        $(id).attr("src", img);
							        $(id).fadeIn(500);
							    });

							this.members[i].pic_index = "thumbnail";
						}

						console.log("changed " + name + "'s pic.");
						break;
					}
				}
			};

	});


var ojc= [
	{
		name: "Enoka",
		images : {thumbnail: "enokaojc.jpg", regular: "enoka.jpg"},
		pic_index: "thumbnail"
	}, 
	{
		name: "RVM",
		images : {thumbnail: "rvmojc.jpg", regular: "rvm.jpg"},
		pic_index: "thumbnail"
	}, 
	{
		name: "Tysseus",
		images : {thumbnail: "tysseusojc.png", regular: "tysseus.png"},
		pic_index: "thumbnail"
	}]
	

})();