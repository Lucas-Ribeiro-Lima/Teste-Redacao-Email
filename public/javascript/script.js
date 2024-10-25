const form = document.querySelector('.email')

const limpar = form.querySelector("#limpar")
const cancelar = form.querySelector("#cancelar")
const enviar = form.querySelector("#enviar")

limpar.addEventListener("click", () => {
  form.querySelector("#paraInput").value = "";
  form.querySelector("#ccInput").value = "";
  form.querySelector("#assuntoInput").value = "";
  form.querySelector("#anexoEmail").value = ""; 
  document.querySelector("#mensagem").value = ""; 
});

form.addEventListener("submit", (e) => {
  e.preventDefault()

  let destinario = form.querySelector("#paraInput").value
  let copia = form.querySelector("#ccInput").value
  let assunto = form.querySelector("#assuntoInput").value
  let anexo = form.querySelector("#anexoEmail").files[0]
  let mensagem = document.querySelector("#mensagem").value

  const formData = new FormData()
  formData.append('destinatario', destinario)
  formData.append('copia', copia)
  formData.append('assunto', assunto)
  formData.append('anexo', anexo)
  formData.append('mensagem', mensagem)
    
  enviar.addEventListener("click", async (e) => {
    e.preventDefault()
    const spinner = form.querySelector("#spinner")
    spinner.style.display = "flex"

    try {
      const response = await sendForm(formData)
      if(response.status === 200) alert("Teste enviado com sucesso! ⭐") 
      else alert("Erro ao processar teste ⚠️")
    } catch (error) {
      alert("⚠️ Erro ao enviar teste ⚠️")
    } finally {
      spinner.style.display = "none"
    }
  })  

  async function sendForm(formData) {
    return await fetch("/api/redacao/email", {
      method: "POST",
      body: formData,
    })
  }
})