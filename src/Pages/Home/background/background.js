import WindowResize from 'three-window-resize'

var THREE = window.THREE
var camera,
	scene,
	renderer,
	octree,
	geometry,
	material,
	mesh,
	mouse,
	mouseAbsolute = {x:0,y:0},
	sphere,
	sphereCoords={},
	meshes = [],
	midPoint = {},
	meshesSearch = [],
	meshCountMax = 100,
	radius = 500,
	radiusMax = radius * 10,
	radiusMaxHalf = radiusMax * 0.5,
	radiusSearch = 400,
	searchMesh,
	frameRequest,
	base = new THREE.Color( 0x0800ff ),
	found = new THREE.Color( 0x00ff00 ),
	adding = true,
	rayCaster = new THREE.Raycaster(),
	origin = new THREE.Vector3(),
	direction = new THREE.Vector3();


function setMidPoint() {
	midPoint.x = window.innerWidth / 2
	midPoint.y = window.innerHeight / 2
	console.log("midPoint: ",midPoint)
	console.log("sphereCoords: ", sphereCoords)
	console.log("mouse: ", mouse)
}

export function init() {
	scene = new THREE.Scene();
	// scene.background = new THREE.Color( 0xf0f0f0 );
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, radius * 100 );
	scene.add( camera );
	renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	var info = document.getElementById('container')
	info.appendChild( renderer.domElement );

	setMidPoint()

	octree = new THREE.Octree({
		undeferred: false,
		depthMax: Infinity,
		objectsThreshold: 8,
		overlapPct: 0.05,
		scene: scene
	});
	mouse = new THREE.Vector2();
	searchMesh = new THREE.Mesh(
		new THREE.SphereGeometry( radiusSearch ),
		new THREE.MeshBasicMaterial( { color: 0x00FF00, transparent: true, opacity: 0 } )
	);
	scene.add( searchMesh );
	window.addEventListener( 'mousemove', onMouseMove, false );
	window.addEventListener( 'resize', setMidPoint, false );
	new WindowResize(renderer, camera)

	// sphere = document.getElementById('sphere')
	sphereCoords.x = 0
	sphereCoords.y = 0
	animate();
}

function followMouse() {
	var distX = mouseAbsolute.x - sphereCoords.x;
	var distY = mouseAbsolute.y - sphereCoords.y;

	sphereCoords.x += distX/75;
	sphereCoords.y += distY/14;

	// sphere.style.left = sphereCoords.x + "px";
	// sphere.style.top = sphereCoords.y + "px";
}

function stopAnimation() {
	cancelAnimationFrame(frameRequest)
	camera, scene, renderer, octree, frameRequest, mesh, mouse = null
	adding = true
	meshes = []
	sphereCoords = {}
	meshesSearch = []
	window.removeEventListener( 'mousemove', onMouseMove, false );
	var info = document.getElementById('container')
	info.innerHTML = '';
}

export function stop(delay) {
	if(delay) setTimeout(() => { stopAnimation() },delay)
	else stopAnimation()
}

function animate() {
	frameRequest = requestAnimationFrame( animate );
	modifyOctree();
	searchOctree();
	followMouse()
	render();
	octree.update();
}

var geometry = new THREE.BoxGeometry( 50, 50, 50 );

function modifyOctree() {
	if ( adding === true ) {
		mesh = new THREE.Line(geometry, new THREE.MeshBasicMaterial({ color: 0x2200ff, wireframe: true}))
		mesh.position.set(Math.random() * radiusMax - radiusMaxHalf, Math.random() * radiusMax - radiusMaxHalf, Math.random() * radiusMax - radiusMaxHalf)
		octree.add( mesh );
		scene.add( mesh );
		meshes.push( mesh );
		if ( meshes.length === meshCountMax ) adding = false
	}
	else {
		mesh = meshes.shift();
		scene.remove( mesh );
		octree.remove( mesh );
		if ( meshes.length === 0 ) adding = true
	}
}

function onMouseMove( event ) {
	mouseAbsolute.x = event.clientX
	mouseAbsolute.y = event.clientY
	mouse.x = ( event.clientX / window.innerWidth  ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

function searchOctree() {
	var i, il;
	for ( i = 0, il = meshesSearch.length; i < il; i++ ) { meshesSearch[ i ].object.material.color.copy( base );}
	searchMesh.position.set(Math.random() * radiusMax - radiusMaxHalf, Math.random() * radiusMax - radiusMaxHalf, Math.random() * radiusMax - radiusMaxHalf)
	var timeStart = Date.now();
	origin.copy( searchMesh.position );
	direction.set( Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1 ).normalize();
	rayCaster.set( origin, direction );
	meshesSearch = octree.search( rayCaster.ray.origin, radiusSearch, true, rayCaster.ray.direction );
	var intersections = rayCaster.intersectOctreeObjects( meshesSearch );
	var timeEnd = Date.now();
	for ( i = 0, il = meshesSearch.length; i < il; i++ ) {
		meshesSearch[ i ].object.material.color.copy( found );
	}
}

function render() {
	var timer = - Date.now() / 10000;

	const panViewBy = sphereCoords.x / window.innerWidth
	// sphereCoords.y / window.innerHeight

	camera.position.x = Math.cos( timer ) * 10000 * panViewBy
	// camera.position.x = Math.cos( timer ) * 10000 * mouse.x;
	camera.position.z = Math.sin( timer ) * 10000;
	// console.log("sphere: ",sphere)
	// if(mouse.x > 0) {
	// 	camera.position.x = Math.cos( timer ) * 10000;
	// 	camera.position.z = Math.sin( timer ) * 10000;
	// } else {
	// 	camera.position.x = Math.sin( timer ) * 10000;
	// 	camera.position.z = Math.cos( timer ) * 10000;
	// }

	camera.lookAt( scene.position );
	renderer.render( scene, camera );
}
