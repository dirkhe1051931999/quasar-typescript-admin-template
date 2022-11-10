<template>
  <div class="map_components">
    <div id="back" class="hidden">
      <q-icon class="fs-20" name="close"></q-icon>
    </div>
    <div
      id="map"
      style="width: 100%; height: 100%; height: 636px; transform: scale(0.95)"
    ></div>
  </div>
</template>

<script lang="ts">
import { provinces, provinces2 } from 'src/utils/province';
import { loadBdScript } from 'src/utils/tools';
import { Component, Vue } from 'vue-facing-decorator';

@Component({
  name: 'myComponentMapComponents',
})
export default class myComponentMapComponents extends Vue {
  mounted() {
    let i;
    let mapName: any;
    const map: any = document.getElementById('map');
    const myChart = window['echarts'].init(map);
    const oBack: any = document.getElementById('back');
    const provinces_pinyin = [
      'shanghai',
      'hebei',
      'shanxi',
      'neimenggu',
      'liaoning',
      'jilin',
      'heilongjiang',
      'jiangsu',
      'zhejiang',
      'anhui',
      'fujian',
      'jiangxi',
      'shandong',
      'henan',
      'hubei',
      'hunan',
      'guangdong',
      'guangxi',
      'hainan',
      'sichuan',
      'guizhou',
      'yunnan',
      'xizang',
      'shanxi1',
      'gansu',
      'qinghai',
      'ningxia',
      'xinjiang',
      'beijing',
      'tianjin',
      'chongqing',
      'xianggang',
      'aomen',
    ];
    const provincesText = [
      '上海',
      '河北',
      '山西',
      '内蒙古',
      '辽宁',
      '吉林',
      '黑龙江',
      '江苏',
      '浙江',
      '安徽',
      '福建',
      '江西',
      '山东',
      '河南',
      '湖北',
      '湖南',
      '广东',
      '广西',
      '海南',
      '四川',
      '贵州',
      '云南',
      '西藏',
      '陕西',
      '甘肃',
      '青海',
      '宁夏',
      '新疆',
      '北京',
      '天津',
      '重庆',
      '香港',
      '澳门',
    ];
    // 全国省份数据
    const toolTipData = [
      {
        provinceName: '北京',
        provinceKey: 110000,
        cityName: null,
        cityKey: null,
        shopCount: 58,
        totalPrice: 860448.7,
        orderCount: 31744,
        onlineCount: 0,
      },
      {
        provinceName: '天津',
        provinceKey: 120000,
        cityName: null,
        cityKey: null,
        shopCount: 74,
        totalPrice: 697438.3,
        orderCount: 30025,
        onlineCount: 0,
      },
      {
        provinceName: '河北',
        provinceKey: 130000,
        cityName: null,
        cityKey: null,
        shopCount: 175,
        totalPrice: 1051461.5,
        orderCount: 50625,
        onlineCount: 0,
      },
      {
        provinceName: '山西',
        provinceKey: 140000,
        cityName: null,
        cityKey: null,
        shopCount: 73,
        totalPrice: 432680.2,
        orderCount: 20427,
        onlineCount: 0,
      },
      {
        provinceName: '内蒙古',
        provinceKey: 150000,
        cityName: null,
        cityKey: null,
        shopCount: 46,
        totalPrice: 379952.5,
        orderCount: 14585,
        onlineCount: 0,
      },
      {
        provinceName: '辽宁',
        provinceKey: 210000,
        cityName: null,
        cityKey: null,
        shopCount: 74,
        totalPrice: 543290.6,
        orderCount: 27143,
        onlineCount: 0,
      },
      {
        provinceName: '吉林',
        provinceKey: 220000,
        cityName: null,
        cityKey: null,
        shopCount: 25,
        totalPrice: 234353.7,
        orderCount: 11123,
        onlineCount: 0,
      },
      {
        provinceName: '黑龙江',
        provinceKey: 230000,
        cityName: null,
        cityKey: null,
        shopCount: 25,
        totalPrice: 152894.8,
        orderCount: 6481,
        onlineCount: 0,
      },
      {
        provinceName: '上海',
        provinceKey: 310000,
        cityName: null,
        cityKey: null,
        shopCount: 78,
        totalPrice: 665877.5,
        orderCount: 26753,
        onlineCount: 0,
      },
      {
        provinceName: '江苏',
        provinceKey: 320000,
        cityName: null,
        cityKey: null,
        shopCount: 475,
        totalPrice: 3302139.4,
        orderCount: 158180,
        onlineCount: 0,
      },
      {
        provinceName: '浙江',
        provinceKey: 330000,
        cityName: null,
        cityKey: null,
        shopCount: 332,
        totalPrice: 2285259.3,
        orderCount: 116344,
        onlineCount: 0,
      },
      {
        provinceName: '安徽',
        provinceKey: 340000,
        cityName: null,
        cityKey: null,
        shopCount: 168,
        totalPrice: 1081322.1,
        orderCount: 57139,
        onlineCount: 0,
      },
      {
        provinceName: '福建',
        provinceKey: 350000,
        cityName: null,
        cityKey: null,
        shopCount: 145,
        totalPrice: 1352019.8,
        orderCount: 65228,
        onlineCount: 0,
      },
      {
        provinceName: '江西',
        provinceKey: 360000,
        cityName: null,
        cityKey: null,
        shopCount: 103,
        totalPrice: 689353.7,
        orderCount: 31822,
        onlineCount: 0,
      },
      {
        provinceName: '山东',
        provinceKey: 370000,
        cityName: null,
        cityKey: null,
        shopCount: 198,
        totalPrice: 1177320.9,
        orderCount: 59966,
        onlineCount: 0,
      },
      {
        provinceName: '河南',
        provinceKey: 410000,
        cityName: null,
        cityKey: null,
        shopCount: 184,
        totalPrice: 953710.6,
        orderCount: 52829,
        onlineCount: 0,
      },
      {
        provinceName: '湖北',
        provinceKey: 420000,
        cityName: null,
        cityKey: null,
        shopCount: 125,
        totalPrice: 890921.4,
        orderCount: 46768,
        onlineCount: 0,
      },
      {
        provinceName: '湖南',
        provinceKey: 430000,
        cityName: null,
        cityKey: null,
        shopCount: 111,
        totalPrice: 1007182.7,
        orderCount: 44094,
        onlineCount: 0,
      },
      {
        provinceName: '广东',
        provinceKey: 440000,
        cityName: null,
        cityKey: null,
        shopCount: 384,
        totalPrice: 3792306.1,
        orderCount: 165774,
        onlineCount: 0,
      },
      {
        provinceName: '广西',
        provinceKey: 450000,
        cityName: null,
        cityKey: null,
        shopCount: 194,
        totalPrice: 1252955,
        orderCount: 69882,
        onlineCount: 0,
      },
      {
        provinceName: '海南',
        provinceKey: 460000,
        cityName: null,
        cityKey: null,
        shopCount: 58,
        totalPrice: 617514,
        orderCount: 33090,
        onlineCount: 0,
      },
      {
        provinceName: '重庆',
        provinceKey: 500000,
        cityName: null,
        cityKey: null,
        shopCount: 35,
        totalPrice: 468892.6,
        orderCount: 20163,
        onlineCount: 0,
      },
      {
        provinceName: '四川',
        provinceKey: 510000,
        cityName: null,
        cityKey: null,
        shopCount: 127,
        totalPrice: 793622.7,
        orderCount: 43625,
        onlineCount: 0,
      },
      {
        provinceName: '贵州',
        provinceKey: 520000,
        cityName: null,
        cityKey: null,
        shopCount: 78,
        totalPrice: 659747.2,
        orderCount: 28817,
        onlineCount: 0,
      },
      {
        provinceName: '云南',
        provinceKey: 530000,
        cityName: null,
        cityKey: null,
        shopCount: 87,
        totalPrice: 657485.2,
        orderCount: 30916,
        onlineCount: 0,
      },
      {
        provinceName: '西藏',
        provinceKey: 540000,
        cityName: null,
        cityKey: null,
        shopCount: 5,
        totalPrice: 106922.4,
        orderCount: 2470,
        onlineCount: 0,
      },
      {
        provinceName: '陕西',
        provinceKey: 610000,
        cityName: null,
        cityKey: null,
        shopCount: 65,
        totalPrice: 589961.2,
        orderCount: 27093,
        onlineCount: 0,
      },
      {
        provinceName: '甘肃',
        provinceKey: 620000,
        cityName: null,
        cityKey: null,
        shopCount: 40,
        totalPrice: 248209.2,
        orderCount: 12390,
        onlineCount: 0,
      },
      {
        provinceName: '青海',
        provinceKey: 630000,
        cityName: null,
        cityKey: null,
        shopCount: 3,
        totalPrice: 33328.1,
        orderCount: 1161,
        onlineCount: 0,
      },
      {
        provinceName: '宁夏',
        provinceKey: 640000,
        cityName: null,
        cityKey: null,
        shopCount: 14,
        totalPrice: 146590.7,
        orderCount: 5240,
        onlineCount: 0,
      },
      {
        provinceName: '新疆',
        provinceKey: 650000,
        cityName: null,
        cityKey: null,
        shopCount: 43,
        totalPrice: 294423.4,
        orderCount: 11741,
        onlineCount: 0,
      },
    ];
    const seriesData: any[] = [];
    for (i = 0; i < toolTipData.length; i++) {
      seriesData[i] = {};
      if (provinces2.includes(toolTipData[i].provinceName)) {
        seriesData[i].itemStyle = {
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
                  color: '#bbbaba', // 0% 处的颜色
                },
                {
                  offset: 0,
                  color: '#fbfbfb', // 100% 处的颜色
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
        };
      }
      seriesData[i].name = toolTipData[i].provinceName;
      seriesData[i].value = toolTipData[i].shopCount;
      seriesData[i].provinceKey = toolTipData[i].provinceKey;
    }
    // 请求省市数据，传递provinceKey进行ajax请求 province(key)
    const provinceData = [
      {
        provinceName: null,
        provinceKey: null,
        cityName: '乌鲁木齐市',
        cityKey: 650100,
        shopCount: 17,
        totalPrice: 89429.1,
        orderCount: 4019,
        onlineCount: 0,
      },
      {
        provinceName: null,
        provinceKey: null,
        cityName: '克拉玛依市',
        cityKey: 650200,
        shopCount: 1,
        totalPrice: 363.6,
        orderCount: 17,
        onlineCount: 0,
      },
      {
        provinceName: null,
        provinceKey: null,
        cityName: '昌吉回族自治州',
        cityKey: 652300,
        shopCount: 3,
        totalPrice: 2203.7,
        orderCount: 82,
        onlineCount: 0,
      },
      {
        provinceName: null,
        provinceKey: null,
        cityName: '博尔塔拉蒙古自治州',
        cityKey: 652700,
        shopCount: 1,
        totalPrice: 7327.7,
        orderCount: 236,
        onlineCount: 0,
      },
      {
        provinceName: null,
        provinceKey: null,
        cityName: '巴音郭楞蒙古自治州',
        cityKey: 652800,
        shopCount: 2,
        totalPrice: 28768.4,
        orderCount: 961,
        onlineCount: 0,
      },
      {
        provinceName: null,
        provinceKey: null,
        cityName: '阿克苏地区',
        cityKey: 652900,
        shopCount: 5,
        totalPrice: 78415.2,
        orderCount: 3108,
        onlineCount: 0,
      },
      {
        provinceName: null,
        provinceKey: null,
        cityName: '喀什地区',
        cityKey: 653100,
        shopCount: 4,
        totalPrice: 38870.1,
        orderCount: 1477,
        onlineCount: 0,
      },
      {
        provinceName: null,
        provinceKey: null,
        cityName: '和田地区',
        cityKey: 653200,
        shopCount: 1,
        totalPrice: 10488,
        orderCount: 218,
        onlineCount: 0,
      },
      {
        provinceName: null,
        provinceKey: null,
        cityName: '伊犁哈萨克自治州',
        cityKey: 654000,
        shopCount: 6,
        totalPrice: 32864.2,
        orderCount: 1363,
        onlineCount: 0,
      },
      {
        provinceName: null,
        provinceKey: null,
        cityName: '塔城地区',
        cityKey: 654200,
        shopCount: 1,
        totalPrice: 160,
        orderCount: 5,
        onlineCount: 0,
      },
      {
        provinceName: null,
        provinceKey: null,
        cityName: '省直辖行政单位',
        cityKey: 659000,
        shopCount: 2,
        totalPrice: 5533.4,
        orderCount: 255,
        onlineCount: 0,
      },
    ];
    const seriesDataPro: any[] = [];
    for (i = 0; i < provinceData.length; i++) {
      seriesDataPro[i] = {};
      seriesDataPro[i].name = provinceData[i].cityName;
      seriesDataPro[i].value = provinceData[i].shopCount;
    }
    const max = Math.max.apply(
        Math,
        seriesData.map((o) => {
          return o.value;
        })
      ),
      min = 0; // 侧边最大值最小值
    const maxSize4Pin = 40,
      minSize4Pin = 30;
    // 点击返回按钮
    oBack.addEventListener('click', () => {
      mapName = '';
      oBack.classList.add('hidden');
      initEcharts('china');
    });
    mapName = '';

    function getGeoCoordMap(name: any) {
      name = name ? name : 'china';
      /*获取地图数据*/
      const geoCoordMap: any = {};
      myChart.showLoading(); // loading start
      const mapFeatures: any =
        window['echarts'].getMap(name).geoJson['features'];
      myChart.hideLoading(); // loading end
      mapFeatures.forEach((v: { properties: { name: any; cp: any } }) => {
        const name = v.properties.name; // 地区名称
        geoCoordMap[name] = v.properties.cp; // 地区经纬度
      });
      return geoCoordMap;
    }

    function convertData(data: string | any[]) {
      // 转换数据
      const geoCoordMap = getGeoCoordMap(mapName);
      const res = [];
      for (let i = 0; i < data.length; i++) {
        const geoCoord = geoCoordMap[data[i].name]; // 数据的名字对应的经纬度
        if (geoCoord) {
          // 如果数据data对应上，
          res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value),
          });
        }
      }
      return res;
    }

    // 初始化echarts-map
    initEcharts('china');

    function initEcharts(pName: string) {
      const tmpSeriesData = pName === 'china' ? seriesData : seriesDataPro;
      const tmp = pName === 'china' ? toolTipData : provinceData;
      const option: any = {
        textStyle: {
          fontFamily: 'NotoSansSC',
        },
        layoutCenter: ['50%', '50%'], //位置
        layoutSize: pName === 'china' ? '130%' : '100%', //大小
        // tooltip 提示
        tooltip: {
          trigger: 'item',
          formatter: function (params: any) {
            let i;
            let toolTiphtml;
            // 鼠标滑过显示的数据
            if (pName === 'china') {
              toolTiphtml = '';
              for (i = 0; i < tmp.length; i++) {
                if (params.name === tmp[i].provinceName) {
                  toolTiphtml += tmp[i].totalPrice;
                }
              }
              if (provinces2.includes(params.name)) {
                return '';
              } else {
                return toolTiphtml;
              }
            } else {
              toolTiphtml = '';
              for (i = 0; i < tmp.length; i++) {
                if (params.name === tmp[i].cityName) {
                  toolTiphtml += tmp[i].totalPrice;
                }
              }
              return toolTiphtml;
            }
          },
        },
        geo: {
          show: true,
          map: pName,
          roam: false,
          label: {
            normal: {
              show: false,
            },
            emphasis: {
              show: false,
            },
          },
          itemStyle: {
            normal: {
              areaColor: {
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 1,
                    color: '#0f8b7c', // 0% 处的颜色
                  },
                  {
                    offset: 0,
                    color: 'rgba(11,205,189,0.65)', // 100% 处的颜色
                  },
                ],
                globalCoord: true,
              }, // 没有值得时候颜色
              borderColor: '#FEFFFF',
            },
            emphasis: {
              areaColor: '#FEFFFF', // 鼠标滑过选中的颜色
            },
          },
        },
        series: [
          // 放大的海南
          {
            name: '散点',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: tmpSeriesData,
            symbolSize: '1',
          },
          // 地图
          {
            name: pName,
            type: 'map',
            mapType: pName,
            roam: false, //是否开启鼠标缩放和平移漫游
            data: tmpSeriesData,
            aspectScale: 0.75, //长宽比
            showLegendSymbol: false, // 存在legend时显示
            selectedMode: 'single',
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
          // pop 的点
          {
            name: '点',
            type: 'scatter',
            coordinateSystem: 'geo',
            symbol: 'pin', //气泡
            symbolSize: function (val: number[], data: any) {
              const a = (maxSize4Pin - minSize4Pin) / (max - min);
              let b: number;
              b = maxSize4Pin - a * max;
              if (provinces2.includes(data.name)) {
                return 0;
              } else {
                return a * val[2] + b;
              }
            },
            label: {
              normal: {
                show: true,
                formatter: function (params: { data: { value: any[] } }) {
                  return params.data.value[2];
                },
                textStyle: {
                  color: '#FEFFFF',
                  fontSize: 9,
                },
              },
            },
            itemStyle: {
              normal: {
                color: '#1976D2 ', //标志颜色'#F62157'
              },
            },
            zlevel: 0,
            data: convertData(tmpSeriesData),
          },
        ],
      };
      // 针对海南放大
      if (pName === '海南') {
        option.series[1].center = [109.844902, 19.0392];
        option.series[1].layoutCenter = ['75%', '25%'];
        option.series[1].layoutSize = '200%';
      } else {
        //非显示海南时，将设置的参数恢复默认值
        option.series[1].center = undefined;
        option.series[1].layoutCenter = undefined;
        option.series[1].layoutSize = undefined;
      }
      myChart.setOption(option);
      myChart.off('click');
      if (pName === 'china') {
        // 全国时，添加click 进入省级
        myChart.on('click', (param: any) => {
          if (param.data && param.data.provinceKey) {
            if (provinceData.length) {
              // 遍历取到provincesText 中的下标  去拿到对应的省js
              for (let i = 0; i < provincesText.length; i++) {
                if (param.name === provincesText[i]) {
                  if (provinces2.includes(provincesText[i])) {
                    break;
                  } else {
                    oBack.classList.remove('hidden');
                  }
                  mapName = provincesText[i];
                  //显示对应省份的方法
                  showProvince(provinces_pinyin[i], provincesText[i]);
                  break;
                }
              }
            }
          }
        });
      } else {
        // 省份，添加双击 回退到全国
        myChart.on('dblclick', () => {
          mapName = '';
          initEcharts('china');
          oBack.classList.add('hidden');
        });
      }
    }

    // 展示对应的省
    function showProvince(pName: any, Chinese_: any) {
      //这写省份的js都是通过在线构建工具生成的，保存在本地，需要时加载使用即可，最好不要一开始全部直接引入。
      loadBdScript(`${pName}js`, `/map/${pName}.js`, () => {
        initEcharts(Chinese_);
      });
    }
  }
}
</script>
<style lang="scss" scoped>
.map_components {
  position: relative;
  #back {
    position: absolute;
    right: 0;
    cursor: pointer;
    top: 15px;
    color: #009787;
    z-index: 1000;
  }
}
</style>
