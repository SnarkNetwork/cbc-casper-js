#!/usr/bin/env node
'use strict';

var ArgumentParser = require('argparse').ArgumentParser;

var parser = new ArgumentParser({
	version: '0.0.1',
	addHelp: true,
	description: 'cbc-casper-js'
});

var sims = parser.addSubparsers({
  title:'Simulations',
  dest:"sim"
});

/*
 * Random Binary Simulation
 */
var random = sims.addParser('random', {addHelp:true});

random.addArgument(
	[ '-n', '--validator-count' ],
	{
		defaultValue: 3,
		type: 'int',
		help: 'The number of validators for the simulation.'
	}
);

random.addArgument(
	[ '-s', '--safety-ratio' ],
	{
		defaultValue: 2/3,
		type: 'float',
		help: 'The safety ratio all validators must exceed before the sim ends.'
	}
);

var args = parser.parseArgs();

if(args.sim === "random") {
	let binary = require('./sims/binary');
	let simulator = new binary.BinarySimulator(
		args.validator_count,
		args.safety_ratio,
	);
	const result = simulator.simulate();
	const output = {
		intialConfig: result.initialConfig,
		decisions: result.decisions,
		majorityFlip: result.majorityFlip,
		messageLogLength: result.log.length,
	}
	console.log(JSON.stringify(output, null, 2));
}
