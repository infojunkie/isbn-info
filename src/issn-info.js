#!/usr/bin/env node
import path from 'path';
import meow from 'meow';
import issn from 'issn';

// https://stackoverflow.com/a/54577682/209184
function isMochaRunning(context) {
  return ['afterEach','after','beforeEach','before','describe','it'].every(function(functionName) {
    return context[functionName] instanceof Function;
  });
}

if (!isMochaRunning(global)) {
  const OPTIONS = meow(`
    Usage: ${path.basename(process.argv[1])} <issn>
    `, {
      flags: {
        quiet: {
          type: 'boolean',
          alias: 'q',
          default: false
        },
        help: {
          type: 'boolean',
          alias: 'h'
        },
        version: {
          type: 'boolean',
          alias: 'v'
        }
      }
    }
  );

  if (OPTIONS.flags['help'] || !OPTIONS.input.length) {
    OPTIONS.showHelp();
  }

  (async () => {
    try {
      const output = await issnInfo(OPTIONS.input[0], OPTIONS);
      console.log(output);
    } catch (e) {
      if (!OPTIONS.flags['quiet']) {
        console.error(e.message);
      }
      process.exit(1);
    }
  })();
}

export async function issnInfo(input, OPTIONS) {
  return new Promise(function(resolve, reject) {
    if (!issn(input)) {
      reject(new Error(`Not a valid ISSN: ${input}`));
    } else {
      const url = `https://portal.issn.org/resource/ISSN/${input}`;
    }
  });
}
