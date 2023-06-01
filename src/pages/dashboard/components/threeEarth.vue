<template>
  <div>
    <q-card class="q-pa-md">
      <div class="fs-18 f-bold">Three earth example</div>
      <div id="c-three-earth">
        <canvas width="500px" height="350px" style="width: 1047.08px; height: 788.547px"></canvas>
      </div>
    </q-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator';
@Component({ name: 'myThreeEarthComponent' })
export default class myThreeEarthComponent extends Vue {
  mounted() {
    const container: HTMLCanvasElement = document.getElementById('c-three-earth') as HTMLCanvasElement;
    const canvas = container.getElementsByTagName('canvas')[0];
    const globeRadius = 100;
    const globeWidth = 4098 / 2;
    const globeHeight = 1968 / 2;

    function convertFlatCoordsToSphereCoords(x: number, y: number, width?: number, height?: number) {
      let latitude = ((x - globeWidth) / globeWidth) * -180;
      let longitude = ((y - globeHeight) / globeHeight) * -90;
      latitude = (latitude * Math.PI) / 180;
      longitude = (longitude * Math.PI) / 180;
      const radius = Math.cos(longitude) * globeRadius;

      return {
        x: Math.cos(latitude) * radius,
        y: Math.sin(longitude) * globeRadius,
        z: Math.sin(latitude) * radius,
      };
    }

    function makeMagic(points: any) {
      const { width, height } = container.getBoundingClientRect();

      // 1. Setup scene
      const scene = new (<any>THREE).Scene();
      // 2. Setup camera
      const camera: any = new (<any>THREE).PerspectiveCamera(45, width / height);
      // 3. Setup renderer
      const renderer = new (<any>THREE).WebGLRenderer({
        canvas,
        antialias: true,
      });
      renderer.setSize(width, height);
      // 4. Add points to canvas
      // - Single geometry to contain all points.
      const mergedGeometry = new (<any>THREE).Geometry();
      // - Material that the dots will be made of.
      const pointGeometry = new (<any>THREE).SphereGeometry(0.5, 1, 1);
      const pointMaterial = new (<any>THREE).MeshBasicMaterial({
        color: '#989db5',
      });

      for (let point of points) {
        const { x, y, z } = convertFlatCoordsToSphereCoords(point.x, point.y, width, height);

        if (x && y && z) {
          pointGeometry.translate(x, y, z);
          mergedGeometry.merge(pointGeometry);
          pointGeometry.translate(-x, -y, -z);
        }
      }

      const globeShape = new (<any>THREE).Mesh(mergedGeometry, pointMaterial);
      scene.add(globeShape);

      container.classList.add('peekaboo');

      // Setup orbital controls
      camera.orbitControls = new (<any>THREE).OrbitControls(camera, canvas);
      camera.orbitControls.enableKeys = false;
      camera.orbitControls.enablePan = false;
      camera.orbitControls.enableZoom = false;
      camera.orbitControls.enableDamping = false;
      camera.orbitControls.enableRotate = true;
      camera.orbitControls.autoRotate = true;
      camera.position.z = -265;

      function animate() {
        // orbitControls.autoRotate is enabled so orbitControls.update
        // must be called inside animation loop.
        camera.orbitControls.update();
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      }
      animate();
    }

    function hasWebGL() {
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (gl && gl instanceof WebGLRenderingContext) {
        return true;
      } else {
        return false;
      }
    }

    function init() {
      if (hasWebGL()) {
        window;
        window
          .fetch('https://dirkhe1051931999.github.io/v3-admin/three/points.json')
          .then((response) => response.json())
          .then((data) => {
            makeMagic(data.points);
          });
      }
    }
    init();
  }
}
</script>

<style lang="scss" scoped></style>
