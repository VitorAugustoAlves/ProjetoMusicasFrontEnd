const urlBackend = "https://projeto-musicas-beta.vercel.app"
const listaMusicas = document.getElementById("listaMusicas")


async function buscarMusicas(){
    const resposta = await fetch(urlBackend)
    const musicas = await resposta.json()
    musicas.forEach((musica) => {
        listaMusicas.innerHTML += `
            <article class="musica">
                <h2>${musica.titulo}</h2>
                <p class="artista">${musica.artista}</p>
                <p class="detalhes">${musica.genero} | ${musica.ano} | ${musica.duracao} min</p>
                <div class="acoes">
                    <a class="editar" href="editar.html?id=${musica.id}">Editar</a>
                    <button class="apagar" onclick="apagarMusica(${musica.id})">Apagar</button>
                </div>
            </article>
        `
    })
}

buscarMusicas()

async function apagarMusica(id) {
    const confirmou = confirm("Tem certeza que quer apagar essa música?")

    if (!confirmou) {
        return
    }
    
    const resposta = await fetch(`${urlBackend}/apagar/${id}`, {
        method: "DELETE"
    })

    const respostaTransformada = await resposta.json()
    alert(respostaTransformada.mensagem)
    
    window.location.reload()
}


//codigo feito extra apenas para estética


//modo claro e escuro
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

//pesquisa de musicas
function pesquisarMusicas() {
    const textoPesquisa = document.getElementById("pesquisa").value.toLowerCase()

    const musicas = document.querySelectorAll(".musica")

    musicas.forEach((musica) => {
        const informacoesMusica = musica.textContent.toLowerCase()

        if(informacoesMusica.includes(textoPesquisa)){
            musica.style.display = "block"
        } else {
            musica.style.display = "none"
        }
    })
}