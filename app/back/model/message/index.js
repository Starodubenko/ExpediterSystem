function Message() {
    this.sender = {};
    this.date = "";
    this.message = "";
    this.image = "";
}

Message.prototype.isBelongs = function(who){
    console.log(Message.sender == who.id)
};
