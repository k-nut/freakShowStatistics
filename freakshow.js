function timeSort(a, b){
  return a[1] - b[1];
}

var activity = [];
var loudnesss_shortterm = [];

$.getJSON( "./fs132-denk-nicht-in-layern-denk-in-schichten.json", function( data ) {
  var items = [];
  console.log(data);
  $.each( data.statistics.tracks, function( key, val ) {
    var total = 0;
    $.each(val.activity, function(key, val){
      total += val[1] - val[0];
    });
    activity.push([val.identifier, Math.round(total/60)]);
    loudnesss_shortterm.push([val.identifier, val.levels.max_shortterm[0]]);
    console.log(val.identifier + ': ' + Math.round(total/60) + ' min');
    console.log(val.identifier + ': momentary:  ' + val.levels.max_momentary[0]);
    console.log(val.identifier + ': short term:  ' + val.levels.max_shortterm[0]);

  });
  activity.sort(timeSort);
}).done(function() {plotData(activity);});

function plotData(activity){

  var data = [ ["January", 10], ["February", 8], ["March", 4], ["April", 13], ["May", 17], ["June", 9] ];

  $.plot("#placeholder", [ activity ], {
    series: {
      bars: {
        show: true,
        barWidth: 0.6,
        align: "center"
      }
    },
    xaxis: {
      mode: "categories",
      tickLength: 0
    }
  });
}

