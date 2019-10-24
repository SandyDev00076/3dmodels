import React, { useEffect, useState } from 'react';
import './ShowRoom.css';
import { useParams } from 'react-router-dom';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { ItemList } from '../../models/itemlist';

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

    // setting up the GLTF Loader to Load GLB models
    // const loader = new GLTFLoader();
    // loader.load(getModelPath(id), (gltf) => {
    //     scene.add(gltf.scene);
    // });

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // setting the camera position
    camera.position.x = 0.1;
    camera.position.y = 1;
    camera.position.z = 5;

    // setting up the renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff, 1);
    document.getElementById('showroom').append(renderer.domElement);

    // setting up the animate function
    var animate = function () {
        requestAnimationFrame( animate );
        cube.rotation.y += 0.03;
        renderer.render( scene, camera );
    };
    animate();
}

function getModelPath(id) {
    const obj = ItemList.find(item => item.id.toString() === id);
    return `../../models/${obj.model}`;
}