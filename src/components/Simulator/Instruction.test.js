import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from "vuex"
import Component from './Instruction'

let wrapper
let store
let actions
let getters
let mutations
let state
const localVue = createLocalVue()
localVue.use(Vuex)

beforeEach(() => {
  actions = {}
  getters = {}         
  mutations = {}
  state = {
    key: {}
  }
  store = new Vuex.Store({
    actions,
    getters,
    mutations,
    state
  })
  wrapper = shallowMount(Component, {
    propsData: {},
    mocks: {},
    stubs: {},
    methods: {},
    store,
    localVue,    
  })
})

afterEach(() => {
  wrapper.destroy();
})

describe('Component', () => {
  it('is a Vue instance', () => {
      expect(wrapper.isVueInstance).toBeTruthy()
  })
})