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

  describe('UI behaviour', () => {
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
  })

  describe('validations', () => {
    it('validates the email address when entering it', () => {
      const validateEmail = jest.fn()
      wrapper.setMethods({ validateEmail })
  
      const input = wrapper.find("input[name='email']")
      input.element.value = "not_email_address"
      input.trigger('change')
      expect(validateEmail).toBeCalled()
    })
  
    it('is not submittable when name is blank', () => {
      wrapper.vm.isSubmitted = false
      wrapper.vm.contactData = {
        name: '', 
        email: 'osaka@tarou.com',
        subject: 'このツールについて',
        message: 'このツールの使い方を教えてください。'
      }
      expect(wrapper.find(".ui.blue.button.disabled").exists()).toBe(true)
    })
  
    it('is not submittable when email is blank', () => {
      wrapper.vm.isSubmitted = false
      wrapper.vm.contactData = {
        name: '大阪太郎', 
        email: '',
        subject: 'このツールについて',
        message: 'このツールの使い方を教えてください。'
      }
      expect(wrapper.find(".ui.blue.button.disabled").exists()).toBe(true)
    })
  
    it('is not submittable when subject is blank', () => {
      wrapper.vm.isSubmitted = false
      wrapper.vm.contactData = {
        name: '大阪太郎', 
        email: 'osaka@tarou.com',
        subject: '',
        message: 'このツールの使い方を教えてください。'
      }
      expect(wrapper.find(".ui.blue.button.disabled").exists()).toBe(true)
    })
  
    it('is not submittable when message is blank', () => {
      wrapper.vm.isSubmitted = false
      wrapper.vm.contactData = {
        name: '大阪太郎', 
        email: 'osaka@tarou.com',
        subject: 'このツールについて',
        message: ''
      }
      expect(wrapper.find(".ui.blue.button.disabled").exists()).toBe(true)
    })
  
    it('is not submittable when email is not an email address', () => {
      wrapper.vm.isSubmitted = false
      wrapper.vm.contactData = {
        name: '大阪太郎',
        email: 'osaka@tarou.com',
        subject: 'このツールについて',
        message: 'このツールの使い方を教えてください。'
      }
      wrapper.vm.validEmail = false
      expect(wrapper.find(".ui.blue.button.disabled").exists()).toBe(true)
    })
  
    it('is submittable when all required fields are entered', () => {
      wrapper.vm.isSubmitted = false
      wrapper.vm.contactData = {
        name: '大阪太郎', 
        email: 'osaka@tarou.com',
        subject: 'このツールについて',
        message: 'このツールの使い方を教えてください。'
      }
      expect(wrapper.find(".ui.blue.button.disabled").exists()).toBe(false)
    })
  })

  describe('notification', () => {
    it('notifies Telegram when submitting and confirming it', () => {
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
  
    it('does not notify Telegram when honeypot is not empty', () => {
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
  
      wrapper.vm.honeypot = 'はちみつのツボ'
      wrapper.find(".ui.blue.button").trigger('click')
      expect(notifyTelegram).not.toBeCalled()
    })  
  })
})