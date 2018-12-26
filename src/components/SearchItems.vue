<template>
  <div class="search-items">
    Search: <input type="search" v-model="searchText" />
  </div>
</template>

<script>
export default {
  name: 'SearchItems',
  computed: {
    searchText: {
      get () {
        return this.$store.searchText
      },
      set (value) {
        this.$store.commit('set', { key: 'searchText', value })
      }
    }
  }
}
</script>


<style>
.search-items input {
  padding: 5px;
  outline: none;
  border: 1px solid #ddd;
}
</style>