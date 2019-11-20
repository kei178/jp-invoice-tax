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

  it('hides the instruction when showInstruction is FALSE', () => {
    wrapper.vm.showInstruction = false
    expect(wrapper.find("#instruction-body").exists()).toBe(false)
  })

  it('shows the instruction when showInstruction is TRUE', () => {
    wrapper.vm.showInstruction = true
    expect(wrapper.find("#instruction-body").exists()).toBe(true)
  })

  it('calls toggleShowInstruction when "show" is clicked', () => {
    const toggleShowInstruction = jest.fn()
    wrapper.setMethods({ toggleShowInstruction })
    wrapper.vm.showInstruction = false
    
    wrapper.find('span.show').trigger('click')
    expect(toggleShowInstruction).toBeCalled()
  })

  it('calls toggleShowInstruction when "hide" is clicked', () => {
    const toggleShowInstruction = jest.fn()
    wrapper.setMethods({ toggleShowInstruction })
    wrapper.vm.showInstruction = true
    
    wrapper.find('span.hide').trigger('click')
    expect(toggleShowInstruction).toBeCalled()
  })
}) 