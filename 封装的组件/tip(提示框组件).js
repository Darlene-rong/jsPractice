(function($) {
  //提示框组件的封装
   $.fn.zrTip = function(options) {
       var opts = $.extend($.fn.zrTip.defaults,options, options, $.fn.zrTip.methods);
       $(this).data('tipData',JSON.stringify(opts));//保存为字符串类型
       $(this).on(opts.type,function() {
         var params = JSON.parse($(this).data('tipData')); //转换为json格式
         var newOpts = $.extend(params, $.fn.zrTip.parseJson.call(this));
         opts.init(newOpts, this);
       });
       
   };
   $.fn.zrTip.methods = {
     init: function(opts,targetDom) {
       var $tip = this.template(opts);
       this._position($tip,targetDom);
       this._methods($tip, targetDom);
     },
     _position: function($tip, targetDom) {
       var left = ($(targetDom).offset().left +$(targetDom).width()/2)-$tip.width()/2;
       var top = $(targetDom).offset().top-$tip.outerHeight(true)-$(window).scrollTop()-10;
       $tip.css({
         left: left,
         top: top
       });
     },
     _methods: function($tip, targetDom) {
       $(window).scroll(function() {
         $tip.remove();
       })
       $tip.on('mouseleave', function() {
         $(this).remove();
       });
       $(targetDom).on('mouseleave', function() {
         $tip.fadeOut().remove();
       });
     },
     template: function(opts) {
       var html = ` <div class="zrui_tip" id="${opts.id}">
           <span>${opts.tip}</span>
           <div class="zrui_tip_cron"></div>
         </div>`;
       var tipDom = $(html);
       $(".zrui_tip").remove();
       $("body").append(tipDom);
       return tipDom;
     }
   };
   $.fn.zrTip.defaults = {
     type: 'click'
   };
   $.fn.zrTip.parseJson = function(obj) {
     console.log();
     var tip = $(this).attr("tip");
     return {
       'tip': tip
     }
   }
})(jQuery);
