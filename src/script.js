import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')
// Scene
const scene = new THREE.Scene()
//fog
const fog = new THREE.Fog('#262837', 2, 15)
scene.fog=fog;

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

const bricksColorTexture = textureLoader.load('/textures/bricks/color.jpg')
const bricksAmbientOcclusionTexture = textureLoader.load('/textures/bricks/ambientOcclusion.jpg')
const bricksNormalTexture = textureLoader.load('/textures/bricks/normal.jpg')
const bricksRoughnessTexture = textureLoader.load('/textures/bricks/roughness.jpg')

const grassColorTexture = textureLoader.load('/textures/grass/color.jpg')
const grassAmbientOcclusionTexture = textureLoader.load('/textures/grass/ambientOcclusion.jpg')
const grassNormalTexture = textureLoader.load('/textures/grass/normal.jpg')
const grassRoughnessTexture = textureLoader.load('/textures/grass/roughness.jpg')

const bushColorTexture = textureLoader.load('/textures/Grass_002/Grass_002_COLOR.jpg')
const bushAmbientOcclusionTexture = textureLoader.load('/textures/Grass_002/Grass_002_OCC.jpg')
const bushNormalTexture = textureLoader.load('/textures/Grass_002/Grass_002_NRM.jpg')
const bushDisplacementTexture = textureLoader.load('/textures/Grass_002/Grass_002_DISP.jpg')

const graveColorTexture = textureLoader.load('/textures/grave/Rock_043_BaseColor.jpg')
const graveAmbientOcclusionTexture = textureLoader.load('/textures/grave/Rock_043_AmbientOcclusion.jpg')
const graveNormalTexture = textureLoader.load('/textures/grave/Rock_043_Normal.jpg')
const graveRoughnessTexture = textureLoader.load('/textures/grave/Rock_043_Roughness.jpg')

const roofColorTexture = textureLoader.load('/textures/roof/Roof_Tiles_Terracotta_006_basecolor.jpg')
const roofAmbientOcclusionTexture = textureLoader.load('/textures/roof/Roof_Tiles_Terracotta_006_ambientOcclusion.jpg')
const roofNormalTexture = textureLoader.load('/textures/roof/Roof_Tiles_Terracotta_006_normal.png')
const roofRoughnessTexture = textureLoader.load('/textures/roof/Roof_Tiles_Terracotta_006_roughness.jpg')
const roofHeightTexture = textureLoader.load('/textures/roof/Roof_Tiles_Terracotta_006_height.jpg')


grassColorTexture.repeat.set(8, 8);
grassNormalTexture.repeat.set(8, 8);
grassRoughnessTexture.repeat.set(8, 8);
grassNormalTexture.repeat.set(8, 8);

grassColorTexture.wrapS = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
grassNormalTexture.wrapS = THREE.RepeatWrapping
grassRoughnessTexture.wrapS = THREE.RepeatWrapping

grassColorTexture.wrapT = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
grassNormalTexture.wrapT = THREE.RepeatWrapping
grassRoughnessTexture.wrapT = THREE.RepeatWrapping
/**
 * House
 */
const house = new THREE.Group;
scene.add(house);
const wallsGeometry=new THREE.BoxGeometry(4,2.5,4);
const wallsMaterial=new THREE.MeshStandardMaterial({
    map:bricksColorTexture,
    aoMap: bricksAmbientOcclusionTexture,
    normalMap: bricksNormalTexture,
    roughnessMap: bricksRoughnessTexture
});
wallsGeometry.setAttribute( 'uv2', new THREE.Float32BufferAttribute(wallsGeometry.attributes.uv.array, 2))
const walls=new THREE.Mesh(wallsGeometry,wallsMaterial);
walls.position.y=2.5/2;
house.add(walls);
/**
 * roof
 */
const roofGeometry = new THREE.ConeGeometry(3.5,1,4,1);
const roofMaterial = new THREE.MeshStandardMaterial({
    map:roofColorTexture,
    aoMap:roofAmbientOcclusionTexture,
    normalMap:roofNormalTexture,
    roughnessMap:roofRoughnessTexture,
    displacementMap:roofHeightTexture
});
roofGeometry.setAttribute( 'uv2', new THREE.Float32BufferAttribute(roofGeometry.attributes.uv.array, 2))
const roof = new THREE.Mesh(roofGeometry,roofMaterial);
roof.rotation.y=Math.PI/4;
roof.position.y=2.5+1/2;
house.add(roof);

/**
 * door
 */
const doorGeometry = new THREE.PlaneGeometry(2.2,2.2,100,100);
const doorMaterial= new THREE.MeshStandardMaterial({
    map:doorColorTexture,
    transparent: true,
    alphaMap: doorAlphaTexture,
    aoMap: doorAmbientOcclusionTexture,
    displacementMap: doorHeightTexture,
    displacementScale:.1,
    normalMap: doorNormalTexture,
    roughnessMap: doorRoughnessTexture,
    metalnessMap: doorMetalnessTexture
});
doorGeometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(doorGeometry.attributes.uv.array, 2)
)
const door= new THREE.Mesh(doorGeometry, doorMaterial);
door.position.z=4/2+.01;
door.position.y=2/2;
house.add(door);

