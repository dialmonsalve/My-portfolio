class AstroCount extends HTMLElement{
	constructor(){
		super();
		
		//this.count = Math.floor(Math.random() * (2720) + 1);
		this.count = 0;

		const btnPluss = this.querySelector('.btn-pluss');
		const btnLess = this.querySelector('.btn-less');
		const countSpan = this.querySelector('span');
		const btnRandom = this .querySelector('.random')

		btnPluss.addEventListener('click', () =>{

			if(this.count >= 2720) {
				btnPluss.disabled = true
				return}	

			this.count++
			countSpan.textContent = this.count
			btnLess.disabled = false

			this.searchData(this.count)
			
		});

		btnLess.addEventListener('click', () =>{

			if(this.count <= 1) {
				btnLess.disabled = true
				return}					

			this.count--
			countSpan.textContent = this.count
			btnPluss.disabled = false

			this.searchData(this.count)

		});

		btnRandom.addEventListener('click', () =>{

			let min = Math.ceil(1)
			let max = Math.floor(2720)

			this.count = Math.floor(Math.random() * (max - min + 1) + 1)

			countSpan.textContent = this.count

			this.searchData(this.count)

		})

	}	
	showData(data){

		const divContainer = document.querySelector('.data-api')

		while(divContainer.firstChild){
			divContainer.removeChild(divContainer.firstChild)
		}

		const image = document.createElement('IMG')
		image.classList.add('img')
		image.setAttribute('src', data.img)
		image.setAttribute('alt', data.alt)
		image.setAttribute('id', data.num)

		const parragraTitle = document.createElement('P')
		parragraTitle.textContent= data.safe_title

		divContainer.appendChild(image);
		//divContainer.appendChild(parragrafCount);
		divContainer.appendChild(parragraTitle);
	}	
	async searchData(count){

		const DOMAIN = 'https://xkcd.vercel.app/?comic='
		const comicId = count ? `${count}/` : 'latest'
		const path = `${DOMAIN}${comicId}`

		const resp = await fetch(path)
		const data = await resp.json()

		this.showData(data)
	}
}
customElements.define('astro-count', AstroCount)