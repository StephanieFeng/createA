this.imagePreview = function () {
    xOffset = 10;
    yOffset = 30;
    $("a.preview").hover(function (e) {
        this.t = this.title;
        this.title = "";
        var c = (this.t != "") ? "<br/>" + this.t : "";
        $("body").append("<p id='preview'><img src='" + this.href + "' alt='Image preview' />" + c + "</p>");
        $("#preview")
            .css("top", (e.pageY - xOffset) + "px")
            .css("left", (e.pageX + yOffset) + "px")
            .fadeIn("fast");
    },
        function () {
            this.title = this.t;
            $("#preview").remove();
        });
    $("a.preview").mousemove(function (e) {
        $("#preview")
            .css("top", (e.pageY - xOffset) + "px")
            .css("left", (e.pageX + yOffset) + "px");
    });
};

// starting the script on page load
$(document).ready(function () {
    imagePreview();
});

function saveComments() {
    if(!commentsFrom.nickname.value){
        alert('请输入您的昵称');
        return;
    }
    alert('谢谢你的留言');
}
