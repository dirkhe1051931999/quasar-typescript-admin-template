<template>
  <div class="component-demo q-pa-md">
    <div class="column q-gutter-lg">
      <q-card flat bordered class="component-demo-card">
        <q-card-section>
          <div class="text-h6">j-c-editable-proxy</div>
          <div class="text-caption text-grey-7">结合权限控制的弹出编辑器，参考表格页的操作列用法。</div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <div class="row items-center justify-between q-col-gutter-md">
            <div>
              <div class="text-subtitle2 text-grey-7">当前部门名称</div>
              <div class="text-body1 text-weight-medium">{{ editableDisplay }}</div>
              <div v-if="pendingEditableValue && pendingEditableValue !== editableDisplay" class="text-caption text-orange q-mt-xs">待保存：{{ pendingEditableValue }}</div>
              <div v-if="editableLastSavedAt" class="text-caption text-grey-6 q-mt-xs">最近保存于 {{ editableLastSavedAt }}</div>
            </div>
            <j-c-editable-proxy v-model="editableDisplay" code="operation-all" popup-width="360px" :reuiqred="false" @confirm="handleEditableConfirm" @saved="handleEditableSaved">
              <template #display>
                <div class="row items-center no-wrap cursor-pointer text-primary">
                  <q-icon name="edit" size="18px" class="q-mr-xs" />
                  <span>编辑部门</span>
                </div>
              </template>
              <template #editor="{ tempValue, updateTempValue, setEditorRef }">
                <q-input
                  dense
                  :model-value="tempValue"
                  label="部门名称"
                  :rules="[(val) => !!val || $t('messages.required')]"
                  @update:model-value="(val) => updateTempValue(val)"
                  :ref="(el) => setEditorRef(el)"
                />
              </template>
            </j-c-editable-proxy>
          </div>
          <q-btn flat color="primary" label="重置示例数据" class="q-mt-md" @click="resetEditable" />
        </q-card-section>
      </q-card>

      <q-card flat bordered class="component-demo-card">
        <q-card-section>
          <div class="text-h6">j-c-duo-list-editor</div>
          <div class="text-caption text-grey-7">通过 slot 管理多项配置，支持自定义每一行的编辑行为。</div>
        </q-card-section>
        <q-separator />
        <q-card-section class="q-gutter-md">
          <j-c-duo-list-editor v-model="duoListValue" :default-new-item="{ name: '', value: '' }" :max-items="5" @update:modelValue="handleDuoListUpdate">
            <template #item-content="{ item, index, updateItem, addItem, removeItem, canAdd, canRemove }">
              <q-card flat bordered class="q-pa-md item-card">
                <div class="row q-col-gutter-md">
                  <div class="col-12 col-md-6">
                    <q-input dense label="字段名" :model-value="item.name" @update:model-value="(val) => updateItem(index, { name: val })" />
                  </div>
                  <div class="col-12 col-md-6">
                    <q-input dense label="字段值" :model-value="item.value" @update:model-value="(val) => updateItem(index, { value: val })" />
                  </div>
                </div>
                <div class="row justify-end q-gutter-sm q-mt-sm">
                  <q-btn color="primary" dense flat icon="add" :disable="!canAdd" @click="addItem(index + 1)" />
                  <q-btn color="negative" dense flat icon="delete" :disable="!canRemove" @click="removeItem(index)" />
                </div>
              </q-card>
            </template>
          </j-c-duo-list-editor>
          <div class="text-caption text-grey-7">当前配置：</div>
          <div>
            <q-chip v-for="(item, index) in duoListValue" :key="item.id ?? index" outline color="primary" class="q-mr-sm q-mb-sm"> {{ item.name || '未命名' }}：{{ item.value || '--' }} </q-chip>
          </div>
        </q-card-section>
      </q-card>

      <q-card flat bordered class="component-demo-card">
        <q-card-section>
          <div class="text-h6">j-c-fallback / j-c-format-lookup</div>
          <div class="text-caption text-grey-7">处理缺省展示与枚举映射的两类工具组件。</div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <div class="row q-col-gutter-lg">
            <div class="col-12 col-md-4">
              <div class="text-subtitle2 q-mb-xs">邮箱（有值）</div>
              <j-c-fallback :value="profile.email">
                <span class="text-body2">{{ profile.email }}</span>
              </j-c-fallback>
            </div>
            <div class="col-12 col-md-4">
              <div class="text-subtitle2 q-mb-xs">电话（缺省展示默认值）</div>
              <j-c-fallback :value="profile.phone" default-content="暂未填写" />
            </div>
            <div class="col-12 col-md-4">
              <div class="text-subtitle2 q-mb-xs">备注（缺省隐藏 DOM）</div>
              <j-c-fallback :value="profile.remark" rm-dom>
                <q-badge color="positive" label="有备注" />
              </j-c-fallback>
              <div v-if="!profile.remark" class="text-caption text-grey-5">无备注时不会渲染 badge</div>
            </div>
          </div>
          <q-separator inset class="q-my-md" />
          <div class="row q-col-gutter-md items-center">
            <div class="col-12 col-md-4">
              <div class="text-subtitle2 q-mb-xs">状态（映射输出）</div>
              <j-c-format-lookup :value="profile.status" :options="statusOptions">
                <template #default="{ label }">
                  <q-badge color="secondary" rounded>{{ label }}</q-badge>
                </template>
              </j-c-format-lookup>
            </div>
            <div class="col-12 col-md-4">
              <q-select v-model="profile.status" :options="statusOptions" option-value="value" option-label="label" emit-value map-options dense label="切换状态" />
            </div>
          </div>
          <div class="q-gutter-sm q-mt-md">
            <q-btn outline color="primary" label="填充示例数据" @click="restoreProfile" />
            <q-btn outline color="secondary" label="清空电话与备注" @click="clearProfile" />
          </div>
        </q-card-section>
      </q-card>

      <q-card flat bordered class="component-demo-card">
        <q-card-section>
          <div class="text-h6">j-c-tree</div>
          <div class="text-caption text-grey-7">对 q-tree 的封装，默认严格单选，可结合 tick-strategy 控制勾选规则。</div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <div class="row q-col-gutter-lg">
            <div class="col-12 col-md-6">
              <j-c-tree v-model="treeSelection" :options="treeOptions" tick-strategy="leaf" :default-expand-all="false" />
            </div>
            <div class="col-12 col-md-6">
              <q-markup-table flat bordered dense>
                <tbody>
                  <tr>
                    <td class="text-grey-7">选中节点数</td>
                    <td>{{ treeSelection.length }}</td>
                  </tr>
                  <tr>
                    <td class="text-grey-7">选中值</td>
                    <td>
                      <div v-if="treeSelection.length">
                        <div v-for="value in treeSelection" :key="value">{{ value }}</div>
                      </div>
                      <div v-else>暂无选中</div>
                    </td>
                  </tr>
                </tbody>
              </q-markup-table>
              <q-btn outline color="primary" label="重置选中" class="q-mt-md" @click="resetTree" />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator';
