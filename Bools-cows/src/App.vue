<template lang="pug">
div.container
	h1 Быки и коровы
	.level(v-if="start == false")
		button.btn.down(@click="changeLevel('down')") Убавить
		span 
			b Количество цифр: 
			|{{ level }}
		button.btn.up(@click="changeLevel('up')") Увеличить
	button.start(v-if="start == false" @click="startGame") Нажмите старт, чтобы начать
	.content(v-else)
		.numbers
			.number(v-for="count, idx in level" :key="count" :class="checkArray[idx]")
		input.enter(type="number" max="5" placeholder="Например: 1564" v-model="enterNumber")
		span.valid(v-if="isValid == false") Количество символов должно быть : {{ level }}
		button(@click="checkNumber") Проверить
		.rezult 
			.action(v-for="action in actions" :key="action")
				span Был ввод: {{ action.enter }}
				br
				span Быки: {{ action.bull }} - Коровы: {{ action.cows }}
</template>

<script>

export default {
	data(){
		return {
			level: 4,
			start: false,
			random: 0,
			secretNumber: [],
			enterNumber: '',
			checkArray: [],
			cows: 0,
			bull: 0,
			actions: [],
			isValid: true,
		}
	},
	methods: {
		setSecretNumber(){
			for(let i = 0; i < this.level; i++){
				this.random = this.getRandom(10)
				if(this.secretNumber.indexOf(this.random) == -1){
					this.secretNumber.push(this.random)
				} else{
					i--
				}
			}
			console.log('Число ' + this.secretNumber)
		},
		getRandom(max){
			return Math.floor(Math.random() * max)
		},
		changeLevel(action){
			if(action == 'up'){
				this.level++
			} else{
				this.level--
			}
		},
		startGame(){
			this.start = true
			this.setSecretNumber()
		},
		checkNumber(){
			this.enterNumber = String(this.enterNumber)
			if(this.enterNumber.length === this.level){
				this.isValid = true
				this.checkArray = []
				this.bull = 0
				this.cows = 0

				for(let i = 0; i < this.secretNumber.length; i++){
					for(let k = 0; k < this.enterNumber.length; k++){
						if(this.secretNumber[i] == this.enterNumber[k]){
							if(i == k){
								this.bull++
								this.checkArray[i] = 'bull'
							} else{
								this.cows++
								this.checkArray[k] = 'cow'
							}
							console.log('check')
							
						}
					}
				}

				this.actions.push({
					enter: this.enterNumber,
					bull: this.bull,
					cows: this.cows
				})
			} else{
				this.isValid = false
			}
		}
	}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  justify-content: center;
}
.container{
	width: 80%;
}
.numbers{
	display: flex;
	justify-content: center;
}
.number{
	width: 50px;
	height: 50px;
	border-radius: 50%;
	background: #c04148;
	margin: 10px;
}
input{
	height: 36px;
	width: calc(100% - 20px);
	border-radius: 5px;
	border: solid 1px #42b983;
	color: #42b983;
	padding: 0 10px;
	margin: 10px 0;
}
button{
	background: #42b983;
	border-radius: 5px;
	color: #fff;
	height: 36px;
	width: 100%;
	border: none;
	text-transform: uppercase;
}
button:hover{
	opacity: 0.5;
}
.level{
	display: flex;
}
.level span{
	margin: 0 30px
}
.start{
	margin: 30px 0;
}
.content{
	text-align: left;
}
.rezult{
	text-transform: uppercase;
	margin: 30px 0;
	text-align: left;
}
.action{
	padding: 10px;
	background: #42b983;
	border-radius: 5px;
	color: #fff;
	margin: 15px 0;
} 
.cow{
	background: #ffe32d;
}
.bull{
	background: #42b983;
}
.valid{
	color: #c04148;
	font-size: 12px;
}
</style>
