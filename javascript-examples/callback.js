'use strict'

let peopleDb = [{
    name: 'Mauro'
}, {
    name: 'Nicola'
}, {
    name: 'Alan'
}, {
    name: 'Phil'
}]

function dbHandler(db) {
    const simulateError = (error = false) => {
        if (error) {
            return new Error('Something bad happened.')
        }
        return false
    }
    return {
        findPersonByName: function (name, cb) {
            let person = db.find(el => {
                return el.name === name
            })
            // This has the sole purpose of simulating a database error.
            let err = simulateError()
            let delay = 3000
            if (typeof cb === 'function') {
                // A callback function has been passed in.
                setTimeout(() => {
                    // If an error occurred, execute the callback passing
                    // the error as parameter, otherwise, execute the
                    // callback passing null as the first parameter and the
                    // result as the second one.
                    err ? cb(err) : cb(null, person)
                }, delay)
            }
        }
    }
}

const printErrorOrPerson = (err, result) => {
    if (err) {
        console.log('[INSIDE] Error =>', err)
        // Dispatch the error to an error handler.
        return
    }
    // Go on and do something with result.
    console.log('[INSIDE] Person found =>', result)
}

const peopleDbHandler = dbHandler(peopleDb)
console.log('[BEFORE] Code before db call.')
peopleDbHandler.findPersonByName('Mauro', printErrorOrPerson)
console.log('[AFTER] Code after db call.')