import { shallowMount } from '@vue/test-utils'
import Component from './Contact'

let wrapper

beforeEach(() => {
  wrapper = shallowMount(Component, {
      propsData: {},
      mocks: {},
      stubs: {},
      methods: {},
  });
});

afterEach(() => {
  wrapper.destroy()
})

describe('Component', () => {
  it('is a Vue instance', () => {
      expect(wrapper.isVueInstance).toBeTruthy()
  })
})