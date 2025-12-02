import path from 'node:path'

const file = Bun.file(path.resolve(__dirname, './input.txt'))
const text = await file.text()
const lines = text.split('\n')

let dial = 50
let combo = 0

// Part 1 - increase combination everytime the dial ends on a zero _after_ a rotation
for (const l of lines) {
    let dial = 50
    let combo = 0
    const dir = l[0] === "L" ? -1 : 1
    const dis = +l.slice(1)
    dial += dir * dis
    dial %= 100
    if (!dial) combo += 1
}

console.log(`The combination for part 1 is ${combo}`)


// Part 2 - increase combination everytime the dial encounters a zero _during_ or _after_ a rotation
// Reset dial and combo
dial = 50
combo = 0

for (const l of lines) {
    const dir = l[0] === "L" ? -1 : 1
    const amt = +l.slice(1)

    const zeroDistance = dir === -1 ? dial : 100 - dial
    const fullTurns = Math.floor(amt / 100)
    const remainingDistance = amt % 100

    combo += fullTurns

    if (remainingDistance >= zeroDistance && zeroDistance > 0) {
        combo += 1
    }

    dial = (dial + dir * amt) % 100
    if (dial < 0) dial += 100
}

console.log(`The combination for part 2 is ${combo}`)