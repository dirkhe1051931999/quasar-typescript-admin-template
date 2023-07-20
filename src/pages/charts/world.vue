<template>
  <div>
    <div id="charts-world-map"></div>
  </div>
</template>

<script lang="ts">
import { getCurrentInstance } from 'vue';
import { Component, Vue } from 'vue-facing-decorator';
@Component({ name: 'myChartWorldComponent' })
export default class myChartWorldComponent extends Vue {
  private globals = getCurrentInstance()!.appContext.config.globalProperties;
  mounted() {
    var markers = [
      { name: 'Egypt', coords: [26.8206, 30.8025] },
      { name: 'Russia', coords: [61.524, 105.3188] },
      { name: 'Canada', coords: [56.1304, -106.3468] },
      { name: 'Greenland', coords: [71.7069, -42.6043] },
      { name: 'Brazil', coords: [-14.235, -51.9253] },
    ];
    const map = new this.globals.$window.jsVectorMap({
      selector: '#charts-world-map',
      map: 'world_merc',
      zoomButtons: true,
      zoomOnScroll: true,
      regionStyle: {
        initial: {
          fill: '#d1d5db',
        },
      },
      labels: {
        markers: {
          render: (marker: any) => {
            return marker.name;
          },
        },
      },
      lines: [
        {
          from: 'Russia',
          to: 'Greenland',
          style: {
            stroke: '#252631',
          },
        },
      ],
      lineStyle: {
        stroke: '#676767',
        strokeWidth: 1.5,
        fill: '#ff5566',
        fillOpacity: 1,
        strokeDasharray: '6 3 6', // OR: [6, 2, 6]
        animation: true, // Enables animation
      },
      visualizeData: {
        scale: ['#eeeeee', '#999999'],
        values: {
          EG: 29,
          US: 100,
          CA: 190,
          BR: 75,
          // ...
        },
      },
      // focusOn: { 聚焦某国家
      //   regions: ['EG', 'SA'],
      //   animate: true,
      // },
      series: {
        regions: [
          {
            attribute: 'fill',
            legend: {
              title: 'Some title',
            },
            scale: {
              myScaleOne: '#c79efd',
              myScaleTwo: '#ffc371',
              myScaleThree: '#08d191',
            },
            values: {
              // But when dealing with regions's series you should specify the region key.
              CN: 'myScaleTwo',
              MX: 'myScaleOne',
              LY: 'myScaleOne',
              RU: 'myScaleThree',
            },
          },
        ],
      },
      regionsSelectable: false,
      markersSelectable: true,
      selectedMarkers: markers.map((marker, index) => {
        var name = marker.name;
        if (name === 'Russia' || name === 'Brazil') {
          return index;
        }
      }),
      markers: markers,
      markerStyle: {
        initial: { fill: '#5c5cff' },
        selected: { fill: '#ff5050' },
      },
      markerLabelStyle: {
        initial: {
          fontFamily: 'Poppins',
          fontWeight: 'normal',
          fontSize: 13,
        },
      },
    });
  }
}
</script>
<style lang="scss">
.body--dark {
  .jvm-series-container .jvm-legend {
    background: #000000;
  }
}
</style>

<style lang="scss" scoped>
#charts-world-map {
  margin: auto;
  width: 100%;
  height: 800px;
  text-align: center;
}
</style>
