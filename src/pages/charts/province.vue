<template>
  <div>
    <div>
      <q-select
        v-model="selectProvince"
        :options="selectOptionProinces"
        label="Select province"
      />
      <div
        class="province-map"
        id="province-map"
        style="width: 100%; height: 500px"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-facing-decorator';
import { provs } from './data/chinaProvince';
import { chinaCountyNameMap } from './data/chinaCountyNameMap';
import { AppModule } from 'src/store/modules/app';
@Component({
  name: 'myComponentProvinceMap',
})
export default class myComponentProvinceMap extends Vue {
  @Watch('selectProvince')
  async onchange(newVal: any) {
    for (let key in provs) {
      const item = provs[key];
      if (item.areaName === newVal) {
        this.currentProvince = item.prov;
      }
    }
    const result = await AppModule.loadProvinceJson({
      prov: this.currentProvince,
    });
    this.provMap.dispose();
    this._initMap([], result);
  }
  get selectOptionProinces() {
    const arr = [];
    for (let key in provs) {
      const item = provs[key];
      arr.push(item.areaName);
    }
    return arr;
  }
  async mounted() {
    const result = await AppModule.loadProvinceJson({
      prov: this.currentProvince,
    });
    this._initMap([], result);
  }
  private currentProvince = 'gansu';
  private zhixiashi = ['北京', '天津', '上海', '重庆'];
  private selectProvince = '甘肃';
  private provMap: any;
  private async _initMap(data: any, result: any) {
    //注册可用的地图,必须在包括 geo 组件或者 map 图表类型的时候才能使用。
    window['echarts'].registerMap(this.currentProvince, result);
    const dom: any = document.getElementById('province-map');
    //初始化
    this.provMap = window['echarts'].init(dom);
    this.provMap.setOption({
      // tooltip: {
      //   trigger: 'item',
      // },
      roamController: {
        show: true,
        left: 'right',
        mapTypeControl: {
          china: true,
        },
      },
      // 一系列的配置参数
      series: [
        {
          type: 'map',
          map: this.currentProvince,
          top: 100,
          bottom: 50,
          aspectScale: 0.75, //长宽比
          zoom: 1, // 缩放
          showLegendSymbol: false, // 存在legend时显示
          selectedMode: 'single',
          data,
          nameMap: chinaCountyNameMap,
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