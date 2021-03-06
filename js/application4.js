    

    var d_canvas, context, contenedor;
    var texture, cube, scene_tuyo, camera_tuyo, renderer_tuyo, geometry;

    var targetRotation = 0;
    var targetRotationOnMouseDown = 0;

    var mouseX = 0;
    var mouseXOnMouseDown = 0;

    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;
    var objeto3D,loader,loader2;
    var imagenTextura = new Image();
    var textura;
    var renderer_mio;
    var mesh;
    var pointLight;

    var w_canvas, h_canvas; 

    /*var WIDTH = 768,
        HEIGHT = 512;*/
    var WIDTH, HEIGHT;
    var VIEW_ANGLE = 65,
        /*ASPECT = WIDTH / HEIGHT,*/
        NEAR = 0.1,
        FAR = 20000;

    var TO_RADIANS = Math.PI/180; 

    var xPos, yPos;

    $(document).ready(function(){

            WIDTH = $('#renderObjeto').width();
            HEIGHT = $('#renderObjeto').height();

            /*var params = {
                // Callback fired on rotation start.
                start: function(event, ui) {
                },
                // Callback fired during rotation.
                rotate: function(event, ui) {
                },
                // Callback fired on rotation end.
                stop: function(event, ui) {
                },
                rotationCenterX: 50.0, 
                rotationCenterY: 50.0
            };*/
            // Inicializa variables y objetos draggables y droppables
            d_canvas = document.getElementById('mycanvas');
            w_canvas = d_canvas.width;
            h_canvas = d_canvas.height;

            context = d_canvas.getContext('2d');
            context.fillStyle = "#ffffff";
            context.fillRect(0,0,w_canvas,h_canvas);
            $contenedor = $('#droppable');

            $( ".draggable2" ).draggable({ 
                revert: "invalid", 
                helper: "clone" ,

                drag: function(event, ui) {
                    var offset = ui.offset;
                    xPos = offset.left;
                    yPos = offset.top;
                    

                }
            });

            $( "#disenhos" ).droppable({
              accept: ".movible",
              activeClass: "ui-state-default",
              hoverClass: "ui-state-hover",
              drop: function(event, ui) {
                if ( $(ui.draggable).hasClass('movible')){
                   $(ui.draggable).remove()
                }
              }
            });
         
            $( "#droppable" ).droppable({
              accept: ".movible, .draggable2",
              activeClass: "ui-state-default",
              hoverClass: "ui-state-hover",
              drop: function(event, ui) {

                if ( $(ui.helper).hasClass('draggable2')){
                    var new_signature = $(ui.helper).clone().removeClass('draggable2').addClass('movible');
                    //new_signature.draggable({ revert: "invalid"}).resizable({aspectRatio: true}).rotatable(params).css({'top':'0px','left':'0px'});

                    imagen_hijo_w = $(ui.draggable).children('img').width();
                    imagen_hijo_h = $(ui.draggable).children('img').height();

                    xPos -= $('#droppable').offset().left;
                    yPos -= $('#droppable').offset().top;

                    new_signature.draggable({ revert: "invalid"}).resizable({aspectRatio: true}).css({left:xPos+'px', top:yPos+'px', height: imagen_hijo_h+'px', width: imagen_hijo_w+'px'});
                    $(this).append(new_signature)
                }
               
              }
            });




            init();
            animate();

    });

    function init() {

        /*TEXTURA EN CUBO*/
        /*texture = new THREE.Texture(d_canvas);
        texture.needsUpdate = true;
        texture.repeat.set(1, 1);
        texture.wrapS = texture.wrapT = THREE.MirroredRepeatWrapping;
        var material = new THREE.MeshLambertMaterial( { color: 0xffffff, map: texture } ); 

        scene_tuyo = new THREE.Scene(); 
        camera_tuyo = new THREE.PerspectiveCamera( 75, 250/250, 0.1, 1000 ); 
        renderer_tuyo = new THREE.WebGLRenderer(); 
        renderer_tuyo.setSize( 250, 250 ); 
        renderer_tuyo.domElement.id = 'cubotest';
        document.body.appendChild( renderer_tuyo.domElement ); 

        geometry = new THREE.BoxGeometry( 1, 1, 1 ); 
        cube = new THREE.Mesh( geometry, material ); 
        scene_tuyo.add( cube ); 


        scene_tuyo.add(new THREE.HemisphereLight(0xaaaaaa, 0x333333));

        var keyLight = new THREE.PointLight(0xaaaaaa);
        keyLight.position.x = 15;
        keyLight.position.y = -10;
        keyLight.position.z = 35;
        scene_tuyo.add(keyLight);

        var rimLight = new THREE.PointLight(0x888888);
        rimLight.position.x = 100;
        rimLight.position.y = 100;
        rimLight.position.z = -50;
        scene_tuyo.add(rimLight);
        camera_tuyo.position.z = 2;*/
        /*TEXTURA EN CUBO*/

        container = document.getElementById("renderObjeto");

        camera_mio =
              new THREE.PerspectiveCamera(
                VIEW_ANGLE,
                // window.innerWidth / window.innerHeight,
                WIDTH/HEIGHT,
                NEAR,
                FAR);

        /*camera_mio.position.z = 100;
        camera_mio.position.y = 30;*/

        camera_mio.position.y = 0;
        camera_mio.position.x = 0;
        camera_mio.position.z = 0.13;    

        scene_mio = new THREE.Scene();

        // create a point light
        pointLight =
          new THREE.PointLight(0xFFFFFF);

        // set its position
        pointLight.position.x = 10;
        pointLight.position.y = -50;
        pointLight.position.z = 530;
        pointLight.castShadow = true;
        new THREE.CameraHelper( pointLight.shadow.camera );

        // add to the scene
        scene_mio.add(pointLight);

        //Textura
        /*textura = new THREE.Texture();
        textura.image = imagenTextura;
        imagenTextura.src = "textures/3473817.jpg";
        imagenTextura.onload = function() {
            textura.needsUpdate = true;
        };*/

        //Reimplementación para Cambio

        textura = new THREE.Texture(d_canvas);
        textura.wrapS = textura.wrapT = THREE.RepeatWrapping;
        textura.repeat.set(1,1);
        //textura.offset.set( 1, 1 );
        textura.needsUpdate = true;


        var manager = new THREE.LoadingManager();
        manager.onProgress = function ( item, loaded, total ) {

            //console.log( item, loaded, total );

        };

        var onProgress = function ( xhr ) {
                    if ( xhr.lengthComputable ) {
                        var percentComplete = xhr.loaded / xhr.total * 100;
                        //console.log( Math.round(percentComplete, 2) + '% downloaded' );
                    }
                };

        var onError = function ( xhr ) {
        };


        loader = new THREE.ColladaLoader();
        loader.load( "models/white_shirt/test3.dae", function ( collada ) {
        
            collada.scene.traverse( function ( child ) {
                if ( child instanceof THREE.SkinnedMesh ) {
                    //camera.lookAt( child.position );
                }
                if ( child instanceof THREE.Mesh ) {

                    child.material.map = textura;

                }
            } );
            scene_mio.add( collada.scene );
            objeto3D = collada.scene;
            objeto3D.rotation.y = 10;
        } );


        var materialObjeto = new THREE.MeshPhongMaterial( {
            color: 0x552811,
            specular: 0x222222,
            shininess: 25,
            bumpMap: textura,
            bumpScale: 12
        } );


        renderer_mio = new THREE.WebGLRenderer( { antialias: true } );
        renderer_mio.setClearColor( 0x123456 );
        renderer_mio.setPixelRatio( window.devicePixelRatio );
        //renderer_mio.setSize( window.innerWidth, window.innerHeight );
        renderer_mio.setSize( WIDTH, HEIGHT );
        renderer_mio.sortObjects = false;
        container.appendChild( renderer_mio.domElement );

        
        $('#renderObjeto').on('mousedown',onDocumentMouseDown);
        $('#renderObjeto').on('touchstart',onDocumentTouchStart);
        $('#renderObjeto').on('touchmove',onDocumentTouchMove);
        window.addEventListener( 'resize', onWindowResize, false );


        animate();
    }

    function animate() {

        requestAnimationFrame( animate );

        //cube.rotation.y += 0.02;

        if (objeto3D != undefined)
            objeto3D.rotation.y += 0.02

       // if (objeto3D != undefined)
       //         objeto3D.rotation.z = objeto3D.rotation.z += ( targetRotation - objeto3D.rotation.z ) * 0.05;

        
        renderer_mio.render( scene_mio, camera_mio );
        //renderer_tuyo.render( scene_tuyo, camera_tuyo );

    }


    function guardar(){

        context.clearRect(0, 0, w_canvas, h_canvas);
        context.fillStyle = $('.color.active').data('color') || '#ffffff';
        context.fillRect(0,0,w_canvas,h_canvas);

        $('#droppable .movible').each(function() {
            var $element = $(this);

            element_x = $element.offset().left - $contenedor.offset().left,
            element_y = $element.offset().top - $contenedor.offset().top;
            width = $element.children('img')[0].width;
            height = $element.children('img')[0].height;

            context.drawImage($element.children('img')[0], element_x, element_y, width, height);

        });
        //texture.needsUpdate = true;
        textura.needsUpdate = true;
    }


    function onWindowResize() {
        /*camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer_mio.setSize( window.innerWidth, window.innerHeight );*/
        WIDTH = $('#renderObjeto').width();
        HEIGHT = $('#renderObjeto').height();

        camera_mio.aspect = WIDTH/HEIGHT;
        camera_mio.updateProjectionMatrix();
        renderer_mio.setSize( WIDTH, HEIGHT );
    }
    function onDocumentMouseDown( event ) {
        event.preventDefault();
        document.addEventListener( 'mousemove', onDocumentMouseMove, false );
        document.addEventListener( 'mouseup', onDocumentMouseUp, false );
        document.addEventListener( 'mouseout', onDocumentMouseOut, false );
        mouseXOnMouseDown = event.clientX - windowHalfX;
        targetRotationOnMouseDown = targetRotation;
    }
    function onDocumentMouseMove( event ) {
        mouseX = event.clientX - windowHalfX;
        targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.02;
    }
    function onDocumentMouseUp( event ) {
        document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
        document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
        document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
    }
    function onDocumentMouseOut( event ) {
        document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
        document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
        document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
    }
    function onDocumentTouchStart( event ) {
        if ( event.touches.length === 1 ) {
            event.preventDefault();
            mouseXOnMouseDown = event.touches[ 0 ].pageX - windowHalfX;
            targetRotationOnMouseDown = targetRotation;
        }
    }
    function onDocumentTouchMove( event ) {
        if ( event.touches.length === 1 ) {
            event.preventDefault();
            mouseX = event.touches[ 0 ].pageX - windowHalfX;
            targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.05;
        }
    }

    $(document).on('click','.color',function(){

        $('.color.active').removeClass('active');
        $(this).addClass('active');

        guardar();
        /*
        context.clearRect(0, 0, w_canvas, h_canvas);
        context.fillStyle = $(this).data('color');
        context.fillRect(0,0,w_canvas,h_canvas);*/
        $('#droppable').css('background-color',$(this).data('color'));

    })