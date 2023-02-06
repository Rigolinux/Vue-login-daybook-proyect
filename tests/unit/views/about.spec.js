import { shallowMount } from "@vue/test-utils"
import About from "@/views/About.vue"
describe('About', () => {

    test('Debe de hacer match con el snapshot', () => {
        const wrapper = shallowMount(About)
        expect(wrapper.html()).toMatchSnapshot()
    })
})