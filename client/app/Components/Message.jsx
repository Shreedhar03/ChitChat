import React from 'react'

const Message = (props) => {
    return (
        <div className={`w-48 flex flex-col gap-1 ${!(props.role==="sender") && 'self-end my-2'}`}>
            <div className={`${!(props.role==="sender") ? 'bg-primary text-gray-200' : ' bg-slate-200'} p-3 rounded-2xl`}>{props.message}</div>
            <p className={`${!(props.role==="sender") ? 'self-end mr-1' : 'self-start ml-1'} text-sm`}>{props.time}</p>
        </div>
    )
}

export default Message
