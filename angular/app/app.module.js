/**
 * Created by areynolds2 on 11/19/2016.
 */
(function(app) {
    app.AppModule =
        ng.core.NgModule({
            imports: [ ng.platformBrowser.BrowserModule ],
            declarations: [ app.AppComponent ],
            bootstrap: [ app.AppComponent ]
        })
            .Class({
                constructor: function() {}
            });
})(window.app || (window.app = {}));