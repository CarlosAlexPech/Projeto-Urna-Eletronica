let seuVotoPara = document.querySelector('.left1 span');
let cargo = document.querySelector('.left2 span');
let descricao = document.querySelector('.left4');
let aviso = document.querySelector('.divisao2');
let lateral =  document.querySelector('.right');
let numeros =  document.querySelector('.left3');

let etapaAtual = 0;
let numero = '';
let votobranco = true;
let votos = [];

function comecarEtapa(){
    let etapa = etapas[etapaAtual];
    let numeroHTML = '';
    numero = '';
    votobranco = false;

    for(let i = 0; i < etapa.numeros; i++){
        if(i === 0){
            numeroHTML += '<div class="numero pisca"></div>';
        }else{
            numeroHTML += '<div class="numero"></div>';
        }
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHTML;
}
function atualizaInterface(){
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=>{
        if(item.numero === numero){
            return true;
        }else{
            return false;
        }
    });
    if(candidato.length > 0){
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome:${candidato.name} <br> Partido: ${candidato.partido}`

        let fotosHTML = '';
        for(let i in candidato.fotos){
            if(candidato.fotos[i].small){
                fotosHTML += `<div class="right1 small">
                <img src="imagens/${candidato.fotos[i].url}" alt="">
                ${candidato.fotos[i].legenda}
                </div>`
            }else{
                fotosHTML += `<div class="right1">
                <img src="imagens/${candidato.fotos[i].url}" alt="">
                ${candidato.fotos[i].legenda}
                </div>`
            }
        }
        lateral.innerHTML = fotosHTML;
    }else{
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso--Grande pisca">VOTO NULO</div>';
    }
}

function clicou(n){
    let Elnumero = document.querySelector('.numero.pisca');
    if(Elnumero !== null){
        Elnumero.innerHTML = n;
        numero = `${numero}${n}`

        Elnumero.classList.remove('pisca')
        if(Elnumero.nextElementSibling !== null){
            Elnumero.nextElementSibling.classList.add('pisca')
        }else{
            atualizaInterface();
        }
    }
}
function branco(){
    if(numero === ''){
        votobranco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        descricao.innerHTML = '<div class="aviso--Grande pisca">VOTO EM BRANCO</div>';
        lateral.innerHTML = '';
    }else{
        alert('Para Voltar em Branco as casas deveram estar vazias')
    }
}
function corrige(){
    comecarEtapa();
}
function confirmar(){
    let etapa = etapas[etapaAtual];
    let votoConfirmado = false;

    if(votobranco === true){
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'BRANCO'
        });
    }else if(numero.length === etapa.numeros){
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        });
    }

    if(votoConfirmado){
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined){
            comecarEtapa();
        }else{
            document.querySelector('.tela').innerHTML = `<div class="aviso--Gigante pisca">FIM</div>`
            console.log(votos)
        }
    }
}
comecarEtapa();