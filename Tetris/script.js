let main = document.querySelector(".main");
let following = document.querySelector(".following");
let levelInner = document.querySelector("#level");
let scoreInner = document.querySelector("#score");

let score = 0, currentLevel = 1;
let timerId, started = false, unlock = true; gameOver = false;

let playfield = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
let fieldForFollowing = [
	[0, 0, 0, 0],
	[0, 0, 0, 0]
];
let pieces = {
	O: [
		[1, 1],
		[1, 1]
	],
	I: [
		[0, 0, 0, 0],
		[1, 1, 1, 1],
		[0, 0, 0, 0],
		[0, 0, 0, 0]
	],
	S: [
		[0, 1, 1],
		[1, 1, 0],
		[0, 0, 0]
	],
	Z: [
		[1, 1, 0],
		[0, 1, 1],
		[0, 0, 0]
	],
	L: [
		[1, 1, 1],
		[1, 0, 0],
		[0, 0, 0]
	],
	J: [
		[1, 1, 1],
		[0, 0, 1],
		[0, 0, 0]
	],
	T: [
		[1, 1, 1],
		[0, 1, 0],
		[0, 0, 0]
	]
};

let followingPiece = getNewPiece();
let activePiece = getNewPiece();

let potentialLevels = {
	1: {
		scorePerLine: 100,
		speed: 1000,
		nextLevelScore: 1000 // 1000 for test, real 7000
	},
	2: {
		scorePerLine: 150,
		speed: 900,
		nextLevelScore: 2000 // for test, real 20000
	},
	3: {
		scorePerLine: 200,
		speed: 800,
		nextLevelScore: 3000 // for test, real 40000
	},
	4: {
		scorePerLine: 250,
		speed: 700,
		nextLevelScore: 4000 // for test, real 65000
	},
	5: {
		scorePerLine: 300,
		speed: 600,
		nextLevelScore: 5000 // for test, real 100000
	},
	6: {
		scorePerLine: 350,
		speed: 500,
		nextLevelScore: 10000 // for test, real 150000
	},
	7: {
		scorePerLine: 400,
		speed: 400,
		nextLevelScore: 20000 // for test, real 215000
	},
	8: {
		scorePerLine: 450,
		speed: 300,
		nextLevelScore: 40000 // for test, real 310000
	},
	9: {
		scorePerLine: 500,
		speed: 200,
		nextLevelScore: 80000 // for test, real 450000
	},
	10: {
		scorePerLine: 600,
		speed: 100,
		nextLevelScore: Infinity
	},
};

// Game Control Buttons
let playPause = document.querySelector("#playPause");
let left = document.querySelector("#left");
let right = document.querySelector("#right");
let down = document.querySelector("#down");
let buttonV = document.querySelector("#buttonV");
let up = document.querySelector("#up");

playPause.addEventListener("click", function() {
	this.value = this.value === "Play" ? "Pause" : "Play";
	this.classList.toggle("pause");
	pausePlay();
	drаwCells();
	drawNextPiece();
});
left.addEventListener("click", function() {
	movePieceLeft();
	drаwCells();
});
right.addEventListener("click", function() {
	movePieceRight();
	drаwCells();
});
down.addEventListener("click", function() {
	movePieceDown();
	drаwCells();
});
buttonV.addEventListener("click", function() {
	movePieceStraightDown();
	drаwCells();
});
up.addEventListener("click", function() {
	pieceRotate();
	drаwCells();
});

document.onkeydown = function(event) {
	switch (event.keyCode) {
		case 13:
			if (!started) {
				playPause.value = playPause.value === "Play" ? "Pause" : "Play";
				playPause.classList.toggle("pause");
				addPiece();
				drawNextPiece();
				gameStart();
				started = true;
			}; break;
		case 80:
			playPause.value = playPause.value === "Play" ? "Pause" : "Play";
			playPause.classList.toggle("pause");
			pausePlay(); break;
		case 37:
			movePieceLeft(); break;
		case 39:
			movePieceRight(); break;
		case 40:
			movePieceDown(); break;
		case 86:
			movePieceStraightDown(); break;
		case 38:
			pieceRotate(); break;
	}
	drаwCells();
}

function gameStart() {
	timerId = setInterval(function() {
		movePieceDown();
		drаwCells();
	}, potentialLevels[currentLevel].speed);

};

function pausePlay() {
	if (timerId) {
		clearInterval(timerId);
		timerId = null;
		unlock = false;
	} else {
		addPiece();
		drawNextPiece();
		gameStart();
		unlock = true;
	}
}

function getNewPiece() {
	let potentialPieces = "OISZLJT";
	let random = Math.floor(Math.random() * 7);
	return {
		x: 4,
		y: 0,
		piece: pieces[potentialPieces[random]]
	} 
}

function removePrevPiece() {
	for (let y = 0; y < playfield.length; y++) {
		for (let x = 0; x < playfield[y].length; x++) {
			if (playfield[y][x] === 1) {
				playfield[y][x] = 0;
			}
		}
	}
}

