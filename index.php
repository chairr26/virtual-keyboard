<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="keyboard.css">
</head>
<body>

    <form id="myForm">
        <label for="autoDisplayCheckbox">
            <input type="checkbox" id="autoDisplayCheckbox"> Auto Display Keyboard
        </label>

        <label for="firstName">First Name:</label>
        <input type="text" id="firstName" name="firstName" required>

        <label for="lastName">Last Name:</label>
        <input type="text" id="lastName" name="lastName" required>

        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>

        <button type="button" onclick="showVirtualKeyboard()">Show Virtual Keyboard</button>
        <button type="submit">Submit</button>
    </form>

    <div id="virtualKeyboard" class="virtual-Keyboard">
    </div>
<script type="text/javascript" src="keyboard.js"></script>

</body>
</html>
