const movementModal = (message, override = false) => {
    window = Window.focused()
    screen = Screen.main().flippedVisibleFrame()

    Modal.build({
        origin(modal) {
            return {
                x: screen.width / 2,
                y: screen.height / 2,
            }
        },
        weight: 20,
        duration: 1,
        appearance: 'dark',
        icon: window.app().icon(),
        text: override
            ? message + ' ' + window.app().name()
            : 'Moving ' + window.app().name() + ' to the ' + message,
    }).show()
}

const MOD = ['shift', 'ctrl']
const VERBOSE = true
const HALF_CORRECTION = 6 // Fix padding issues for half screen windows

const scr = Screen.main().flippedVisibleFrame()
// Padding Values
const paddingTop = 8
const paddingLeft = 8
const paddingRight = 8
const paddingBottom = 8
const paddingCenter = 8
const paddingMiddle = 8
// Computed sizes
const halfWidth = (scr.width - paddingLeft - paddingRight) / 2
const halfHeight =
    (scr.height - paddingTop - paddingBottom) / 2 + HALF_CORRECTION
const thirdWidth = (scr.width - paddingLeft - paddingRight) / 3

const windowLocations = {
    full: {
        y: paddingTop,
        x: paddingLeft,
        width: scr.width - paddingRight,
        height: scr.height - paddingBottom,
    },
    left: {
        y: paddingTop,
        x: paddingLeft,
        width: halfWidth - paddingCenter,
        height: scr.height - paddingBottom,
    },
    right: {
        y: paddingTop,
        x: halfWidth + paddingLeft + paddingCenter,
        width: halfWidth,
        height: scr.height - paddingBottom,
    },
    //Corners
    topRight: {
        y: paddingTop,
        x: scr.width + paddingLeft + paddingCenter,
        width: halfWidth,
        height: halfHeight,
    },
    bottomRight: {
        y: halfHeight + paddingTop + paddingMiddle,
        x: scr.width + paddingLeft + paddingCenter,
        width: halfWidth,
        height: halfHeight,
    },
    topLeft: {
        y: scr.y + paddingTop,
        x: scr.x + paddingLeft,
        width: halfWidth - paddingCenter,
        height: halfHeight,
    },
    bottomLeft: {
        y: scr.y + halfHeight - paddingTop,
        x: scr.x + paddingLeft,
        width: halfWidth - paddingCenter,
        height: halfHeight,
    },
    // Extra sizes
    rightTwoThirds: {
        y: paddingTop,
        x: thirdWidth + paddingLeft + paddingCenter,
        width: thirdWidth * 2,
        height: scr.height - paddingBottom,
    },
    leftTwoThirds: {
        y: scr.y + paddingTop,
        x: scr.x + paddingLeft,
        width: thirdWidth * 2 - paddingCenter,
        height: scr.height - paddingBottom - paddingTop,
    },
    leftThird: {
        y: paddingTop,
        x: paddingLeft,
        width: thirdWidth - paddingCenter,
        height: scr.height - paddingBottom,
    },
    rightThird: {
        y: paddingTop,
        x: thirdWidth * 2 + paddingLeft + paddingCenter,
        width: thirdWidth,
        height: scr.height - paddingBottom,
    },
}

const padding = 8
const setWindow = {
    tileHalfLeft: (window, screen) => {
        window.setTopLeft({
            x: screen.x + padding,
            y: screen.y + padding,
        })

        window.setSize({
            width: screen.width / 2 - padding,
            height: screen.height - padding * 2,
        })
    },
    tileHalfRight: (window, screen) => {
        Phoenix.log(screen.width)

        if (screen.width > 1280) {
            window.setTopLeft({
                x: screen.width,
                y: screen.y + padding,
            })
        } else {
            window.setTopLeft({
                x: screen.width / 2,
                y: screen.y + padding,
            })
        }

        window.setSize({
            width: screen.width / 2 - padding,
            height: screen.height - padding * 2,
        })
    },
    tileCenter: (window, screen) => {
        window.setSize({
            width: screen.width / 2 - padding,
            height: screen.height - padding * 2,
        })

        window.setTopLeft({
            x: screen.x + screen.width / 2 / 2,
            y: screen.y + padding,
        })
    },
    tileMaximise: (window, screen) => {
        window.setTopLeft({
            x: screen.x + padding,
            y: screen.y + padding,
        })

        window.setSize({
            width: screen.width - padding * 2,
            height: screen.height - padding * 2,
        })
    },
    nextDisplay: (window, screen) => {
        const screenObj = screen.flippedVisibleFrame()

        window.setTopLeft({
            x: screenObj.x + padding,
            y: screenObj.y + padding,
        })

        window.setSize({
            width: screenObj.width - padding * 2,
            height: screenObj.height - padding * 2,
        })
    },
}

/*
====================================
                LEFT
====================================
*/
const leftHalf = Key.on('a', MOD, () => {
    const window = Window.focused()
    const screen = Screen.main().flippedVisibleFrame()

    setWindow.tileHalfLeft(window, screen)
})

const leftTop = new Key('q', MOD, () => {
    if (VERBOSE) {
        movementModal('left top')
    }

    Window.focused().setFrame(windowLocations.topLeft)
})

const leftBottom = new Key('z', MOD, () => {
    if (VERBOSE) {
        movementModal('left bottom')
    }

    Window.focused().setFrame(windowLocations.bottomLeft)
})

const leftTwoThirds = new Key('y', MOD, () => {
    if (VERBOSE) {
        movementModal('left two-thirds')
    }

    Window.focused().setFrame(windowLocations.leftTwoThirds)
})

/*
====================================
                RIGHT
====================================
*/
const rightHalf = Key.on('d', MOD, () => {
    const window = Window.focused()
    const screens = Screen.all()
    const currentScreen = Screen.main().flippedVisibleFrame()
    setWindow.tileHalfRight(window, currentScreen)
})

const rightTop = new Key('e', MOD, () => {
    if (VERBOSE) {
        movementModal('right top')
    }

    Window.focused().setFrame(windowLocations.topRight)
})

const rightBottom = new Key('c', MOD, () => {
    if (VERBOSE) {
        movementModal('right bottom')
    }

    Window.focused().setFrame(windowLocations.bottomRight)
})

/*
====================================
                ELSE
====================================
*/
const centre = Key.on('s', MOD, () => {
    const window = Window.focused()
    const screen = Screen.main().flippedVisibleFrame()

    setWindow.tileCenter(window, screen)
})

const maximise = Key.on('f', MOD, () => {
    const window = Window.focused()
    const screen = Screen.main().flippedVisibleFrame()

    setWindow.tileMaximise(window, screen)
})

// Two monitor setup
const nextDisplay = Key.on('left', MOD, () => {
    const window = Window.focused()
    const screens = Screen.all()
    const currentScreen = Screen.main()

    screens.forEach((screen) => {
        if (currentScreen.identifier() !== screen.identifier()) {
            setWindow.nextDisplay(window, screen)
        }
    })
})
