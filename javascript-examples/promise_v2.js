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
        // This has the sole purpose of simulating a database error.
        if (error) {
            return new Error('Something bad happened.')
        }
        return false
    }
    const dbCall = (name, db) => {
        let err = simulateError()
        let response = {
            err: null,
            result: null
        }
        if (err) {
            response.err = err
        } else {
            response.result = db.find(el => {
                return el.name === name
            })
        }
        return response
    }
    return {
        findPersonByName: function (name, cb) {
            let delay = 3000
            if (typeof cb === 'function') {
                // A callback function has been passed in.
                setTimeout(() => {
                    let { err, result } = dbCall(name, db)
                    // If an error occurred, execute the callback passing
                    // the error as parameter, otherwise, execute the
                    // callback passing null as the first parameter and the
                    // result as the second one.
                    err ? cb(err) : cb(null, result)
                }, delay)
            } else {
                // No callback function has been passed in, return a Promise
                // to the caller.
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        let { err, result } = dbCall(name, db)
                        // If an error occurred, call the reject function
                        // passing the error as parameter, otherwise, call the
                        // resolve function passing the result as parameter.
                        err ? reject(err) : resolve(result)
                    }, delay)
                })
            }
        }
    }
}

const printPerson = person => {
    console.log('[INSIDE] Person found =>', person)
}

const printError = err => {
    console.log('Error =>', err)
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

// Promise style.
/* const promise = peopleDbHandler.findPersonByName('Alan')
    .then(printPerson)
    .catch(printError)
console.log('[AFTER] Code after promise handling.') */

// Callback style.
peopleDbHandler.findPersonByName('Alan', printErrorOrPerson)
console.log('[AFTER] Code after db call.')