define(function(require) {
  var stateMap = require('./stateMap');
  var SKBeInstant = require('skbJet/component/SKBeInstant/SKBeInstant');

  var SUBSTATES = {
    ENTER: 'ENTER',
    MAIN: 'MAIN',
    EXIT: 'EXIT',
  };

  var handlers = {
    1: {
      BUY: {
        ticketReady: {},
      },
      TRY: {
        ticketReady: {},
      },
      ticketReady: {},
    },
    2: {
      BUY: {
        ticketReady: {},
        normal: {},
      },
      TRY: {
        ticketReady: {},
        normal: {},
      },
      ticketReady: {},
      normal: {},
    },
    BUY: {
      ticketReady: {},
      normal: {},
    },
    TRY: {
      ticketReady: {},
      normal: {},
    },
    ticketReady: {},
    normal: {},
  };

  var currentState = 'ENTRY';

  /**
   * @function transitionState
   * @description Update the current state using the appropriate state map, checking if the 
   * requested transition is valid. Uses the default nextState if none is provided.
   * @param {number} phase The Phase number (1 or 2) of the state map to use.
   * @param {string} nextState An optional state to transition to.
   */
  function transitionState(phase, nextState) {
    var activeStateMap = stateMap[phase];

    // If nextState was not provided...
    if (nextState === undefined) {
      // ...update the state to the first allowed next state of the current state
      currentState = activeStateMap[currentState][0];
    } else {
      // If nextState was provided, check it is an allowed next state of the current state
      if (activeStateMap[currentState].indexOf(nextState) < 0) {
        throw new Error(
          'Invalid state `' + nextState + '` requested from current state `' + currentState + '`'
        );
      }
      // and update the state to the new one
      currentState = nextState;
    }
  }


  /**
   * @function findHandler
   * @description Traverse the handler tree from leaf to root looking for the first handler group
   * for the current state which includes a handler for the requested sub-state. Checks from most
   * specific to most generic.
   * @param {number} ph The current Phase.
   * @param {string} wT The current wagerType.
   * @param {string} gT The current gameType.
   * @param {string} subState The subState to return a handler for.
   * @return {function|void} The matched sub-state handler or undefined if no match was found.
   */
  function findHandler(ph, wT, gT, subState) {
    return (
      (handlers[ph][wT][gT][currentState] && handlers[ph][wT][gT][currentState][subState]) ||
      (handlers[ph][wT][currentState] && handlers[ph][wT][currentState][subState]) ||
      (handlers[ph][currentState] && handlers[ph][currentState][subState]) ||
      (handlers[wT][gT][currentState] && handlers[wT][gT][currentState][subState]) ||
      (handlers[wT][currentState] && handlers[wT][currentState][subState]) ||
      (handlers[gT][currentState] && handlers[gT][currentState][subState]) ||
      (handlers[currentState] && handlers[currentState][subState])
    );
  }

  /**
   * @function logState
   * @description Logs the current state dimension values to the console.
   * @param {string} currentState The current state name.
   * @param {string} subState The subState to log.
   * @param {number} phase The current Phase.
   * @param {string} wagerType The current wagerType.
   * @param {string} gameType The current gameType.
   */
  function logState(currentState, subState, phase, wagerType, gameType) {
    var sub = subState === SUBSTATES.MAIN ? '' : subState + ' ';
    var hue = subState === SUBSTATES.ENTER ? 218 : subState === SUBSTATES.EXIT ? 298 : 258;
    console.log(
      '%c<| ' + sub + currentState + ' |>%cPHASE' + phase + '%c' + wagerType + '%c' + gameType,
      'color: #fff; background: hsl(' + hue +', 99%, 57%); padding: 3px 5px; font-weight: bold;',
      'color: hsl(' + hue +', 99%, 60%); background: hsl(' + hue +', 99%, 87%); padding: 2px 3px;',
      'color: hsl(' + hue +', 99%, 60%); background: hsl(' + hue +', 99%, 92%); padding: 1px 3px;',
      'color: hsl(' + hue +', 99%, 60%); background: hsl(' + hue +', 99%, 97%); padding: 0px 3px;'
    );
  }


  /**
   * @function next
   * @description Transitions the state machine to the next state, calling the attached sub-state
   * handlers
   * @param {string} nextState The state to transition to. Uses the default next state if undefined. 
   * @param {any} data An optional param to pass through to the next state handler.
   */
  function next(nextState, data) {
    // Get the state map for the current jLotteryPhase. Phase2 ticketReady is treated as Phase1
    var wagerType = SKBeInstant.config.wagerType;
    var gameType = SKBeInstant.config.gameType;
    var phase = gameType === 'ticketReady' ? 1 : SKBeInstant.config.jLotteryPhase;

    // Traverse the handler tree from leaf to root looking for an EXIT sub-handler for the state
    // being transitioned from
    var exitHandler = findHandler(phase, wagerType, gameType, SUBSTATES.EXIT);

    // Update the current state
    transitionState(phase, nextState);

    // Traverse the handler tree from leaf to root looking for an ENTER sub-handler for the state
    // being transitioned to, as well as the main handler itself
    var enterHandler = findHandler(phase, wagerType, gameType, SUBSTATES.ENTER);
    var handler = findHandler(phase, wagerType, gameType, SUBSTATES.MAIN);

    // If no handler could be found for this state throw an error
    if (handler === undefined) {
      throw new Error('No handler defined for `' + currentState + '`');
    }

    // If an EXIT sub-handler exists for the previous state call that first
    if (exitHandler !== undefined) {
      logState(currentState, SUBSTATES.EXIT, phase, wagerType, gameType);
      exitHandler(data);
    }

    // If an ENTER sub-handler exists for the new state, call it before the main handler
    if (enterHandler !== undefined) {
      logState(currentState, SUBSTATES.ENTER, phase, wagerType, gameType);
      enterHandler(data);
    }

    // Call the main handler for the new state
    logState(currentState, SUBSTATES.MAIN, phase, wagerType, gameType);
    handler(data);
  }

  /**
   * @function handle
   * @description Attach a handler function to a sub-state at a given intersection
   * @param {function} handler The function to call when this sub-state is encountered.
   * @param {string} state Value for the State dimension.
   * @param {string} subState Value for the subState dimension.
   * @param {number} phase Value for the Phase dimension.
   * @param {string} wagerType Value for the wagerType dimension.
   * @param {string} gameType Value for the gameType dimension.
   */
  function handle(handler, state, subState, phase, wagerType, gameType) {
    // Traverse the handler tree one dimension at a time, skipping dimensions that weren't passed in
    var section = handlers[phase] || handlers;
    section = section[wagerType] || section;
    section = section[gameType] || section;

    // Ensure a handler group exists at the target intersection. Set an empty one if necessary.
    section[state] = section[state] || {};

    // If a handler already exists at this intersection throw an eror rather than overwriting it
    if (section[state][subState] !== undefined) {
      throw new Error(
        'Attempted to set more than one handler for' +
          ((phase && ' Phase' + phase) || '') +
          ((wagerType && ' ' + wagerType) || '') +
          ((gameType && ' ' + gameType) || '') +
          ((subState !== SUBSTATES.MAIN && ' ' + subState) || '') +
          (' `' + state + '` state')
      );
    }

    // Otherwise no handler exists here yet, so add one
    section[state][subState] = handler;
  }

  return {
    next: next,
    handle: handle,
    SUBSTATES: SUBSTATES,
  };
});
