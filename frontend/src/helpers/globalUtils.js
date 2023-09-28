export default {
    capitalize: function (string) {
        if(string === undefined)
            return
        string = string.toLowerCase()
        return string.charAt(0).toUpperCase() + string.slice(1);
    },
    isStringEmpty: function (str){
        return str.trim().length === 0
    },
    split: function (str){
        return  str.split(',').map(item => item.trim());
    },
}