import Swal from 'sweetalert2';
import axios from 'axios';

const btnEliminar = document.getElementById('eliminar-proyecto');

if (btnEliminar) {
    btnEliminar.addEventListener('click', (e) => {
        const urlProyecto = e.target.dataset.proyectoUrl;
        //console.log(urlProyecto);

        Swal.fire({
            title: '¿Estas seguro?',
            text: 'Esto no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borralo'
        }).then((result) => {
            if (result.value) {

                // Enviar petición a axios 
                const url = `${location.origin}/proyectos/${urlProyecto}`;
                //console.log(url);

                axios.delete(url, { params: { urlProyecto } }).then(function(res) {
                    console.log(res);

                    Swal.fire(
                        '¡Proyecto eliminado!',
                        res.data,
                        'success'
                    );

                    // Redireccionar
                    setTimeout(() => {
                        window.location.href = '/';
                    }, 2300);
                }).catch((e) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Hubo un error',
                        text: 'No se pudo eliminar el proyecto'
                    })
                })
            }
        })
    });
}

export default btnEliminar;