$( document ).ready(function() {
  var canvas1 = document.getElementById('Canvas1');
  var context1 = canvas1.getContext('2d');
  var canvas2 = document.getElementById('Canvas2');
  var context2 = canvas2.getContext('2d');


  var imageObj1 = new Image();
  imageObj1.src = "images/aqua_gingham.png"
  imageObj1.onload = function() {
    context1.drawImage(imageObj1, 0, 0);
  };

var imageObj2 = new Image();
  imageObj2.src = "images/feathers.png"
  imageObj2.onload = function() {
    context1.drawImage(imageObj2, 10, 10);
   // context2.drawImage(imageObj2, 10, 10);
  };
  
var imageData = context1.getImageData(0,0,300,300);
  
var pngUrl = canvas1.toDataURL();

$("#quiltIt").click(function(e) {
	e.preventDefault();
	// alert("Quilt");
	context2.drawImage(canvas1, 0, 0, 100,100);
	context2.fontStyle = "38pt Arial";
	context2.fillStyle = "red";
	context2.fillText("Jackie", 0, 0);
	// context2.putImageData(imageData, 0, 0);
});

    
  

/*

  var imageObj3 = new Image();
  imageObj3.src = '"'+pngUrl+'"';
  console.log(pngUrl);
  imageObj3.onload = function() {
	  context2.drawImage(imageObj3, 0, 0);
  }
*/


});