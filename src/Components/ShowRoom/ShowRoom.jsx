import React, { useEffect, useState } from 'react';
import './ShowRoom.css';
import { useParams } from 'react-router-dom';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { ItemList } from '../../models/itemlist';
import * as OrbitControls from 'three-orbitcontrols'; 

export const ShowRoom = (props) => {
    
    let { id } = useParams();
    
    useEffect(() => {
        showTheModel(id);
    });

    return (
        <div>
            <div id="showroom">

            </div>
        </div>
    )
}

function showTheModel(id) {
    // setting up the scene
    const scene = new THREE.Scene();

    // setting up the camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

    // setting up OBJ Loader
    const materialLoader = new MTLLoader();
    materialLoader.setResourcePath('/');
    materialLoader.setPath('/');
    materialLoader.load(getModelPath(id, 'material'), materials => {
        materials.preload();
        const loader = new OBJLoader();
        loader.setMaterials(materials);
        loader.setPath('/');
        loader.load(getModelPath(id, 'model'), object => {
            scene.add(object);
        });
    });

    // setting up the lights
    const light1 = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
    light1.position.set(-100, 0, 100);
    scene.add(light1);

    const light2 = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 1.0);
    light1.position.set(100, 0, 100);
    scene.add(light2);

    const light3 = new THREE.DirectionalLight(0xffffff, 1.0);
    light3.position.set(100, 0, 100).normalize();
    scene.add(light3);

    // setting the camera position
    camera.position.x = 0.1;
    camera.position.y = 1;
    camera.position.z = 5;

    
    
    // setting up the renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff, 1);
    document.getElementById('showroom').append(renderer.domElement);
    
    // setting up Orbital Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.campingFactor = 0.25;
    controls.enableZoom = true;

    // setting up the animate function
    var animate = function () {
        requestAnimationFrame( animate );
        controls.update();
        renderer.render( scene, camera );
    };
    animate();
}

function getModelPath(id, key) {
    const obj = ItemList.find(item => item.id.toString() === id);
    return (key === 'model') ? obj.model : obj.material;
}