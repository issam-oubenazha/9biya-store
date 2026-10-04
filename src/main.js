import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './style.css'

const app = createApp(App)

app.directive('reveal', {
	mounted(element) {
		element.classList.add('reveal')

		if (!('IntersectionObserver' in window)) {
			element.classList.add('is-visible')
			return
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					element.classList.add('is-visible')
					observer.unobserve(element)
				}
			},
			{ threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
		)

		element.__revealObserver = observer
		observer.observe(element)
	},
	unmounted(element) {
		element.__revealObserver?.disconnect()
	}
})

app.use(createPinia())
app.use(router)

app.mount('#app')
