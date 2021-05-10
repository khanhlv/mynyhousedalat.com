function strlenFix(str) {
    while (str.length < 4) str = "0" + str;
    console.log(str);
    return str;
}

function convert() {
    var result = '';
    var source = document.forms["conversion"].elements["input"].value;
    if (document.forms["conversion"].elements["direction"].value == "0") {
        /* UTF-8 to entities */
        for (i = 0; i < source.length; i++) {
            charCode = source.charCodeAt(i);
            if (charCode <= 127) {
                result += source.charAt(i);
            } else {
                result += '\\u' + strlenFix(charCode.toString(16).toUpperCase());
            }
        }
    } else {
        var state = 0;
        var chars = 0;
        var value = ""; /* entities to UTF-8 */
        for (i = 0; i < source.length; i++) {
            switch (state) {
                case 0:
                    if (source.charAt(i) == '\\') {
                        state = 1;
                    } else {
                        result += source.charAt(i);
                    }
                    break;
                case 1:
                    if (source.charAt(i) == 'u') {
                        state = 2;
                        chars = 0;
                        value = "";
                    } else {
                        result += '\\' + source.charAt(i);
                        state = 0;
                    }
                    break;
                case 2:
                    chars++;
                    value += source.charAt(i);
                    if (chars >= 4) {
                        result += unescape("%u" + value);
                        state = 0;
                    }
                    break;
            }
        }

    }

    document.forms["conversion"].elements["output"].value = result;
}