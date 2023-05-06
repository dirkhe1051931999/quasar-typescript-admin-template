// 文件: /src/boot/register-component.js
import { boot } from 'quasar/wrappers';
import MyBanner from 'src/components/myBanner/index.vue';
import RightPanel from 'src/components/rightPanel/index.vue';
import TextToInput from 'src/components/textToInput/index.vue';
import MyTooltip from 'src/components/myTooltip/index.vue';
import MyPagination from 'src/components/myPagination/index.vue';
import MyDialog from 'src/components/myDialog/index.vue';
import MyFormInput from 'src/components/myForm/input.vue';
import MyFormSelect from 'src/components/myForm/select.vue';
import MyFormMultipleSelect from 'src/components/myForm/multipleSelect.vue';
import MyFormDateRange from 'src/components/myForm/dateRange.vue';
import MyFormDateRangeWithTime from 'src/components/myForm/dateRangeWithTime.vue';
import MyFormSlider from 'src/components/myForm/slider.vue';
import MyFormRadio from 'src/components/myForm/radio.vue';
import MyMaskInput from 'src/components/myForm/maskInput.vue';
import MyTreeSelect from 'src/components/myForm/treeSelect.vue';

// 我们使用Vue全局注册了我们的组件
export default boot(({ app }) => {
  app.component('MyBanner', MyBanner);
  app.component('RightPanel', RightPanel);
  app.component('TextToInput', TextToInput);
  app.component('MyPagination', MyPagination);
  app.component('MyTooltip', MyTooltip);
  app.component('MyDialog', MyDialog);
  app.component('MyFormInput', MyFormInput);
  app.component('MyMaskInput', MyMaskInput);
  app.component('MyFormSelect', MyFormSelect);
  app.component('MyFormMultipleSelect', MyFormMultipleSelect);
  app.component('MyFormDateRange', MyFormDateRange);
  app.component('MyFormDateRangeWithTime', MyFormDateRangeWithTime);
  app.component('MyFormSlider', MyFormSlider);
  app.component('MyFormRadio', MyFormRadio);
  app.component('MyTreeSelect', MyTreeSelect);
});
