import { shallowMount } from '@vue/test-utils'
import Component from '@/components/home/Author'

let wrapper

beforeEach(() => {
  wrapper = shallowMount(Component, {})
})

afterEach(() => {
  wrapper.destroy()
})

describe('Component', () => {
  it('is a Vue instance', () => {
    expect(wrapper.isVueInstance).toBeTruthy()
  })
})