import React from 'react'
import Spinner from 'react-spinner-material';

export const Loading =()=>{
    return(
        <div>
            <Spinner radius={50} color={"blue"} stroke={4} visible={true} />
        </div>
    )
}