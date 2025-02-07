import React, { useState, useEffect } from 'react'
import './paginacaoAplicativosStyle.module.css'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

interface Props {
    arrayLength: number;
    currentPage?: any
}

const PaginacaoAplicativos = ({ arrayLength, currentPage }: Props) => {
    const [pages, setPages] = useState<any>([])
    const [actualPage, setActualPage] = useState(0)

    useEffect(() => {
        setActualPage(0)

        const paginationSize = () => {
            const newPages = []
            
            for (let i = 1; i <= arrayLength; i++) newPages.push(i)

            setPages(newPages)
        }

        paginationSize()
    }, [arrayLength])

    currentPage(actualPage)

    return (
        <section>
            {pages.length > 0 && 
                <>
                    <button onClick={() => { actualPage >= 1 && setActualPage((prevPages: any) => prevPages - 1) }}>
                        <IoIosArrowBack />
                    </button>
                    {pages[actualPage]} de {pages.length}
                    <button onClick={() => { actualPage <= (pages.length - 2) && setActualPage((prevPages: any) => prevPages + 1) }}>
                        <IoIosArrowForward />
                    </button>
                </>
            }
        </section>
    )
}

export default PaginacaoAplicativos