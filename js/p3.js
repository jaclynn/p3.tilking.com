$( document ).ready(function() {
	
	var quiltCanvas = document.getElementById('quilt');
	var quiltContext = quiltCanvas.getContext('2d');
	  
	var rectColors = new Array('red','green','blue', 'purple', 'yellow');
	var currentColor = "#DCDCDC";
	  
  function writeMessage(message) {
    text.setText(message);
    layer.draw();
  }
  
  function changeColor(shape) {
    if (shape.colorIndex < rectColors.length-1){
    	shape.colorIndex=shape.colorIndex+1;
    } else {
    	shape.colorIndex = 0;
    }
	shape.setFill(rectColors[shape.colorIndex]);
	layer.draw();
  }


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
		  // column/row max and for-loop maxes if 16-block choice
		  for (var row=0; row<blockSize; row+=100) {
			  for (var column=0; column<blockSize; column +=100){
			  	console.log("rectangle ",rect, row, column);
			  	rectangles[rect] = new Kinetic.Rect({
			        x: row,
			        y: column,
			        width: 100,
			        height: 100,
			        fill: "#E6E6B8",
			        stroke: 'gray',
			        strokeWidth: 1
			      });
				  rectangles[rect].colorIndex = 0;
				  rect++;
				  
			  }
		  }	  
			  
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
		  	rectangles[rect].on('click', function() {
		    	this.setFill(currentColor);
		    	layer.draw();
			});
		  }  
		                  
		  // add the shapes to the layer
		  for (var rect=0; rect<size; rect++) {     
		  	layer.add(rectangles[rect]);
		  }
		  layer.add(text);
			  
		  // add the layer to the stage
		  stage.add(layer);  
  } // end functionCreateBlock
  $('#grid9').click(function(e) {
  	  e.preventDefault();
	  createQuiltBlock(9);	  
  });
  $('#grid16').click(function(e) {
	 e.preventDefault();
	 createQuiltBlock(16);
  });
  $('#color1').colorPicker( { onColorChange : function(id, newValue) { 
  	console.log("ID: " + id + " has been changed to " + newValue);
  	currentColor = newValue;
  	} 
  });
  
  
  // This is the only way I could find to access the Kinetic Stage's canvas since the
  // provided layer.getCanvas() method doesn't seem to work in this revision of
  // KineticJS
  var quiltBlock = document.getElementsByTagName('canvas')[0];
  
//  var imageObj1 = new Image();
//  imageObj1.src = "images/aqua_gingham.png"
//  imageObj1.onload = function() {
//    context1.drawImage(imageObj1, 0, 0);
//  };

// var imageObj2 = new Image();
//  imageObj2.src = "images/feathers.png"
//  imageObj2.onload = function() {
//    context1.drawImage(imageObj2, 10, 10);
   // context2.drawImage(imageObj2, 10, 10);
//  };
  
$("#quiltIt").click(function(e) {
	e.preventDefault();
	// populate quilt gride
	for (var row=0; row<500; row+=100) {
	  for (var column=0; column<400; column +=100) {
	  	  console.log("adding to quilt at", column, row);
		  quiltContext.drawImage(quiltBlock,column,row,100,100);
	  }
  }
});

 

});