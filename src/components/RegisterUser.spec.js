import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import RegisterUser from './RegisterUser.vue'

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(RegisterUser, {})
    expect(wrapper.text()).toContain('E-mail')
  })
})
