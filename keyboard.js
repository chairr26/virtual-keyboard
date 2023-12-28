
let autoDisplayKeyboard = false;
let capsLockOn = false;
let shiftOn = false;
let activeInput;

function showVirtualKeyboard() {
    const virtualKeyboard = document.getElementById('virtualKeyboard');
    virtualKeyboard.style.display = 'block';
    createVirtualKeyboard();
}

function hideVirtualKeyboard() {
    const virtualKeyboard = document.getElementById('virtualKeyboard');
    virtualKeyboard.style.display = 'none';
}

function toggleCapsLock() {
    capsLockOn = !capsLockOn;
    createVirtualKeyboard();
}

function toggleShift() {
    shiftOn = !shiftOn;
    createVirtualKeyboard();
}

function backspaceFromActiveInput() {
    if (activeInput) {
        const value = activeInput.value;
        activeInput.value = value.substring(0, value.length - 1);
    }
}

function createVirtualKeyboard() {
    const virtualKeyboard = document.getElementById('virtualKeyboard');
    virtualKeyboard.innerHTML = '';

    const rows = [
        ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
        ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
        ['Caps Lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\''],
        ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'],
        ['Space', 'Hide Keyboard']
        ];

    rows.forEach(row => {
        const rowContainer = document.createElement('div');
        rowContainer.className = 'keyboard-row';

        row.forEach(key => {
            const button = document.createElement('button');
            button.textContent = key;
            button.className = 'keyboard-button';

            button.classList.add('keybutton');

            if (capsLockOn && key.length === 1 && /^[a-zA-Z]$/.test(key)) {
                button.classList.add('capsLockOn');
            }
            if (shiftOn && key === 'Shift') {
                button.classList.add('activebutton');
            }
            if (capsLockOn && key === 'Caps Lock') {
                button.classList.add('activebutton');
            }

            if (capsLockOn && shiftOn && key.length === 1 && /^[a-zA-Z0-9]$/.test(key)) {
                button.classList.add('shiftOn');
                button.classList.add('capsLockOff');
            }

            if (!capsLockOn && shiftOn && key.length === 1 && /^[a-zA-Z0-9]$/.test(key)) {
                button.classList.add('capsLockOn');
            }
            if (key === 'Hide Keyboard') {
                // document.getElementById('yourElementId').setAttribute('id', 'newElementId');
                button.id = "hideKeyboard";
                button.onclick = function() {
                    hideVirtualKeyboard();
                };
            }


            const changechar = ['~','!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+'];
            if(shiftOn && key.length === 1){
                if (/^[0-9]$/.test(key)) {
                    button.classList.add('shiftOn');
                    for (var i = 1; i <= 9; i++) {
                        if (key == i) {
                            button.textContent = changechar[i];
                        }
                    }
                    if (key === '0') {
                        button.textContent = ')';
                    }
                }else{

                    const keyMappingshow = {
                        '`': '~',
                        '0': ')',
                        '-': '_',
                        '=': '+',
                        '[': '{',
                        ']': '}',
                        '\\': '|',
                        ';': ':',
                        '\'': '"',
                        ',': '<',
                        '.': '>',
                        '/': '?'
                    };

                    if (keyMappingshow.hasOwnProperty(key)) {
                        button.textContent = keyMappingshow[key];
                    }
                }
            }
            if (key === 'Space') {
                button.classList.add('addspace');
            }

            button.addEventListener('click', () => {
                if (key === 'Space') {
                    insertKeyIntoActiveInput(' ');
                } else if (key === 'Caps Lock') {
                    toggleCapsLock();
                } else if (key === 'Backspace') {
                    backspaceFromActiveInput();
                }else if (key === 'Shift') {
                    toggleShift();
                } else {
                    insertKeyIntoActiveInput(key);
                }
            });
            rowContainer.appendChild(button);
        });
        virtualKeyboard.appendChild(rowContainer);
    });
    const hideButton = document.createElement('div');
    hideButton.id = 'hideKeyboard';
    hideButton.textContent = 'Hide Keyboard';
    hideButton.onclick = hideVirtualKeyboard;
    virtualKeyboard.appendChild(hideButton);
}



function insertKeyIntoActiveInput(key) {
    if (activeInput) {
        // Convert to uppercase if Caps Lock is on and Shift is off
        const isLetter = /^[a-zA-Z]$/.test(key);
        const isNumber = /^[0-9]$/.test(key);
        if (key === 'Hide Keyboard') {
            activeInput.value += '';
        }else{

            if (capsLockOn && shiftOn && isLetter) {
                activeInput.value += key.toLowerCase();
            } else if (capsLockOn && !shiftOn && isLetter) {
                activeInput.value += key.toUpperCase();
            } else if (!capsLockOn && shiftOn && isLetter) {
                activeInput.value += key.toUpperCase();
            } else if (shiftOn && isNumber) {
                        // Handle special characters when Shift is on
                if (key === '0') {
                    activeInput.value += ')';
                }else{

                    const specialCharacters = ['!', '@', '#', '$', '%', '^', '&', '*', '('];
                    const index = parseInt(key) - 1;
                    activeInput.value += specialCharacters[index];
                }
            } else {
                if (shiftOn) {
                    const keyMappings = {
                        '`': '~',
                        '0': ')',
                        '-': '_',
                        '=': '+',
                        '[': '{',
                        ']': '}',
                        '\\': '|',
                        ';': ':',
                        '\'': '"',
                        ',': '<',
                        '.': '>',
                        '/': '?'
                    };

                    if (keyMappings.hasOwnProperty(key)) {
                        activeInput.value += keyMappings[key];
                    }
                }else{
                    activeInput.value += key.toLowerCase();
                }
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const autoDisplayCheckbox = document.getElementById('autoDisplayCheckbox');
    autoDisplayCheckbox.addEventListener('change', () => {
        autoDisplayKeyboard = autoDisplayCheckbox.checked;
    });

    const inputFields = document.querySelectorAll('input');
    inputFields.forEach(inputField => {
        inputField.addEventListener('focus', () => {
            activeInput = inputField;
            if (autoDisplayKeyboard) {
                showVirtualKeyboard();
            }
        });
    });
});


virtualKeyboard.addEventListener('mousedown', function (e) {
    let offsetX = e.clientX - virtualKeyboard.getBoundingClientRect().left;
    let offsetY = e.clientY - virtualKeyboard.getBoundingClientRect().top;

    function moveAt(pageX, pageY) {
        virtualKeyboard.style.left = pageX - offsetX + 'px';
        virtualKeyboard.style.top = pageY - offsetY + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
        isDragging = true;
    }

    function onMouseUp() {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        isDragging = false;
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
});

virtualKeyboard.addEventListener('dblclick', function () {
    if (isDragging) {
        isDragging = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }
});

virtualKeyboard.addEventListener('click', function (e) {
        // Stop dragging on a single click
    if (isDragging) {
        isDragging = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }

        // Handle other click actions here if needed
});