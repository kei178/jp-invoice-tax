import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from "vuex"
import Component from './Entries'

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

  it('shows the red text when required fields are not entered', () => {
    const updateEntries = jest.fn()
    wrapper.setMethods({ updateEntries })

    wrapper.vm.sales = ''
    wrapper.vm.cost = ''
    wrapper.vm.taxableIncome = ''
    expect(wrapper.find("p.red").exists()).toBe(true)
  })

  it('hides the red text when required fields are entered', () => {
    wrapper.setData({ isEntered: true })
    expect(wrapper.find("p.red").exists()).toBe(false)
  })

  // TODO: commits の発火テスト
})