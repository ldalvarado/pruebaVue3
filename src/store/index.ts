/* configuro el store */

import {
    useRepositorieStore 
} from './module/main'

const useStore = () => ({
    main: useRepositorieStore()
})

export default useStore