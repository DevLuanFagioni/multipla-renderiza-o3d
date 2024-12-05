import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

const modelContainers = [
  { id: "model1", path: "models/model1/scene.gltf", cameraZ: 2, rotationX: 0, rotationY: 3.5 },
  { id: "model2", path: "models/model2/scene.gltf", cameraZ: 10, rotationX: 0, rotationY: 0 },
  { id: "model3", path: "models/model3/scene.gltf", cameraZ: 10, rotationX: 0.5, rotationY: 2.5 },
  { id: "model4", path: "models/model4/scene.gltf", cameraZ: 30, rotationX: 0.8, rotationY: 0 },
  { id: "model5", path: "models/model5/scene.gltf", cameraZ: 5, rotationX: 0, rotationY: 0 },
];

function createScene(containerId, modelPath, cameraZ, rotationX, rotationY) {
  const container = document.getElementById(containerId);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  const controls = new OrbitControls(camera, renderer.domElement);
  const loader = new GLTFLoader();
  let loadedModel;

  renderer.setSize(container.offsetWidth, container.offsetHeight);
  container.appendChild(renderer.domElement);
  camera.position.z = cameraZ;

  const light = new THREE.AmbientLight(0xffffff, 10);
  scene.add(light);

  loader.load(
    modelPath,
    function (gltf) {
      loadedModel = gltf.scene;
      loadedModel.rotation.set(rotationX, rotationY, 0);
      scene.add(gltf.scene);
    },
    undefined,
    function (error) {
      console.error(`Erro ao carregar o modelo em ${containerId}:`, error);
    }
  );

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  animate();
}

modelContainers.forEach(({ id, path, cameraZ, rotationX, rotationY }) =>
  createScene(id, path, cameraZ, rotationX, rotationY)
);
