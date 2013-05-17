var DateObject = require('ui/common/DateObject');
/*
 * Post Object
 * Essential attributes
 */

function Row(post) {

    this.postheight		= 0;

    var row = Ti.UI.createTableViewRow({
		hasChild: 			true,
		link: 				post.url,
		height: 			'auto',
		padding: 			0,
		top: 				0,
		bottom: 			0,
		layout: 			'vertical',
		backgroundColor: 	'e2e2e2'
	});
	row.rightImage = null;
	row.backgroundSelectedImage = null;
	row.backgroundFocusImage = null;

	var container =  Titanium.UI.createView({
		backgroundColor: 	'ffffff',
		height:				'auto',
		width: 				300,
		left: 				0,
		top:				0,
		bottom:				0,
		padding:			0
	});

	titlelbl = getTitleLabel(post.title);
	container.add(titlelbl);

	desclbl  = getDescriptionLabel(post.description);
	container.add(desclbl);
	desclbl.top = titlelbl.height + 15;

	var posted = Ti.UI.createLabel({
		text: 			(new DateObject(post.pubDate)).prettyDate(),
		left: 			15,
		bottom: 		10,
		height: 		15,
		textAlign: 		'left',
		width: 			270,
		color: 			'#616161',
		shadowColor: 	'#ffffff',
        shadowOpacity: 	0.5,
        shadowOffset: 	{x:0, y:1},
		font: 			{fontFamily:'HelveticaNeue-Light',fontSize:12,fontWeight:'bold'}
	});
	posted.top = titlelbl.height + desclbl.height + 20;
	container.add(posted);

	var imageContainer = Ti.UI.createView({
		width: 			60,
		height: 		60,
		right: 			15,
		top: 			titlelbl.height+20,
		borderRadius:	4,
		borderColor: 	'#d5d5d5',
		borderWidth: 	1

	});
	var postImage = getPostImage(post.image);
	cachedImageView('imageDirectoryName', post.image, postImage);
	imageContainer.add(postImage);
	container.add(imageContainer);

	container.height = titlelbl.height + desclbl.height + posted.height + 35;
	row.height = container.height;

	/*
	var icon = Ti.UI.createImageView({
		top: 3,
		left: 280,
		width: 20,
		image:'clock1.png'
	});
	container.add(icon); */

	row.add(container);
	
	return row;
}

/*
 * Helper Functions
 */

function getContainerHeight(img) {
	var tempimagebox = Ti.UI.createImageView({
		image: img,
		width: 'auto',
		height: 'auto',
		hires: true,
		//top: -10, // this works for some reason
	});
    cachedImageView('imageDirectoryName', img, tempimagebox);
	
	var height = tempimagebox.toImage().height;
	var width = tempimagebox.toImage().width;
	var ratio = height / width;

	return Math.floor( 300 * ratio );
}

function getTitleLabel(title) {

	// Temp label to get height
	// At this font-size/font-face the height per line is 32
	var temp = Ti.UI.createLabel({
		text: title,
		height:'auto',
		width: 250,
		color:'#efc006',
		font:{fontFamily:'Helvetica',fontSize:16,fontWeight:'bold'}
	});
	var view = Ti.UI.createView({
		width: 250,
		height:'auto'
	});
	view.add(temp);
	//Ti.API.info('[' + view.toImage().width + ' x ' + view.toImage().height + '][' + view.toImage().size + '] ' + title);

	var label = Ti.UI.createLabel({
		text: title,
		left: 15,
		top: 15,
		bottom:10,
		height: view.toImage().height,
		textAlign:'left',
		width: 270,
		color:'#303030',
        shadowOpacity:0.5,
        shadowOffset:{x:0, y:1},
		font:{fontFamily:'Helvetica-Bold',fontSize:16,fontWeight:'normal'}
	});
	
	return label;

}

function getDescriptionLabel(description) {

	var text = Ti.UI.createLabel({
		text: description,
		left: 15,
		bottom: 10,
		top: 0,
		height: 70,
		textAlign:'left',
		width: 200,
		color:'#000000',
		font:{fontFamily:'HelveticaNeue-Light',fontSize:12,fontWeight:'bold'}
	});
	this.postheight += text.toImage().height;

	return text;

}

function getPostImage(image) {
	var tempimagebox = Ti.UI.createImageView({
		image: image,
		width: 'auto',
		height: 'auto',
		hires: true,
		//top: -10, // this works for some reason
	});
    cachedImageView('imageDirectoryName', image, tempimagebox);
	
	var height = tempimagebox.toImage().height;
	var width = tempimagebox.toImage().width;
	var ratio = width / height;

	var adjustedWidth = Math.floor(60 * ratio);

	var imagebox = Ti.UI.createImageView({
		image: this.image,
		hires: true,
		width: adjustedWidth,
		top: 0
	});

	return imagebox;
}

/* 
	Developed by Kevin L. Hopkins (http://kevin.h-pk-ns.com)
	You may borrow, steal, use this in any way you feel necessary but please
	leave attribution to me as the source.  If you feel especially grateful,
	give me a linkback from your blog, a shoutout @Devneck on Twitter, or 
	my company profile @ http://wearefound.com.

/* Expects parameters of the directory name you wish to save it under, the url of the remote image, 
   and the Image View Object its being assigned to. */
cachedImageView = function(imageDirectoryName, url, imageViewObject)
{
	// Grab the filename
	var filename = url.split('/');
	filename = filename[filename.length - 1];
	// Try and get the file that has been previously cached
	var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, imageDirectoryName, filename);
	
	if (file.exists()) {
		// If it has been cached, assign the local asset path to the image view object.
		imageViewObject.image = file.nativePath;
		//To release memory
		file = null;
	} else {
		// If it hasn't been cached, grab the directory it will be stored in.
		var g = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, imageDirectoryName);
		if (!g.exists()) {
			// If the directory doesn't exist, make it
			g.createDirectory();
		};
		
		// Create the HTTP client to download the asset.
		var xhr = Ti.Network.createHTTPClient();
		
		xhr.onload = function() {
			if (xhr.status == 200) {
				// On successful load, take that image file we tried to grab before and 
				// save the remote image data to it.
				file.write(xhr.responseData);
				// Assign the local asset path to the image view object.
				imageViewObject.image = file.nativePath;
				//To release memory
				file = null;
			};
		};
		
		// Issuing a GET request to the remote URL
		xhr.open('GET', url);
		// Finally, sending the request out.
		xhr.send();
	};
};
 
module.exports = Row;
