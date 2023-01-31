
let height = 0
let width = 0
let lives = 1
let time = 30
let points = 0
let timeMosquito = 1200

let sound = new Audio("../controller/slap.mp3")
sound.preload ='auto'

// Lógica da Dificuldade
let dificulty = window.location.search
dificulty = dificulty.replace('?', '')

if(dificulty === 'easy'){
	timeMosquito = 1750
} else if (dificulty === 'normal'){
	timeMosquito = 1250
} else if (dificulty === 'hard'){
	timeMosquito = 1000
} else if (dificulty === 'impossible'){
	timeMosquito = 750
} else{
	time = 1
}
// Recebe os tamanhos da janela
const ajustaTela = () => {
	height = window.innerHeight
	width = window.innerWidth

}

// Executa toda vez que a tela é ajustada
ajustaTela()

// Som do slap

const mouseSound = ()=>{
	sound.volume = 0.5
	sound.play()
}

window.addEventListener("click", mouseSound, false)
// Função para o tempo restante 

const timeLeft = setInterval(() =>{
	// se a dificuldade for sobrevivência, o tempo será acrescentado.
	if(dificulty === 'survival'){
		if (time % 10 === 0 & timeMosquito >= 1000){
			timeMosquito -= 500
		}
		document.getElementById('timeLeft').innerHTML = time
		time++
		console.log(timeMosquito)
	} else{
		time--
		
		if(time <= 0){
			clearInterval(timeLeft)
			clearInterval(criaMosquito)
			// Altera para a tela de vitória caso o jogador consiga chegar em 0
			window.location.href = 'victory.html'
		}

		document.getElementById('timeLeft').innerHTML = time
	}
},1000)

const randomPos = () => {
	
	// Remove o antigo mosquito caso exista e reduz os pontos de vida caso haja mosquito na tela quando ela for executada novamente
	if(document.getElementById('mosquito')){
		document.getElementById('mosquito').remove()

		// gameover se perder todas as vidas , incrementa coração vazio a cada vez que a condição é executada
		if(lives > 3) {
			window.location.href = 'gameover.html'
		}else {
			document.getElementById('v' + lives).src = "../imagens/coracao_vazio.png"

			lives++
		}
	}

	// Posiciona o mosquito
	let posX = Math.floor(Math.random() * width) - 150
	let posY = Math.floor(Math.random() * height) - 150

	// Tratamento de erros. Caso a posição seja menor do que 0, será colocado em 0 para evitar que o mosquito saia da tela
	posX = posX < 0 ? 0 : posX
	posY = posY < 0 ? 0 : posY

	// Controle de criação do mosquito e suas caracteristicas
	let mosquito = document.createElement('img')
	mosquito.src = '../imagens/mosquito.png'
	mosquito.className = randomSize() + ' ' + randomLook()
	mosquito.style.left = posX + 'px'
	mosquito.style.top = posY + 'px'
	mosquito.style.position = 'absolute'
	mosquito.id = 'mosquito'
	// mosquito.onclick = function () {
	// 	this.remove()
	// 	points += 10
	// 	document.getElementById('hasPoints').innerHTML = points
	// 	sound.play() 
	// }
	mosquito.addEventListener("click", function(){
		this.remove()
		points += 10
		document.getElementById('hasPoints').innerHTML = points
		console.log(sound)
	})
		
	document.body.appendChild(mosquito)
}

// define tamanho randomico do mosquito
const randomSize = () =>{
	let typeMosquito = Math.floor(Math.random() * 3)

	switch(typeMosquito) {
		case 0:
			return 'mosquito1'

		case 1:
			return 'mosquito2'

		case 2:
			return 'mosquito3'
	}
}
// define lado randomico do mosquito
const randomLook = () =>{
	let typeMosquito = Math.floor(Math.random() * 2)

	switch(typeMosquito) {
		case 0:
			return 'ladoA'

		case 1:
			return 'ladoB'

	}
}
