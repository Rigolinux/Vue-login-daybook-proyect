

// export const myGetters = async(state)=>{
//     return state
// }

export const getCurrentstate = ( state ) => {
    return state.status
}

export const getUsername = ( state ) => {
    return state.user?.name || ''
}

