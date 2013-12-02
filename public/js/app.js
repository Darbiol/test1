var directory = {

    views: {},

    models: {},

    loadTemplates: function(views, callback) {

        var deferreds = [];

        $.each(views, function(index, view) {
            console.log(directory[view]);
            if (directory[view]) {
                deferreds.push($.get('tpl/' + view + '.html', function(data) {
                    directory[view].prototype.template = _.template(data);
                }, 'html'));
            } else {
                alert(view + " not found");
            }
        });

        $.when.apply(null, deferreds).done(callback);
    }

};

directory.Router = Backbone.Router.extend({

    routes: {
        ""          : "home",
        "service"   : "service",
        "employee"  : "employee",
        "items"     : "items",
        "report"    : "report"
    },

    initialize: function () {
        directory.shellView = new directory.ShellView();
        $('body').html(directory.shellView.render().el);
        // Close the search dropdown on click anywhere in the UI
        $('body').click(function () {
            $('.dropdown').removeClass("open");
        });
        this.$content = $("#content");
    },

    home: function () {
        // Since the home view never changes, we instantiate it and render it only once
        if (!directory.homelView) {
            directory.homelView = new directory.HomeView();
            directory.homelView.render();
        } else {
            console.log('reusing home view');
            directory.homelView.delegateEvents(); // delegate events when the view is recycled
        }
        this.$content.html(directory.homelView.el);
        directory.shellView.selectMenuItem('home');
    },

    service: function () {
        if (!directory.serviceView) {
            directory.serviceView = new directory.ServiceView();
            directory.serviceView.render();
        }
        this.$content.html(directory.serviceView.el);
        directory.shellView.selectMenuItem('service');
    },
    employee: function () {
        if (!directory.employeeView) {
            directory.employeeView = new directory.EmployeeView();
            directory.employeeView.render();
        }
        this.$content.html(directory.employeeView.el);
        directory.shellView.selectMenuItem('employee');
    },
    items: function(){
        if (!directory.itemsView) {
            directory.itemsView = new directory.ItemsView();
            directory.itemsView.render();
        }
        this.$content.html(directory.itemsView.el);
        directory.shellView.selectMenuItem('items');
    },
    report: function(){
        if (!directory.reportView) {
            directory.reportView = new directory.ReportView();
            directory.reportView.render();
        }
        this.$content.html(directory.reportView.el);
        directory.shellView.selectMenuItem('report');
    }


});

$(document).on("ready", function () {
    directory.loadTemplates(["HomeView", "ServiceView", "ShellView", "EmployeeView", "ItemsView", "ReportView"],
        function () {
            directory.router = new directory.Router();
            Backbone.history.start();
        });
});
