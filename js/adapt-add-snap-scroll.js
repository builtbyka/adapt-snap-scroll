define([
    'coreJS/adapt'
],function(Adapt) {

    var counter = 0;

    Adapt.on('blockView:postRender', function(view) {
        if(view.model.get('_id') === 'splash') return;
        view.model.scrolling = false;
        view._scrollSnap =  _.bind(scrollSnap, this, view);
        view.$el.on("onscreen", view._scrollSnap);
    });

    function scrollSnap(view, event, measurements) {
        if(measurements.onscreen){
            if(view.model.pft - measurements.percentFromTop > 3){
                if(measurements.percentFromTop < 100 && measurements.percentFromTop > 0){
                    Adapt.scrollTo('.'+view.model.get('_id'), {duration : 1500});
                }
            }else if(measurements.percentFromTop - view.model.pft  > 3){
                if(measurements.percentFromTop < 0 && measurements.percentFromTop > -100){
                    Adapt.scrollTo('.'+view.model.get('_id'), {duration : 1500});
                }
            }
            view.model.pft = measurements.percentFromTop;
        }
    };

});