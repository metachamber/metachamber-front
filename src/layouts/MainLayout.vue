<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-white text-primary" height-hint="98">
      <q-toolbar>
        <q-avatar square class="q-mx-md">
          <img src="~assets/logo-500x500.png">
        </q-avatar>
        <q-toolbar-title>
          Metachamebr
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {useI18n} from 'vue-i18n';

export default defineComponent({
  name: 'MainLayout',

  components: {
  },

  setup () {
    const locale = useI18n({ useScope: 'global' })
    const dir = locale.locale.value === 'fa-IR' ? 'rtl' : 'ltr'
    return {
      dir: dir
    }
  }
});
</script>
