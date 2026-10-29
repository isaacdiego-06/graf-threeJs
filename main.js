
import * as THREE from 'https://unpkg.com/three@0.154.0/build/three.module.js';

// Obtener el canvas del HTML
const canvas = document.getElementById("canvas");

// Crear la escena, cámara y renderizador
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x000000, 1);

// Crear la geometría compartida de los tres cubos
const geometry = new THREE.BoxGeometry(1, 1, 1);

// Crear materiales
const materialVerde = new THREE.MeshStandardMaterial({
    color: 0x00ff00
});

const materialAzul = new THREE.MeshStandardMaterial({
    color: 0x0000ff
});

const materialRojo = new THREE.MeshStandardMaterial({
    color: 0xff0000
});

// Crear los tres cubos
const cuboVerde = new THREE.Mesh(geometry, materialVerde);
const cuboAzul = new THREE.Mesh(geometry, materialAzul);
const cuboRojo = new THREE.Mesh(geometry, materialRojo);

// Colocar los cubos horizontalmente en el centro
cuboVerde.position.x = -1.5;
cuboAzul.position.x = 0;
cuboRojo.position.x = 1.5;

// Agregar los cubos a la escena
scene.add(cuboVerde);
scene.add(cuboAzul);
scene.add(cuboRojo);

// Agregar iluminación
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5).normalize();
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Posicionar la cámara
camera.position.z = 5;

// Función de animación
function animate() {

    // Cubo verde: velocidad original
    cuboVerde.rotation.x += 0.01;
    cuboVerde.rotation.y += 0.01;

    // Cubo azul: velocidad más rápida
    cuboAzul.rotation.x += 0.03;
    cuboAzul.rotation.y += 0.03;

    // Cubo rojo: velocidad más alta
    cuboRojo.rotation.x += 0.05;
    cuboRojo.rotation.y += 0.05;

    // Renderizar la escena
    renderer.render(scene, camera);
}

// Iniciar la animación
renderer.setAnimationLoop(animate);

// Adaptar la escena al cambiar el tamaño de la ventana
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
});
