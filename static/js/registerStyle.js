document.addEventListener("DOMContentLoaded", function () {
    var current = null;

    function animatePath(offset, dasharray = '240 1386') {
        if (current) current.pause();
        current = anime({
            targets: 'path',
            strokeDashoffset: {
                value: offset,
                duration: 700,
                easing: 'easeOutQuart'
            },
            strokeDasharray: {
                value: dasharray,
                duration: 700,
                easing: 'easeOutQuart'
            }
        });
    }

    document.querySelector('#apellido1').addEventListener('focus', () => animatePath(0));
    document.querySelector('#nombre').addEventListener('focus', () => animatePath(-336));
    document.querySelector('#email').addEventListener('focus', () => animatePath(-672));
});
