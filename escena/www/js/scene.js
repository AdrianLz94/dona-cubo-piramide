(function(){

    //vertex shader calcular posiciones y vertices de los primitivos
    //y el frament shader calcula el color y la posicion de los primitivos

    let scene = new THREE.Scene();
    const aspectRatio = window.innerWidth / window.innerHeight;
    let camera = new THREE.PerspectiveCamera(110, aspectRatio, 0.1, 150);
    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.soft = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;


    camera.position.z = 10;
    camera.position.y = 90;
    camera.rotation.x = -1.5;

    let planeGeometry = new THREE.PlaneGeometry(200,900);
    planeGeometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2));
    let groundMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff
    });
    let plane = new THREE.Mesh(planeGeometry, groundMaterial);
    plane.receiveShadow  = true;
    let mesh;
    let dona;
   let piramide;

    let loader = new THREE.TextureLoader();
  //  let loader2 = new THREE.TextureLoader();
  

    

    loader.load('public/mapa2.jpg', function(texture){


        let geometry = new THREE.BoxGeometry(30,30,30)
        let material = new THREE.MeshBasicMaterial({
            map: texture
        })
        mesh = new THREE.Mesh(geometry, material);
        mesh.position.y = 25;
        mesh.position.x=45;
        mesh.castShadow = true;
        scene.add(mesh);
    
    /*    let geometry1 = new THREE.ConeBufferGeometry(5,20,32);
        let material1 = new THREE.MeshBasicMaterial({color: 0xffff00
            //map: texture
        });
        let mesh1 = new THREE.Mesh(geometry, material);
        mesh1.position.y = 45;
        mesh1.position.x = 45;
        mesh1.castShadow = true;
        scene.add(mesh1);
*/
    });
   loader.load('public/chocolate.jpg', function(texture){
    let geometry1 = new THREE.TorusGeometry( 15, 5, 20, 100 );
    let material = new THREE.MeshBasicMaterial( { 
       // color: 0x7A2E11 
     map: texture
     } )
     dona = new THREE.Mesh( geometry1, material );
    dona.castShadow = true;
    dona.position.y = 20;
    dona.position.z = -40;
    scene.add(dona);
    
});

loader.load('public/parena.jpg', function(texture){
    let geometry2 = new THREE.ConeGeometry(30,40,4,1);
    let material2 = new THREE.MeshBasicMaterial( {
  //      color: 0xE6BE8A 
        map: texture
    } )
    piramide = new THREE.Mesh( geometry2, material2 );
    piramide.receiveShadow = true;
    piramide.castShadow = true;
    piramide.position.y = 35;
    piramide.position.x = -40;
    piramide.position.z = 30;
    scene.add(piramide);
});

   // let geometry = new THREE.BoxGeometry(10,10,10,10);

    //let groundMaterial = new THREE.MeshPhongMaterial({
    //    color: 0xffffff
   // });

 //   let mesh = new THREE.Mesh(geometry, groundMaterial);

    let pointLight = new THREE.PointLight(0x606060);

    pointLight.position.y = 60;
    pointLight.position.z = 10;

    pointLight.castShadow = true;

    scene.background = new THREE.Color(0xeeeeee);
    scene.add(new THREE.AmbientLight(0x404040));
    scene.add(plane);
    scene.add(pointLight);
  
    

    let controls = new THREE.OrbitControls(camera, renderer.domElement);


    function loop(){
        requestAnimationFrame(loop);
        mesh.rotation.x += 0.01;
        piramide.rotation.z += 0.01;
        dona.rotation.z += 0.01;
        piramide.rotation.x += 0.01;
        dona.rotation.y += 0.01;
        dona.rotation.x -= 0.01;
        renderer.render(scene, camera);
    }

    loop();

})();