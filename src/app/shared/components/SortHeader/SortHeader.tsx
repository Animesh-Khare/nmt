import React from 'react'

interface PropsType {
    column: string
    sortColumn: string
    isAscending: boolean
}

const SortHeader: React.FC<PropsType> = ({ sortColumn, isAscending, column }) => {
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="17" viewBox="0 0 10 17" fill="none">
                {column !== sortColumn ? (
                    <>
                        <path d="M5 0L9.33013 7.5H0.669873L5 0Z" fill="#E0E3EB" />
                        <path d="M5 17L0.669872 9.5H9.33013L5 17Z" fill="#E0E3EB" />
                    </>
                ) : (
                    <>
                        <path d="M5 0L9.33013 7.5H0.669873L5 0Z" fill={!isAscending ? '#003461' : '#E0E3EB'} />
                        <path d="M5 17L0.669872 9.5H9.33013L5 17Z" fill={isAscending ? '#003461' : '#E0E3EB'} />
                    </>
                )}
            </svg>
        </>
    )
}

export default SortHeader