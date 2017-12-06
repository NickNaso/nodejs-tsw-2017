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
            } else {
                // No callback function has been passed in, return a Promise
                // to the caller.
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        // If an error occurred, call the reject function
                        // passing the error as parameter, otherwise, call the
                        // resolve function passing the result as parameter.
                        err ? reject(err) : resolve(person)
                    }, delay)
                })
            }
        }
    }
}

async function run () {
    let peopleDbHandler = dbHandler(peopleDb)
    console.log('[BEFORE] Code before db call.')
    try {
        let person = await peopleDbHandler.findPersonByName('Nicola')
        console.log('Person found =>', person)
    } catch (err) {
        console.log('Error =>', err)
    }
}

run()