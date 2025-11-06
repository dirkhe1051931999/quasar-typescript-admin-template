<template>
  <div>
    <div id="map"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator';
import jsVectorMap from 'jsvectormap';
import 'jsvectormap/dist/maps/world-merc.js';
import { jvmCountries } from 'assets/geo/country-coords';

@Component({
  name: 'DetailWorldMapComponent',
})
export default class DetailWorldMapComponent extends Vue {
  mounted() {
    this.markers = this.getMarkers();
    this.initMap();
  }

  private markers: Array<{ name: string; coords: number[]; code: string; count: number }> = [];

  /* event */

  // 获取地图标记点数据
  private getMarkers() {
    const markers = [
      { name: 'Egypt', coords: [26.8206, 30.8025], code: 'EG' },
      { name: 'Russia', coords: [61.524, 105.3188], code: 'RU' },
      { name: 'Canada', coords: [56.1304, -106.3468], code: 'CA' },
      { name: 'Greenland', coords: [71.7069, -42.6043], code: 'GL' },
      { name: 'Brazil', coords: [-14.235, -51.9253], code: 'BR' },
    ];

    return markers.map((marker) => ({
      name: marker.name,
      coords: jvmCountries[marker.code].coords,
      code: marker.code,
      count: Math.floor(Math.random() * 100),
    }));
  }

  // 获取可视化数据
  private getVisualizeDataValues() {
    return {
      EG: 29,
      US: 100,
      CA: 190,
      BR: 75,
    };
  }

  // 获取系列数据
  private getSeriesValues() {
    return {
      CN: 'myScaleTwo',
      MX: 'myScaleOne',
      LY: 'myScaleOne',
      RU: 'myScaleThree',
    };
  }

  // 获取地图配置
  private getMapConfig() {
    const visualizeDataValues = this.getVisualizeDataValues();
    const seriesValues = this.getSeriesValues();

    return {
      selector: '#map',
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
          render: (marker: { name: string }) => {
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
        strokeDasharray: '6 3 6',
        animation: true,
      },
      visualizeData: {
        scale: ['#eeeeee', '#999999'],
        values: visualizeDataValues,
      },
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
            values: seriesValues,
          },
        ],
      },
      regionsSelectable: false,
      markersSelectable: true,
      selectedMarkers: this.markers.map((marker, index) => {
        const name = marker.name;
        if (name === 'Russia' || name === 'Brazil') {
          return index;
        }
      }),
      markers: this.markers,
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onMarkerTooltipShow: (event: any, tooltip: any, index: any) => {
        this.handleMarkerTooltipShow(event, tooltip, index);
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onRegionTooltipShow: (event: any) => {
        event.preventDefault();
      },
    };
  }

  // 处理标记点 tooltip 显示
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private handleMarkerTooltipShow(event: any, tooltip: any, index: any) {
    tooltip.css({
      backgroundColor: '#ffffff',
      color: '#323232',
      minWidth: '115px',
      padding: '8px 12px',
      borderRadius: '4px',
    });

    const item = this.markers[index];
    const count = item.count;
    const dom = `<p class="fs-14" style="font-weight: 700;">${item.name}</p> <p class="fs-12" style="margin-top: 4px;font-weight: 500;">${count}</p> <p class="fs-12" style="margin-top: 4px;font-weight: 500;">this is description</p>`;
    tooltip.text(dom, true);
  }

  // 初始化地图
  private initMap() {
    const config = this.getMapConfig();
    new jsVectorMap(config);
  }
}
</script>
<style>
.jvm-tooltip {
  z-index: 9000 !important;
}
</style>
<style scoped lang="scss">
#map {
  width: 100%;
  height: 600px;
}
</style>