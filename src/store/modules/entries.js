import entries from '../../data/entries';

const state = {
  entries: {}
};

const mutations = {
  'SET_ENTRIES' (state, entries) {
    state.entries = entries;
  },
  'UPDATE_ENTRIES' (state, newEntries) {
    state.entries = newEntries;
  }
};

const actions = {
  initEntries: ({commit}) => {
    commit('SET_ENTRIES', entries);
  },
  updateEntries: ({commit}, newEntries) => {
    commit('UPDATE_ENTRIES', newEntries);
  }
};

const getters = {
  entries: state => {
    return state.entries;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
}