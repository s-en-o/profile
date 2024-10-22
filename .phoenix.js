// Run Phoenix in the background
Phoenix.set({
	daemon: true,
	openAtLogin: true,
});
// ====================================
//              EVENTS
// ====================================
// Bind “appDidLaunch” event to a callback function
// const IDLaunch = Event.on('windowDidOpen', (window) => {
//     const name = window.app().name()
//     window.focus()

//     console.log('=============', JSON.stringify(window), '===============')
//     console.log('============= APP NAME: ', name, '===============')

//     if (name === 'Zed' && window) {
//         console.log('!!! LAUNCHED !!!')
//         // tilePosition('leftHalf')
//     }
// })

const IDAppLaunch = Event.on('appDidLaunch', (app) => {
	const name = app.name();
	console.log('=======> App ', name, ' is launched!');

	// app.activate()
	// app.focus()

	// const wins = app.windows()
	// console.log('======> wins', wins.length)

	// const main = app.mainWindow()
	// console.log('======> main', JSON.stringify(main))

	// app.activate()
	// app.focus()
	// app.show()

	if (name === 'Notes') {
		tilePosition('rightTop');
	}

	if (name === 'Hyper') {
		tilePosition('rightHalf');
	}

	//     if (name === 'Zed') {
	//         console.log('!!! ZED LAUNCHED !!!')
	//         app.activate()
	//         app.focus()
	//         app.show()
	//         console.log(app.isHidden())
	//         console.log(app.isActive())

	//         const wins1 = app.windows()
	//         console.log('wins1: ', wins1.length)

	//         const main1 = app.mainWindow()
	//         console.log('main1: ', main1)

	//         tilePosition('leftHalf')
	//     }
});

// Modifier keys
const MOD = ['shift', 'ctrl'];
const MOD2 = ['shift', 'ctrl', 'alt'];
const MOD3 = ['ctrl', 'alt', 'cmd'];
// ====================================
//              Padding
// ====================================
const padding = 8;
const paddingHalf = padding / 2;
// Find current screen
const findScreen = () => {
	// Get main screen
	const screenCurrent = Screen.main();
	const screen = screenCurrent.flippedVisibleFrame();

	return { screen };
};
// Move to next display with two monitor setup
const moveToNextDisplay = (window) => {
	const screens = Screen.all();
	const screenCurrent = Screen.main();

	const condition = (screen) =>
		screen.identifier() !== screenCurrent.identifier();

	const nextScreen = screens.find(condition);
	const nextScreenFlipped = nextScreen.flippedVisibleFrame();

	window.setFrame({
		x: nextScreenFlipped.x + padding,
		y: nextScreenFlipped.y + padding,
		width: nextScreenFlipped.width - padding * 2,
		height: nextScreenFlipped.height - padding * 2,
	});
};

