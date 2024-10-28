const form = document.querySelector('.email')

const quill = new Quill('#editor-container', {
  theme: 'snow',
  modules: {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      ['image'],
      [{ list: 'ordered' }, { list: 'bullet' }]
    ]
  }
});

quill.root.innerHTML = `Prezado, bom dia!<br/><br/>E-mail<br/><br/> Atenciosamente, seu nome`

form.addEventListener("submit", async (e) => {
  e.preventDefault()
  const spinner = form.querySelector("#spinner")

  let destinario = form.querySelector("#paraInput").value
  let copia = form.querySelector("#ccInput").value
  let assunto = form.querySelector("#assuntoInput").value
  let anexo = form.querySelector("#anexoEmail").files[0]

  const formData = new FormData()
  formData.append('destinatario', destinario)
  formData.append('copia', copia)
  formData.append('assunto', assunto)
  formData.append('anexo', anexo)
  formData.append('mensagem', quill.root.innerHTML)
  spinner.style.display = "flex"

  try {
    const response = await fetch("/api/send/email", {
      method: "POST",
      body: formData,
    })
    await new Promise(resolve => setTimeout(resolve, 5000))
    if(response.status === 200) alert("Email enviado")
    else alert("Erro ao processar teste")
  } 
  catch (error) {
    alert("Erro ao enviar teste")
  } 
  finally {
    spinner.style.display = "none"
  }
})  
