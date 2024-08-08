let listaNumerosEscolhidos = [];
let numeroSecreto;
let numeroMaximo;
let tentativas = 1;

function exibirTextos(tag, texto)
{
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", {rate:1.2});
}

function verificarChute()
{
    let chute = document.querySelector("input").value;
    let palavraTentativa = tentativas == 1 ? "tentativa" : "tentativas";
    if(chute == numeroSecreto)
        {
            exibirTextos("h1", "Parabéns! Você acertou em " + tentativas + " " + palavraTentativa + ".");
            exibirTextos("p", "Clique em novo jogo para gerar um novo número.");
            document.getElementById("reiniciar").removeAttribute("disabled");
        }
        else if(chute > numeroSecreto)
        {
            tentativas++;
            exibirTextos("h1", "Tente novamente");
            exibirTextos("p", "Escolha um número menor que " + chute);
            limparCampo();
        }else
        {
            tentativas++;
            exibirTextos("h1", "Tente novamente");
            exibirTextos("p", "Escolha um número maior entre " + chute + " a " + numeroMaximo);
            limparCampo();
        }
    
}

function novoJogo()
{
    numeroMaximo = prompt("Digite o número máximo para determinar a dificuldade do jogo");
    console.log("Numero maximo: " + numeroMaximo);
    
    if(numeroMaximo <= listaNumerosEscolhidos.length)
    {
        alert("Número não disponível, escolha outro.")
        return novoJogo();
    }
    else
    {
        numeroSecreto = gerarNumeroAleat(numeroMaximo);
        console.log("Numero secreto: " + numeroSecreto);
        exibirTextos("h1", "O Número Secreto");
        exibirTextos("p", "Escolha um número entre 1 a " + numeroMaximo);
        document.getElementById("reiniciar").setAttribute("disabled", true);
        limparCampo();
        tentativas = 1;
    }
}

function gerarNumeroAleat(maximo)
{
    let numeroEscolhido = parseInt(Math.random() * maximo + 1);
    if(listaNumerosEscolhidos.includes(numeroEscolhido))
    {
        return gerarNumeroAleat();
    }
    else
    {
        listaNumerosEscolhidos.push(numeroEscolhido);
        console.log(listaNumerosEscolhidos);
        return numeroEscolhido;
    }
   
}

function limparCampo()
{
    chute = document.querySelector('input');
    chute.value = '';
}

if(numeroMaximo == null){
    exibirTextos("h1", "O Número Secreto");
    exibirTextos("p", "Clique em Novo Jogo para começar");
}

//teste git