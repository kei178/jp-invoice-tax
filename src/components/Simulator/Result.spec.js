import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from "vuex"
import Component from './Result'

let store
let actions
let mutations
let state
let getters
const localVue = createLocalVue()
localVue.use(Vuex)

// 設定値
const exampleEntries = {
  sales: 3300000,
  cost:  1100000,
  taxableIncome: 1170000,
  selectedBiz: 0.5,
  bizOpts: [['卸売業', 0.9], ['小売業', 0.8], ['製造業等', 0.7], ['その他の事業', 0.6], ['サービス業等', 0.5], ['不動産業', 0.4]],
  selectedBizTaxRate: 0.05,
  bizTaxRateOpts: [['5%', 0.05], ['4%', 0.04], ['3%', 0.03]],
  realEstateIncome: 0
}

const factory = (entries = exampleEntries) => {
  actions = {}
  mutations = {}
  state = {
    entries: {
      ...entries
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
  return shallowMount(Component, {
    store,
    localVue
  }) 
}

describe('Component', () => {
  it('is a Vue instance', () => {
    const wrapper = factory()

    expect(wrapper.isVueInstance).toBeTruthy()
  })

  // 最終結果
  describe('result', () => {
    it('shows the saving amount by becoming a taxable biz', () => {
      const wrapper = factory()

      const result = Math.floor(wrapper.vm.result)
      expect(result).toEqual(172500)
    })
  })
  
  // 免税事業者
  describe('taxExemptImpact', () => {
    it('calclates the impact of the tax amount for tax exempt biz', () => {
      const wrapper = factory()

      const result = Math.floor(wrapper.vm.taxExemptImpact)
      expect(result).toEqual(300000)
    })
  })

  // 課税事業者
  describe('taxBizIncomeCut', () => {
    it('calclates the impact of the income tax amount for taxable biz', () => {
      const wrapper = factory()

      const result = Math.floor(wrapper.vm.taxBizIncomeCut)
      expect(result).toEqual(0)
    })
  })  

  describe('taxBizConsumptionTax', () => {
    it('calclates the impact of the consumption tax amount for taxable biz', () => {
      const wrapper = factory()

      const result = Math.floor(wrapper.vm.taxBizConsumptionTax)
      expect(result).toEqual(200000)
    })
  })

  describe('taxBizOtherTaxes', () => {
    it('calclates the impact of the tax amount for taxable biz', () => {
      const wrapper = factory()

      const result = Math.floor(wrapper.vm.taxBizOtherTaxes)
      // 所得税 5% + 住民税 10% (+ 事業税 5%)
      expect(result).toEqual(-30000)
    })
  })  
  
  // 簡易課税事業者
  describe('simpleTaxBizIncomeCut', () => {
    it('calclates the impact of the income tax amount for simple taxable biz', () => {
      const wrapper = factory()

      const result = Math.floor(wrapper.vm.simpleTaxBizIncomeCut)
      expect(result).toEqual(0)
    })
  })  

  describe('simpleTaxBizConsumptionTax', () => {
    it('calclates the impact of the consumption tax amount for simple taxable biz', () => {
      const wrapper = factory()

      const result = Math.floor(wrapper.vm.simpleTaxBizConsumptionTax)
      // selectedBiz = 0.5
      expect(result).toEqual(150000)
    })
  })

  describe('simpleTaxBizOtherTaxes', () => {
    it('calclates the impact of the tax amount for simple taxable biz', () => {
      const wrapper = factory()

      const result = Math.floor(wrapper.vm.simpleTaxBizOtherTaxes)
      // 所得税 5% + 住民税 10% (+ 事業税 5%)
      expect(result).toEqual(-22500)
    })
  })  

  // Methods
  describe('calcConsumptionTax', () => {
    it('calclates the consumption tax amount', () => {
      const wrapper = factory()

      const result = Math.floor(wrapper.vm.calcConsumptionTax(1100))
      expect(result).toEqual(100)
    })
  })

  describe('incomeTaxImpact', () => {
    it('calclates the income tax diff', () => {
      const entries = exampleEntries
      entries.taxableIncome = 3000000
      const wrapper = factory(entries)

      const result = Math.floor(wrapper.vm.incomeTaxImpact(-300000))
      expect(result).toEqual(-30000)
    })
    it('returns 0 if the taxable income is less than 0', () => {
      const entries = exampleEntries
      entries.taxableIncome = 0
      const wrapper = factory(entries)

      const result = Math.floor(wrapper.vm.incomeTaxImpact(-300000))
      expect(result).toEqual(0)
    })
  })

  describe('residentTaxImpact', () => {
    it('calclates the resident tax diff', () => {
      const entries = exampleEntries
      entries.taxableIncome = 3000000
      const wrapper = factory(entries)

      const result = Math.floor(wrapper.vm.residentTaxImpact(-300000))
      expect(result).toEqual(-30000)
    })
    it('returns 0 if the taxable income is less than 0', () => {
      const entries = exampleEntries
      entries.taxableIncome = 0
      const wrapper = factory(entries)

      const result = Math.floor(wrapper.vm.residentTaxImpact(-300000))
      expect(result).toEqual(0)
    })
  })

  describe('businessTaxImpact', () => {
    it('calclates the business tax diff', () => {
      const entries = exampleEntries
      entries.sales = 5000000
      entries.cost = 1000000
      entries.taxableIncome = 2500000 // Dummy
      const wrapper = factory(entries)

      const result = Math.floor(wrapper.vm.businessTaxImpact(-300000))
      expect(result).toEqual(-15000)
    })
    it('returns 0 if the taxable income is less than or equal to 2900000', () => {
      const entries = exampleEntries
      entries.sales = 2900000
      entries.cost = 0
      entries.taxableIncome = 2500000 // Dummy
      const wrapper = factory(entries)

      const result = Math.floor(wrapper.vm.businessTaxImpact(-300000))
      expect(result).toEqual(0)
    })
  })
})