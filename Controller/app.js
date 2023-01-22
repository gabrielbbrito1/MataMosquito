
let height = 0
let width = 0
let lives = 1

// Recebe os tamanhos da janela
const ajustaTela = () => {
	height = window.innerHeight
	width = window.innerWidth

}

ajustaTela()

// Função para posicionar randomicamente na tela
const randomPos = () => {
	
	// Remove o antigo mosquito caso exista e reduz os pontos de vida
	if(document.getElementById('mosquito')){
		document.getElementById('mosquito').remove()
		// gameover se perder todas as vidas
		if(lives > 3) {
			window.location.href = 'gameover.html'
		}else {
			document.getElementById('v' + lives).src = "../imagens/coracao_vazio.png"

			lives++
		}
	}

	// Posiciona o mosquito
	let posX = Math.floor(Math.random() * width) - 90
	let posY = Math.floor(Math.random() * height) - 90

	// Caso a posição seja menor do que 0, será colocado em 0 para evitar que o mosquito saia da tela
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
	mosquito.onclick = function () {
		this.remove() 
	}
		
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