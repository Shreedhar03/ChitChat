import React from 'react'

const Message = (props) => {
    return (
        <>
            <p className={`${(props.role === "receiver") ? 'bg-primary text-gray-200' : ' bg-slate-200'} p-3 rounded-2xl h-auto break-words`}>
                {props.message}
            </p>
            <p className={`${(props.role === "receiver") ? 'self-end mr-1' : 'self-start ml-1'} text-sm text-primary`}>{props.time}</p>
        </>
    )
}

export default Message
