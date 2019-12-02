import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from "vuex"
import VueRouter from '@/vendor/vue-router'
import Component from '@/App'

let wrapper
let store
let actions
let mutations
let state
const localVue = createLocalVue()
localVue.use(Vuex)

// vue-router
localVue.use(VueRouter)
const router = new VueRouter()

beforeEach(() => {
  actions = {
    initEntries: jest.fn()
  }
  mutations = {}
  state = {
    key: {}
  }
  store = new Vuex.Store({
    actions,
    mutations,
    state,
  })
  wrapper = shallowMount(Component, {
    propsData: {},
    mocks: {},
    methods: {},
    store,
    localVue,   
    router 
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