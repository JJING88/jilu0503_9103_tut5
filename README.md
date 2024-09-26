# jilu0503_9103_tut5

# Creative Code Art and Implementation

## 1. Imaging Technique Inspiration

**Zach Lieberman's Reflection Studies**

Zach Lieberman's *Reflection Studies* explores the dynamic interplay between light and reflective surfaces to create abstract visual effects. The technique involves manipulating light and reflections to generate captivating visual experiences.

**Examples of Reflection Studies:**
1. ![Reflection Study 1](https://s3.amazonaws.com/zachlieberman.com/media/ReflectionStudies1.jpg)
2. ![Reflection Study 2](https://s3.amazonaws.com/zachlieberman.com/media/ReflectionStudies2.jpg)

### Inspiration for Project

I plan to incorporate dynamic light and reflection effects similar to Lieberman's work into my project. This will enhance visual engagement and create immersive experiences by simulating realistic interactions between light and objects.

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
