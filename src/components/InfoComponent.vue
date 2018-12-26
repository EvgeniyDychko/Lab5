<template>
  <div>
    Showing {{ fromAmount + 1 }} to {{ toAmount }} of {{ entriesAmount }} entries 
    <span v-if="searchText">(filtered from {{ data.length }} total entries)</span>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'InfoComponent',
  computed: {
    ...mapState({
      data: state => state.table.data,
      perPage: state => state.table.perPage,
      currentPage: state => state.table.currentPage
    }),
    ...mapGetters([
      'filteredData',
      'searchText',
      'pagesTotal'
    ]),
    entriesAmount () {
      if (!this.filteredData) return 0

      return this.filteredData.length
    },
    fromAmount () {
      return (this.currentPage - 1) * this.perPage
    },
    toAmount () {
      const amount = this.fromAmount + this.perPage

      return amount > this.filteredData ? this.filteredData : amount
    }
  }
}
</script>
