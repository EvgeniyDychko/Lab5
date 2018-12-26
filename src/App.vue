<template>
  <div>
    <div class="app-header">
      <ShowItems />
      <SearchItems />
    </div>

    <TableData />

    <div class="app-footer">
      <InfoComponent />
      <PaginationComponent />
    </div>
  </div>
</template>

<script>
import TableData from '@/components/TableData'
import ShowItems from '@/components/ShowItems'
import SearchItems from '@/components/SearchItems'
import PaginationComponent from '@/components/PaginationComponent'
import InfoComponent from '@/components/InfoComponent'

export default {
  name: 'App',
  components: {
    TableData,
    ShowItems,
    SearchItems,
    PaginationComponent,
    InfoComponent
  },
}
</script>


<style lang="scss">
* {
  box-sizing: border-box;
  color: #73879c;
  font-size: 14px;
}

.app-header,
.app-footer {
  display: flex;
  justify-content: space-between;
  padding: 8px 2px;
}
</style>

