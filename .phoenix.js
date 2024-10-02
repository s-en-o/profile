// Modifier keys
const MOD = ['shift', 'ctrl']
const MOD2 = ['shift', 'ctrl', 'alt']
const MOD3 = ['ctrl', 'alt', 'cmd']
// ====================================
//              Padding
// ====================================
const padding = 8
const paddingHalf = padding / 2
// Find current screen
const findScreen = () => {
    // Get main screen
    const screenCurrent = Screen.main()
    const screen = screenCurrent.flippedVisibleFrame()

    return { screen }
}
// Move to next display with two monitor setup
const moveToNextDisplay = (window) => {
    const screens = Screen.all()
    const screenCurrent = Screen.main()

    const condition = (screen) =>
        screen.identifier() !== screenCurrent.identifier()

    const nextScreen = screens.find(condition)
    const nextScreenFlipped = nextScreen.flippedVisibleFrame()

    window.setFrame({
        x: nextScreenFlipped.x + padding,
        y: nextScreenFlipped.y + padding,
        width: nextScreenFlipped.width - padding * 2,
        height: nextScreenFlipped.height - padding * 2,
    })
}

// ====================================
// Helper to set window tile position
// ====================================
const tilePosition = (position) => {
    const window = Window.focused()
    if (!window) return

    const { screen } = findScreen()
    const heightHalf = screen.height / 2 - (padding + paddingHalf)
    const heightFull = screen.height - padding * 2
    const YBottomHalf = screen.y + screen.height / 2 + paddingHalf
    const widthHalf = screen.width / 2 - (padding + paddingHalf)
    const oneFourth = screen.width / 4
    const oneThird = screen.width / 3
    const widthOneThird = oneThird - (padding + paddingHalf)
    const widthTwoThird = screen.width - oneThird - (padding + paddingHalf)

    switch (position) {
        case 'leftHalf':
            window.setFrame({
                x: screen.x + padding,
                y: screen.y + padding,
                width: widthHalf,
                height: heightFull,
            })
            break

        case 'leftTop':
            window.setFrame({
                x: screen.x + padding,
                y: screen.y + padding,
                width: widthHalf,
                height: heightHalf,
            })
            break

        case 'leftBottom':
            window.setFrame({
                x: screen.x + padding,
                y: YBottomHalf,
                width: widthHalf,
                height: heightHalf,
            })
            break

        case 'leftOneThird':
            // console.log(JSON.stringify(Screen.main().frame()))
            console.log(screen.width, widthOneThird)
            window.setFrame({
                x: screen.x + padding,
                y: screen.y + padding,
                width: widthOneThird,
                height: heightFull,
            })
            break

        case 'leftTwoThird':
            window.setFrame({
                x: screen.x + padding,
                y: screen.y + padding,
                width: widthTwoThird,
                height: heightFull,
            })
            break

        case 'rightHalf':
            window.setFrame({
                x: screen.x + screen.width / 2 + paddingHalf,
                y: screen.y + padding,
                width: widthHalf,
                height: heightFull,
            })
            break

        case 'rightTop':
            window.setFrame({
                x: screen.x + screen.width / 2 + padding,
                y: screen.y + padding,
                width: widthHalf,
                height: heightHalf,
            })
            break

        case 'rightBottom':
            window.setFrame({
                x: screen.x + screen.width / 2 + padding,
                y: YBottomHalf,
                width: widthHalf,
                height: heightHalf,
            })
            break

        case 'rightOneThird':
            window.setFrame({
                x: screen.x + (screen.width - oneThird) + paddingHalf,
                y: screen.y + padding,
                width: widthOneThird,
                height: heightFull,
            })
            break

        case 'rightTwoThird':
            window.setFrame({
                x: screen.x + oneThird + paddingHalf,
                y: screen.y + padding,
                width: widthTwoThird,
                height: heightFull,
            })
            break

        case 'screenMiddle':
            window.setFrame({
                x: screen.x + oneFourth,
                y: screen.y + padding,
                width: screen.width / 2 - padding,
                height: heightFull,
            })
            break

        case 'screenMiddleOneThird':
            window.setFrame({
                x: screen.x + oneThird + paddingHalf,
                y: screen.y + padding,
                width: oneThird - padding,
                height: heightFull,
            })
            break

        case 'topHalf':
            window.setFrame({
                x: screen.x + padding,
                y: screen.y + padding,
                width: screen.width - padding * 2,
                height: heightHalf,
            })
            break

        case 'bottomHalf':
            window.setFrame({
                x: screen.x + padding,
                y: YBottomHalf,
                width: screen.width - padding * 2,
                height: heightHalf,
            })
            break

        case 'fullScreen':
            window.setFrame({
                x: screen.x + padding,
                y: screen.y + padding,
                width: screen.width - padding * 2,
                height: heightFull,
            })
            break

        case 'nextDisplay':
            moveToNextDisplay(window)

            break

        default:
            break
    }
}
// ====================================
//                 LEFT
// ====================================
const leftHalf = Key.on('a', MOD, () => {
    tilePosition('leftHalf')
})

const leftTwoThird = Key.on('a', MOD2, () => {
    tilePosition('leftTwoThird')
})

const leftOneThird = Key.on('a', MOD3, () => {
    tilePosition('leftOneThird')
})

const leftTop = Key.on('q', MOD, () => {
    tilePosition('leftTop')
})

const leftBottom = Key.on('z', MOD, () => {
    tilePosition('leftBottom')
})

// ====================================
//                 RIGHT
// ====================================
const rightHalf = Key.on('d', MOD, () => {
    tilePosition('rightHalf')
})

const rightTwoThird = Key.on('d', MOD2, () => {
    tilePosition('rightTwoThird')
})

const rightOneThird = Key.on('d', MOD3, () => {
    tilePosition('rightOneThird')
})

const rightTop = Key.on('e', MOD, () => {
    tilePosition('rightTop')
})

const rightBottom = Key.on('c', MOD, () => {
    tilePosition('rightBottom')
})
// ====================================
//                 MIDDLE
// ====================================
const screenMiddle = Key.on('s', MOD, () => {
    tilePosition('screenMiddle')
})

const screenMiddleOneThird = Key.on('s', MOD3, () => {
    tilePosition('screenMiddleOneThird')
})
// ====================================
//                 ELSE
// ====================================
const fullScreen = Key.on('f', MOD, () => {
    tilePosition('fullScreen')
})

const topHalf = Key.on('w', MOD, () => {
    tilePosition('topHalf')
})

const bottomHalf = Key.on('x', MOD, () => {
    tilePosition('bottomHalf')
})

// Two monitor setup
const nextDisplay = Key.on('right', MOD, () => {
    tilePosition('nextDisplay')
})
