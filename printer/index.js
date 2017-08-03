
const Promise = require('bluebird')
const {exec} = require('child_process')
const temp = Promise.promisifyAll(require('temp'))
const fs = Promise.promisifyAll(require('fs'))

// Automatically track created files and clear them after completion
temp.track()

// Entry Point
module.exports = async function(content_string="810Test"){

	// Build the file asynchronously using Promises and yields
	let info = await temp.openAsync({suffix:".txt"})
	let content = await fs.writeAsync(info.fd, content_string, null, 'latin1')
	await fs.closeAsync(info.fd)

	// Manually create promise due to nonstandard callback
	let result = await new Promise( resolve => {

		// Execute driver
		exec(`./bin/tfunilx SendFileCmd ${info.path}`, resolve)
	})

	// Clean File
	temp.cleanupSync()

	// Log and return
	console.log("printed file: " + content_string)
	return result
}
