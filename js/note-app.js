// DOM - Document Object Model

const p = document.querySelectorAll('p')

p.forEach(para => (
    para.textContent = 'spam'
))