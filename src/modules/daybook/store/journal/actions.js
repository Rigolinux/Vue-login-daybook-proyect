// export const myactions = async()=>{}
import journalApi from '@/api/journalApi';

// export default myactions

export const loadEntry = async( {commit} )=>{
   const {data} = await journalApi.get('/entries.json');
    if(!data){
        commit('setEntry', []);
        return;
    }
    const entries = [];
    for (let id of Object.keys(data)) {
        entries.push({
            id,
            ...data[id]
        });
    }
    commit('setEntry', entries);
}
export const updateEntry = async({commit},data )=>{
    const {id} = data;
    const {data: dataUpdate} = await journalApi.put(`/entries/${id}.json`, data);
    
    commit('updateEntry', dataUpdate);
    
}
export const createEntry = async( {commit} ,data )=>{
    const {data: dataCreate} = await journalApi.post('/entries.json', data);
    
    data.id = dataCreate.name;
    commit('addEntry', data);
    
    return data.id;
}

export const deleteEntry = async(  {commit}, id  )=>{
    //console.log(id);
    await journalApi.delete(`/entries/${id}.json`);

    commit('deleteEntry', id);
}
