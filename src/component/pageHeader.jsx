import React from 'react'
import './pageHeader.css'

export default props => (
    <div className="pageHeader" style={{ borderBottomColor: props.color ? props.color : ''}}>
        <h1 className="pageTitle">{props.title}</h1>
    </div>
)
