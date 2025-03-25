import styles from './cargos.module.css';
import icon from '../../components/iconos/iconos';

function Cargo() {
    return (
        <div className={styles.cargoContainer}> 
            {/* // Tablas */}
            <div className={styles.tableSection}>
                
                 {/* Contenedor para filtros y acciones */}
                <div className={styles.filtersContainer}>

                    <button className={styles.create} title='Registrar'>
                        <img src={icon.crear} alt="Crear"  className={styles.icon}/>
                        Registrar
                    </button>

                    <button className={styles.export} title='Exportar PDF'>
                        <img src={icon.pdf} alt="Export" className={styles.icon} />
                        PDF
                    </button>

                    <h2>Cargos</h2>

                    <div className={styles.searchContainer}>
                        <input
                            type="search"
                            className={styles.search}
                            placeholder="Buscar inspector..."
                            title="Buscar inspector"
                        />
                        <img src={icon.lupa} alt="Buscar" className={styles.iconlupa} />
                    </div>
                </div>

                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Cargo</th>
                            <th>descripción</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Inspector</td>
                            <td>Inspector De Programas INSAI</td>
                            <td>
                                <div className={styles.iconContainer}>
                                    <img src={icon.ver} alt="Ver Más" className={styles.iconver} title='Ver Más'/>
                                    <img src={icon.editar} alt="Editar" className={styles.iconeditar} title='Editar'/>
                                    <img src={icon.pdf2} alt="Exportar" className={styles.iconpdf} title='Exportar'/>
                                    <img src={icon.eliminar} alt="Eliminar" className={styles.iconeliminar} title='Eliminar'/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Gerente De Oficina</td>
                            <td>Encargado De Programas</td>
                            <td>
                                <div className={styles.iconContainer}>
                                    <img src={icon.ver} alt="Ver Más" className={styles.iconver}  title='Ver Más'/>
                                    <img src={icon.editar} alt="Editar" className={styles.iconeditar}  title='Editar'/>
                                    <img src={icon.pdf2} alt="Exportar" className={styles.iconpdf}  title='Exportar'/>
                                    <img src={icon.eliminar} alt="Eliminar" className={styles.iconeliminar}  title='Eliminar'/>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Cargo;