<template>
  <div class="q-gutter-y-lg q-mt-none">
    <q-markup-table
      flat
      bordered
      class="text-left"
    >
      <thead>
      <tr>
        <th colspan="2" class="text-right">
          <q-btn v-if="editable" icon="save" dense flat @click="save_dataset()"></q-btn>
          <q-btn v-else icon="edit" dense flat @click="editable = true"></q-btn>
        </th>
      </tr>
      <tr>
        <th>{{ $t('name') }}</th>
        <th>{{ $t('value') }}</th>
      </tr>
      </thead>
      <tbody>
        <tr :props="props">
          <td>{{ $t('datasource') }}</td>
          <td>
            <div v-if="editable">

            </div>
            <div v-else>
              {{ dataset.datasource.name }}
            </div>
          </td>
        </tr>
      </tbody>
    </q-markup-table>
    <q-table
      flat
      bordered
      style="max-height: 500px"
      :title="$t('schema')"
      :rows="dataset.fields"
      :columns="schema_columns"
      row-key="index"
      virtual-scroll
      hide-bottom
    >
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            {{ col.label }}
          </q-th>
          <q-th auto-width />
        </q-tr>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props" :key="`m_${props.row.index}`">
          <q-td
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            <div v-if="props.row.editable">
              <q-input outlined v-model="props.row[col.name]" />
            </div>
            <div v-else>{{ col.value }}</div>
          </q-td>
          <q-td >
            <q-btn v-if="props.row.editable" icon="save" dense flat @click="save(props.row)"></q-btn>
            <q-btn v-else icon="edit" dense flat @click="props.row.editable = true"></q-btn>
            <!--            <q-toggle v-model="props.editddیی" checked-icon="add" unchecked-icon="remove" :label="`Index: ${props.row.index}`" />-->
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType, ref} from 'vue';
import { Dataset, Field } from 'src/models/catalog';
import {useI18n} from 'vue-i18n';
import {api} from 'boot/axios';
import {AxiosResponse} from 'axios';
import {useQuasar} from 'quasar';

export default defineComponent({
  name: 'CatalogComponent',
  props: {
    dataset: {
      type: Object as PropType<Dataset>,
      required: true
    }
  },
  setup(props) {
    const $q = useQuasar()
    const $t = useI18n({useScope: 'global'})
    const schema_columns = [
      {
        name: 'name',
        label: $t.t('name'),
        field: 'name',
        align: 'left'
      },
      {
        name: 'description',
        label: $t.t('description'),
        field: 'description',
        align: 'left'
      },
    ]

    function save(field: Field) {
      field.editable = false;
      api
        .put(`/catalog/field/${field.id}/`, field)
        .then((response: AxiosResponse<Array<Dataset>>) => {
          console.log(response.data);
          $q.notify({
            color: 'positive',
            position: 'top',
            message: 'Success',
            icon: 'report_problem',
          });
        })
        .catch(() => {
          $q.notify({
            color: 'negative',
            position: 'top',
            message: 'Error',
            icon: 'report_problem',
          });
        });
    }

    const editable = ref<boolean>(false)

    function save_dataset() {
      editable.value = false;
      api
        .put(`/catalog/dataset/${props.dataset.id}/`, props.dataset)
        .then((response: AxiosResponse<Array<Dataset>>) => {
          console.log(response.data);
          $q.notify({
            color: 'positive',
            position: 'top',
            message: 'Success',
            icon: 'report_problem',
          });
        })
        .catch(() => {
          $q.notify({
            color: 'negative',
            position: 'top',
            message: 'Error',
            icon: 'report_problem',
          });
        });
    }

    return {
      schema_columns: schema_columns,
      save,
      editable,
      save_dataset
    };
  },
});
</script>
