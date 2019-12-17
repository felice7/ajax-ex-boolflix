$(document).ready(function() {

    $('.search button').click(function() {
        ricerca_film();
    });

    var html_template = $('#film-template').html();
    var template_function = Handlebars.compile(html_template);
    
    $('.search input').keypress(function(event) {
        if(event.which == 13) {
            ricerca_film();
        }
    });
    
    $('.search button').click(ricerca_film);

function ricerca_film() {

    var film_ricerca = $('.search input').val();
    
    if (film_ricerca.length !=0) {
    //questa stringa permette di resettare il campo ricerca
    $('.search input').val('');
    //questa stringa pernette di svuotare il risultato della ricerca
    $('#risultati').empty();

    var api_url_base = 'https://api.themoviedb.org/3/';
    var api_key = '8659634f781ac1e5a3d3ec74c9a590b4';
    
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
                var titolo = film_corrente.title;
                var titolo_originale = film_corrente.original_title;
                var lingua = film_corrente.original_language;
                var voto = film_corrente.vote_average;
                var voto_stelle = Math.ceil(voto/2);
                var stelle_a_video = '';
                
                for (var j = 0; j < 5; j++) {
                    if (j < voto_stelle) {
                        stelle_a_video = stelle_a_video + '<i class="fas fa-star"></i>';
                    } else {
                        stelle_a_video = stelle_a_video + '<i class="far fa-star"></i>';
                    }    
                }
                
                console.log(voto_stelle);
                var template_variables = {
                    title: titolo,
                    original_title: titolo_originale,
                    language: lingua,
                    // rating: voto,
                    star: stelle_a_video
                    
                };
                    
                    var html_film = template_function(template_variables);
                    $('#risultati').append(html_film);
                
                }
            },
        
            'error': function(error) {
                alert('error!');
                }
            });
        }
    }
    
});
