console.log('¡Buena suerte!')

new ClipboardJS('.copyable')

const getRandom = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min)

const get_bono_numbers = () => {
  let luckyNumbers = new Set()
  while (luckyNumbers.size < 6) {
    luckyNumbers.add(getRandom(1, 49))
  }
  return [...luckyNumbers].sort((a, b) => a - b)
}

const get_primi_numbers = () => {
  let luckyNumbers = new Set()
  let refund = getRandom(0, 9)
  while (luckyNumbers.size < 6) {
    luckyNumbers.add(getRandom(1, 49))
  }
  return [[...luckyNumbers].sort((a, b) => a - b), refund]
}

const get_euro_numbers = () => {
  let luckyNumbers = new Set()
  let stars = new Set()
  while (luckyNumbers.size < 5) {
    luckyNumbers.add(getRandom(1, 50))
  }
  while (stars.size < 2) {
    stars.add(getRandom(1, 12))
  }
  return [
    [...luckyNumbers].sort((a, b) => a - b),
    [...stars].sort((a, b) => a - b),
  ]
}

const print_bono = () => {
  const bono = get_bono_numbers()
  for (let i = 0; i < 6; i++) {
    document.getElementById(`bono-${i + 1}`).value = bono[i]
  }

  const html_nums = `<div class="num"><span><pre>${[...bono]
    .map(e => e.toString().padStart(2))
    .join(' ')}</pre></span><button class="copyable" data-clipboard-text="${[
    ...bono,
  ].join(' ')}">COPIAR</button></div>`
  const nums_row = document.querySelector('.bono .numlist')
  nums_row.innerHTML = nums_row.innerHTML + html_nums
}

const print_primi = () => {
  const primi = get_primi_numbers()
  for (let i = 0; i < 6; i++) {
    document.getElementById(`primi-${i + 1}`).value = primi[0][i]
  }
  document.getElementById('primi-r1').value = primi[1]

  const html_nums = `<div class="num"><span><pre>${[...primi[0]]
    .map(e => e.toString().padStart(2))
    .join(' ')} ${[...primi][1]
    .toString()
    .padStart(3)}</pre></span><button class="copyable" data-clipboard-text="${[
    ...primi,
  ][0].join(' ')}   ${primi[1]} ">COPIAR</button></div>`
  const nums_row = document.querySelector('.primi .numlist')
  nums_row.innerHTML = nums_row.innerHTML + html_nums
}

const print_euro = () => {
  const euro = get_euro_numbers()
  for (let i = 0; i < 5; i++) {
    document.getElementById(`euro-${i + 1}`).value = euro[0][i]
  }

  for (let i = 0; i < 2; i++) {
    document.getElementById(`euro-s${i + 1}`).value = euro[1][i]
  }

  const html_nums = `<div class="num"><span><pre>${[...euro[0]]
    .map(e => e.toString().padStart(2))
    .join(' ')}   ${[...euro[1]]
    .map(e => e.toString().padStart(2))
    .join(' ')}</pre></span><button class="copyable" data-clipboard-text="${[
    ...euro,
  ][0].join(' ')}   ${[...euro][1].join(' ')}">COPIAR</button></div>`
  const nums_row = document.querySelector('.euro .numlist')
  nums_row.innerHTML = nums_row.innerHTML + html_nums
}
