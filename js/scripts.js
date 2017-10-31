const users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "habathcx", "RobotCaleb", "noobs2ninjas"];

const url = 'https://wind-bow.gomix.me/twitch-api/';

var userStatus = [];

function getStatus(arr, i, callback){
	if (i === arr.length){
		$('#results').empty();
		callback(userStatus, 0);

	} else {

		$.getJSON(url+'users/'+arr[i]+'?callback=?', function(data){
			var userInfo = {};
			userInfo.name = arr[i];
			userInfo.user = data;
			$.getJSON(url+'streams/'+arr[i]+'?callback=?', function(data){
				userInfo.stream = data;
				userStatus.push(userInfo);
				if (i < arr.length){
					getStatus(arr, ++i, callback);
				}
			})
		});

	}
}

function showLength(arr){
	console.log(arr.length);
}


function showUser(arr, i){
	var content = $('#results');
	let stream = arr[i].stream.stream;
	let status = stream ? stream.game+': '+stream.channel.status : '<em>offline</em>';
	content
	.append('<div class="row twitch-user no-gutters">\
						<div class="col-2 text-center">\
							<img src="'+arr[i].user.logo+'">\
						</div>\
						<div class="col details">\
							<h4><a href="https://go.twitch.tv/'+arr[i].user.name+'" target="_blank">'+arr[i].user.display_name+'</a></h4>\
							<p>'+status+'</p>\
						</div>\
					 </div>');
	if (status === ''){
		$('.details p').last().remove();
	}
	if (i < arr.length - 1){
		showUser(arr, ++i);
	}
}

getStatus(users, 0, showUser);

$('#online').on('click', function(){
	$('.active').toggleClass('active');
	$(this).toggleClass('active');
	var online = userStatus.filter(function(user){
		return user.stream.stream;
	});
	$('#results').empty();
	showUser(online,0);
});

$('#offline').on('click', function(){
	$('.active').toggleClass('active');
	$(this).toggleClass('active');
	var offline = userStatus.filter(function(user){
		return !user.stream.stream;
	});
	$('#results').empty();
	showUser(offline,0);
});


$('#all').on('click', function(){
	$('.active').toggleClass('active');
	$(this).toggleClass('active');
	$('#results').empty();
	showUser(userStatus,0);
});
