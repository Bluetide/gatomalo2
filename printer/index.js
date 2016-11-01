
const Promise = require('bluebird')
const {exec} = require('child_process')
const temp = Promise.promisifyAll(require('temp'))
const fs = Promise.promisifyAll(require('fs'))

// Automatically track created files and clear them after completion
temp.track()

const send_to_printer_generator = function*(content_string="810Test"){

	// Build the file asynchronously using Promises and yields
	let info = yield temp.openAsync({suffix:".txt"})
	let content = yield fs.writeAsync(info.fd, content_string, 'utf-8')
	yield fs.closeAsync(info.fd)

	// Manually create promise due to nonstandard callback
	let result = yield new Promise( resolve => {

		// Execute driver
		exec(`./tfunilx SendFileCmd ${info.path}`, resolve)
	})

	// Clean File
	temp.cleanupSync()

	// Log and return
	console.log(result)
	return result
}

module.exports = Promise.coroutine(send_to_printer_generator)
