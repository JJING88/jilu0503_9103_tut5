# jilu0503_9103_tut5

## 1. Imaging Technique Inspiration

**Zach Lieberman's Reflection Studies**

I was inspired by Zach Lieberman's Reflection Studies project, in particular his use of light and shadow reflections to create abstract visual effects. This technique creates a dynamic visual representation through the interaction between light and objects. I hope to apply this dynamic effect of light reflection to my project to express the interaction between virtual space and reality. This technique will help me explore how animation and visual reflections can create a compelling visual experience and enhance the immersion of my project.
[The link of Zach](https://www.instagram.com/reel/C_6cFIzJtPh/)

## 2. Exploring Coding Techniques

### Reflection Mapping with Three.js

To achieve similar effects, I will use Three.js to create reflection mapping and dynamic lighting effects. This library allows for efficient creation of 3D scenes and realistic rendering of light interactions.

**1. Reflection Mapping Example**

Using `CubeTextureLoader` and `MeshStandardMaterial` to create reflective surfaces:

```javascript
// Create Scene
const scene = new THREE.Scene();

// Create Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load Reflection Map
const loader = new THREE.CubeTextureLoader();
const texture = loader.load([
  'path/to/px.jpg', 'path/to/nx.jpg',
  'path/to/py.jpg', 'path/to/ny.jpg',
  'path/to/pz.jpg', 'path/to/nz.jpg'
]);

// Create Material and Geometry
const material = new THREE.MeshStandardMaterial({ envMap: texture });
const geometry = new THREE.BoxGeometry();
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Render Scene
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();
