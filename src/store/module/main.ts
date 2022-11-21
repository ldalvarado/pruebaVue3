/*

    El store que contendra toda la informacion y variables que usaran los componentes de manera reactiva y dinamica con pinia

*/

import service from "@/services";
import { defineStore } from 'pinia'

export const useRepositorieStore = defineStore('repositories', {
    /* definimos el state del store que contendran las variables */
    state: () => ({
        list: <any[]>[],
        loading: false,
        selected: <any>{},
        visibleLive: false,
        topic: '',
        Maxstars: 2000000,
        Minstars: 500,
        search: 'Q',
    }),
    /* el getters obtiene las variables pero con filtrados o configuraciones especiales para que asi sea mas facil la extracion de ciertos elementos que no necesitemos configurar en los componentes */
    getters: {
        /* 
            filtro de la data, filtro solo 10 elementos, y en un rango de estrellas que me trae el servicio del minimo al maximo
            ademas de un buscador de topics o relaciones que tiene el repositorio
        */
        getData(state): any[] {
            let data = <any[]>[];
            if(state.list.length > 0){
                let fil = state.list.filter(e => e.stargazers_count < state.Maxstars)
                fil = fil.filter(e => e.stargazers_count > state.Minstars)
                
                fil.filter((item, idx) => idx < 10).map((item) => {
                    let bandera = false;
                    if(state.topic != ''){
                        for (let index = 0; index < item.topics.length; index++) {
                            const element = item.topics[index];
                            if (element.toUpperCase().indexOf(state.topic.toUpperCase()) > -1 && bandera == false) {
                                bandera = true;
                            }
                        }
                        if(bandera)
                            data.push(item)
                    }else{
                        data.push(item);
                    }
                })
            }
            return data;
        },
        /*
            Informacion extraida que se usara para las graficas del componente modal
        */
        getInformationGraph(state): any[] {
            let data = <any[]>[];
            if(state.visibleLive && Object.keys(state.selected).length > 0){
                data.push(state.selected.forks_count);
                data.push(state.selected.open_issues_count);
                data.push(state.selected.stargazers_count);
            }
            return data;
        },
    },
    actions: {
        /* 
            action que usare como metodo para poder buscar todos los elementos asc de la api de github buscando el repositorio, con el state search
            tambien se puede hacer de manera desc que traeria primero los mejores clasificados pero para cuestiones del ejercicio me centre en buscarlo por el rango de las estrellas
        */
        async getRepositories() {
            this.loading = true;
            await service.get(`/search/repositories?q=${this.search}&order=asc`)
            .then((response: any) => {
                this.list = response.data.items;
            }).catch(async (error) =>{
                console.log(error);
            }).finally(() => {
                this.loading = false;
            })
        }
    }
})