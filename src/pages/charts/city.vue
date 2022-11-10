<template>
  <div>
    <q-select
      v-model="selectCity"
      :options="selectOptionCity"
      label="Select city"
    />
    <div
      class="city-map"
      id="city-map"
      style="width: 100%; height: 500px"
    ></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-facing-decorator';
import { AppModule } from 'src/store/modules/app';
import { chinaCity } from './data/chinaCity';
@Component({
  name: 'myComponentCityMap',
})
export default class myComponentCityMap extends Vue {
  @Watch('selectCity')
  async onchange(newVal: any) {
    for (let key in chinaCity) {
      const item = chinaCity[key];
      if (item === newVal) {
        this.currentCity = key;
      }
    }
    const result = await AppModule.loadCityJson({ city: this.currentCity });
    this.cityMap.dispose();
    this._initMap([], result);
  }
  get selectOptionCity() {
    const arr = [];
    for (let key in chinaCity) {
      arr.push(chinaCity[key]);
    }
    return arr;
  }
  async mounted() {
    const result = await AppModule.loadCityJson({ city: this.currentCity });
    this._initMap([], result);
  }
  private currentCity = '610100';
  private selectCity = '西安市';
  private cityMap: any;
  private async _initMap(data: any, result: any) {
    //注册可用的地图,必须在包括 geo 组件或者 map 图表类型的时候才能使用。
    window['echarts'].registerMap(this.currentCity, result);
    const dom: any = document.getElementById('city-map');
    let mapData = [
      {
        latitude: 34.24,
        longitude: 108.946994,
        name: '碑林区',
        value: 15,
        color: '#ff6521',
      }, //碑林区
      {
        latitude: 34.213389,
        longitude: 108.88,
        name: '雁塔区',
        value: 15,
        color: '#ff6521',
      }, //雁塔区
      {
        latitude: 34.38,
        longitude: 108.946022,
        name: '未央区',
        value: 10,
        color: '#ECEA1F',
      }, //未央区
      {
        latitude: 34.32,
        longitude: 108.913765,
        name: '未央区',
        value: 10,
        color: '#ECEA1F',
      }, //未央区
      {
        latitude: 34.282,
        longitude: 108.959903,
        name: '新城区',
        value: 10,
        color: '#ECEA1F',
      }, //新城区
      {
        latitude: 34.0,
        longitude: 108.1,
        name: '周至县',
        value: 10,
        color: '#ECEA1F',
      }, //周至县
      {
        latitude: 34.05,
        longitude: 108.607385,
        name: '鄂邑区',
        value: 5,
        color: '#ECEA1F',
      }, //鄂邑区
      {
        latitude: 34.08,
        longitude: 108.941579,
        name: '长安区',
        value: 5,
        color: '#ECEA1F',
      }, //长安区
      {
        latitude: 34.156189,
        longitude: 109.317634,
        name: '蓝田县',
        value: 5,
        color: '#ECEA1F',
      }, //蓝田县
      {
        latitude: 34.535065,
        longitude: 109.088896,
        name: '高陵区',
        value: 5,
        color: '#ECEA1F',
      }, //高陵区
      {
        latitude: 34.662141,
        longitude: 109.21,
        name: '阎良区',
        value: 5,
        color: '#ECEA1F',
      }, //阎良区
      {
        latitude: 34.465,
        longitude: 109.213986,
        name: '临潼区',
        value: 5,
        color: '#ECEA1F',
      }, //临潼区
      {
        latitude: 34.305,
        longitude: 109.067261,
        name: '灞桥区',
        value: 5,
        color: '#ECEA1F',
      }, //灞桥区
      {
        latitude: 34.28,
        longitude: 108.9,
        name: '莲湖区',
        value: 5,
        color: '#ECEA1F',
      }, //莲湖区
    ];
    //初始化
    this.cityMap = window['echarts'].init(dom);
    this.cityMap.setOption({
      tooltip: {
        trigger: 'item',
        formatter: function (params: any) {
          return params.name;
        },
      },
      series: [
        {
          type: 'map',
          map: this.currentCity,
          top: 100,
          bottom: 50,
          aspectScale: 0.75, //长宽比
          zoom: 1, // 缩放
          showLegendSymbol: false, // 存在legend时显示
          selectedMode: 'single',
          data: mapData.map((itemOpt) => {
            //散点生成
            return {
              name: itemOpt.name,
              value: [itemOpt.longitude, itemOpt.latitude, itemOpt.value],
              label: {
                emphasis: {
                  position: 'right',
                  show: false,
                },
              },
            };
          }),
          itemStyle: {
            //没有选中的border色和背景色
            normal: {
              borderWidth: 0.5, //区域边框宽度
              borderColor: '#FEFFFF', //区域边框颜色
              areaColor: {
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 1,
                    color: '#1976D2 ', // 0% 处的颜色
                  },
                  {
                    offset: 0,
                    color: '#e3e3e3', // 100% 处的颜色
                  },
                ],
                globalCoord: false,
              }, //区域颜色
            },
            // 选中的背景色和border色
            emphasis: {
              borderWidth: 0.5,
              borderColor: '#333333',
              areaColor: '#FEFFFF',
            },
          },
        },
      ],
    });
  }
}
</script>


<style lang="scss" scoped>
</style>