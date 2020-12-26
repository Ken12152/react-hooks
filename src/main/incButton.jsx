import React from 'react'

const IncButton = props => {
    console.log('render...')
    return(
        <button onClick={ () => props.inc(props.value) }>incfuncbutton</button>
    )
}

export default React.memo(IncButton)