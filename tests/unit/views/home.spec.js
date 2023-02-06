import { shallowMount } from "@vue/test-utils"
import Home from "@/views/Home.vue"
describe('HOME TEST', () => {

    test('Debe de hacer match con el snapshot', () => {
        const wrapper = shallowMount(Home)
        expect(wrapper.html()).toMatchSnapshot()
    })

    test('hacer click en un boton debe redireccionarn a no entry',()=>{

        // testing with router
        const mockRouter ={
            push: jest.fn()
        }
        const wrapper = shallowMount(Home,{
            global:{
                mocks:{
                    $router: mockRouter
                } // aqui se puede pasar el mockRouter
            }
        })

        wrapper.find('button').trigger('click')
        expect(mockRouter.push).toHaveBeenCalled()
        expect(mockRouter.push).toHaveBeenCalledWith({name:'no-entry'})
    })
})