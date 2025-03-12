define(function(require) {
    var msgBus = require('skbJet/component/gameMsgBus/GameMsgBus');
    var audioPlayer = require('skbJet/component/howlerAudioPlayer/howlerAudioSpritePlayer');
    var gameAudioMap = require('game/display/audioMap');

    require('com/gsap/TweenLite');
    require('com/gsap/TimelineLite');

    var Tween = window.TweenLite;
    var Timeline = window.TimelineLite;

    var audioMap = Object.keys(gameAudioMap).reduce(function normaliseAudioDef(map, soundName) {
        if (Array.isArray(gameAudioMap[soundName])) {
            map[soundName] = gameAudioMap[soundName];
        } else {
            map[soundName] = [soundName, gameAudioMap[soundName]];
        }
        return map;
    }, {});

    var groups = {};

    var queuedSounds = [];
    var soundAvailable = false;

    function soundOn() {
        audioPlayer.muteAll(false);
        msgBus.publish('Game.AudioOn');
    }

    function soundOff() {
        audioPlayer.muteAll(true);
        msgBus.publish('Game.AudioOff');
    }
    function enable() {
        audioPlayer.gameAudioControlChanged(false);
        soundOn();
    }

    function disable() {
        audioPlayer.gameAudioControlChanged(true);
        soundOff();
    }

    function consoleControlChanged(data) {
        if (data.option === 'sound') {
            if (data.value === '0') {
                soundOn();
            } else {
                soundOff();
            }
        }
    }
    msgBus.subscribe('jLotterySKB.onConsoleControlChanged', consoleControlChanged);

    function soundActivated(soundEnabled) {
        soundAvailable = true;
        audioPlayer.muteAll(!soundEnabled);
        // play any queued sounds now that they are able to play
        for (var i = 0; i < queuedSounds.length; i++) {
            audioPlayer.play(audioMap[queuedSounds[i]][0], audioMap[queuedSounds[i]][1], true);
        }
    }
    msgBus.subscribe('audioPlayer.playerSelectedWhenGameLaunch', soundActivated);

    function findGroup(groupName) {
        if (groups[groupName] === undefined) {
            var group = Object.keys(audioMap)
                .filter(function(soundName) {
                    return soundName.indexOf(groupName) === 0;
                })
                .sort();

            groups[groupName] = {
                sounds: group,
                index: -1,
            };
        }

        return groups[groupName];
    }

    // Playback controls

    function play(sound, loop, volume) {
        // default channel volume to 1 so it is reset if previously set for a different sound
        var vol = volume !== undefined ? volume : 1;

        // if sound is not yet available
        if (!soundAvailable) {
            // track looped sounds so they can be played later. Non-looped sounds are ignored
            if (loop && queuedSounds.indexOf(sound) === -1) {
                audioPlayer.volume(audioMap[sound][1], vol);
                queuedSounds.push(sound);
                return;
            }
        }

        // play the sound on the correct channel, passing through the loop param
        audioPlayer.play(audioMap[sound][0], audioMap[sound][1], loop);
        audioPlayer.volume(audioMap[sound][1], vol);
    }

    function stop(sound) {
        if (isPlaying(sound)) {
            audioPlayer.stopChannel(audioMap[sound][1]);
        }
        // dequeue the sound if queued
        if (queuedSounds.indexOf(sound) !== -1) {
            queuedSounds.splice(queuedSounds.indexOf(sound), 1);
        }
    }

    function fade(sound, duration, volume1, volume2) {
        return Tween.fromTo(
            {},
            duration,
            {
                volume: volume1,
            },
            {
                volume: volume2,
                onUpdate: function setChannelVol() {
                    audioPlayer.volume(audioMap[sound][1], this.target.volume);
                },
            }
        );
    }

    function fadeIn(sound, duration, loop) {
        play(sound, loop);
        return fade(sound, duration, 0, 1);
    }

    function fadeOut(sound, duration) {
        var tween = fade(sound, duration, 1, 0);
        tween.eventCallback('onComplete', function() {
            stop(sound);
        });
        return tween;
    }

    function crossFade(soundIn, soundOut, duration, loop) {
        return new Timeline({
            tweens: [fadeIn(soundIn, duration, loop), fadeOut(soundOut, duration)],
        });
    }

    function isPlaying(sound) {
        return audioPlayer.currentPlaying(audioMap[sound][1]) === audioMap[sound][0];
    }

    function exists(sound) {
        return audioMap[sound] !== undefined;
    }

    function playRandom(groupName, loop, volume) {
        // Get the group of sounds matching this name
        var group = findGroup(groupName);
        // Change to a random index that isn't the same as the previous one
        group.index =
            (group.index + 1 + Math.floor(Math.random() * (group.sounds.length - 1))) %
            group.sounds.length;
        // Play the randomly selected sound from the group
        play(group.sounds[group.index], loop, volume);
    }

    function playSequential(groupName, loop, volume) {
        // Get the group of sounds matching this name
        var group = findGroup(groupName);
        // Change to the next index, cycling back round at the end
        group.index = (group.index + 1) % group.sounds.length;
        // Play the randomly selected sound from the group
        play(group.sounds[group.index], loop, volume);
    }

    return {
        enable: enable,
        disable: disable,
        play: play,
        playRandom: playRandom,
        playSequential: playSequential,
        stop: stop,
        isPlaying: isPlaying,
        exists: exists,
        fade: fade,
        fadeIn: fadeIn,
        fadeOut: fadeOut,
        crossFade: crossFade,
    };
});
