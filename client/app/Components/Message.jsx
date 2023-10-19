import React from 'react'

const Message = (props) => {
    return (
        <>
            <p className={`px-3 h-auto break-words self-end`}>
                {props.message}
            </p>
            <p className={`${(props.role === "receiver") ? 'self-end mr-1 text-gray-200' : 'self-start ml-1 text-primary'} text-xs px-2`}>{props.time}</p>
        </>
    )
}

export default Message
