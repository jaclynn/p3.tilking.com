$( document ).ready(function() {
	
	var quiltCanvas = document.getElementById('quilt');
	var quiltContext = quiltCanvas.getContext('2d');
	var swatches = new Array();
	var chosenSwatch = "not chosen";
	var kineticSwatches = {};
    var loadedImages = 0;

		
	// matches default of color picker:
	var currentColor = "#333399";
	
	//Not used in final version but there if I need it
	function writeMessage(message) {
		text.setText(message);
		layer.draw();
	}//end writeMessage


	// load swatches
	// permission granted from David Butler, Amy Butler LTD http://www.amybutlerdesign.com
	var dir = "images/amybutler/";
	var fileextension = ".jpg";
	var swatchNum = 0;

	$.ajax({
	    //This will retrieve the contents of the folder if the folder is configured as 'browsable'
	    url: dir,
	    success: function (data) {
	        //List all png file names in the page
	        //Code modified from http://stackoverflow.com/questions/18480550/how-to-load-all-the-images-from-one-of-my-folder-into-my-web-page-using-jquery
	        $(data).find("a:contains(" + fileextension + ")").each(function () {
	            var filename = this.href.replace(window.location.host, "").replace("http:///", "");
	            $("#swatches").append("<img id='swatch" + swatchNum + "' src=" + dir + filename + " width=50 height=50 />");
	            swatches[swatchNum]=dir+filename;
	            console.log(dir+filename);
	            swatchNum++;
	        });//end data-find
	    }//end success-data
	});//end ajax
	
	//had to 'slow' this down so put it in a function, called when grid is created
	function loadSwatches() {
		console.log("swatch length is " + swatches.length);
		for (var swatch=0; swatch<swatches.length; swatch++) {
			swatchID = "swatch" + swatch;
			kineticSwatches[swatchID] = new Image();
			kineticSwatches[swatchID].onload = function() {};
			kineticSwatches[swatchID].src = swatches[swatch];
		}//end for
	}//end function


	//The way to bind event to dynamically created element it seems:
	$(document).on( "click", "img", function(){
		$('img').each(function() {
			this.width=50;
			this.height=50;
		});		
		chosenSwatch = this.id;
		this.width=60;
		this.height=60;
	} );


	//Creates quilt block grid based on user input of 9 or 16
	function createQuiltBlock(size) {
		if (size==16){
			blockSize=400;
		} else if (size==9){
			blockSize=300;		 			  
		}
	
		var stage = new Kinetic.Stage({
			container: 'container',
			width: blockSize,
			height: blockSize
		});
		
		var layer = new Kinetic.Layer();
		
		var rectangles = new Array();
		
		var rect=0;
		
		for (var row=0; row<blockSize; row+=100) {
			for (var column=0; column<blockSize; column +=100){
				rectangles[rect] = new Kinetic.Rect({
					x: row,
					y: column,
					width: 100,
					height: 100,
					fill: "#E6E6B8",
					stroke: 'gray',
					strokeWidth: 1,
					fillPatternImage: kineticSwatches.swatch4
				});//end rectangle creation
			rectangles[rect].colorIndex = 0; //added my own attribute
			rect++;
			} //end inner for
		}//end outer for	  

		// Not used in final version, was there for screen output			  
		var text = new Kinetic.Text({
			x: 10,
			y: 10,
			fontFamily: 'Calibri',
			fontSize: 12,
			text: '',
			fill: 'black'
		});


		// Events
		for (var rect=0; rect<size; rect++) { 
			rectangles[rect].on('click tap', function() {
				if (chosenSwatch=="not chosen"){
					this.setFill(currentColor);
					layer.draw();
				} else {
					this.setFill(null);//necessary to reset
					this.setFillPatternImage(kineticSwatches[chosenSwatch]);
					layer.draw();
				}
			});//end rectangle event
		}//end for  
	      
		// add the shapes to the layer
		for (var rect=0; rect<size; rect++) {     
			layer.add(rectangles[rect]);
		}//end for

		//not used in final version but there if I need it
		layer.add(text);
	  
		// add the layer to the stage
		stage.add(layer);  
	} // end functionCreateBlock
	
	
	$('#grid9').click(function(e) {
		e.preventDefault();
		loadSwatches();
		createQuiltBlock(9);	  
	});//end grid9 click
	
	$('#grid16').click(function(e) {
		e.preventDefault();
		loadSwatches();
		createQuiltBlock(16);
	});//end grid16 click

	$('#colorpick').click(function(e) {
		e.preventDefault();
		chosenSwatch="not chosen";
	});//end colorpick click
	
	$('#color1').colorPicker( { onColorChange : function(id, newValue) { 
		chosenSwatch = "not chosen";//switches to color
		currentColor = newValue;
	}
	});//end color picker event
 
    //The only canvas element on the screen is the Kinetic canvas
	var quiltBlock = document.getElementsByTagName('canvas')[0];
  
	//Quilt-it event
	$("#quiltIt").click(function(e) {
		var quiltBlock = document.getElementsByTagName('canvas')[0];
		e.preventDefault();

		// populate quilt gride
		for (var row=0; row<500; row+=100) {
			for (var column=0; column<400; column +=100) {
				console.log("adding to quilt at", column, row);
				quiltContext.drawImage(quiltBlock,column,row,100,100);
			}//end inner for
		}//end outer for
	});//end quiltIt button event

});//end on doc load