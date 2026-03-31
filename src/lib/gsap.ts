import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register plugins once at module level
gsap.registerPlugin(ScrollTrigger)

// Global defaults
gsap.defaults({
  ease: 'power2.out',
  duration: 0.5,
})

export { gsap, ScrollTrigger }
