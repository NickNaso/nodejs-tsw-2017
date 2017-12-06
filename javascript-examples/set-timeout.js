(function () {

    console.log('this is the start')

    setTimeout(function cb() {
        console.log('this is a msg from cb')
    })

    console.log('this is just a message')

    setTimeout(function cb1() {
        console.log('this is a msg from cb1')
    }, 0)

    console.log('this is the end')

})()