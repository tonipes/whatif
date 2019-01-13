String.prototype.format = function( params ) {
  return this.replace(
    /\{(\w+)\}/g, 
    function( a,b ) { return params[ b ]; }
  );
};

var main_data = {}

var typed = null;

function random_int(max) {
  return Math.floor(Math.random() * max); 
}

let content_id = "content";
let sentence_id = "sentence";

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function get_param(param, disabled_words) {
  let unpacked = param.split(":")
  let category = unpacked[0];
  let modifiers = unpacked.slice(1);

  let word = main_data['words'][category][random_int(main_data['words'][category].length)];

  var word_1 = ((modifiers.indexOf('plural') >= 0 || modifiers.indexOf('noarticle') >= 0) ? "" :  word[0] + " ");
  var word_2 = ((modifiers.indexOf('plural') >= 0) ? word[2] : word[1]);
  
  let final_word = word_1 + word_2;

  return final_word;
}

function set_sentence(sentence) {
  var sentence_elem = document.getElementById(sentence_id);
  if (typed) {
    typed.stop();
  }
  typed = new Typed('#sentence', {
    strings: [$('#sentence').text(), sentence],
    typeSpeed: 30,
    backSpeed: 5,
    smartBackspace: true,
    showCursor: false,
  });
}

function generate_new_sentence() {
  let sentence_i = random_int(main_data.sentences.length);
  let sentence_d = main_data.sentences[sentence_i];
  
  var params = []
  for (let param_d of sentence_d[1]) {
    params.push(param_d[random_int(param_d.length)])
  }
  
  params = params.map(x => get_param(x));

  let final_sentence = capitalize(sentence_d[0].format(params)) + "?";

  set_sentence(final_sentence);
}

function setup(data) {
  main_data = data;
  generate_new_sentence();
}


$(document).ready(function(){
  $.getJSON("data.json", setup);
});