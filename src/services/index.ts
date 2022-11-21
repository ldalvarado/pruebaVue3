/* configuracion del servicio de axios, aqui podria usar un env para llamar la api central o podria configurar los intercerptos */
import axios from 'axios'

const service = axios.create({
    baseURL: `https://api.github.com`,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    }
})
/* exporto el servicio */
export default service