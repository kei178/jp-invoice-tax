import { shallowMount } from '@vue/test-utils'
import Component from '@/components/contact/Contact'

jest.mock('axios')

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

  it('shows the thank-you page when submitted', () => {
    wrapper.vm.isSubmitted = true
    expect(wrapper.find("#thank-you").exists()).toBe(true)
  })

  it('hides the thank-you page when not submitted', () => {
    wrapper.vm.isSubmitted = false
    expect(wrapper.find("#thank-you").exists()).toBe(false)
  })

  it('shows the form when not submitted', () => {
    wrapper.vm.isSubmitted = false
    expect(wrapper.find(".ui.form").exists()).toBe(true)
  })

  it('hides the form when submitted', () => {
    wrapper.vm.isSubmitted = true
    expect(wrapper.find(".ui.form").exists()).toBe(false)
  })

  it('is not submitable when required fields are blank', () => {
    wrapper.vm.isSubmitted = false
    wrapper.vm.contactData = {
      name: '大阪太郎', 
      email: '',
      subject: 'このツールについて',
      message: 'このツールの使い方を教えてください。'
    }
    expect(wrapper.find(".ui.blue.button.disabled").exists()).toBe(true)
  })

  it('is submitable when all required fields are entered', () => {
    wrapper.vm.isSubmitted = false
    wrapper.vm.contactData = {
      name: '大阪太郎', 
      email: 'osaka@tarou.com',
      subject: 'このツールについて',
      message: 'このツールの使い方を教えてください。'
    }
    expect(wrapper.find(".ui.blue.button.disabled").exists()).toBe(false)
  })

  it('notifies via Telegram when submitting & confirming it', () => {
    const notifyTelegram = jest.fn()
    wrapper.setMethods({ notifyTelegram })
    // always return TRUE on confirm dialog
    window.confirm = jest.fn(() => true)
    
    wrapper.vm.isSubmitted = false
    wrapper.vm.contactData = {
      name: '大阪太郎', 
      email: 'osaka@tarou.com',
      subject: 'このツールについて',
      message: 'このツールの使い方を教えてください。'
    }

    wrapper.find(".ui.blue.button").trigger('click')
    expect(notifyTelegram).toBeCalled()
  })
})