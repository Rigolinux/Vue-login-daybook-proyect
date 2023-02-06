export default {

    name : 'daybook',
    component: () => import(/* webpackChunkName: "Daybook" */ '@/modules/daybook/layouts/DayBookLayout.vue'),
    children: [
        {
            path: '',
            name: 'no-entry',
            component: () => import(/* webpackChunkName: "daybooknoentry" */ '@/modules/daybook/views/NoEntrySelected.vue'),
        },
        {
            path: ':id',
            name: 'entry',
            component: () => import(/* webpackChunkName: "daybooknoentry" */ '@/modules/daybook/views/EntryView.vue'),
            props:(route)=>(
                {
                    id: route.params.id
                })  
        }
        
    ]
}