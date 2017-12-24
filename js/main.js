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
    if (!commentsFrom.nickname.value) {
        alert('请输入您的昵称');
        return;
    }
    if (!commentsFrom.message.value) {
        alert('请输入您的留言');
        return;
    }
    var data = {
        "name": commentsFrom.nickname.value,
        "likeit": commentsFrom.likeit.value,
        "message": commentsFrom.message.value
    };
    $.post("http://www.z2hacademy.cn/user/publish/W984-1513502460/comments/add/", data, function (data) {
        alert('谢谢你的留言');
        refreshComments(0);
    });

}

var pageSize = 3;
var currentOffset = -1;
function fillData(data) {
    $('#page-content').empty();
    if (data.total > 0) {
        currentOffset = data.offset;
        $("#totalCount").text(data.total);
        data.data.forEach(function (element) {
            $('#page-content').append("<div style='margin-bottom:20px;'><ul><li class='col-md-1 col-sm-1'></li>" +
                "<li class='col-md-2 col-sm-2 col-xs-3'><img src='resource/people-icon.png'></li>" +
                "<li class='col-md-8 col-sm-8 col-xs-8'' style='padding-top:8px;'><p>" + element.uname + "</p><span>" + element.comments +
                "</span></li><li class='col-md-1 col-sm-1'></li><div class='clearfix'></div></ul>");
        }, this);
    } else {
        $('#page-content').html('还没有留言哦!');
        $("#totalCount").empty();
    }
}

function fillPagination(data) {
    var totalPages = Math.floor(data.total / pageSize) + 1;
    $('#pagination-comments').twbsPagination({
        totalPages: totalPages,
        visiblePages: 7,
        first: '第一页',
        prev: '前一页',
        next: '下一页',
        last: '最后一页',
        onPageClick: function (event, page) {
            var offset = (page - 1) * pageSize;
            if (offset == currentOffset) return;
            else currentOffset=offset;
            refreshComments(currentOffset);
        }
    });
}

function refreshComments(curoffset) {
    $.get("http://www.z2hacademy.cn/user/publish/W984-1513502460/comments/list/",
        { offset: curoffset, count: pageSize },
        function (data) {
            fillData(data);
            fillPagination(data);
        });
}

$(function(){refreshComments(0);});
