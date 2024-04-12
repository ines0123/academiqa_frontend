import './loading.css'

export default function Loading() {
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
                <button className='btn btn-outline-dark' onClick={()=>window.location.pathname='/calendar'}>Skip

                </button>
            </div>
        </div>
        
        </>
    )
}
