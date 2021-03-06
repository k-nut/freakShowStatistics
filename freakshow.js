/*global $ */

function timeSort(a, b){
  return a[1] - b[1];
}

function inverseSort(a, b){
  return -1* (a[1] - b[1]);
}


function plotData(activity, divId, unit){
  function formatter(val, axis) {
    return val.toFixed(axis.tickDecimals) + unit;
  }
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
    },
    yaxis: {
      tickFormatter: formatter
    }
  });
}
  
  function secToMinFormatter(val, axis) {
    return Math.round(val.toFixed(axis.tickDecimals) / 60) + " min";
  }

var activity = [];
var loudness_shortterm = [];
var loudness_momentary = [];
var all = [];

$.getJSON( "http://meta.metaebene.me/media/mm/fs132-denk-nicht-in-layern-denk-in-schichten.json", function( data ) {
  var items = [];
  console.log(data);
  var counter = 0;
  $.each( data.statistics.tracks, function( key, val ) {
    var total = 0;
    counter++;
    var bla = [];
    $.each(val.activity, function(key, val){
      total += val[1] - val[0];
      bla.push([val[0], counter]);
      bla.push([val[1], counter]);
      bla.push(null);
    });
    all.push({"label": val.identifier, data: bla});
    activity.push([val.identifier, Math.round(total/60)]);
    loudness_shortterm.push([val.identifier, val.levels.max_shortterm[0]]);
    loudness_momentary.push([val.identifier, val.levels.max_momentary[0]]);
  });
  activity.sort(timeSort);
}).done(function() {
  plotData(activity.sort(timeSort), "#placeholder", "min");
  plotData(loudness_shortterm.sort(inverseSort), "#loudnessShortTerm", "dB");
  plotData(loudness_momentary.sort(inverseSort), "#loudnessMomentary", "dB");
  $.plot("#bla", all, {legend: {position: "nw"}, xaxis: {tickFormatter: secToMinFormatter}});
});


