// 关于项目中所有页面的js代码  业务需求
// 页面置顶
function zrUppage() {
  $(window).scroll( function() {
    var scrolltop = $(this).scrollTop();
    if(scrolltop >= 200) {
      $("#scroll_posts").fadeIn(1000);
    } else {
      $("#scroll_posts").fadeOut(1000);
    }
  });
}