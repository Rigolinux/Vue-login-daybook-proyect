

// export const mutations = (state) =>{}

export const setEntry = ( state, entries) =>{
    
    state.entries = [...state.entries, ...entries]
    state.isLoading = false;
}

export const updateEntry = ( state, entrie ) =>{

    state.entries = state.entries.map( e => e.id === entrie.id ? entrie : e);

}

export const addEntry = ( state, entry ) =>{
   
    state.entries.unshift(entry);
}

export const deleteEntry = ( state, id ) =>{
    state.entries = state.entries.filter( e => e.id !== id);
}