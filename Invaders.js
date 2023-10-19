// Variables
let ship = game.createSprite(2,5)
let BulletTravelSpeed = 250
let shot = false
let shoot: game.LedSprite = null
let enemy: game.LedSprite = null
let delay = 1000

// Presets
let life = 3
let score = 0

// Change Delay on Elimination
basic.forever(() => 
{
    delay = 1000 - (score*10)
})

// Check if Enemy was shot
basic.forever(() =>
{
    // Elim Sound Code
    let style = WaveShape.Sine
    let soundExpression = SoundExpressionEffect.None
    let interpolation = InterpolationCurve.Logarithmic
    let playback = music.PlaybackMode.InBackground
    if (shot)
    {
        if (shoot.isTouching(enemy))
        {
            music.play(
                music.createSoundExpression(style, 1790, 1, 255, 255, 200, soundExpression, interpolation), playback
            )
            // Eliminates Enemy
            enemy.delete()
        }
    }
})

// Movement
// / Left
input.onButtonPressed(Button.A, () => 
{
    ship.changeXBy(-1)
})

// / Right
input.onButtonPressed(Button.B, () => {
    ship.changeXBy(1)
})

function SpawnEnemy() 
{
    enemy = game.createSprite(randint(0, 5), 0)
    pause(delay)
    for (let index = 0; index < 4; index++) {
        enemy.changeYBy(1)
        basic.pause(delay)
    }
    life -= 1
    enemy.delete()
}

// Enemy
basic.forever(() => {
    SpawnEnemy()
})

// Check Lives
basic.forever(() => {
    if (life == 0) 
    {
        game.gameOver()
        game.setScore(score)
    }
})

// Shoot
input.onButtonPressed(Button.AB, () => {
    // Shorten Code to look better.
    let style = WaveShape.Sine
    let soundExpression = SoundExpressionEffect.None
    let interpolation = InterpolationCurve.Logarithmic
    let playback = music.PlaybackMode.InBackground

    music.play(
        music.createSoundExpression(style, 3459, 1, 255, 0, 500, soundExpression, interpolation), playback
    )

    // Shoot Aspect
    shoot = game.createSprite(ship.x(), ship.y())
    shoot.setBrightness(100)
    shot = true
    for (let i = 0; i < 4; i++) {
        shoot.changeYBy(-1)
        console.log(score)
        pause(BulletTravelSpeed)
    }   
    pause(500)
    shoot.delete()
})
