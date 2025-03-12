define({
	backgroundsContainer : {
		landscape: {
			x: 0,
			y: 0,
		},
		portrait: {
			x: 0,
			y: 0,
		},
		container: true,
		parent: "_BASE_APP",
	},
	stageContainer: {
		landscape: {
			x: 0,
			y: 0,
		},
		portrait: {
			x: 0,
			y: 0,
		},
		container: true,
		parent: "_BASE_APP",
	},

	baseStage: {
		landscape: {
			x: 0,
			y: 0,
		},
		portrait: {
			x: 0,
			y: 0,
		},
		container: true,
		parent: "stageContainer",
	},
	mountainStage: {
		landscape: {
			x: 0,
			y: 0,
		},
		portrait: {
			x: 0,
			y: 0,
		},
		container: true,
		parent: "stageContainer",
	},
	wheelStage: {
		landscape: {
			x: 0,
			y: 0,
		},
		portrait: {
			x: 0,
			y: 0,
		},
		container: true,
		parent: "stageContainer",
	},
	baseStageBackGround: {
		landscape: {
			x: 0,
			y: 0,
			texture: "baseStage"
		},
		portrait: {
			x: 0,
			y: 0,
			texture: "port_BaseGameBG"
		},
		parent: "backgroundsContainer",
	},
	mountainStageBackGround: {
		landscape: {
			x: 1440,
			y: 0,
			texture: "mountainStage"
		},
		portrait: {
			x: 1620,
			y: 0,
			texture: "port_BaseGameBG"
		},
		parent: "backgroundsContainer",
	},
	WheelStageBackGround: {
		landscape: {
			x: 2880,
			y: 0,
			texture: "wheelStage"
		},
		portrait: {
			x: 1620,
			y: 0,
			texture: "port_BaseGameBG"
		},
		parent: "backgroundsContainer",
	},
    WheelStageBackGround_2: {
        landscape: {
            x: 5760,
            y: 0,
            texture: "wheelStage"
        },
        portrait: {
            x: 2340,
            y: 0,
            texture: "port_BaseGameBG"
        },
        parent: "backgroundsContainer",
    },
    mountainStageBackGround_2: {
        landscape: {
            x: 7200,
            y: 0,
            texture: "mountainStage"
        },
        portrait: {
            x: 1620,
            y: 0,
            texture: "port_BaseGameBG"
        },
        parent: "backgroundsContainer",
    },
	wheelStageContainer: {
		landscape: {
			x: 0,
			y: 0,
		},
		portrait: {
			x: 0,
			y: -108,
		},
		container: true,
		parent: "wheelStage",
	},
	baseGameContainerBottom: {
		landscape: {
			x: 506,
			y: 349,
			texture: "Games3&4_FrameBG"
		},
		portrait: {
			x: 0,
			y: 650,
			texture: "port_Games3&4_FrameBG"
		},
		parent: "baseStage",
	},
	baseGameContainer: {
		landscape: {
			x: 0,
			y: 0,
			texture: "BaseGameForeground"
		},
		portrait: {
			x: 0,
			y: -130,
			texture: "port_BaseGameForeground"
		},
		parent: "baseStage",
	},
    subTitleBaseGame: {
        landscape: {
            x: 4,
            y: 276,
			scale:{
            	x:0.5,
				y:0.5
			},
            texture: "TPIRsubtitle"
        },
        portrait: {
            x: 14,
            y: 394,
            scale:{
                x:0.4,
                y:0.4
            },
            texture: "TPIRsubtitle"
        },
        parent: "baseGameContainer",
    },
	Game2_GameTextFrame: {
        landscape: {
            x: 560,
			y: 352,
            texture: "Game2_GameTextFrame"
        },
        portrait: {
            x: 0,
            y: -130,
            texture: null
        },
        parent: "baseGameContainer",
    },
	Game1_GameTextFrame: {
        landscape: {
            x: 560,
            y: 53,
            texture: "Game1_GameTextFrame"
        },
        portrait: {
            x: 0,
            y: -130,
            texture: null
        },
        parent: "baseGameContainer",
	},
	Game1_RowNumber: {
		landscape: {
			x: 0,
			y: 0,
			texture: null
		},
		portrait: {
			x: 0,
			y: 514,
			texture: "Game1_RowNumber"
		},
		parent: "baseGameContainer",
	},
	Game2_RowNumber: {
		landscape: {
			x: 0,
			y: 0,
			texture: null
		},
		portrait: {
			x: 0,
			y: 634,
			texture: "Game2_RowNumber"
		},
		parent: "baseGameContainer",
	},
    Game3_RowNumber: {
        landscape: {
            x: 0,
            y: 0,
            texture: null
        },
        portrait: {
            x: 0,
            y: 858,
            texture: "Games3_RowNumber"
        },
        parent: "baseGameContainer",
    },
    Game4_RowNumber: {
        landscape: {
            x: 0,
            y: 0,
            texture: null
        },
        portrait: {
            x: 0,
            y: 1004,
            texture: "Games4_RowNumber"
        },
        parent: "baseGameContainer",
    },
	bonus_meter_container: {
		landscape: {
			x: 0,
			y: 335,
		},
		portrait: {
			x: 569,
			y: 332,
		},
		parent: "baseGameContainer",
		container: true
	},
	wheel_meter_container: {
		landscape: {
			x: 280,
			y: 472,
		},
		portrait: {
			x: 450,
			y: 213,
		},
		parent: "baseGameContainer",
		container: true
	},
	game1_container: {
		landscape: {
			x: 395,
			y: 111,
		},
		portrait: {
			x: -176,
			y: 390,
		},
		parent: "baseGameContainer",
		container: true
	},
	game2_container: {
		landscape: {
			x: 395,
			y: 223,
		},
		portrait: {
			x: 395,
			y: 184,
		},
		parent: "baseGameContainer",
		container: true
	},
	game3_container: {
		landscape: {
			x: 713,
			y: 413,
		},
		portrait: {
			x: 148,
			y: 860,
		},
		parent: "baseGameContainer",
		container: true
	},
	game4_container: {
		landscape: {
			x: 713,
			y: 553,
		},
		portrait: {
			x: 148,
			y: 1006,
		},
		parent: "baseGameContainer",
		container: true
	},

	bonusMeterIcon1: {
		landscape: {
			x: 238,
			y: 80,
			texture: "CliffHangerIcon_Large"
		},
		portrait: {
			x: 59,
			y: 57,
			texture: "CliffHangerIcon_Large"
		},
		parent: "bonus_meter_container",
	},
	bonusMeterIcon2: {
		landscape: {
			x: 324,
			y: 70,
			texture: "CliffHangerIcon_Large"
		},
		portrait: {
			x: 121,
			y: 52,
			texture: "CliffHangerIcon_Large"
		},
		parent: "bonus_meter_container",
	},
	bonusMeterIcon3: {
		landscape: {
			x: 409,
			y: 60,
			texture: "CliffHangerIcon_Large"
		},
		portrait: {
			x: 184,
			y: 47,
			texture: "CliffHangerIcon_Large"
		},
		parent: "bonus_meter_container",
	},
	wheelIcon: {
		landscape: {
			x: 98,
			y: 94,
			texture: "ShowcaseShowdownIcon_lARGE"
		},
		portrait: {
			x: 73,
			y: 69,
			texture: "ShowcaseShowdownIcon_lARGE"
		},
		parent: "wheel_meter_container",
	},
	box1_game1: {
		landscape: {
			x: 378,
			y: 50,
		},
		portrait: {
			x: 380,
			y: 176,
		},
		parent: "game1_container"
	},
	box2_game1: {
		landscape: {
			x: 614,
			y: 50,
		},
		portrait: {
			x: 608,
			y: 176,
		},
		parent: "game1_container"
	},
	box3_game1: {
		landscape: {
			x: 846,
			y: 50,
		},
		portrait: {
			x: 836,
			y: 176,
		},
		parent: "game1_container"
	},
	box1_game2: {
		landscape: {
			x: 378,
			y: 164,
		},
		portrait: {
			x: 380,
			y: 298,
		},
		parent: "game2_container"
	},
	box2_game2: {
		landscape: {
			x: 614,
			y: 164,
		},
		portrait: {
			x: 608,
			y: 298,
		},
		parent: "game2_container"
	},
	box3_game2: {
		landscape: {
			x: 846,
			y: 164,
		},
		portrait: {
			x: 836,
			y: 298,
		},
		parent: "game2_container"
	},
	reveal_game3: {
		landscape: {
			x: 5,
			y: 0,
		},
		portrait: {
			x: 0,
			y: 0,
		},
		parent: "game3_container",
		container: true,
	},
	box1_game3: {
		landscape: {
			x: 196,
			y: -2,
		},
		portrait: {
			x: 181,
			y: 0,
		},
		parent: "game3_container",
		container: true
	},
	box2_game3: {
		landscape: {
			x: 365,
			y: -2,
		},
		portrait: {
			x: 348,
			y: 0,
		},
		parent: "game3_container",
		container: true
	},
	box3_game3: {
		landscape: {
			x: 533,
			y: -2,
		},
		portrait: {
			x: 517,
			y: 0,
		},
		parent: "game3_container",
		container: true
	},
	reveal_game4: {
		landscape: {
			x: 6,
			y: -2,
		},
		portrait: {
			x: 0,
			y: 0,
		},
		parent: "game4_container",
		container: true
	},
	box1_game4: {
		landscape: {
			x: 196,
			y: 0,
		},
		portrait: {
			x: 181,
			y: 0,
		},
		parent: "game4_container",
		container: true
	},
	box2_game4: {
		landscape: {
			x: 366,
			y: 0,
		},
		portrait: {
			x: 348,
			y: 0,
		},
		parent: "game4_container",
		container: true
	},
	box3_game4: {
		landscape: {
			x: 532,
			y: 0,
		},
		portrait: {
			x: 517,
			y: 0,
		},
		parent: "game4_container",
		container: true
	},

    bonusContainers : {
        landscape: {
            x:0,y:0,
        },
        portrait:{
            x:0,y:0,
        },
        parent: "baseStage"
    },

    bonusContainer_1: {
        landscape: {
            x: 9,
            y: 0,
        },
        portrait: {
            x: 0,
            y: 0,
        },
        anchor: {
            x:0.5,
            y:0.5
        },
        parent: "bonusContainers",
        container: true
    },
    bonusContainer_2: {
        landscape: {
            x: 9,
            y: 0,
        },
        portrait: {
            x: 0,
            y: 0,
        },
        anchor: {
            x:0.5,
            y:0.5
        },
        parent: "bonusContainers",
        container: true
    },
    bonusContainer_3: {
        landscape: {
            x: 9,
            y: 0,
        },
        portrait: {
            x: 0,
            y: 0,
        },
        anchor: {
            x:0.5,
            y:0.5
        },
        parent: "bonusContainers",
        container: true
    },
    bonusContainer_4: {
        landscape: {
            x: 9,
            y: 0,
        },
        portrait: {
            x: 0,
            y: 0,
        },
        anchor: {
            x:0.5,
            y:0.5
        },
        parent: "bonusContainers",
        container: true
    },
    bonusContainer_5: {
        landscape: {
            x: 9,
            y: 0,
        },
        portrait: {
            x: 0,
            y: 0,
        },
        anchor: {
            x:0.5,
            y:0.5
        },
        parent: "bonusContainers",
        container: true
    },
    bonusContainer_6: {
        landscape: {
            x: 9,
            y: 0,
        },
        portrait: {
            x: 0,
            y: 0,
        },
        anchor: {
            x:0.5,
            y:0.5
        },
        parent: "bonusContainers",
        container: true
    },
    bonusContainer_7: {
        landscape: {
            x: 0,
            y: 0,
        },
        portrait: {
            x: 0,
            y: 0,
        },
        anchor: {
            x:0.5,
            y:0.5
        },
        parent: "bonusContainers",
        container: true
    },
    bonusContainer_8: {
        landscape: {
            x: 0,
            y: 0,
        },
        portrait: {
            x: 0,
            y: 0,
        },
        anchor: {
            x:0.5,
            y:0.5
        },
        parent: "bonusContainers",
        container: true
    },
    bonusContainer_9: {
        landscape: {
            x: 0,
            y: 0,
        },
        portrait: {
            x: 0,
            y: 0,
        },
        anchor: {
            x:0.5,
            y:0.5
        },
        parent: "bonusContainers",
        container: true
    },
    bonusContainer_10: {
        landscape: {
            x: 0,
            y: 0,
        },
        portrait: {
            x: 0,
            y: 0,
        },
        anchor: {
            x:0.5,
            y:0.5
        },
        parent: "bonusContainers",
        container: true
    },
    bonusContainer_11: {
        landscape: {
            x: 0,
            y: 0,
        },
        portrait: {
            x: 0,
            y: 0,
        },
        anchor: {
            x:0.5,
            y:0.5
        },
        parent: "bonusContainers",
        container: true
    },
    bonusContainer_12: {
        landscape: {
            x: 0,
            y: 0,
        },
        portrait: {
            x: 0,
            y: 0,
        },
        anchor: {
            x:0.5,
            y:0.5
        },
        parent: "bonusContainers",
        container: true
    },
    bonusContainer_13: {
        landscape: {
            x: 0,
            y: 0,
        },
        portrait: {
            x: 0,
            y: 0,
        },
        anchor: {
            x:0.5,
            y:0.5
        },
        parent: "bonusContainers",
        container: true
    },
    bonusContainer_14: {
        landscape: {
            x: 0,
            y: 0,
        },
        portrait: {
            x: 0,
            y: 0,
        },
        anchor: {
            x:0.5,
            y:0.5
        },
        parent: "bonusContainers",
        container: true
    },


	mountainStageContainer: {
		landscape: {
			x: 0,
			y: 0,
		},
		portrait: {
			x: -34,
			y: 540,
			scale: 0.6
		},
		parent: "mountainStage",
		container: true
	},
	mountainStageContainerPort: {
		landscape: {
			x: 0,
			y: 0,
		},
		portrait: {
			x: 0,
			y: 0,
		},
		parent: "mountainStage",
		container: true
	},
	SkyBG: {
		landscape: {
			x: 80,
			y: 60,
			texture: "SkyBG"
		},
		portrait: {
			x: 80,
			y: -40,
			texture: "port_SkyBG",
			scale: 1.66
		},
		parent: "mountainStageContainer",
	},
	NumberLineContainer: {
		landscape: {
			x: 105,
			y: 610,
		},
		portrait: {
			x: 105,
			y: 630,
		},
		parent: "mountainStageContainer",
		container: true
	},
	NumberLine: {
		landscape: {
			x: 130,
			y: 160,
			texture: "NumberLine"
		},
		portrait: {
			x: 130,
			y: 180,
			texture: "NumberLine"
		},
		parent: "mountainStageContainer",
	},

	CHgameFrame: {
		landscape: {
			x: 40,
			y: 0,
			texture: "CHgameFrame"
		},
		portrait: {
			x: 58,
			y: -80,
			scale: 1.66,
			texture: "port_CHgameFrame"
		},
		parent: "mountainStageContainer",
	},
	NumberCounterFrame: {
		landscape: {
			x: 80,
			y: 80,
			texture: "NumberCounterFrame"
		},
		portrait: {
			x: 1025,
			y: 555,
			texture: "NumberCounterFrame"
		},
		parent: "mountainStageContainer",
	},
	mountainSpinnerContainer: {
		landscape: {
			x: 37,
			y: 40,
		},
		portrait: {
			x: 37,
			y: 40,
		},
		parent: "NumberCounterFrame",
		container: true,
	},
	mountainSpinnerNum_1: {
		landscape: {
			x: 102,
			y: -14,
		},
		portrait: {
			x: 102,
			y: -14,
		},
		parent: "mountainSpinnerContainer",
		style: 'mountainNumberSpinner',
		string: null,
		type: 'text',
	},
	mountainSpinnerNum_2: {
		landscape: {
			x: 102,
			y: -14,
		},
		portrait: {
			x: 102,
			y: -14,
		},
		parent: "mountainSpinnerContainer",
		style: 'mountainNumberSpinner',
		string: null,
		type: 'text',
	},
	BonusWinMeter: {
		landscape: {
			x: 0,
			y: 0,
			texture: null,
		},
		portrait: {
			x: 380,
			y: -1090,
			texture: 'BonusWinMeter',
			scale: 1.66
		},
		parent: "mountainStageContainer",
	},
	mountainSpinnerContainerMask: {
		landscape: {
			x: 0,
			y: 0,
		},
		portrait: {
			x: 0,
			y: 0,
		},
		width: 200,
		height: 200,
		type: 'rectangle',
		fillAlpha: 0.5,
		parent: "mountainSpinnerContainer",
	},

	mountainValueMeter_1: {
		landscape: {
			x: 236,
			y: 634,
            anchor:0.5,
            texture: "CHWinMeterOff"
		},
		portrait: {
			x: 60,
			y: -530,
			scale: 1.66,
			texture: "CHWinMeterOff"
		},
		parent: "mountainStageContainer",
	},
	mountainValueMeter_2: {
		landscape: {
			x: 466,
			y: 570,
            anchor:0.5,
            texture: "CHWinMeterOff"
		},
		portrait: {
			x: 730,
			y: -530,
			scale: 1.66,
			texture: "CHWinMeterOff"
		},
		parent: "mountainStageContainer",
	},
	mountainValueMeter_3: {
		landscape: {
			x: 704,
			y: 500,
            anchor:0.5,
            texture: "CHWinMeterOff"
		},
		portrait: {
			x: 60,
			y: -360,
			scale: 1.66,
			texture: "CHWinMeterOff"
		},
		parent: "mountainStageContainer",
	},
	mountainValueMeter_4: {
		landscape: {
			x: 928,
			y: 430,
            anchor:0.5,
            texture: "CHWinMeterOff"
		},
		portrait: {
			x: 730,
			y: -360,
            scale: 1.66,
            texture: "CHWinMeterOff"
		},
		parent: "mountainStageContainer",
	},
	mountainValueMeter_5: {
		landscape: {
			x: 1070,
			y: 348,
            anchor:0.5,
            texture: "CHWinMeterOff"
		},
		portrait: {
			x: 400,
			y: -200,
			scale: 1.66,
			texture: "CHWinMeterOff"
		},
		parent: "mountainStageContainer",
	},
	mountainMask: {
		landscape: {
			x: 0,
			y: 150,
		},
		portrait: {
			x: 0,
			y: -50,
		},
		width: 1500,
		height: 500,
		type: 'rectangle',
		fillAlpha: 0.5,
		parent: "CHgameFrame",
	},
	WheelFrame_Left: {
		landscape: {
			x: 0,
			y: 80,
			texture: "WheelFrame_Left"
		},
		portrait: {
			x: 0,
			y: 220,
			texture: "WheelFrame"
		},
		parent: "wheelStageContainer",
	},
	WheelFrame_Right: {
		landscape: {
			x: 500,
			y: 80,
			texture: "WheelFrame_Right"
		},
		portrait: {
			x: 405,
			y: 1070,
			texture: "WinMeter",
			anchor: 0.5
		},
        type: 'sprite',
        parent: "wheelStageContainer",
	},
    ShowCaseMultiDisplay : {
        landscape: {
            x:520,
            y:310,
        },
		texture : null,
		anchor: 0.5,
        type: 'sprite',
        parent: 'WheelFrame_Right'
    },
    subTitleWheelFrame: {
        landscape: {
            x: 886,
            y: 532,
            scale: {
                x:0.6,
                y:0.6,
            },
            texture: "TPIRsubtitle"
        },
        portrait: {
            x: 0,
            y: 0,
        },
        parent: "wheelStageContainer",
    },
	RedArrow: {
		landscape: {
			x: 480,
			y: 340,
			texture: "RedArrow"
		},
		portrait: {
			x: 290,
			y: 566,
			texture: "RedArrow"
		},
		parent: "wheelStageContainer",
	},
	showcaseShowDownBanner: {
		landscape: {
			x: 0,
			y: 0,
			texture: null
		},
		portrait: {
			x: 40,
			y: 170,
			texture: "ShowcaseShowdownTitle"
		},
		parent: "wheelStageContainer",
	},


	/**
	* UI BUTTONS
	*/
	winUpToLabel: {
		landscape: {
			x: 372,
			y: 184,
		},
		portrait: {
			x: 334,
			y: 310,
			wordWrap: true,
			wordWrapWidth: 700,
		},
		parent: "baseGameContainer",
		style: 'winUpToLabel',
		string: 'win_up_to',
		type: 'text',
		anchor: 0.5,
	},
	winUpToValue: {
		landscape: {
			x: 376,
			y: 222,
			maxWidth: 165,
		},
		portrait: {
			x: 336,
			y: 347,
			maxWidth: 165,
		},
		parent: "baseGameContainer",
		style: 'prizeTextWinSmall',
		string: null,
		type: 'text',
		anchor: 0.5,
	},
    winUpToValue_2: {
        landscape: {
            x: 376,
            y: 222,
            maxWidth: 165,
        },
        portrait: {
            x: 336,
            y: 347,
            maxWidth: 165,
        },
        parent: "baseGameContainer",
        style: 'prizeTextWinSmall',
        string: null,
        type: 'text',
        anchor: 0.5,
    },
	row1_1: {
		landscape: {
			x: 0,
			y: 0,
		},
		portrait: {
			x: 0,
			y: 0,
		},
		parent: "box1_game1",
		style: 'prizeTextLose',
		string: null,
		type: 'text',
		nameOverride: 'prizeText'
	},
	row1_2: {
		landscape: {
			x: 0,
			y: 0,
		},
		portrait: {
			x: 0,
			y: 0,
		},
		parent: "box2_game1",
		style: 'prizeTextLose',
		string: null,
		type: 'text',
		nameOverride: 'prizeText'
	},
	row1_3: {
		landscape: {
			x: 0,
			y: 0,
		},
		portrait: {
			x: 0,
			y: 0,
		},
		parent: "box2_game1",
		style: 'prizeTextLose',
		string: null,
		type: 'text',
		nameOverride: 'prizeText'
	},
	row2_1: {
		landscape: {
			x: 0,
			y: 0,
		},
		portrait: {
			x: 0,
			y: 0,
		},
		parent: "box1_game2",
		style: 'prizeTextLose',
		string: null,
		type: 'text',
		nameOverride: 'prizeText'
	},
	row2_2: {
		landscape: {
			x: 0,
			y: 0,
		},
		portrait: {
			x: 0,
			y: 0,
		},
		parent: "box1_game2",
		style: 'prizeTextLose',
		string: null,
		type: 'text',
		nameOverride: 'prizeText'
	},
	row2_3: {
		landscape: {
			x: 0,
			y: 0,
		},
		portrait: {
			x: 0,
			y: 0,
		},
		parent: "box1_game2",
		style: 'prizeTextLose',
		string: null,
		type: 'text',
		nameOverride: 'prizeText'
	},
	game_1_2_info: {
		landscape: {
			x: 965,
			y: 76,
		},
		portrait: {
			x: 430,
			y: 490,
		},
		parent: "baseGameContainer",
		style: 'text_1_2_small',
		string: 'game_1_2',
		type: 'text',
		anchor:0.5
	},
	game_3_4_info: {
		landscape: {
			x: 965,
			y: 376,
		},
		portrait: {
			x: 410,
			y: 836,
		},
		parent: "baseGameContainer",
		style: 'text_1_2_small',
		string: 'game_3_4',
		type: 'text',
		anchor:0.5
	},
	winningSymbols: {
		landscape: {
			x: 744,
			y: 533,
		},
		portrait: {
			x: 168,
			y: 982,
		},
		parent: "baseGameContainer",
		style: 'text_3_4_header',
		string: 'luck_number',
		type: 'text',
		anchor:0.5
	},
	YourSymbols: {
		landscape: {
			x: 1098,
			y: 533,
		},
		portrait: {
			x: 524,
			y: 982,
		},
		parent: "baseGameContainer",
		style: 'text_3_4_header',
		string: 'your_number',
		type: 'text',
        anchor:0.5
	},
	row1: {
		landscape: {
			x: 602,
			y: 130,
		},
		portrait: {
			x: 42,
			y: 530,
		},
		parent: "baseGameContainer",
		style: 'text_3_4_header',
		string: 'row',
		type: 'text',
		anchor:0.5,
	},
	row2: {
		landscape: {
			x: 602,
			y: 243,
		},
		portrait: {
			x: 42,
			y: 651,
		},
		parent: "baseGameContainer",
		style: 'text_3_4_header',
		string: 'row',
		type: 'text',
        anchor:0.5,
	},
	row3: {
		landscape: {
			x: 602,
			y: 430,
		},
		portrait: {
			x: 42,
			y: 874,
		},
		parent: "baseGameContainer",
		style: 'text_3_4_header',
		string: 'row',
		type: 'text',
        anchor:0.5,
	},
	row4: {
		landscape: {
			x: 602,
			y: 571,
		},
		portrait: {
			x: 42,
			y: 1021,
		},
		parent: "baseGameContainer",
		style: 'text_3_4_header',
		string: 'row',
		type: 'text',
        anchor:0.5,
	},

	port_mountain_value_label_1: {
		landscape: {
			x: 0,
			y: 0,
		},
		portrait: {
			x: 53,
			y: 14,
		},
		parent: "mountainValueMeter_1",
		style: 'mountainNumberValuePort',
		string: null,
		type: 'text',
	},
	port_mountain_value_label_2: {
		landscape: {
			x: 0,
			y: 0,
		},
		portrait: {
			x: 53,
			y: 14,
		},
		parent: "mountainValueMeter_2",
		style: 'mountainNumberValuePort',
		string: null,
		type: 'text',
	},
	port_mountain_value_label_3: {
		landscape: {
			x: 0,
			y: 0,
		},
		portrait: {
			x: 53,
			y: 14,
		},
		parent: "mountainValueMeter_3",
		style: 'mountainNumberValuePort',
		string: null,
		type: 'text',
	},
	port_mountain_value_label_4: {
		landscape: {
			x: 0,
			y: 0,
		},
		portrait: {
			x: 53,
			y: 14,
		},
		parent: "mountainValueMeter_4",
		style: 'mountainNumberValuePort',
		string: null,
		type: 'text',
	},
	port_mountain_value_label_5: {
		landscape: {
			x: 0,
			y: 0,
		},
		portrait: {
			x: 53,
			y: 14,
		},
		parent: "mountainValueMeter_5",
		style: 'mountainNumberValuePort',
		string: null,
		type: 'text',
	},
	mountainWinBonusWin: {
		landscape: {
			x: 580,
			y: 96,
		},
		portrait: {
			x: 720,
			y: -690,
			scale: 1.3
		},
		parent: "mountainStageContainer",
		style: 'mountainPrize',
		string: 'bonusWin',
		type: 'text',
		anchor:0.5
	},
	mountainWinBonusWinValue: {
		landscape: {
			x: 580,
			y: 150,
		},
		portrait: {
			x: 730,
			y: -600,
		},
		anchor:0.5,
		parent: "mountainStageContainer",
		style: 'mountainTotalPrize',
		string: null,
		type: 'text',
	},
    TPIRlogoSS : {
        landscape: {
            x: 760,
            y: 320,
            texture: null
        },
        portrait: {
            x: 190,
            y: 870,
            scale:0.6,
            texture: null
        },
        parent: "wheelStageContainer",
	},
    TPIRsubtitleSS : {
        landscape: {
            x: 1020,
            y: 420,
            texture: null
        },
        portrait: {
            x: 400,
            y: 920,
            texture: null
        },
        parent: "wheelStageContainer",
	},
	/*
	* Overlays
	*/
	overlayContainer: {
		type: 'container',
		parent: '_BASE_APP',
	},
	helpOverlay: {
		type: "rectangle",
		fillAlpha: 0.65,
		fill: '0x001023',
		landscape: {width: 1440, height: 660},
		portrait: {width: 810, height: 1048},
		parent: "overlayContainer"
	},


	/*
	* TicketSelectBar
	*/
	ticketSelectBar: {
		type: 'rectangle',
		fillAlpha: 0.65,
        fill: '0x001023',
		landscape: {x: 0, y: 510, width: 1440, height: 150},
		portrait: {x: 0, y: 898, width: 810, height: 150},
		parent: '_BASE_APP',
	},
	ticketSelectCostValue: {
		type: 'text',
		landscape: { x: 720, y: 55 },
		portrait: { x: 405, y: 55 },
		anchor: 0.5,
		style: 'ticketSelectValue',
		parent: 'ticketSelectBar'
	},
	ticketSelectCostLabel: {
		type: 'text',
		landscape: { x: 720, y: 105 },
		portrait: { x: 405, y: 105 },
		anchor: 0.5,
		style: 'ticketSelectlabel',
		string: 'footer_ticketCost',
		parent: 'ticketSelectBar'
	},
	ticketCostDownButton: {
		type: 'button',
		landscape: { x: 420, y: 75 },
		portrait: { x: 200, y: 75 },
		textures: {
			enabled: 'NextActive',
			disabled: 'NextInactive',
			over: 'NextOver',
			pressed: 'NextPress',
		},
		scale:{x:-1},
		parent: "ticketSelectBar",
	},
	ticketCostUpButton: {
		type: 'button',
		landscape: { x: 1020, y: 75 },
		portrait: { x: 610, y: 75 },
		textures: {
			enabled: 'NextActive',
			disabled: 'NextInactive',
			over: 'NextOver',
			pressed: 'NextPress',
		},
		parent: "ticketSelectBar",
	},
	ticketCostIndicators: {
		type: 'container',
		landscape: { x: 720, y: 130 },
		portrait: { x: 405, y: 130 },
		parent: "ticketSelectBar",
	},

	buttonBar: {
		type: 'container',
		landscape: {x: 0, y: 660},
		portrait: {x: 0, y: 1048},
		parent: '_BASE_APP',
	},
	buttonBarBG: {
		type: 'rectangle',
        fillAlpha: 0.65,
        fill: '0x001023',
		landscape: {x: 0, y: 0, width: 1440, height: 100},
		portrait: {x: 0, y: 0, width: 810, height: 100},
		parent: 'buttonBar',
	},
	helpButton:     {
		type: 'button',
		landscape: {
			x: 1365,
			y: 50,
		},
		portrait: {
			x: 735,
			y: 50,
		},
		textures: {
			enabled: 'iActive',
			disabled: 'iInactive',
			over: 'iOver',
			pressed: 'iPress'
		},
		parent: "buttonBar",
	},
	homeButton: {
		type: 'button',
		landscape: { x: 75, y: 50 },
		portrait: { x: 75, y: 50 },
		textures: {
			enabled: 'HomeActive',
			over: 'HomeOver',
			pressed: 'HomePress',
		},
		parent: "buttonBar",
	},
	moveToMoneyButton: {
		type: 'button',
		string: 'button_moveToMoney',
        style: {
            enabled: 'buttonLabel',
            disabled: 'buttonLabel',
            over: 'buttonLabel',
            pressed: 'buttonLabelDown'
        },
		landscape: { x: 720, y: 50 },
		portrait: { x: 405, y: 50 },
		textures: {
			enabled: 'WideButtonActive',
			disabled: 'WideButtonInactive',
			over: 'WideButtonOver',
			pressed: 'WideButtonPress',
		},
		parent: "buttonBar",
	},
	buyButton: {
		type: 'button',
		string: 'button_buy',
        style: {
            enabled: 'buttonLabel',
            disabled: 'buttonLabel',
            over: 'buttonLabel',
            pressed: 'buttonLabelDown'
        },
		landscape: { x: 720, y: 50 },
		portrait: { x: 405, y: 50 },
		textures: {
			enabled: 'WideButtonActive',
			disabled: 'WideButtonInactive',
			over: 'WideButtonOver',
			pressed: 'WideButtonPress',
		},
		parent: "buttonBar",
	},
	tryButton: {
		type: 'button',
		string: 'button_try',
        style: {
            enabled: 'buttonLabel',
            disabled: 'buttonLabel',
            over: 'buttonLabel',
            pressed: 'buttonLabelDown'
        },
		landscape: { x: 720, y: 50 },
		portrait: { x: 405, y: 50 },
		textures: {
			enabled: 'WideButtonActive',
			disabled: 'WideButtonInactive',
			over: 'WideButtonOver',
			pressed: 'WideButtonPress',
		},
		parent: "buttonBar",
	},
	playAgainButton: {
		type: 'button',
		string: 'button_playAgain',
        style: {
            enabled: 'buttonLabel',
            disabled: 'buttonLabel',
            over: 'buttonLabel',
            pressed: 'buttonLabelDown'
        },
		landscape: { x: 720, y: 50 },
		portrait: { x: 405, y: 50 },
		textures: {
			enabled: 'WideButtonActive',
			disabled: 'WideButtonInactive',
			over: 'WideButtonOver',
			pressed: 'WideButtonPress',
		},
		parent: "buttonBar",
	},
	tryAgainButton: {
		type: 'button',
		string: 'button_tryAgain',
        style: {
            enabled: 'buttonLabel',
            disabled: 'buttonLabel',
            over: 'buttonLabel',
            pressed: 'buttonLabelDown'
        },
		landscape: { x: 720, y: 50 },
		portrait: { x: 405, y: 50 },
		textures: {
			enabled: 'WideButtonActive',
			disabled: 'WideButtonInactive',
			over: 'WideButtonOver',
			pressed: 'WideButtonPress',
		},
		parent: "buttonBar",
	},
	exitButton: {
		type: 'button',
		string: 'button_exit',
        style: {
            enabled: 'buttonLabel',
            disabled: 'buttonLabel',
            over: 'buttonLabel',
            pressed: 'buttonLabelDown'
        },
		landscape: { x: 720, y: 50 },
		portrait: { x: 405, y: 50 },
		textures: {
			enabled: 'WideButtonActive',
			disabled: 'WideButtonInactive',
			over: 'WideButtonOver',
			pressed: 'WideButtonPress',
		},
		parent: "buttonBar",
	},
	autoPlayButtonContainer: {
		type: 'container',
		landscape: {
			x: 720,
			y: 50,
		},
		portrait: {
			x: 405,
			y: 50
		},
		parent: "buttonBar",
	},
	autoPlayStartButton: {
		type: 'button',
		string: "button_autoPlay",
        style: {
            enabled: 'buttonLabel',
            disabled: 'buttonLabel',
            over: 'buttonLabel',
            pressed: 'buttonLabelDown'
        },
        textures: {
			enabled: 'WideButtonActive',
			disabled: 'WideButtonInactive',
			over: 'WideButtonOver',
			pressed: 'WideButtonPress'
		},
		parent: "autoPlayButtonContainer",
	},
    autoPlayStartButtonSheen: {
        type: 'rectangle',
        fill: 0xffffff,
        landscape: { x:-117, y:-40, width: 236, height: 80 },
        portrait: { x:-117, y:-40, width: 236, height: 80 },
		radius:15,
        parent: "autoPlayStartButton",
    },
	autoPlayStopButton: {
		type: 'button',
		string: "button_autoPlayStop",
		style: {
            enabled: 'buttonLabel',
            disabled: 'buttonLabel',
            over: 'buttonLabel',
            pressed: 'buttonLabelDown'
        },
		textures: {
			enabled: 'WideButtonRedActive',
			disabled: 'WideButtonInactive',
			over: 'WideButtonRedOver',
			pressed: 'WideButtonRedPress'
		},
		parent: "autoPlayButtonContainer",
	},




	/*
	* Result Plaque
	*/
	
	resultPlaque: {
		landscape: {
			x: 720,
			y: 350,
		},
		portrait: {
			x: 405,
			y: 560,
		},
		parent: "_BASE_APP",
		container: true,
        anchor: 0.5
    },
	resultPlaqueBG: {
		landscape: {
			x: 0,
			y: -20,
			texture: "WinPlaque"
		},
		portrait: {
			x: 0,
			y: -20,
			texture: "WinPlaque"
		},
		parent: "resultPlaque",
        anchor: 0.5
    },
	congratulationsText: {
        landscape: {
            x: 0,
            y: -190,
        },
        portrait: {
            x: 0,
            y: -190,
        },
        parent: "resultPlaque",
        style: 'plaqueHeader',
        string: 'message_congratulations',
		type: 'text',
		anchor: 0.5
	},
	winText: {
        landscape:{
			x:0,
			y:-120,
			scale:0.6
		},
        portrait:{
			x:0,
			y:-120,
			scale:0.6
        },
        style: 'Congrats',
        string: 'message_win',
        type: 'text',
        wordWrap: false,
		parent: "resultPlaque",
		anchor: 0.5
	},
	winResult: {
		landscape: {
			x: 0,
			y: 0,
		},
		portrait: {
			x: 0,
			y: 0,
		},
		parent: "resultPlaque",
	},
	totalWinText: {
		landscape:{
			x:0,
			y:-30,
			scale:0.6
		},
        portrait:{
			x:0,
			y:-30,
			scale:0.6
        },
        style: 'prizeTextWin',
        string: 'totalWin',
        type: 'text',
        wordWrap: false,
		parent: "resultPlaque",
		anchor: 0.5
	},
	loseText: {
		landscape: {
			x: 0,
			y: -30,
		},
		portrait: {
			x: 0,
			y: -30,
		},
		parent: "resultPlaque",
		style: 'Congrats',
		string: 'message_nonWin',
		type: 'text',
		anchor: 0.5
	},
	resultPlaqueCloseBtn: {
        type: 'button',
        landscape: {
            x: 0,
            y: 140,
        },
        portrait: {
            x: 0,
            y: 140,
        },
        anchor:0.5,
        string: "button_close",
        style: {
            enabled: 'buttonLabel',
            disabled: 'buttonLabel',
            over: 'buttonLabel',
            pressed: 'buttonLabelDown'
        },
        textures: {
            enabled: 'WideButtonActive',
            disabled: 'WideButtonInactive',
            over: 'WideButtonOver',
            pressed: 'WideButtonPress'
        },
        parent: "resultPlaque",
    },

		/*
	* Plaques
	*/
    plaque_container: {
        landscape: {
            x: 0,
            y: 0,
        },
        portrait: {
            x: 0,
            y: 0,
        },
        parent: "_BASE_APP",
        container: true
    },


    /*
	* Transition Plaque
	*/
    transitionContainer:{
        parent:'_BASE_APP'
    },
    transitionPlaque: {
        landscape: {
            x: 720,
            y: 350,
            texture:'WinPlaque'
        },
        portrait: {
            x: 405,
            y: 520,
            texture:'WinPlaque'
        },
        parent: "transitionContainer",
        anchor:0.5
    },
    transitionYouHaveWonText: {
        landscape:{
            x:0,
            y:-90
        },
        portrait:{
            x:0,
            y:-90
        },
        style: 'tutorialTitle',
        string: 'message_win',
        type: 'text',
        wordWrap: false,
        parent: "transitionPlaque",
        anchor: 0.5
    },
    transitionYouHaveWonValue: {
        landscape:{
            x:0,
            y:60
        },
        portrait:{
            x:0,
            y:60
        },
        parent: "transitionPlaque",
        anchor: 0.5
    },
    transitionYouHaveWonText_2: {
        landscape:{
            x:0,
            y:-90
        },
        portrait:{
            x:0,
            y:-90
        },
        style: 'tutorialTitle',
        string: 'message_win',
        type: 'text',
        wordWrap: false,
        parent: "transitionPlaque",
        anchor: 0.5
    },
    transitionYouHaveWonValue_2: {
        landscape:{
            x:0,
            y:60
        },
        portrait:{
            x:0,
            y:60
        },
        parent: "transitionPlaque",
        anchor: 0.5
    },
    transitionResult: {
        landscape: {
            x: 0,
            y: 140,
        },
        portrait: {
            x: 0,
            y: 140,
        },
        parent: "transitionPlaque",
    },
    transitionBaseGameTexture: {
        landscape:{
            x:-210,
            y:-100,
            texture:'TPIRlogo'
        },
        portrait:{
            x:-210,
            y:-100,
            texture:'TPIRlogo'
        },
        type: 'sprite',
        parent: "transitionPlaque",
        anchor: 0.5,
		scale: 0.8
    },
    transitionMountainGameTexture: {
        landscape:{
            x:150,
            y:-30,
        },
        portrait:{
            x:150,
            y:-30,
        },
        parent: "transitionPlaque",
        anchor: 0.5,
		scale:1.7
    },
    transitionMountainGameTexturePartA: {
        landscape:{
            x:-210,
            y:60,
            texture:'CH_1'
        },
        portrait:{
            x:-210,
            y:60,
            texture:'CH_1'
        },
        parent: "transitionMountainGameTexture",
        anchor: 0.5
    },
    transitionMountainGameTexturePartB: {
        landscape:{
            x:-210,
            y:110,
            texture:'CH_2'
        },
        portrait:{
            x:-210,
            y:110,
            texture:'CH_2'
        },
        parent: "transitionMountainGameTexture",
        anchor: 0.5
    },
    transitionPlayingNextText: {
        landscape:{
            x:0,
            y:-160,
        },
        portrait:{
            x:0,
            y:-160
        },
        style: 'plaqueHeader',
        string: 'playingNext',
        type: 'text',
        wordWrap: false,
        parent: "transitionPlaque",
        anchor: 0.5
    },
    transitionPlayingNextTexture: {
        landscape:{
            x:720,
            y:480,
        },
        portrait:{
            x:405,
            y:640,
        },
        parent: "transitionContainer",
        anchor: 0.5
    },
    transitionPlayingNextTextureA: {
        landscape:{
            x:0,
            y:-90,
            texture:null
        },
        portrait:{
            x:0,
            y:-90,
            texture:null
        },
        type: 'sprite',
        parent: "transitionPlayingNextTexture",
        anchor: 0.5
    },
    transitionPlayingNextTextureB: {
        landscape:{
            x:0,
            y:0,
            texture:null
        },
        portrait:{
            x:0,
            y:0,
            texture:null
        },
        type: 'sprite',
        parent: "transitionPlayingNextTexture",
        anchor: 0.5
    },


    /*
    * Help Plaque
    */
	help_plaque_container: {
		landscape: {
			x: 0,
			y: 0,
			pivot:{
				x:-10,
				y:0
			}
		},
		portrait: {
			x: 0,
			y: -70,
		},
		parent: "plaque_container",
		container: true
	},
	help_plaque: {
		landscape: {
			x: 0,
			y: 44,
			texture: "HowToPlayFrame"
		},
		portrait: {
			x: 24,
			y: 194,
			texture: "port_HowToPlayFrame"
		},
		parent: "help_plaque_container"
	},
    help_plaque_header: {
        landscape: {
            x: 82,
            y: -24,
            texture: "HowToPlayFrameHeader"
        },
        portrait: {
            x: 60,
            y: -43,
            texture: "port_HowToPlayFrameHeader"
        },
        parent: "help_plaque"
	},
	help_plaque_indicators: {
		landscape: {
			x: 720,
			y: 540,
		},
		portrait: {
			x: 405,
			y: 995,
		},
		parent: "help_plaque_container"
	},

	help_plaque_pages: {
		parent: "help_plaque",
		container: true
	},
	help_plaque_page_0: {
		parent: "help_plaque_pages",
		container: true
	},
	help_plaque_page_1: {
		landscape:{x:0,y:60},
		parent: "help_plaque_pages",
		container: true
	},
	help_plaque_page_2: {
		landscape:{x:0,y:40},
		parent: "help_plaque_pages",
		container: true
	},
	tutorial_0: {
		landscape: {
			x: 720,
			y: 130,
		},
		portrait: {
			x: 400,
			y: 270,
		},
		parent: "help_plaque_page_2",
		style: 'tutorialBody',
		string: 'tutorial_0',
		type: 'text',
		anchor: 0.5
	},
	HowToPlaySplash: {
		landscape: {
			x: 720,
			y: 394,
			texture: "HowToPlaySplash"
		},
		portrait: {
			x: 405,
			y: 620,
			texture: "port_HowToPlaySplash"
		},
		anchor: 0.5,
		parent: "help_plaque_page_0",
	},
	tutorial_splash: {
		landscape: {
			x: 720,
			y: 300,
			wordWrapWidth: 600,
		},
		portrait: {
			x: 404,
			y: 560,
			wordWrapWidth: 380,
		},
		parent: "help_plaque_page_0",
		style: 'tutorialHeading',
		string: 'tutorial_splash',
		type: 'text',
		anchor: 0.5,
		wordWrap: true,
	},
	CH_Meter: {
		landscape: {
			x: 960,
			y: 75,
		},
		portrait: {
			x: 420,
			y: 285,
		},
		texture: "CH_Meter",
		scale: 0.6,
		parent: "help_plaque_page_2",
	},
	SS_Meter: {
		landscape: {
			x: 160,
			y: 80,
		},
		portrait: {
			x: 90,
			y: 295,
		},
		texture: "SS_Meter",
		scale: 0.6,
		parent: "help_plaque_page_2",
	},
	CliffhangersLogo: {
		landscape: {
			x: 720,
			y: 210,
			texture: "CliffhangersLogoo"
		},
		portrait: {
			x: 400,
			y: 450,
			texture: "CliffhangersLogoo"
		},
		anchor: 0.5,
		parent: "help_plaque_page_2",
	},
	ShowcaseShowdownLogo: {
		landscape: {
			x: 720,
			y: 360,
			scale: 1,
			texture: "ShowcaseShowdownLogo"
		},
		portrait: {
			x: 410,
			y: 715,
			scale: 0.9,
			texture: "Text_Showcase",
		},
		anchor: 0.5,
		parent: "help_plaque_page_2",
	},
	ShowcaseShowdownLogoPort: {
		landscape: {
			visible: false,
		},
		portrait: {
			visible: true,
			x: 410,
			y: 775,
		},
		texture: "Text_Showdown",
		scale: 0.9,
		anchor: 0.5,
		parent: "help_plaque_page_2",
	},

    /**
	 * SCORE PLAQUE
     */
	/*****************************************/
	close_help_btn: {
		type: 'button',
		landscape: {
			x: 720,
			y: 590,
			pivot:{
				x:10,
				y:0
			}
		},
		portrait: {
			x: 405,
			y: 1050,
		},
		string: "button_close",
        style: {
            enabled: 'buttonLabel',
            disabled: 'buttonLabel',
            over: 'buttonLabel',
            pressed: 'buttonLabelDown'
        },
		textures: {
			enabled: 'WideButtonActive',
			disabled: 'WideButtonInactive',
			over: 'WideButtonOver',
			pressed: 'WideButtonPress'
		},
		parent: "help_plaque_container",
	},
	audioButtonContainer: {
		type: 'container',
		landscape: {
			x: 73,
			y: 592,
		},
		portrait: {
			x: 94,
			y: 1050,
		},
		parent: "help_plaque_container",
	},
	audio_on_btn: {
		type: 'button',
		textures: {
			enabled: 'VolOnActive',
			disabled: 'VolOnInactive',
			over: 'VolOnOver',
			pressed: 'VolOnPress'
		},
		parent: "audioButtonContainer",
	},
	audio_off_btn: {
		type: 'button',
		textures: {
			enabled: 'VolOffActive',
			disabled: 'VolOffInactive',
			over: 'VolOffOver',
			pressed: 'VolOffPress'
		},
		parent: "audioButtonContainer",
	},
	next_btn: {
		type: 'button',
		landscape: {
			x: 1330,
			y: 375,
			textures: {
				enabled: 'NextActive',
				disabled: 'NextInactive',
				over: 'NextOver',
				pressed: 'NextPress'
			},
		},
		portrait: {
			x: 722,
			y: 640,
			textures: {
				enabled: 'port_NextActive',
				disabled: 'port_NextInactive',
				over: 'port_NextOver',
				pressed: 'port_NextPress'
			},
		},
		parent: "help_plaque_container",
	},
	back_btn: {
		type: 'button',
		landscape: {
			x: 95,
			y: 375,
			textures: {
				enabled: 'BackActive',
				disabled: 'BackInactive',
				over: 'BackOver',
				pressed: 'BackPress'
			},
		},
		portrait: {
			x: 94,
			y: 640,
			textures: {
				enabled: 'port_BackActive',
				disabled: 'port_BackInactive',
				over: 'port_BackOver',
				pressed: 'port_BackPress'
			},
		},
		parent: "help_plaque_container",
	},
	tutorial_1: {
		landscape: {
			x: 720,
			y: 200,
			wordWrapWidth: 900,
		},
		portrait: {
			x: 405,
			y: 480,
			wordWrapWidth: 500,
		},
			wordWrap: true,
		parent: "help_plaque_page_1",
		style: 'tutorialBody',
		string: 'tutorial_1',
		type: 'text',
		anchor: 0.5,
	},
	tutorial_2: {
		landscape: {
			x: 720,
			y: 360,
			wordWrapWidth: 900,
		},
		portrait: {
			x: 405,
			y: 730,
			wordWrapWidth: 500,
		},
		wordWrap: true,
		parent: "help_plaque_page_1",
		style: 'tutorialBody',
		string: 'tutorial_2',
		type: 'text',
		anchor: 0.5,
	},
	tutorial_3: {
		landscape: {
			x: 720,
			y: 240,
			wordWrapWidth: 950,
		},
		portrait: {
			x: 400,
			y: 480,
			wordWrapWidth: 500,
		},
		parent: "help_plaque_page_2",
		wordWrap: true,
		style: 'tutorialBody',
		string: 'tutorial_3',
		anchor: { x: 0.5 },
		type: 'text',
	},
	tutorial_4: {
		landscape: {
			x: 720,
			y: 380,
			wordWrapWidth: 950,
		},
		portrait: {
			x: 400,
			y: 805,
			wordWrapWidth: 650,
		},
		parent: "help_plaque_page_2",
		style: 'tutorialBody',
		wordWrap: true,
		string: 'tutorial_4',
		anchor: { x: 0.5 },
		type: 'text',
	},
	tutorial_title: {
		landscape: {
			x: 720,
			y: 60,
		},
		portrait: {
			x: 420,
			y: 190,
		},
		parent: "help_plaque_container",
		style: 'tutorialHeading',
		string: 'tutorial_title',
		anchor: 0.5,
		type: 'text',
	},

	error_plaque_container: {
		landscape: {
			x: 0,
			y: 0,
		},
		portrait: {
			x: 0,
			y: -70,
		},
		parent: "plaque_container",
	},
	error_plaque: {
		landscape: {
			x: 0,
			y: 44,
			texture: "HowToPlayFrame"
		},
		portrait: {
			x: 24,
			y: 194,
			texture: "port_HowToPlayFrame"
		},
		parent: "error_plaque_container"
	},
	error_plaque_text: {
		type: 'text',
		anchor: 0.5,
		style: "errorMessage",
		landscape: {
			x: 720,
			y: 375,
			wordWrapWidth: 1000,
		},
		portrait: {
			x: 405,
			y: 650,
			wordWrapWidth: 700,
		},
		parent: "error_plaque_container"
	},
	close_error_btn: {
		type: 'button',
		landscape: {
			x: 720,
			y: 590,
		},
		portrait: {
			x: 405,
			y: 1050,
		},
		string: "button_exit",
        style: {
            enabled: 'buttonLabel',
            disabled: 'buttonLabel',
            over: 'buttonLabel',
            pressed: 'buttonLabelDown'
        },
		textures: {
			enabled: 'WideButtonActive',
			disabled: 'WideButtonInactive',
			over: 'WideButtonOver',
			pressed: 'WideButtonPress'
		},
		parent: "error_plaque_container",
	},
    timeoutExitButton: {
        type: 'button',
        landscape: {
            x: 800,
            y: 590,
        },
        portrait: {
            x: 365,
            y: 1050,
        },
        string: "button_exit",
        style: {
            enabled: 'buttonLabel',
            disabled: 'buttonLabel',
            over: 'buttonLabel',
            pressed: 'buttonLabelDown'
        },
        textures: {
            enabled: 'WideButtonActive',
            disabled: 'WideButtonInactive',
            over: 'WideButtonOver',
            pressed: 'WideButtonPress'
        },
        parent: "error_plaque_container",
    },
    timeoutContinueButton: {
        type: 'button',
        landscape: {
            x: 640,
            y: 590,
        },
        portrait: {
            x: 465,
            y: 1050,
        },
        string: "button_exit",
        style: {
            enabled: 'buttonLabel',
            disabled: 'buttonLabel',
            over: 'buttonLabel',
            pressed: 'buttonLabelDown'
        },
        textures: {
            enabled: 'WideButtonActive',
            disabled: 'WideButtonInactive',
            over: 'WideButtonOver',
            pressed: 'WideButtonPress'
        },
        parent: "error_plaque_container",
    },


	
	/*
	* Footer
	*/
	footerContainer: {
		type: 'contianer',
		landscape: { x: 0, y: 760 },
		portrait: { x: 0, y: 1148 },
		parent: '_BASE_APP',
	},
	footerBar: {
		type: 'rectangle',
		fill: 0x000000,
		landscape: { width: 1440, height: 50 },
		portrait: { width: 810, height: 80 },
		parent: 'footerContainer',
	},

	networkActivity: {
		type: 'animatedSprite',
		landscape: { x: 720, y: 405 },
		portrait: { x: 405, y: 614 },
		anchor: 0.5,
		textures: 'loaderAnim',
		parent: '_BASE_APP',
	}
});
