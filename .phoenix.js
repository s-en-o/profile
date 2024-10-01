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

        if (screen.width === 2560) {
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

const centre = Key.on('s', ['control', 'shift'], () => {
    const window = Window.focused()
    const screen = Screen.main().flippedVisibleFrame()

    setWindow.tileCenter(window, screen)
})

const leftHalf = Key.on('a', ['control', 'shift'], () => {
    const window = Window.focused()
    const screen = Screen.main().flippedVisibleFrame()

    setWindow.tileHalfLeft(window, screen)
})

const rightHalf = Key.on('d', ['control', 'shift'], () => {
    const window = Window.focused()
    const screens = Screen.all()
    const currentScreen = Screen.main().flippedVisibleFrame()
    setWindow.tileHalfRight(window, currentScreen)

    // if (screens.length > 1) {
    //     const screen1 = screens[0]
    //     const screen2 = screens[1]
    //     const firstMonitor = screens[0].flippedVisibleFrame()
    //     const secondMonitor = screens[1].flippedVisibleFrame()

    //     if (
    //         window &&
    //         secondMonitor &&
    //         screen2.identifier() === currentScreen.identifier()
    //     ) {
    //         console.log(1)
    //         setWindow.tileHalfRight(window, secondMonitor)
    //     } else {
    //         console.log(0)
    //         setWindow.tileHalfRight(window, firstMonitor)
    //     }
    // }
})

const maximise = Key.on('f', ['control', 'shift'], () => {
    const window = Window.focused()
    const screen = Screen.main().flippedVisibleFrame()

    setWindow.tileMaximise(window, screen)
})

// Two monitor setup
const nextDisplay = Key.on('left', ['control', 'shift'], () => {
    const window = Window.focused()
    const screens = Screen.all()
    const currentScreen = Screen.main()

    screens.forEach((screen) => {
        if (currentScreen.identifier() !== screen.identifier()) {
            setWindow.nextDisplay(window, screen)
        }
    })
})