import JCDuoListEditor from 'components/j-c-duo-list-editor/index.vue';
import JCEditableProxy from 'components/j-c-editable-proxy/index.vue';
import JCFallback from 'components/j-c-fallback/index.vue';
import JCFormatLookup from 'components/j-c-format-lookup/index.vue';
import JCTree from 'components/j-c-tree/index.vue';

interface DuoItem {
  id?: number;
  name: string;
  value: string;
}

interface LookupOption {
  label: string;
  value: string;
}

interface TreeNode {
  label: string;
  value: string;
  children?: TreeNode[];
}

interface ProfileInfo {
  email: string;
  phone: string;
  remark: string | null;
  status: string;
}

@Component({
  name: 'ComponentGuide',
  components: {
    JCDuoListEditor,
    JCEditableProxy,
    JCFallback,
    JCFormatLookup,
    JCTree,
  },
})
export default class ComponentGuide extends Vue {
  public editableDisplay = '总部-北区';
  public editableLastSavedAt: string | null = null;
  public pendingEditableValue: string | null = null;

  public duoListValue: DuoItem[] = [
    { id: 1, name: '联系人', value: '李雷' },
    { id: 2, name: '联系电话', value: '010-88886666' },
  ];

  public profile: ProfileInfo = {
    email: 'ops@example.com',
    phone: '',
    remark: null,
    status: 'active',
  };

  public statusOptions: LookupOption[] = [
    { label: '启用', value: 'active' },
    { label: '禁用', value: 'disabled' },
    { label: '草稿', value: 'draft' },
  ];

  public treeSelection: string[] = ['team-ops'];

  public treeOptions: TreeNode[] = [
    {
      label: '总部',
      value: 'hq',
      children: [
        { label: '市场部', value: 'team-marketing' },
        {
          label: '运营中心',
          value: 'team-ops',
          children: [
            { label: '客服组', value: 'team-ops-service' },
            { label: '保障组', value: 'team-ops-support' },
          ],
        },
      ],
    },
    {
      label: '华东大区',
      value: 'east',
      children: [
        { label: '杭州分部', value: 'east-hz' },
        { label: '南京分部', value: 'east-nj' },
      ],
    },
  ];

  private duoIdSeed = 200;

  public handleEditableConfirm(value: string, done: () => void) {
    this.pendingEditableValue = value;
    window.setTimeout(() => {
      done();
    }, 500);
  }

  public handleEditableSaved(value: string) {
    this.editableLastSavedAt = new Date().toLocaleTimeString();
    this.pendingEditableValue = null;
    this.editableDisplay = value;
  }

  public resetEditable() {
    this.editableDisplay = '总部-北区';
    this.editableLastSavedAt = null;
    this.pendingEditableValue = null;
  }

  public handleDuoListUpdate(list: DuoItem[]) {
    this.duoListValue = list.map((item) => {
      if (item.id === undefined) {
        this.duoIdSeed += 1;
        return { ...item, id: this.duoIdSeed };
      }
      return item;
    });
  }

  public restoreProfile() {
    this.profile = {
      email: 'ops@example.com',
      phone: '13800000000',
      remark: '重点客户分组',
      status: 'active',
    };
  }

  public clearProfile() {
    this.profile.phone = '';
    this.profile.remark = null;
  }

  public resetTree() {
    this.treeSelection = ['team-ops'];
  }
}
</script>

<style scoped lang="scss">
.component-demo {
  max-width: 1200px;
  margin: 0 auto;
}

.component-demo-card {
  width: 100%;
}

.item-card {
  border-style: dashed;
}
</style>
