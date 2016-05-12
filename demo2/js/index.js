
    
      var canvas = document.getElementById('myCanvas');
      var context = canvas.getContext('2d');

      var image = new Image();

      var texture = new THREE.Texture();
      texture.image = image;
      image.onload = function() {
        texture.needsUpdate = true;
      };

      // draw cloud
      context.beginPath();
      context.moveTo(170, 80);
      context.bezierCurveTo(130, 100, 130, 150, 230, 150);
      context.bezierCurveTo(250, 180, 320, 180, 340, 150);
      context.bezierCurveTo(420, 150, 420, 120, 390, 100);
      context.bezierCurveTo(430, 40, 370, 30, 340, 50);
      context.bezierCurveTo(320, 5, 250, 20, 250, 50);
      context.bezierCurveTo(200, 5, 150, 20, 170, 80);
      context.closePath();
      context.lineWidth = 5;
      context.fillStyle = '#8ED6FF';
      context.fill();
      context.strokeStyle = '#0000ff';
      context.stroke();

      // save canvas image as data url (png format by default)
      image.src = canvas.toDataURL();

      texture.repeat.set(1, 1);
texture.wrapS = texture.wrapT = THREE.MirroredRepeatWrapping;

var material = new THREE.MeshLambertMaterial( { color: 0xffffff, map: texture } ); 
 

var scene = new THREE.Scene(); 
var camera = new THREE.PerspectiveCamera( 75, 250/250, 0.1, 1000 ); 
var renderer = new THREE.WebGLRenderer(); 
renderer.setSize( 250, 250 ); document.body.appendChild( renderer.domElement ); 

var geometry = new THREE.BoxGeometry( 1, 1, 1 ); 
var cube = new THREE.Mesh( geometry, material ); 
scene.add( cube ); 


scene.add(new THREE.HemisphereLight(0xaaaaaa, 0x333333));

var keyLight = new THREE.PointLight(0xaaaaaa);
keyLight.position.x = 15;
keyLight.position.y = -10;
keyLight.position.z = 35;
scene.add(keyLight);

var rimLight = new THREE.PointLight(0x888888);
rimLight.position.x = 100;
rimLight.position.y = 100;
rimLight.position.z = -50;
scene.add(rimLight);

camera.position.z = 2; 

var render = function () { 
  requestAnimationFrame( render ); 
  /*cube.rotation.x += 0.01;  */
  cube.rotation.y += 0.02; 
  renderer.render(scene, camera); 
}; 

render();