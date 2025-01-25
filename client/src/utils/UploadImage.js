import Axios from './Axios'
import SummaryAPI from '../common/SummaryAPI'
import AxiosToastError from './AxiosToastError'

const uploadImage = async(image) =>{
    try {
        const fromData = new FormData;
        fromData.append('image',image);

        const response = await  Axios({
            ...SummaryAPI.uploadImage,
            data: fromData
        })

        return response;
    } catch (error) {
        AxiosToastError(error)
    }
}

export default uploadImage;