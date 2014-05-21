/*global $ */

function timeSort(a, b){
  return a[1] - b[1];
}

function inverseSort(a, b){
  return -1* (a[1] - b[1]);
}

function plotData(activity, divId){
  $.plot(divId, [ activity ], {
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

var activity = [];
var loudness_shortterm = [];
var loudness_momentary = [];

$.getJSON( "./fs132-denk-nicht-in-layern-denk-in-schichten.json", function( data ) {
  var items = [];
  console.log(data);
  $.each( data.statistics.tracks, function( key, val ) {
    var total = 0;
    $.each(val.activity, function(key, val){
      total += val[1] - val[0];
    });
    activity.push([val.identifier, Math.round(total/60)]);
    loudness_shortterm.push([val.identifier, val.levels.max_shortterm[0]]);
    loudness_momentary.push([val.identifier, val.levels.max_momentary[0]]);
    console.log(val.identifier + ': ' + Math.round(total/60) + ' min');
    console.log(val.identifier + ': momentary:  ' + val.levels.max_momentary[0]);
    console.log(val.identifier + ': short term:  ' + val.levels.max_shortterm[0]);

  });
  activity.sort(timeSort);
}).done(function() {
  plotData(activity.sort(timeSort), "#placeholder");
  plotData(loudness_shortterm.sort(inverseSort), "#loudnessShortTerm");
  plotData(loudness_momentary.sort(inverseSort), "#loudnessMomentary");
});


