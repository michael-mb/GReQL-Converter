export default {
    capitalize: function (string) {
        if(string === undefined)
            return
        string = string.toLowerCase()
        return string.charAt(0).toUpperCase() + string.slice(1);
    },
}