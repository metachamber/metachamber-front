<template>
  <q-page class="q-pa-xl row q-gutter-lg">
    <q-list dense bordered padding class="rounded-borders col-12 col-md-3">
      <q-item :focused="active === index" :active="active == index" clickable v-ripple v-for="(datasource, index) in datasources" v-bind:key="index" @click="active = index">
        <q-item-section>
          {{ datasource.name }}
        </q-item-section>
      </q-item>
    </q-list>
    <catalog-component class="col-12 col-md-8" :dataset="datasources[active]" v-if="datasources[active]"></catalog-component>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { api } from 'src/boot/axios'
import {AxiosResponse} from 'axios'
import { Dataset } from 'src/models/catalog'
import { useQuasar } from 'quasar'
import CatalogComponent from 'components/CatalogComponent.vue';

export default defineComponent({
  name: 'IndexPage',
  components: {CatalogComponent},
  setup() {
    const $q = useQuasar()
    const datasources = ref<Array<Dataset>>([])
    const active = ref(0)
    function loadData () {
      api.get('/catalog/')
        .then((response: AxiosResponse<Array<Dataset>>) => {
          console.log(response.data)
          datasources.value = response.data
        })
        .catch(() => {
          $q.notify({
            color: 'negative',
            position: 'top',
            message: 'Error',
            icon: 'report_problem'
          })
        })
    }
    loadData()
    return {
      datasources: datasources,
      active: active
    }
  }
});
</script>
