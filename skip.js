/*global $, document*/
var url = "http://meta.metaebene.me/media/mm/fs133-ich-werde-noch-meinen-kindern-davon-erzaehlen.json";
var speakTime;

var tracks = [];

$.getJSON(url , function( data ) {
  $.each(data.statistics.tracks, function(key, value){
    tracks.push(value.activity);
    var $option = $('<option>', {
      'text' : value.identifier,
      'value': key
    });
    $option.appendTo($("#mutedSpeaker"));
  });
});

var lastIndex = 0;
var lastSpeakerIndex = -1;


function updateTimer(){
  var player = document.getElementById("player");
  var currentTime = player.currentTime;
  var minutes = Math.floor(currentTime/60, 2);
  var seconds = (Math.round(currentTime%60, 2)).toString();
  if (seconds.length === 1){
    seconds = "0"+seconds;
  }
  $("#progress").text(minutes + ":" + seconds);
}

function handlePlay(){
  updateTimer();
  skipAhead();
}

function skipAhead(){
  var selectedSpeakerIndex = $("#mutedSpeaker").val();
  if (selectedSpeakerIndex !== lastSpeakerIndex){
    lastSpeakerIndex = selectedSpeakerIndex;
    lastIndex = 0;
  }

  var i;
  var player = document.getElementById("player");
  var currentTime = player.currentTime;

  speakTime = tracks[selectedSpeakerIndex];
  for (i=lastIndex; i < speakTime.length; i++) {
    var start = speakTime[i][0];
    if (currentTime > start){
      var stop = speakTime[i][1];
      if (stop > currentTime){
        player.currentTime = stop+2;
        lastIndex = i;
        return;
      }
    }
  }
}

function stop(){
  $("#player").trigger("pause");
}

function play(){
  $("#player").trigger("play");
}
