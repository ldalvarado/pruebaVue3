<script lang="ts">
    //definicion del componente, llamamos primero los npm que usaremos, 
    //en este caso se usaran pinia para llamar al mapstate que necesitare para traer el getter para la lista
    import {
        useRepositorieStore
    } from '../store/module/main'
    import { mapState } from 'pinia'
    export default {
        methods: {
            //metodo para la seleccion de item
            selectedItem(item: any){
                this.store.selected = item;
                this.store.visibleLive = true;
            },
        },
        computed:{
            //mapeo del getter
            ...mapState(useRepositorieStore, ['getData']),
        },
        //retorno el store e inicializo de una ves la accion que necesito disparar
        setup() {
            const store = useRepositorieStore();
            store.getRepositories();
            return {
                store
            }
        },
    }
</script>

<template>
    <div>
        <!--Filtros usaran las acciones del store como el dispacht y tambien sus variables-->
        <CRow class="mt-3">
            <CCol xs="6" lg="4">
                <CFormLabel for="topicSearch" class="text-white">Buscar</CFormLabel>
                <CInputGroup>
                    <CFormInput v-model="store.search" placeholder="Front-end-Develope" aria-label="Front-end-Develope"/>
                    <CButton :disabled="store.search == ''" @click="store.getRepositories()" type="button" color="primary" class="d-flex align-items-center"><CIcon icon="cilSearch" size="xl"/></CButton>
                </CInputGroup>
            </CCol>
            <CCol xs="6" lg="3">
                <CFormLabel for="topicSearch" class="text-white">Topic</CFormLabel>
                <CFormInput v-model="store.topic" placeholder="Ruby" aria-label="Ruby"/>
            </CCol>
            <CCol xs="6" lg="2">
                <CFormLabel for="starsminSearch" class="text-white">Minimo Estrellas</CFormLabel>
                <CFormInput v-model="store.Minstars" min="0" :max="store.Minstars" type="number" placeholder="5" aria-label="5"/>
            </CCol>
            <CCol xs="6" lg="2">
                <CFormLabel for="starsmaxSearch" class="text-white">Maximo Estrellas</CFormLabel>
                <CFormInput v-model="store.Maxstars" :min="store.Maxstars" type="number" placeholder="5" aria-label="5"/>
            </CCol>
        </CRow>
        <!--carga del componente y listado-->
        <div class="mt-5 mb-3">
            <div v-if="store.loading">
                <div class="d-flex justify-content-center align-items-center">
                    <div class="p-5">
                        <CSpinner color="primary" variant="grow"/>
                    </div>
                    <div class="p-5">
                        <CSpinner color="primary" variant="grow"/>
                    </div>
                    <div class="p-5">
                        <CSpinner color="primary" variant="grow"/>
                    </div>
                </div>
            </div>
            <div v-else class="contentlist">
                <div class="layerlist" v-for="item in getData" :key="item.id" @click="selectedItem(item)">
                    <div class="d-flex align-items-center">
                        <div class="flex-fill d-flex align-items-center">
                            <h3>{{item.id}}</h3>
                        </div>
                        <div class="flex-fill d-flex justify-content-end">
                            <h3 class="h3-icon">
                                <CIcon icon="cilMenu" size="lg"/>
                            </h3>
                            
                        </div>
                    </div>
                    <div class="songdetails">
                        <h6 class="font-weight-bold">{{item.name}}</h6>
                    </div>
                    <img :src="item.owner.avatar_url" alt="imageAlbum">
                    <div class="d-flex optionsStarts mt-3">
                        <div class="flex-fill d-flex align-items-center justify-content-center icon-start">
                            <CIcon icon="cilStar" size="xxl"/>
                            <CIcon icon="cilStar" size="xxl"/>
                            <CIcon icon="cilStar" size="xxl"/>
                        </div>
                        <div class="flex-fill d-flex align-items-center justify-content-center">
                            {{item.stargazers_count}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

