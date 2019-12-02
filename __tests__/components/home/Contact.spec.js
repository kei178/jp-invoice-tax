import { shallowMount } from '@vue/test-utils'
import Component from '@/components/home/Contact'

let wrapper

beforeEach(() => {
  wrapper = shallowMount(Component, {
    stubs: ['router-link', 'router-view']
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('Component', () => {
  it('is a Vue instance', () => {
    expect(wrapper.isVueInstance).toBeTruthy()
  })
})