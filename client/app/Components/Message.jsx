import React from 'react'

const Message = (props) => {
    return (
        <>
        {   props.isGroupChat && props.role !== "receiver" &&
            <p className='text-xs font-semibold text-primary self-start px-3'>{props.sender}</p>
        }
            <p className={`px-3 h-auto break-words`}>
                {props.message}
            </p>
            <p className={`${(props.role === "receiver") ? 'self-end mr-1 text-gray-200' : 'self-start ml-1 text-primary'} text-xs px-2`}>{props.time}</p>
        </>
    )
}

export default Message
