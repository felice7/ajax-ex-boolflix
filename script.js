$(document).ready(function() {


    $('.search button').click(function() {
        ricerca_film();
    });
    
    
});

function ricerca_film() {

    var film_ricerca = $('.search input').val();

    var api_url_base = 'https://api.themoviedb.org/3/';

    $.ajax({

        'url': api_url_base + 'search/movie',

        'data': {
            'api_key': '8659634f781ac1e5a3d3ec74c9a590b4',
            'query': film_ricerca,
            'language': 'it-IT'
        },
        
        'method': 'get',
        'success': function(data_response) {

            var film = data_response.results;
            for (var i = 0; i < film.length; i++) {

                var film_corrente = film[i];

                var titolo = film_corrente.title;

                var titolo_originale = film_corrente.original_title;

                var lingua = film_corrente.original_language;

                var voto = film_corrente.vote_average;

                $('#risultati').append(`    
                    <ul>
                        <li>Titolo film: ` + titolo + `</li>
                        <li>Titolo film originale: ` + titolo_originale + `</li>
                        <li>Lingua: ` + lingua + `</li>
                        <li>Voto: ` + voto + `</li>
                    </ul>
                `);
            }
        },
        'error': function(error) {
            alert('error!');
        }
    });
}
