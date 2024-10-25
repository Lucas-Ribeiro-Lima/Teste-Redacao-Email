const form = document.querySelector('.email')


form.addEventListener("submit", (e) => {
  e.preventDefault()

  const cancelar = form.querySelector("#cancelar")
  const enviar = form.querySelector("#enviar")
  const limpar = form.querySelector("#limpar")

  
  let destinario = form.querySelector("#paraInput").value
  let copia = form.querySelector("#ccInput").value
  let assunto = form.querySelector("#assuntoInput").value
  let anexo = form.querySelector("#anexoEmail").files[0]
  let mensagem = document.querySelector("#mensagem").value
  
  console.log(destinario)
  
  const formData = new FormData()
  formData.append('destinatario', destinario)
  formData.append('copia', copia)
  formData.append('assunto', assunto)
  formData.append('anexo', anexo)
  formData.append('mensagem', mensagem)
  
  limpar.addEventListener("click", (e) => {
    e.preventDefault()
    destinario.value = ""
    copia.value = ""
    assunto.value = ""
    anexo.value = null
    mensagem = ""
  })

  enviar.addEventListener("click", (e) => {
    e.preventDefault()
    fetch("/backend", {
      method: "POST",
      body: formData,
    }).then(response => {
      if(response.status === 200) alert("Teste enviado com sucesso! ⭐") 
      else {
        alert("⚠️ Erro ao enviar teste ⚠️")
      }
    })
  })
    
})