import axios from "axios";
import Swal from 'sweetalert2';
import { actualizarAvance } from '../funciones/avance';

const tareas = document.querySelector('.listado-pendientes');

if (tareas) {

    tareas.addEventListener('click', e => {
        if (e.target.classList.contains('fa-check-circle')) {
            const icono = e.target;
            const idTarea = icono.parentElement.parentElement.dataset.tarea;

            // Request hacia /tareas:id
            const url = `${location.origin}/tareas/${idTarea}`;

            axios.patch(url, { idTarea }).then(function(res) {
                console.log(res);
                if (res.status === 200) {
                    icono.classList.toggle('completo');

                    actualizarAvance();
                }
            });
        }

        if (e.target.classList.contains('fa-trash')) {
            const tareaHTML = e.target.parentElement.parentElement,
                idTarea = tareaHTML.dataset.tarea;

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
                    // Enviar el delete por medio de axios
                    const url = `${location.origin}/tareas/${idTarea}`;
                    axios.delete(url, { params: { idTarea } }).then(function(res) {
                        if (res.status === 200) {
                            // Eliminar el nodo
                            tareaHTML.parentElement.removeChild(tareaHTML);

                            //Opcion de alerta success
                            Swal.fire(
                                '¡Tarea Eliminada!',
                                res.data,
                                'success'
                            )

                            actualizarAvance();
                        }
                    });
                }
            })
        }
    });
}

export default tareas;