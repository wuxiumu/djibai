import { mount } from '@vue/test-utils'
import ProductCard from '@/components/ProductCard.vue'
describe('ProductCard', () => {
    it('renders product info', () => {
        const product = { id: 1, name: 'Test', price: 10, image: 'img.jpg' }
        const wrapper = mount(ProductCard, { props: { product } })
        expect(wrapper.text()).toContain('Test')
        expect(wrapper.text()).toContain('10')
        expect(wrapper.find('img').attributes('src')).toBe('img.jpg')
    })
})