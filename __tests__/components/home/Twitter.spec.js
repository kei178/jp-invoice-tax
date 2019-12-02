import { shallowMount } from '@vue/test-utils'
import Component from '@/components/home/Twitter'

describe('Component', () => {
  it('is a Vue instance', () => {
    const wrapper = shallowMount(Component, {
      methods: {
        appendTwitterWidget: jest.fn()
      }
    })

    expect(wrapper.isVueInstance).toBeTruthy()
  })
})