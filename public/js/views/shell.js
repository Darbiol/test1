directory.ShellView = Backbone.View.extend({

    initialize: function () {
        this.searchResults = new directory.EmployeeCollection();
        
    },

    render: function () {
        this.$el.html(this.template());
        return this;
    },

    events: {
        "keyup .search-query": "search",
        "keypress .search-query": "onkeypress"
    },

    search: function (event) {
        var key = $('#searchText').val();
        this.searchResults.fetch({reset: true, data: {name: key}});
        var self = this;
        setTimeout(function () {
            $('.dropdown').addClass('open');
        });
    },

    onkeypress: function (event) {
        if (event.keyCode === 13) { // enter key pressed
            event.preventDefault();
        }
    },

    selectMenuItem: function(menuItem) {
        $('#mainNav li').removeClass('current');
        console.log('.'+menuItem);
        if (menuItem) {
            $('.' + menuItem).addClass('current');
        }
    }

});