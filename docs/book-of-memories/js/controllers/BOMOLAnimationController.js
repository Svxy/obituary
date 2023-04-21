var bom = bom || {};
bom.animation = bom.animation || {};

(function(){
    
    function BOMAnimationController(config){
        this._init(config);
    }
    
    BOMAnimationController.prototype = {
        _init: function(config){
            var me = this;
            $.extend(me,config);
            me.lightCandles();
            setTimeout("animationController.executeAnimation()", 1000);
        },
        lightCandles:function(){
            var candles = $('.lit-candle');
            $.each(candles, function(){
                var flame = $("<img/>").addClass("candle-flame").attr("src","/book-of-memories/bom-themes/OL/candle-flame.png");
                var con = $("<div class='candle-flame-con'></div>").append( flame );
                $(this).append( con );
            });
        },
        executeAnimation:function(){
            var me = this;
            $( me.animationObject ).each(function(index,el){
                me.handleGenericChange( me.chooseRandomAnimation(), 0, el );
            });
        },
        chooseRandomAnimation:function(){
            return Math.floor(Math.random()*animation.length)
        },
        handleGenericChange:function(anId,step,el){
            var me = this;
            
            //end of animation, select new one
            if (animation[anId][step] == undefined){
                var randomAnimation = me.chooseRandomAnimation();
                me.handleGenericChange( randomAnimation, 0, el );
                return;
            }
            
            //make change list
            var preparedChanges = [];
            $.each( animation[anId][step].changes, function ( parameter, value) {
                switch ( parameter ){
                    case "width":
                        var offset = value / 2 * -1;
                        var topOffset = value - $(el).width();
                        topOffset *= -1;
                        
                        
                        //preparedChanges['left'] = "+="+offset,
                        //preparedChanges['width'] = "+="+value;
                        //preparedChanges = {"left":"+="+offset, 'width':"+="+value};
                        //preparedChanges = {"left":offset, 'width':value};
                        //preparedChanges = {'width':value,"top":topOffset};
                        //preparedChanges = {'width':value};
                        preparedChanges.width = value;
                        break;
                    case "top":
                        //preparedChanges = {'top':value};
                        preparedChanges.top = value;
                        break;
                    case "height":
                        var offset = value / 2 * -1;
                        //preparedChanges['top'] = "+="+offset,
                        //preparedChanges['height'] = "+="+value;
                        //preparedChanges = {'height':value};
                        preparedChanges.height = value;
                        break;
                    case "opacity":
                        //preparedChanges['opacity'] = value;
                        preparedChanges.opacity = value;
                        break;
                    case "left":
                        //preparedChanges['left'] = "+="+value;
                        preparedChanges.left = value;
                        break;
                }
            });
            
            //apply changes
            $(el).animate(
                preparedChanges, 
                animation[anId][step].time
            );
            
            //handle success
            $(el).promise().done(function(){
                me.handleGenericChange( anId, step+1, el );
            });
        }
    }
    bom.animation.BOMAnimationController = BOMAnimationController;
}());

var animationController = null;
$(document).ready(function(){
    var config = {
        animationObject:'.candle-flame'
    };
    animationController = new bom.animation.BOMAnimationController(config);
});