// ====================================
// Helper to set window tile position
// ====================================
const tilePosition = (position) => {
	const window = Window.focused();
	if (!window) return;

	const { screen } = findScreen();
	const heightHalf = screen.height / 2 - (padding + paddingHalf);
	const heightFull = screen.height - padding * 2;
	const YBottomHalf = screen.y + screen.height / 2 + paddingHalf;
	const widthHalf = screen.width / 2 - (padding + paddingHalf);
	const XOneFifth = screen.width / 5;
	const XOneSixth = screen.width / 6;
	const YOneFifth = screen.height / 5;
	const XOneFourth = screen.width / 4;
	const XOneThird = screen.width / 3;
	const widthOneThird = XOneThird - (padding + paddingHalf);
	const widthTwoThird = screen.width - XOneThird - (padding + paddingHalf);

	switch (position) {
		case 'leftHalf':
			window.setFrame({
				x: screen.x + padding,
				y: screen.y + padding,
				width: widthHalf,
				height: heightFull,
			});
			break;

		case 'leftTop':
			window.setFrame({
				x: screen.x + padding,
				y: screen.y + padding,
				width: widthHalf,
				height: heightHalf,
			});
			break;

		case 'leftBottom':
			window.setFrame({
				x: screen.x + padding,
				y: YBottomHalf,
				width: widthHalf,
				height: heightHalf,
			});
			break;

		case 'leftOneThird':
			window.setFrame({
				x: screen.x + padding,
				y: screen.y + padding,
				width: widthOneThird,
				height: heightFull,
			});
			break;

		case 'leftTwoThird':
			window.setFrame({
				x: screen.x + padding,
				y: screen.y + padding,
				width: widthTwoThird,
				height: heightFull,
			});
			break;

		case 'rightHalf':
			window.setFrame({
				x: screen.x + screen.width / 2 + paddingHalf,
				y: screen.y + padding,
				width: widthHalf,
				height: heightFull,
			});
			break;

		case 'rightTop':
			window.setFrame({
				x: screen.x + screen.width / 2 + padding,
				y: screen.y + padding,
				width: widthHalf,
				height: heightHalf,
			});
			break;

		case 'rightBottom':
			window.setFrame({
				x: screen.x + screen.width / 2 + padding,
				y: YBottomHalf,
				width: widthHalf,
				height: heightHalf,
			});
			break;

		case 'rightOneThird':
			window.setFrame({
				x: screen.x + (screen.width - XOneThird) + paddingHalf,
				y: screen.y + padding,
				width: widthOneThird,
				height: heightFull,
			});
			break;

		case 'rightTwoThird':
			window.setFrame({
				x: screen.x + XOneThird + paddingHalf,
				y: screen.y + padding,
				width: widthTwoThird,
				height: heightFull,
			});
			break;

		case 'screenMiddle':
			window.setFrame({
				x: screen.x + XOneSixth,
				y: screen.y + padding,
				width: XOneThird * 2 - padding,
				height: heightFull,
			});
			break;

		case 'screenCenter':
			window.setFrame({
				x: screen.x + XOneFourth,
				y: screen.y + YOneFifth,
				width: screen.width / 2 - padding,
				height: YOneFifth * 3,
			});
			break;

		case 'screenMiddleOneThird':
			window.setFrame({
				x: screen.x + XOneThird + paddingHalf,
				y: screen.y + padding,
				width: XOneThird - padding,
				height: heightFull,
			});
			break;

		case 'topHalf':
			window.setFrame({
				x: screen.x + padding,
				y: screen.y + padding,
				width: screen.width - padding * 2,
				height: heightHalf,
			});
			break;

		case 'bottomHalf':
			window.setFrame({
				x: screen.x + padding,
				y: YBottomHalf,
				width: screen.width - padding * 2,
				height: heightHalf,
			});
			break;

		case 'fullScreen':
			window.setFrame({
				x: screen.x + padding,
				y: screen.y + padding,
				width: screen.width - padding * 2,
				height: heightFull,
			});
			break;

		case 'nextDisplay':
			moveToNextDisplay(window);

			break;

		default:
			break;
	}
};
// ====================================
//                 LEFT
// ====================================
const leftHalf = Key.on('a', MOD, () => {
	tilePosition('leftHalf');
});

const leftTwoThird = Key.on('a', MOD2, () => {
	tilePosition('leftTwoThird');
});

const leftOneThird = Key.on('a', MOD3, () => {
	tilePosition('leftOneThird');
});

const leftTop = Key.on('q', MOD, () => {
	tilePosition('leftTop');
});

const leftBottom = Key.on('z', MOD, () => {
	tilePosition('leftBottom');
});

// ====================================
//                 RIGHT
// ====================================
const rightHalf = Key.on('d', MOD, () => {
	tilePosition('rightHalf');
});

const rightTwoThird = Key.on('d', MOD2, () => {
	tilePosition('rightTwoThird');
});

const rightOneThird = Key.on('d', MOD3, () => {
	tilePosition('rightOneThird');
});

const rightTop = Key.on('e', MOD, () => {
	tilePosition('rightTop');
});

const rightBottom = Key.on('c', MOD, () => {
	tilePosition('rightBottom');
});
// ====================================
//                 MIDDLE
// ====================================
const screenMiddle = Key.on('s', MOD, () => {
	tilePosition('screenMiddle');
});

const screenCenter = Key.on('s', MOD2, () => {
	tilePosition('screenCenter');
});

const screenMiddleOneThird = Key.on('s', MOD3, () => {
	tilePosition('screenMiddleOneThird');
});
// ====================================
//                 ELSE
// ====================================
const fullScreen = Key.on('f', MOD, () => {
	tilePosition('fullScreen');
});

const topHalf = Key.on('w', MOD, () => {
	tilePosition('topHalf');
});

const bottomHalf = Key.on('x', MOD, () => {
	tilePosition('bottomHalf');
});

// Two monitor setup
const nextDisplay = Key.on('right', MOD, () => {
	tilePosition('nextDisplay');
});
