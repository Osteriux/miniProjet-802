import React from 'react'
import { fetchTrajetPrediction } from '../lib'

export function TrajetPrediction(){

    const [time, setTime] = React.useState(null)

    React.useEffect(() => {
        fetchTrajetPrediction(463, 80, 1800, 100)
        .then(resp => {
            console.log(resp);
            setTime(resp["time-pred"]);
        })
        .catch(err => 
            console.log(err)
        )
    })

    return (<div className='vehicle-detail-info-container'>
        <h3>Prediction</h3>
        {!!time && <span className='vehicle-detail-info-item'><p>Durée du trajet : </p><p className='vehicle-detail-info-value'>{Math.floor(time / 3600)}h{Math.floor((time % 3600) / 60)}</p></span>}
    </div>)
}