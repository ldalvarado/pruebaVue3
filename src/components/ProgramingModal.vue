<script lang="ts">
    //definicion del componente, llamamos primero los npm que usaremos, 
    //en este caso se usaran pinia para llamar al mapstate que necesitare para traer el getter para la grafica
    import { defineComponent } from 'vue';
    import { BarChart } from 'vue-chart-3';
    import { mapState } from 'pinia'
    import {
        useRepositorieStore
    } from '../store/module/main'
    //registramos el charts js para poder inicializarlo ademas podriamos tambien hacerlo del main o tambien agregar plugins personalizados
    import { Chart, registerables } from "chart.js";
    Chart.register(...registerables);
    export default defineComponent({
        components: {
            BarChart,
        },
        //Variables computadas que son reactivas a cambios en este caso al getter necesario para las graficas
        computed: {
            getChartData(){
                let info = <any[]>this.getInformationGraph;
                const infData = {
                    labels: ['Forks', 'Open issues', 'Stargazers'],
                    datasets: [
                        {
                            data: info,
                            backgroundColor: ['#77CEFF', '#0079AF', '#123E6B'],
                        },
                    ],
                };
                return infData;
            },
            ...mapState(useRepositorieStore, ['getInformationGraph']),
        },
        //llamo al store y perzonaliso las opciones que usare en la grafica retornandolas se puede hacer la opcion tambien en el data pero preferi manejarla en el setup
        setup() {
            const store = useRepositorieStore();

            const options = ({
                responsive: true,
                plugins: {
                    legend: {
                        display: false,
                        position: 'top',
                    },
                    title: {
                        display: false,
                        text: 'Chart.js Doughnut Chart',
                    },
                },
            });
            return {
                store,options
            }
        },
    })
</script>

<template>
    <CModal size="lg" alignment="center" scrollable :visible="store.visibleLive" @close="() => { store.visibleLive = false }">
        <CModalHeader >
            <CModalTitle><b>{{store.selected?.name}}</b></CModalTitle>
        </CModalHeader>
        <CModalBody>
            <div style="height: 200px;">
                <BarChart style="height: 200px;" :options="options" :chartData="getChartData" />
            </div>
            <hr>
            <h3>Descripción</h3>
            <p>
                {{store.selected?.description}}
            </p>
            <h3 v-if="store.selected?.topics.length > 0">Topics</h3>
            <CRow class="mt-3">
                <CCol xs="6" lg="4" v-for="(item,index) in store.selected?.topics" :key="index">
                    # {{item}}
                </CCol>
            </CRow>
        </CModalBody>
        <CModalFooter>
            <CButton color="primary" @click="() => { store.visibleLive = false }">
                Cerrar
            </CButton>
        </CModalFooter>
    </CModal>
</template>