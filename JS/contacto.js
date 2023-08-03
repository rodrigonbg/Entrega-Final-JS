function activarBtnEnviar(){
    let form = document.querySelector('.main__contactContainer__fields')
    form.addEventListener('submit', (e)=>{/* evento al enviar el formulario */
        e.preventDefault()
        Swal.fire({
            icon: 'success',
            title: 'ENVIADO',
            text:'Nos comunicaremos a la brevedad.',   
            confirmButtonText: 'OK',
            showDenyButton: false, 
            customClass: {
                confirmButton:"btnConfirm",
            }
        }).then(()=>{/* Vacío los campos */
                document.getElementById('nombre').value = ''
                document.getElementById('email').value = ''
                document.getElementById('tel').value = ''
                document.getElementById('asunto').value = ''
                document.getElementById('text').value = ''
        })
    })
}

/* EJECUCIONES */
activarBtnEnviar()