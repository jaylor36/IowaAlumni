var GetFeed = require('ui/common/GetFeed');
var FormatDate = require('ui/common/FormatDate');

function HomeImageSlider(){
	var container =  Titanium.UI.createView({
			backgroundColor: 'transparent',
				height:			250,
				width: 			300,
				left: 			10,
				top:			10,
				bottom:			0,
				padding:		0,
				borderRadius:	5
		});
		
		var row = Ti.UI.createTableViewRow();
		row.add(container);
		
		
		var imageArray = new GetFeed ('http://iowalum.com/mobile-app/root_homeImages_feed.cfm');
		var imagebox = Ti.UI.createImageView({
			image: imageArray[3].url,
			width: 300,
			height: 250,
			hires: true,
			top: 30
		});
		
		
		 
		 var counter = 0;
		function imageSlider(n){
			 return imageArray[(n + 1) % imageArray.length].url;
		}
		setInterval(function(){imagebox.image = imageSlider(counter++) },3000);
	
		
		var overlay = Ti.UI.createImageView({
			width: 300,
			height: 40,
			hires: true,
			top: 1,
			image: 'gold.png'
		});
		var shadow = Ti.UI.createImageView({
			width: 300,
			height: 100,
			hires: true,
			top:60,
			image: 'shadow.png'
		});
		
		var date = new Date();
		var currentDate = new GetFeed ("http://iowalum.com/mobile-app/root_date_feed.cfm")[0].date;
		var date = Ti.UI.createLabel({
			text: (new FormatDate()).getMonthString(date.getMonth()) +' '+date.getDate()+', '+date.getFullYear(),
			top: 8,
			left: 10,
			bottom: 10,
			height: 15,
			textAlign:'left',
			width: 270,
			color:'#5c4e1a',
			shadowColor:'#f0d87f',
	        shadowOpacity:0.5,
	        shadowOffset:{x:0, y:1},
			font:{fontFamily:'HelveticaNeue-CondensedBold',fontSize:12,fontWeight:'bold'}
		});
		overlay.add(date);
		
		var view = Ti.UI.createView({
			backgroundColor: '#0c0c0c',
			backgroundImage: 'dark.jpg',
			width: 300,
			height: 85,
			top: 140
		});
		var titlelbl = Ti.UI.createLabel({
			text: 'Welcome',
			left: 10,
			
			
			textAlign:'left',
			width: 250,
			color:'#efc006',
			shadowColor:'#000000',
	        shadowOpacity:0.5,
	        shadowOffset:{x:0, y:1},
	        top: 0,
			font:{fontFamily:'HelveticaNeue-Light',fontSize:25,fontWeight:'bold'}
		});
		
		view.add(titlelbl);
		
		
	
		
		var text = Ti.UI.createLabel({
			text: "The Official App of The University of Iowa Alumni Association",
			left: 15,
			top: 22,
			bottom: 10,
			height: 55,
			textAlign:'left',
			width: 280,
			color:'#ffffff',
			shadowColor:'#000000',
	        shadowOpacity:0.5,
	        shadowOffset:{x:0, y:1},
			font:{fontFamily:'HelveticaNeue-Light',fontSize:14,fontWeight:'bold'}
		});
		imagebox.add(shadow);
		view.add(text);
		imagebox.add(view);
		
		container.add(imagebox);
		container.add(overlay);
		
		return row;
} 
module.exports = HomeImageSlider;