import { useNavigate } from 'react-router-dom'
import './loading.css'

export default function Loading({path}) {
    const navigate = useNavigate();
    return (<>
        <div className="spinner-container-submit">
            <div className="spinner"></div>
            <div className='loading-description '>
                <h4>
                    Fun fact while waiting:  
                </h4>
                <p>
                Did you know that Albert Einstein liked to play belotte ?
                </p>
                <button className='btn btn-outline-dark' onClick={()=> navigate(path)}>Skip

                </button>
            </div>
        </div>
        
        </>
    )
}
