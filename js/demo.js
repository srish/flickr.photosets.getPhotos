$(function () {
    'use strict';

    // Load demo images from flickr:
    $.ajax({
        // Flickr API is SSL only:
        // https://code.flickr.net/2014/04/30/flickr-api-going-ssl-only-on-june-27th-2014/
        url: 'https://api.flickr.com/services/rest/',
        data: {
            photoset_id: 'YOUR PHOTOID',
            user_id: 'YOUR USER ID',
            format: 'json',
            method: 'flickr.photosets.getPhotos',
            api_key: 'YOUR API KEY', // jshint ignore:line
        },
        dataType: 'jsonp',
        jsonp: 'jsoncallback'
    }).done(function (result) {

        var linksContainer = $('#links'),
            baseUrl;

        // Add the demo images as links with thumbnails to the page:
        $.each(result.photoset.photo, function (index, photo) {
            
            baseUrl = 'https://farm' + photo.farm + '.static.flickr.com/' +
                photo.server + '/' + photo.id + '_' + photo.secret;

            $('<a/>')
                .append($('<img>').prop('src', baseUrl + '_s.jpg'))
                .prop('href', baseUrl + '_b.jpg')
                .prop('title', photo.title)
                .attr('data-gallery', '')
                .appendTo(linksContainer);
        });
    });

});
