import React, { useState } from 'react'
import './menuClicável.module.css'

type TProps = { children: string[], valueOnClick: (item: string) => void }

const MenuClicavel = ({ children, valueOnClick }: TProps) => {
    const [idOnClick, setIdOnClick] = useState<number>(10000)
    const [style, setStyle] = useState<Array<string>>(['#d0944b', 'white'])
    
    const handleOnClick = (item: string, id?: number | undefined) => { 
        valueOnClick(item)
        
        if (id !== undefined) { setIdOnClick(id); setStyle([]) }
        else { setStyle(['#d0944b', 'white']); setIdOnClick(10000) }
    }

    return (
        <ul>
            <li onClick={() => handleOnClick('Todas')} style={{ background: style[0], color: style[1] }}>
                Todas
            </li>
            {children.map((item, id) =>
                <li
                    key={id}
                    onClick={() => handleOnClick(item, id)}
                    style={{ background: idOnClick === id ? '#d0944b' : '', color: idOnClick === id ? 'white' : '' }}
                >
                    {item}
                </li>
            )}
        </ul>
    )
}

export default MenuClicavel