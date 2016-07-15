define([
    '/bower_components/jquery/dist/jquery.min.js',
],function () {
    var $ = window.jQuery;

    var Table = function ($t, xy) {
        var $head = $t.find('thead');
        var $body = $t.find('tbody');
        var $foot = $t.find('tfoot');

        var width = $body.find('tr:first-of-type td').length;
        var height = $body.find('tr').length;

        var addRow = function (first, Rest, uid) {
            var $row = $('<tr>', {
                'data-rt-uid': uid,
            }).append($('<td>').append(first));

            $head.find('th').each(function (i) {
                var colId = $(this).data('rt-uid');
                $row.append($('<td>').append(Rest(xy(colId, uid))));
            });

            $body.append($row);
            height++;
            return $row;
        };

        var addColumn = function (first, Rest, uid) {
            $head.find('tr').append($('<th>', {
                'data-rt-uid': uid,
            }).append(first));

            $body.find('tr').each(function (i) {
                // each checkbox needs a uid corresponding to its role
                var rowId = $(this).data('rt-uid');
                $(this).append($('<td>').append(Rest(xy(uid, rowId))));
            });

            $foot.find('tr').append($('<td>', { }));
            width++;
            return width;
        };

        return {
            $: $t,
            addRow: addRow,
            addColumn: addColumn,
        };
    };
    return Table;
});