/**
 * bushes
 */
const bushGeometry= new THREE.SphereGeometry(1,100,100);
const bushMaterial=new THREE.MeshStandardMaterial({
    map:bushColorTexture,
    displacementMap:bushDisplacementTexture,
    normalMap:bushNormalTexture,
    aoMap:bushAmbientOcclusionTexture
});
bushGeometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(bushGeometry.attributes.uv.array, 2)
)

//bush1
const bush1 = new THREE.Mesh(bushGeometry,bushMaterial);
bush1.scale.set(.5,.5,.5);
bush1.position.set(0.8,0.2,2.2);
//bush2
const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(0.25, 0.25, 0.25)
bush2.position.set(1.4, 0.1, 2.1)
//bush3
const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(0.4, 0.4, 0.4)
bush3.position.set(- 0.8, 0.1, 2.2)
//bush4
const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.set(0.15, 0.15, 0.15)
bush4.position.set(- 1, 0.05, 2.6)

house.add(bush1, bush2, bush3, bush4)
/**
 * Graves
 */
const graves = new THREE.Group();
scene.add(graves);
const graveGeometry= new THREE.BoxGeometry(.6,.8,.2);
const graveMaterial= new THREE.MeshStandardMaterial({
    map:graveColorTexture,
    aoMap:graveAmbientOcclusionTexture,
    normalMap:graveNormalTexture,
    roughnessMap:graveRoughnessTexture
})
graveGeometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(graveGeometry.attributes.uv.array, 2)
)

for(let i=0; i<50;i++){
    const radius =3+ Math.random()* 6;
    const angle = Math.PI*2*Math.random();
    const x=Math.sin(angle)*radius;
    const z=Math.cos(angle) * radius;
    const grave=new THREE.Mesh(graveGeometry,graveMaterial);
    grave.position.set(x,.3,z);
    grave.rotation.z= (Math.random() - 0.5) * 0.4;
    grave.rotation.y= (Math.random() - 0.5)* 0.5
    grave.castShadow=true;
    // grave.receiveShadow=true;
    graves.add(grave);
}

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({
        map: grassColorTexture,
        aoMap: grassAmbientOcclusionTexture,
        normalMap: graveNormalTexture,
        roughnessMap: graveRoughnessTexture,
    })
)
floor.geometry.setAttribute( 'uv2', new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2))
floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
scene.add(floor)

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.12)
moonLight.position.set(4, 5, - 2)
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(moonLight)
//doorLight
const doorLight = new THREE.PointLight('#ff7d46', 1, 7)
doorLight.position.set(0, 2.2, 2.7)
house.add(doorLight)


/**
 * Ghosts
 */
const ghost1 = new THREE.PointLight('#ff00ff',2,3);
scene.add(ghost1);
const ghost2 = new THREE.PointLight('#00ffff',2,3);
scene.add(ghost2);
const ghost3 = new THREE.PointLight('#ffff00',2,3);
scene.add(ghost3);

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor('#262837')

/**
 * shadows
 */
renderer.shadowMap.enabled=true;
renderer.shadowMap.type=THREE.PCFSoftShadowMap;
//castShadow
moonLight.castShadow= true;
doorLight.castShadow=true;
ghost1.castShadow=true;
ghost2.castShadow=true;
ghost3.castShadow=true;

walls.castShadow=true;
bush1.castShadow=true;
bush2.castShadow=true;
bush3.castShadow=true;
bush4.castShadow=true;
//receiveShadow
floor.receiveShadow=true;

//optimize shadow
ghost1.shadow.mapSize.width = 256
ghost1.shadow.mapSize.height = 256
ghost1.shadow.camera.far = 7

ghost2.shadow.mapSize.width = 256
ghost2.shadow.mapSize.height = 256
ghost2.shadow.camera.far = 7

ghost3.shadow.mapSize.width = 256
ghost3.shadow.mapSize.height = 256
ghost3.shadow.camera.far = 7
/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    //ghosts
    const ghost1Angle=elapsedTime*0.5;
    ghost1.position.x=Math.cos(ghost1Angle)*(4+ Math.sin(elapsedTime*.32));
    ghost1.position.z=Math.sin(ghost1Angle)*(4+ Math.sin(elapsedTime*.32));
    ghost1.position.y=Math.sin(ghost1Angle*3)+1;
    const ghost2Angle=-elapsedTime*0.4;
    ghost2.position.x=Math.cos(ghost2Angle)*(7+ Math.sin(elapsedTime*.5));
    ghost2.position.z=Math.sin(ghost2Angle)*(7+ Math.sin(elapsedTime*.5));
    ghost2.position.y=Math.sin(ghost2Angle*2)+Math.cos(elapsedTime*2)
    const ghost3Angle=elapsedTime*0.7;
    ghost3.position.x=Math.cos(ghost3Angle)*(5+ Math.sin(elapsedTime*.2));
    ghost3.position.z=Math.sin(ghost3Angle)*(5+ Math.sin(elapsedTime*.2));
    ghost3.position.y=Math.sin(ghost3Angle*4)+1;

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()