import data from '@/data'

const state = () => ({
  data,
  currentPage: 1,
  perPage: 5,
  searchText: '',
  orderDir: 'asc',
  orderBy: 'ID'
})

const getters = {
  filteredData: state => {
    return state.data.filter(row => {
      return Object.values(row)
        .join('~')
        .toLowerCase()
        .includes(state.searchText.toLowerCase())
    }).sort((a, b) => {
      const sign = state.orderDir === 'asc' ? 1 : -1;
      return a[state.orderBy] > b[state.orderBy] ? 1 * sign : -1 * sign;
    })
  },
  fields: state => Object.keys(state.data[0]),
  rows: (state, getters) => getters.filteredData.slice(
    (state.currentPage - 1) * state.perPage,
    state.currentPage * state.perPage
  ),
  searchText: state => state.searchText,
  pagesTotal: (state, getters) => Math.ce(getters.filteredData.length / state.perPage),
}

const actions = {}

const mutations = {
  set: (state, { key, value }) => (state[key] = value),
}

export default {
  state,
  getters,
  actions,
  mutations
}