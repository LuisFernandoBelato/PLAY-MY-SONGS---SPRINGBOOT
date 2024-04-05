function VerificaCampoMusica() {
    var nomeMusica = document.getElementById("musicaCad").value;
    var nomeMusicaErro = document.getElementById("musicaErro");
    var regex = /^[a-zA-Z0-9\s_]+$/;

    if (!regex.test(nomeMusica)) {
        nomeMusicaErro.style.color = "red";
        nomeMusicaErro.textContent = "O nome da música só pode conter letras, underscores e espaços.";
        return false;
    } else {
        nomeMusicaErro.textContent = "";
        return true;
    }

}

function VerificaCampoCantor() {
    var nomeCantor = document.getElementById("cantorCad").value;
    var nomeCantorErro = document.getElementById("cantorErro");
    var regex = /^[a-zA-Z0-9\s_]+$/;

    if (!regex.test(nomeCantor)) {
        nomeCantorErro.style.color = "red";
        nomeCantorErro.textContent = "O nome do cantor só pode conter letras, underscores e espaços.";
        return false;
    } else {
        nomeCantorErro.textContent = "";
        return true;
    }
}


function LimpaCampoMusica(){
    var m = document.getElementById("musicaErro");
    m.textContent = "";
}

function LimpaCampoCantor(){
    var n = document.getElementById("cantorErro");
    n.textContent = "";
}

function AtualizaBotao() {
    var botao = document.getElementById("b");
    var semErros = VerificaCampoMusica() && VerificaCampoCantor();

    if (semErros) {
        botao.style.display = "inline-block";
    } else {
        botao.style.display = "none";
    }
}




//--------------------------------------------------------------------------------

/*
function carregaFilmes() {
    const tbody = document.getElementById("tbodyMusicas");
    const buscaNome = document.querySelector('input[name="buscaNome"]').value;
    console.log(buscaNome);
    const URL = "http://localhost:8080/apis/audio/search/" + buscaNome;

    fetch(URL)
        .then(resp => resp.json())
        .then(json => {
            let html = "";
            json.forEach(item => {
                console.log(item);
                html += 
                    <tr>
                        <td>${item}</td>
                        <td><audio controls><source src="${item}" type="audio/mpeg"></audio></td>
                    </tr>
                ;
            });
            tbody.innerHTML = html;
        })
        .catch(error => {
            console.error('Erro ao carregar músicas:', error);
            tbody.innerHTML = <tr><td colspan="2">Erro ao carregar músicas</td></tr>;
        });
}*/


function carregaMusicas()
{   
    const DIV=document.getElementById("musicas_da_pesquisa");
    const Pesquisa = document.getElementById('musicaBusca').value;
    const URL="http://localhost:8080/apis/Pesquisa/" + Pesquisa;
    fetch(URL).then(resp => resp.json().then(json => {
            let html = "";
            let NomeArq; let Musica; let Cantor; let Estilo; 
            for (let item of json)
            {
                Musica = "";
                Cantor = "";
                Estilo = "";
                NomeArq = item;
                NomeArq = NomeArq.substring(NomeArq.indexOf("musicas")+8, NomeArq.indexOf("."));
                Musica = NomeArq.substring(0,NomeArq.indexOf("_")); NomeArq = NomeArq.substring(NomeArq.indexOf("_")+1);
                Estilo = NomeArq.substring(0,NomeArq.indexOf("_")); NomeArq = NomeArq.substring(NomeArq.indexOf("_")+1);
                Cantor = NomeArq;

                html += `<div class="playlist" style="display: flex; flex-direction: column; align-items: center; text-align-last: center; margin-top: 50px; padding: 20px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); margin-left: 27%; margin-right: 27%">
                            <div style="margin-top: 10px; margin-bottom: 10px">
                            <h5>Nome - ${Musica}</h5><h5>Autor - ${Cantor}</h5><h5>Estilo - ${Estilo}</h5> <br>
                            <audio controls>
                                <source src="${item}" type="audio/mpeg">
                            </audio>
                            </div>
                        </div>`;
            }
            DIV.innerHTML = html;
        })
    )
    .catch(Err=>{
        console.log('ERRO')
        tag.innerText="Erro"+Err;
    })
}







function cadastrarMusica() {
    //console.log("estrouuuuuuuuuuuuuuuuuu")
    const URL = "http://localhost:8080/apis/add-musica-audio";
    var formulariodados = document.getElementById("FormularioDados");
    //console.log("PASSOU AQUI")
    fetch(URL, {
        method: 'POST', body: new FormData(formulariodados)
    })
        .then(resp=> {
            console.log(resp.text);
            formulariodados.reset();
            return resp.text();
        })
        .then(text=> {
            console.log("deu certo")
        }).catch(error=> {
            console.error(error);
        });

}


