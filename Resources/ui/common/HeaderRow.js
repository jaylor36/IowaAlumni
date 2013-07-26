var DateObject = require('ui/common/DateObject');
var EditText = require('ui/common/EditText');
/*
 * Post Object
 * Essential attributes
 */

function HeaderRow(post) {

   var table = Ti.UI.createTableView({
		separatorColor: 	'e2e2e2',
		backgroundColor: 	'e2e2e2',
		height:				'auto',
		width: 				300,
		left: 				10,
		top:				10,
		bottom:				0,
		padding:			0,
		scrollable: 		false
	});

	 var rowText = Ti.UI.createTableViewRow({
	 		backgroundImage: 'gold.png', 
	    	text: "hello",
	        height: 50,
	        selectedBackgroundImage: 'blue.png'
	        
	    });
	table.height = rowText.height;
	var data = [];
	 data.push(rowText);
	table.setData(data);

	var row = Ti.UI.createTableViewRow({
		hasChild: true,
		height: table.height,
		padding: 0,
		top: 0,
		bottom: 0,
		link: 	post.hlink,
		layout: 'vertical',
		backgroundColor: 'e2e2e2'
	});
	row.rightImage = null;
	row.backgroundSelectedImage = null;
	row.backgroundFocusImage = null;

	row.add(table);
	datebl  = getpubDateLabel(post.pubDate);
	rowText.add(datebl);

	

	return row;
}

/*
 * Helper Functions
 */


function getpubDateLabel(pubDate) {

	var text = Ti.UI.createLabel({
		text: pubDate,
		left: 15,
		top: 10,
		textAlign:'left',
		width: 200,
		height: 20,
		color:'#5c4e1a',
		//shadowColor:'#f0d87f',
        //shadowOpacity:0.5,
        //shadowOffset:{x:0, y:1},
		font:{fontFamily:'Helvetica-Bold',fontSize:20,fontWeight:'normal'}
	});

	return text;

}



module.exports = HeaderRow;