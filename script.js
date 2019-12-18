$(document).ready(function() {

    var api_url_base = 'https://api.themoviedb.org/3/';
    var api_key = '8659634f781ac1e5a3d3ec74c9a590b4';

    var html_template = $('#film-template').html();
    var template_function = Handlebars.compile(html_template);

    $('.search button').click(function() {
        ricerca_film();
    });

    $('.search button').click(ricerca_film);


    $('.search input').keypress(function(event) {
        if (event.which == 13) {
            ricerca_film();
        }
    });

    function ricerca_film() {
        var film_ricerca = $('.search input').val();
        //controllo che l'utente abbia inserito qualcosa
        if (film_ricerca.lenght != 0) {
            //solo se la stringa cercata non è vuota, faccio la chiamata api
            //resetto l'input
            $('.search input').val('');
            //svuoto il risultato di testo_ricerca
            $('#risultati').empty();


            $.ajax({
                'url': api_url_base + 'search/movie',
                'data': {
                    'api_key': api_key,
                    'query': film_ricerca,
                    'language': 'it-IT'
                },
                'method': 'get',
                'success': function(data_response) {
                    var film = data_response.results;
                    for (var i = 0; i < film.length; i++) {
                        var film_corrente = film[i];

                        if (film_corrente.hasOwnProperty('title')) {

                            var titolo = film_corrente.title;
                            var tipo = 'film';
                            $('card-film').removeClass('tv');

                        } else {

                            var titolo = film_corrente.name;
                            var tipo = 'serie tv';
                            $('card-film').addClass('tv');

                        }
                        if (film_corrente.hasOwnProperty('original_title')) {

                            var titolo_originale = film_corrente.original_title;
                            var tipo = 'film';
                        } else {

                            var titolo_originale = film_corrente.original_name;
                            var tipo = 'serie tv';
                        }
                        var titolo = film_corrente.title;
                        var titolo_originale = film_corrente.original_title;
                        var lingua = film_corrente.original_language;
                        var voto = film_corrente.vote_average;

                        var calcolo_stelle = Math.ceil(voto / 2);
                        var stelle_a_video = '';
                        for (var j = 0; j < 5; j++) {
                            if (j < calcolo_stelle) {
                                stelle_a_video += '<i class="fas fa-star"></i>';
                            } else {
                                stelle_a_video += '<i class="far fa-star"></i>';
                            }
                        };

                        var template_variables = {
                            title: titolo,
                            original_title: titolo_originale,
                            language: cerca_bandiera(lingua),
                            voto: voto,
                            star: stelle_a_video,
                            tipo: tipo
                        };
                        //creo il template
                        var html_film = template_function(template_variables);
                        $('#risultati').append(html_film);
                    };
                },
                'error': function() {
                    alert('error!');
                }

            });

            $.ajax({
                'url': api_url_base + 'search/tv',
                'data': {
                    'api_key': api_key,
                    'query': film_ricerca,
                    'language': 'it-IT'
                },
                'method': 'get',
                'success': function(data_response) {
                    var film = data_response.results;
                    for (var i = 0; i < film.length; i++) {
                        var film_corrente = film[i];

                        if (film_corrente.hasOwnProperty('title')) {

                            var titolo = film_corrente.title;
                            var tipo = 'film';
                            $('card-film').removeClass('tv');

                        } else {

                            var titolo = film_corrente.name;
                            var tipo = 'serie tv';
                            $('card-film').addClass('tv');

                        }
                        if (film_corrente.hasOwnProperty('original_title')) {

                            var titolo_originale = film_corrente.original_title;
                            var tipo = 'film';
                        } else {

                            var titolo_originale = film_corrente.original_name;
                            var tipo = 'serie tv';
                        }
                        var titolo_originale = film_corrente.original_title;
                        var lingua = film_corrente.original_language;
                        var voto = film_corrente.vote_average;
                        var calcolo_stelle = Math.ceil(voto / 2);
                        var stelle_a_video = '';
                        for (var j = 0; j < 5; j++) {
                            if (j < calcolo_stelle) {
                                stelle_a_video += '<i class="fas fa-star"></i>';
                            } else {
                                stelle_a_video += '<i class="far fa-star"></i>';
                            }
                        };

                        var template_variables = {
                            title: titolo,
                            original_title: titolo_originale,
                            language: cerca_bandiera(lingua),
                            voto: voto,
                            star: stelle_a_video,
                            tipo: tipo
                        };
                        //creo il template
                        var html_film = template_function(template_variables);
                        $('#risultati').append(html_film);
                    };
                },
                'error': function() {
                    alert('error!');
                }

            });

        };
    };

    function cerca_bandiera(codice_lingua) {
        var lista_bandierine = ['en', 'it'];
        var bandiera = '';

        if (lista_bandierine.includes(codice_lingua)) {

            bandiera = '<img class="bandiera" src="bandiere/' + codice_lingua + '.png" "alt= bandiera' + codice_lingua + '">';
        } else {

            bandiera = codice_lingua;
        }

        return bandiera;
    }





}); //chiusura document ready
