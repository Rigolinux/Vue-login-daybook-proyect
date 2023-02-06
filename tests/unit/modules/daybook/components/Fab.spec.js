
import { shallowMount } from '@vue/test-utils';
import Fab from '@/modules/daybook/components/Fab.vue';
describe('Pruebas en el Fab', () => {

    test('debe de mostrar el icono por defecto', () => {
        const wrapper = shallowMount(Fab)
        const icon = wrapper.find('i')
        expect(icon.exists()).toBeTruthy()
        expect(icon.classes('fa-plus')).toBeTruthy()
    })

    test('debe de mostrar el icono edit', () => {
        const wrapper = shallowMount(Fab,{
            props:{
                icon:'fa-save'
            }
        })
        const icon = wrapper.find('i')
        expect(icon.exists()).toBeTruthy()
        expect(icon.classes('fa-save')).toBeTruthy()
    })
    test('debe de emitir el evento click', () => {
        const wrapper = shallowMount(Fab)
        const btn = wrapper.find('button')
        btn.trigger('click')
        expect(wrapper.emitted('on:click')).toHaveLength(1)
    })
})
