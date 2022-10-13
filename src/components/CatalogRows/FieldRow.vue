<template>
  <template>
  </template>
  <template>
  </template>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Dataset } from 'src/models/catalog';
import {useI18n} from 'vue-i18n';

export default defineComponent({
  name: 'FieldRow',
  props: {
    dataset: {
      type: Object as PropType<Dataset>,
      required: true
    }
  },
  setup(props) {
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
    const info_columns = [
      {
        name: 'name',
        label: $t.t('name'),
        field: 'name',
        align: 'left'
      },
      {
        name: 'value',
        label: $t.t('value'),
        field: 'value',
        align: 'left'
      },
    ]

    const info_values = (dataset: Dataset) => [
      {
        name: $t.t('datasource'),
        value: dataset.datasource.name
      },
      {
        name: $t.t('owner'),
        value: dataset.owner.name
      }
    ]

    return {
      schema_columns: schema_columns,
      info_columns: info_columns,
      info_values: info_values(props.dataset)
    };
  },
});
</script>
