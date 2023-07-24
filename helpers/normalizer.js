module.exports = function(x,min,max){
    return (parseFloat(x)-parseFloat(min))/(parseFloat(max)-parseFloat(min));
}