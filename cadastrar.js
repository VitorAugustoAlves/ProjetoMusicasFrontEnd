const urlBackend = "https://projeto-musicas-beta.vercel.app"

const inputTitulo = document.getElementById("titulo")
const inputArtista = document.getElementById("artista")
const inputGenero = document.getElementById("genero")
const inputAno = document.getElementById("ano")
const inputDuracao = document.getElementById("duracao")

const botaoCadastrar = document.getElementById("botaoCadastrar")

botaoCadastrar.addEventListener("click", cadastrarMusica)

async function cadastrarMusica() {
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

    const resposta = await fetch(`${urlBackend}/cadastrar`, {
        method: "POST",
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
