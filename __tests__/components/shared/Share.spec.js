import { shallowMount } from '@vue/test-utils'
import Component from '@/components/shared/Share'

let wrapper

beforeEach(() => {
  wrapper = shallowMount(Component, {})
})

afterEach(() => {
  wrapper.destroy();
})

describe('Component', () => {
  it('is a Vue instance', () => {
    expect(wrapper.isVueInstance).toBeTruthy()
  })

  it('shares on Twitter by clicking', () => {
    const shareOnTwitter = jest.fn()
    wrapper.setMethods({ shareOnTwitter })
    
    wrapper.find(".ui.twitter.button").trigger('click')
    expect(shareOnTwitter).toBeCalled()
  })
})