function addPiece() {
	removePrevPiece();
	let {x: actX, y: actY, piece} = activePiece;

	for (let y = 0; y < piece.length; y++) {
		for (let x = 0; x < piece[y].length; x++) {
			if (piece[y][x] === 1) {
				playfield[y+actY][x+actX] = piece[y][x];
			}
		}
	}
}

function drаwCells() {
	let mainInnerHtml = "";

	for (let y = 0; y < playfield.length; y++) {
		for (let x = 0; x < playfield[y].length; x++) {
			if (playfield[y][x] === 0) {
				mainInnerHtml += '<div class="cell"></div>';
			} else if (playfield[y][x] === 1) {
				mainInnerHtml += '<div class="cell movingCell"></div>';
			} else {
				mainInnerHtml += '<div class="cell fixedCell"></div>';
			}
		}
	}

	if (gameOver) {
		main.innerHTML = "<h2>Game Over</h2>";
		setTimeout(() => {
			clearInterval(timerId);
			main.innerHTML = "<h2>Press F5 or reload page to start again</h2>";
		}, 1000);
	} else main.innerHTML = mainInnerHtml;
}

function drawNextPiece() {
	let followingInnerHtml = "";

	for (let y = 0; y < fieldForFollowing.length; y++) {
		for (let x = 0; x < fieldForFollowing[y].length; x++) {
			if (fieldForFollowing[y][x] === 1) {
				fieldForFollowing[y][x] = 0;
			}
		}
	}

	for (let y = 0; y < followingPiece.piece.length; y++) {
		for (let x = 0; x < followingPiece.piece[y].length; x++) {
			if (followingPiece.piece[y][x]) {
				fieldForFollowing[y][x] = followingPiece.piece[y][x];
			}
		}
	}

	for (let y = 0; y < fieldForFollowing.length; y++) {
		for (let x = 0; x < fieldForFollowing[y].length; x++) {
			if (fieldForFollowing[y][x]) {
				followingInnerHtml += '<div class="cell fMovingCell"></div>';
			} else {
				followingInnerHtml += '<div class="cell"></div>';
			}
		}
	}
	following.innerHTML = followingInnerHtml;
}

function movePieceLeft() {
	if(unlock) {
		activePiece.x -= 1;

		if (isConflict()) {
			activePiece.x += 1;
		}
		addPiece();
	}
}

function movePieceRight() {
	if(unlock) {
		activePiece.x += 1;

		if (isConflict()) {
			activePiece.x -= 1;
		}
		addPiece();
	}
}

function movePieceDown() {
	if(unlock) {
		activePiece.y += 1;

		if (isConflict()) {
			activePiece.y -= 1;
			if (activePiece.y === 0) {
				gameOver = true;
			} else {
				fixedPiece();
				activePiece = followingPiece;
				followingPiece = getNewPiece();
				drawNextPiece();
			}
		}
		addPiece();
	}
}

function movePieceStraightDown() {
	if(unlock) {
		for (let y = activePiece.y; y < playfield.length; y++) {
			activePiece.y += 1;

			if (isConflict()) {
				activePiece.y -= 1;
				break;
			}
			addPiece();
		}
	}
}

function pieceRotate() {
	if (unlock) {
		let prevState = activePiece.piece;
		let piece = activePiece.piece;

		piece = piece.map((elem, i) =>
			piece.map(row => row[i]).reverse());
		activePiece.piece = piece;

		if (isConflict()) {
			activePiece.piece = prevState;
		}
		addPiece();
	}
}

function isConflict() {
	let {x: actX, y: actY, piece} = activePiece;

	for (let y = 0; y < piece.length; y++) {
		for (let x = 0; x < piece[y].length; x++) {
			if (piece[y][x] && (playfield[y+actY] === undefined ||
					playfield[y+actY][x+actX] === undefined || 
					playfield[y+actY][x+actX] === 2)) {
				return true;
			}
		}
	}
	return false;
}

function fixedPiece() {
	for (let y = playfield.length-1; y >= 0; y--) {
		for (let x = 0; x < playfield[y].length; x++) {
			if (playfield[y][x] === 1) {
				playfield[y][x] = 2;
			}
		}
	}
	isLinesFull();
}

function isLinesFull() {
	let removeLines = 0;

	for (let y = 0; y < playfield.length; y++) {
		let canRemoveLine = true;

		for (let x = 0; x < playfield[y].length; x++) {
			if (playfield[y][x] !== 2) {
				canRemoveLine = false;
				break;
			}
		}

		if (canRemoveLine) {
			playfield.splice(y, 1);
			playfield.splice(0, 0, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
			removeLines += 1;
		}
	}

	let scorePerLine = potentialLevels[currentLevel].scorePerLine;

	switch (removeLines) {
		case 1:
			score += scorePerLine;
			break;
		case 2:
			score += scorePerLine * 4;
			break;
		case 3:
			score += scorePerLine * 7;
			break;
		case 4:
			score += scorePerLine * 14;
			break;
	}
	scoreInner.innerHTML = score;

	if (score >= potentialLevels[currentLevel].nextLevelScore) {
		currentLevel++;
		pausePlay();
		pausePlay();
		levelInner.innerHTML = currentLevel;
	}
}
