var array = [{'distance':'','name':'Pleasanton Auto Spa','address':'356 Stoneridge Dr','city':'Pleasanton Ca, 94566','phone':'925-000-0000','class':'call0','latitude': '37.6940116', 'longitude': '-121.9245671'},{'distance':'','name':'Walnut Creek Auto Spa','address':'8909 That Dr','city':'Walnut creek, 94566','phone':'925-000-0001','class':'call1','latitude': '37.90736658145496', 'longitude': '-122.05398559570312'},{'distance':'','name':'San Ramon Auto Spa','address':'6578 This Dr','city':'San Ramon, 94566','phone':'925-000-0002','class':'call2','latitude': '37.762267375737395', 'longitude': '-121.94777011871338'}];
var biz_location0 = {latitude: array[0].latitude, longitude: array[0].longitude};
var biz_location1 = {latitude: array[1].latitude, longitude: array[1].longitude}; 
var biz_location2 = {latitude: array[2].latitude, longitude: array[2].longitude};
var Geolocation = {
	rad: function(x) { return x * Math.PI / 180 },
	haversine: function(p1, p2) {
		var R = 6371;
		var dLat  = this.rad(p2.latitude - p1.latitude);
		var dLong = this.rad(p2.longitude - p1.longitude);
		var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(this.rad(p1.latitude)) * Math.cos(this.rad(p2.latitude)) * Math.sin(dLong/2) * Math.sin(dLong/2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
		var d = R * c;
		var mi = d * 0.621371192;
		return Math.round(mi);
	},
	distance_from: function(position) {
		Geolocation.display_location();
		var distance0 = Geolocation.haversine(position.coords, biz_location0);
		var distance1 = Geolocation.haversine(position.coords, biz_location1);
		var distance2 = Geolocation.haversine(position.coords, biz_location2);
		array[0].distance=distance0;
		array[1].distance=distance1;
		array[2].distance=distance2;
		/*$.each(array, function(i) {
			var distanceI = Geolocation.haversine(position.coords, biz_location0);
			array[i].distance=distanceI;
		});*/
		array = array.sort(SortByDis);
		$.each(array, function(i) {
			$('.locLink:eq('+i+')').html('<strong>'+array[i].distance+'mi'+'</strong><h4>'+array[i].name+'</h4><span>'+array[i].address+'</span><span>'+array[i].city+'</span>');
			$('.phone.pM').attr('href','tel:'+array[0].phone);
			$('.phone').addClass(array[0].class);
		});
	},
	display_location: function() {
		$("#geolocating").fadeOut(400);
	}
}
function SortByDis(a, b){
	var aDis = a.distance;
	var bDis = b.distance;
	return ((aDis < bDis) ? -1 : ((aDis > bDis) ? 1 : 0));
}
if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(Geolocation.distance_from, Geolocation.display_location);
	//navigator.geolocation.watchPosition(Geolocation.distance_from);
} else {
	Geolocation.display_location();
}