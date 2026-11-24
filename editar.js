const urlBackend = "https://projeto-musicas-beta.vercel.app"

const parametros = new URLSearchParams(window.location.search)
const id = parametros.get("id")

const inputTitulo = document.getElementById("titulo")
const inputArtista = document.getElementById("artista")
const inputGenero = document.getElementById("genero")
const inputAno = document.getElementById("ano")
const inputDuracao = document.getElementById("duracao")

const botaoSalvar = document.getElementById("botaoSalvar")

async function buscarMusica(){
    const resposta = await fetch(`${urlBackend}/musica/${id}`)
    const musica = await resposta.json()
    inputTitulo.value = musica.titulo
    inputArtista.value = musica.artista
    inputGenero.value = musica.genero
    inputAno.value = musica.ano
    inputDuracao.value = musica.duracao
}

buscarMusica()

botaoSalvar.addEventListener("click", salvarAlteracoes)

async function salvarAlteracoes(){
    if (
        inputTitulo.value === "" ||
        inputArtista.value === "" ||
        inputGenero.value === "" ||
        inputAno.value === "" ||
        inputDuracao.value === ""
    ) {
        alert("Preencha todos os campos!")
        return
    }

    const musica = {
        titulo: inputTitulo.value,
        artista: inputArtista.value,
        genero: inputGenero.value,
        ano: inputAno.valueAsNumber,
        duracao: inputDuracao.valueAsNumber
    }

    const resposta = await fetch(`${urlBackend}/editar/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(musica)
    })

    const respostaTransformada = await resposta.json()

    alert(respostaTransformada.mensagem)

    window.location.href = "index.html"
}

const botaoTema = document.getElementById("botaoTema")
const temaSalvo = localStorage.getItem("tema")

if (temaSalvo === "escuro") {
    document.body.classList.add("tema-escuro")
}

atualizarBotaoTema()

botaoTema.addEventListener("click", alternarTema)

function alternarTema() {
    document.body.classList.toggle("tema-escuro")

    if (document.body.classList.contains("tema-escuro")) {
        localStorage.setItem("tema", "escuro")
    } else {
        localStorage.setItem("tema", "claro")
    }

    atualizarBotaoTema()
}

function atualizarBotaoTema() {
    const modoEscuroAtivo = document.body.classList.contains("tema-escuro")

    botaoTema.setAttribute("aria-pressed", modoEscuroAtivo)
    botaoTema.setAttribute(
        "aria-label",
        modoEscuroAtivo ? "Ativar modo claro" : "Ativar modo escuro"
    )
}
