// Modifier keys
const MOD = ['shift', 'ctrl']
const MOD2 = ['shift', 'ctrl', 'alt']
const MOD3 = ['shift', 'ctrl', 'alt', 'cmd']
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

    return { screenCurrent: screen }
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

    const { screenCurrent: screen } = findScreen()
    const heightHalf = screen.height / 2 - (padding + paddingHalf)
    const heightFull = screen.height - padding * 2
    const YBottomHalf = screen.y + screen.height / 2 + paddingHalf
    const widthHalf = screen.width / 2 - (padding + paddingHalf)
    const oneThird = screen.width / 4
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
                x: screen.x + oneThird + paddingHalf,
                y: screen.y + padding,
                width: screen.width / 2 - padding * 2,
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

// ====================================
// Examples from other users
// ====================================

// Computed sizes
// const halfWidth = (scr.width - paddingLeft - paddingRight) / 2
// const halfHeight =
//     (scr.height - paddingTop - paddingBottom) / 2 + HALF_CORRECTION
// const thirdWidth = (scr.width - paddingLeft - paddingRight) / 3

// const windowLocations = {
//     full: {
//         y: paddingTop,
//         x: paddingLeft,
//         width: scr.width - paddingRight,
//         height: scr.height - paddingBottom,
//     },
//     left: {
//         y: paddingTop,
//         x: paddingLeft,
//         width: halfWidth - paddingCenter,
//         height: scr.height - paddingBottom,
//     },
//     right: {
//         y: paddingTop,
//         x: halfWidth + paddingLeft + paddingCenter,
//         width: halfWidth,
//         height: scr.height - paddingBottom,
//     },
//     //Corners
//     topRight: {
//         y: paddingTop,
//         x: scr.width + paddingLeft + paddingCenter,
//         width: halfWidth,
//         height: halfHeight,
//     },
//     bottomRight: {
//         y: halfHeight + paddingTop + paddingMiddle,
//         x: scr.width + paddingLeft + paddingCenter,
//         width: halfWidth,
//         height: halfHeight,
//     },
//     topLeft: {
//         y: scr.y + paddingTop,
//         x: scr.x + paddingLeft,
//         width: halfWidth - paddingCenter,
//         height: halfHeight,
//     },
//     bottomLeft: {
//         y: scr.y + halfHeight - paddingTop,
//         x: scr.x + paddingLeft,
//         width: halfWidth - paddingCenter,
//         height: halfHeight,
//     },
//     // Extra sizes
//     rightTwoThirds: {
//         y: paddingTop,
//         x: thirdWidth + paddingLeft + paddingCenter,
//         width: thirdWidth * 2,
//         height: scr.height - paddingBottom,
//     },
//     leftTwoThirds: {
//         y: scr.y + paddingTop,
//         x: scr.x + paddingLeft,
//         width: thirdWidth * 2 - paddingCenter,
//         height: scr.height - paddingBottom - paddingTop,
//     },
//     leftThird: {
//         y: paddingTop,
//         x: paddingLeft,
//         width: thirdWidth - paddingCenter,
//         height: scr.height - paddingBottom,
//     },
//     rightThird: {
//         y: paddingTop,
//         x: thirdWidth * 2 + paddingLeft + paddingCenter,
//         width: thirdWidth,
//         height: scr.height - paddingBottom,
//     },
// }
