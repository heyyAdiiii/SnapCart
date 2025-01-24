import SummaryAPI from '../common/summaryApi';
import Axios from './Axios'

const fetchUserDetails = async () =>{
    try {
        const response = await Axios({
            ...SummaryAPI.userDetails
        })
        return response
    } catch (error) {
        console.log(error);
    }
}

export default fetchUserDetails