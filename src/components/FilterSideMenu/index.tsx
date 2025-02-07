import React, { MouseEventHandler } from "react"
import styles from './filterSideMenu.module.css'

interface FilterSideMenuProps { 
    visible: boolean; children: React.ReactNode, backOnClick: MouseEventHandler<HTMLButtonElement>, applyFilters: MouseEventHandler<HTMLButtonElement> 
}

const FilterSideMenu: React.FC<FilterSideMenuProps> = ({ visible, children, backOnClick, applyFilters }) => (
    <section className={`${styles.filters}`} style={{ display: visible ? 'flex' : 'none' }}>
        <h2>
            Filtros Avançados
        </h2>
        { children }
        <div>
            <button onClick={ backOnClick }>
                Voltar
            </button>
            <button className={styles.apply} onClick={ applyFilters }>
                Aplicar Filtros
            </button>
        </div>
    </section>
)

export default FilterSideMenu