new Typewriter('#yes', {
    strings: ['Double your Bitcoins now'],
    autoStart: true,
    loop:true,
});
function validate() {
    var address = document.getElementById('a')
    var err = document.getElementById('n')
    var valid = new RegExp('^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$')
    if (valid.test(address.value) === true) {
        err.innerHTML = 'valid address';
        err.style.color = 'green';
        err.style.borderColor = 'green'
    } else {
        err.innerHTML = 'invalid address'
    }
}

$('.ui.accordion')
    .accordion()
;
$('.ui.dropdown')
    .dropdown()
;