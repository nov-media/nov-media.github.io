const scene = new THREE.Scene();
scene.add( new THREE.GridHelper( 8, 8, 0xff0000 ) );
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set( 1.2, 0.8, 0 );
camera.lookAt( 0, 0, 0.4 );
const light = new THREE.PointLight( 0xffffff );
light.position.set( 1, 1, 0 );
camera.add( light );
scene.add( camera );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var createDomeAt = function( x, z, rPer, r ) {
    r = r === undefined ? 0.5 : r;
    // mesh
    var mesh = new THREE.Mesh(
        // USING A SPHERE GEOMETRY WITH A RADIUS OF 0.5
        new THREE.SphereGeometry( r, 30, 30, 0, Math.PI * 2, 0, Math.PI * 0.5 ),
        // standard material
        new THREE.MeshStandardMaterial({
            color: 0xff0000,
            emissive: 0x404040,
            side: THREE.DoubleSide
        })
    );
    mesh.position.set( x, 0, z );
    mesh.geometry.rotateX( Math.PI * 2 * rPer );
    return mesh;
};
scene.add( createDomeAt( 0, 0, 0.0 ) );
scene.add( createDomeAt( 0, 1, 0.5 ) );
renderer.render(scene, camera);

// const geometry = new THREE.SphereGeometry( 15, 32, 16 );
// const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
// const sphere = new THREE.Mesh( geometry, material );
// scene.add( sphere );
// camera.position.z = 5;

// function animate() {
//     requestAnimationFrame( animate );
//     sphere.rotation.x += 0.01; sphere.rotation.y += 0.01;
//     renderer.render( scene, camera );
// }
// animate();
