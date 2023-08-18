const scene = new THREE.Scene();
scene.add( new THREE.GridHelper( 256, 256, 0xff0000 ) );
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set( 1, 1, 1 ); camera.lookAt( 0, 0, 0 );
const light = new THREE.PointLight( 0xffffff );
light.position.set( 1, 1, 1 );
camera.add( light ); scene.add( camera );

const renderer = new THREE.WebGLRenderer( { alpha: true, antialias: true } );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animation );
document.body.appendChild( renderer.domElement );

var createDomeAt = function( x, z, rPer, r ) {
    r = r === undefined ? 0.5 : r;
    var mesh = new THREE.Mesh(
        // USING A SPHERE GEOMETRY WITH A RADIUS OF 0.5
        new THREE.SphereGeometry( r, 64, 64, 0, Math.PI * 2, 0, Math.PI * 0.5 ),
        // standard material
        new THREE.MeshStandardMaterial({
            color: 0xf0f0f0,
            emissive: 0x000000,
            roughness: 0,
            metalness: 0,
            side: THREE.DoubleSide
        })
    );
    mesh.position.set( x, 0, z );
    mesh.geometry.rotateX( Math.PI * 2 * rPer );
    return mesh;
};
const sphere = createDomeAt( 0, 0, 0.0 )
scene.add( sphere );
renderer.render(scene, camera);

const offset = new THREE.Vector3();
const distance = 1;
function animation( time ) {
    offset.x = distance * Math.sin( time * 0.0001 );
    offset.z = distance * Math.cos( time * 0.0001 );
    offset.y = 1
    camera.position.copy( sphere.position ).add( offset );
    camera.lookAt( sphere.position );
    renderer.render( scene, camera );
}
