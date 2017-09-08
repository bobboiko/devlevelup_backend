exports.cleanUpXml = function(input){
    let output = input
    console.log("/r/n", occurrences(output,"/r/n"))
    output = output.replace("\r\n", " ")
    output = output.replace("&#xD;", " ")
    
    return output
}

function occurrences (string, subString, allowOverlapping) {
    string += "";
    subString += "";
    if (subString.length <= 0) return (string.length + 1);

    var n = 0,
        pos = 0,
        step = allowOverlapping ? 1 : subString.length;

    while (true) {
        pos = string.indexOf(subString, pos);
        if (pos >= 0) {
            ++n;
            pos += step;
        } else break;
    }
    return n;
}
