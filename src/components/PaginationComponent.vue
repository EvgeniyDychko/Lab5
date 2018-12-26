<template>
  <div class="pgnt">
    <ul class="pgnt__ul">
      <li class="pgnt__prev pg-btn">
        <button
          class="pgnt__prev-btn"
          @click="changeCurrentPage(currentPage - 1)"
        >
          prev
        </button>
      </li>

      <li
        v-if="showFirstPageButton"
        class="pgnt__other-btns"
      >
        <button
          :class="[ 'pgnt__pages pb-btn', { 'highlight': isCurrentPage(1) }]"
          @click="changeCurrentPage(1)"
        >
          {{ 1 }}
        </button>
        <button
          class="pgnt__page-btn dots"
        >
          ...
        </button>
      </li>

      <li
        v-for="(page, index) in pages"
        :key="index"
        :class="[ 'pgnt__pages pb-btn', { 'highlight': isCurrentPage(page) }]"
      >
        <button
          class="pgnt__pages-btn"
          @click="changeCurrentPage(page)"
        >
          {{ page }}
        </button>
      </li>

      <li
        v-if="showLastPageButton"
        class="pgnt__other-btns"
      >
        <button
          class="pgnt__page-btn dots"
        >
          ...
        </button>
        <button
          :class="[ 'pgnt__pages pb-btn', { 'highlight': isCurrentPage(pagesTotal) }]"
          @click="changeCurrentPage(pagesTotal)"
        >
          {{ pagesTotal }}
        </button>
      </li>

      <li class="pgnt__next pg-btn">
        <button
          class="pgnt__next-btn"
          @click="changeCurrentPage(currentPage + 1)"
        >
          next
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import { range } from 'ramda'

const BUTTONS_TO_SHOW = 5

export default {
  name: 'PaginationComponent',
  computed: {
    ...mapState({
      currentPage: state => state.table.currentPage,
      perPage: state => state.table.perPage
    }),
    ...mapGetters([
      'pagesTotal',
      'searchText'
    ]),
    pages () {
      if (this.pagesTotal < BUTTONS_TO_SHOW) {
        return range(1, this.pagesTotal + 1)
      }

      if (this.currentPage < BUTTONS_TO_SHOW) {
        return range(1, BUTTONS_TO_SHOW + 1)
      }

      if (this.currentPage > this.pagesTotal - BUTTONS_TO_SHOW + 1) {
        return range(this.pagesTotal - BUTTONS_TO_SHOW + 1, this.pagesTotal + 1)
      }

      return range(
        Math.round(this.currentPage - BUTTONS_TO_SHOW / 2),
        Math.round(this.currentPage + BUTTONS_TO_SHOW / 2)
      )
    },
    isThereAreMorePagesThanPaginationButtons () {
      return this.pagesTotal > BUTTONS_TO_SHOW
    },
    showFirstPageButton () {
      return this.isThereAreMorePagesThanPaginationButtons
        && this.currentPage > BUTTONS_TO_SHOW - 1
    },
    showLastPageButton () {
      return this.isThereAreMorePagesThanPaginationButtons
        && this.pagesTotal - this.currentPage + 1 >= BUTTONS_TO_SHOW
    }
  },
  watch: {
    searchText (newValue) {
      if (!newValue) return

      this.changeCurrentPage(1)
    }
  },
  methods: {
    changeCurrentPage (newPage) {
      if (newPage < 1 || newPage > this.pagesTotal) return

      this.$store.commit('set', { key: 'currentPage', value: newPage })
    },
    isCurrentPage (page) {
      return this.currentPage === page
    }
  }
}
</script>

<style lang="scss" scoped>
.highlight {
  border: 1px solid green;
}

.pgnt {
  &__ul {
    display: flex;
    list-style-type: none;
  }
}
</style>
