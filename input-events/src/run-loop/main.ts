// creates very basic UI Toolkit run loop

// dig into SimpleKit to pull out the simulated "raw" events
// and simulated "window system" event loop
// *** WARNING *** This is non-standard way to import from SimpleKit
import {
  createWindowingSystem,
  FundamentalEvent,
} from "../../../simplekit/src/windowing-system";

// this is a very simple UI toolkit run loop
function runLoop(eventQueue: FundamentalEvent[], time: number) {
  // process all fundamental events in the queue
  while (eventQueue.length > 0) {
    const e = eventQueue.shift();
    if (!e) continue;

    // just log for now, but real run look will translate these
    console.log(e);
  }

  // many other UI toolkit things will go in here ...
}

// create the simulated windowing system with
// this UI Toolkit run loop
createWindowingSystem(runLoop);
