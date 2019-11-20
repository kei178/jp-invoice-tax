import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from "vuex"
import Component from './Result'

let wrapper
let store
let actions
let mutations
let state
let getters
const localVue = createLocalVue()
localVue.use(Vuex)

beforeEach(() => {
  actions = {}
  mutations = {}
  state = {
    entries: {
      sales: '',
      cost:  '',
      taxableIncome: '',
      selectedBiz: 0.5,
      bizOpts: [['卸売業', 0.9], ['小売業', 0.8], ['製造業等', 0.7], ['その他の事業', 0.6], ['サービス業等', 0.5], ['不動産業', 0.4]],
      selectedBizTaxRate: 0.05,
      bizTaxRateOpts: [['5%', 0.05], ['4%', 0.04], ['3%', 0.03]],
      realEstateIncome: 0
    }  
  }
  getters = {
    entries(state) { return state.entries }
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

  // TODO: 免税事業者結果のテスト
  // TODO: 課税事業者結果のテスト
  // TODO: 簡易課税事業者結果のテスト
  // TODO: 最終結果のテスト
})