<template>
  <div>
    <vueJsonEditor v-model="json" :expandedOnStart="true" @json-change="onJsonChange" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import vueJsonEditor from 'vue-json-editor';

@Component({
  name: 'JsonEditor',
  components: {
    vueJsonEditor,
  },
})
export default class extends Vue {
  private json = {
    status: '0',
    msg: '生活指数29项。',
    city: '磐石',
    weathercode: '101060205',
    update: '20200605110000',
    data: {
      zs_kt: { name: '空调开启指数', type: '较少开启', info: '体感舒适，不需要开启空调。' },
      zs_ag: { name: '过敏指数', type: '不易发', info: '除特殊体质，无需担心过敏问题。' },
      zs_cl: { name: '晨练指数', type: '适宜', info: '天气不错，空气清新。' },
      zs_ssd: { name: '舒适度指数', type: '舒适', info: '白天温度宜人，风力不大。' },
      zs_cy: { name: '穿衣指数', type: '较舒适', info: '建议穿薄外套或牛仔裤等服装。' },
      zs_dy: { name: '钓鱼指数', type: '较适宜', info: '风稍大会对垂钓产生一定影响。' },
      zs_fs: { name: '防晒指数', type: '强', info: '涂擦15-20SPF，PA++护肤品。' },
      zs_gj: { name: '逛街指数', type: '适宜', info: '这种好天气去逛街可使身心畅快放松。' },
      zs_tyj: { name: '太阳镜指数', type: '必要', info: '建议佩戴透射比为1级的浅色太阳镜' },
      zs_gm: { name: '感冒指数', type: '较易发', info: '温差较大，较易感冒，注意防护。' },
      zs_hc: { name: '划船指数', type: '适宜', info: '天气较好，适宜划船及嬉玩水上运动。' },
      zs_jt: { name: '交通指数', type: '良好', info: '气象条件良好，车辆可以正常行驶。' },
      zs_lk: { name: '路况指数', type: '干燥', info: '天气较好，路面较干燥，路况较好。' },
      zs_ls: { name: '晾晒指数', type: '适宜', info: '天气不错，抓紧时机让衣物晒太阳吧。' },
      zs_mf: { name: '美发指数', type: '一般', info: '建议选用防晒滋润型护发品或带遮阳帽。' },
      zs_ysh: { name: '夜生活指数', type: '较适宜', info: '只要您稍作准备就可以放心外出。' },
      zs_pj: { name: '啤酒指数', type: '较适宜', info: '适量的饮用啤酒，注意不要过量。' },
      zs_ffz: { name: '放风筝指数', type: '较适宜', info: '温暖舒适，较适宜放风筝。' },
      zs_kqwr: { name: '空气污染扩散条件指数', type: '中', info: '易感人群应适当减少室外活动。' },
      zs_hz: { name: '化妆指数', type: '防晒', info: '请选用中性保湿型化妆品。' },
      zs_ly: { name: '旅游指数', type: '适宜', info: '天气较好，丝毫不会影响您出行的心情。' },
      zs_zwx: { name: '紫外线强度指数', type: '强', info: '涂擦SPF大于15、PA+防晒护肤品。' },
      zs_fh: { name: '风寒指数', type: '无', info: '温度未达到风寒所需的低温，稍作防寒准备即可。' },
      zs_xc: { name: '洗车指数', type: '适宜', info: '天气较好，适合擦洗汽车。' },
      zs_xq: { name: '心情指数', type: '较好', info: '温度适宜，心情会不错。' },
      zs_yd: { name: '运动指数', type: '适宜', info: '天气较好，尽情感受运动的快乐吧。' },
      zs_yh: { name: '约会指数', type: '较适宜', info: '不用担心天气来调皮捣乱而影响了兴致。' },
      zs_ys: { name: '雨伞指数', type: '不带伞', info: '天气较好，不用带雨伞。' },
      zs_zs: { name: '中暑指数', type: '无中暑风险', info: '天气舒适，对易中暑人群来说非常友善。' },
    },
  };
  private onJsonChange() {}
}
</script>

<style scoped lang='scss'>
</style>
