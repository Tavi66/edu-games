const set2 = [
        'call','find','had','why','does','saw','let','one', 
        'all', 'how', 'went', 'soon', 'come', 'here', 'where',
        'water', 'show', 'grow', 'ride', 'give', 'may', 'old', 
        'thing', 'around', 'gave', 'right', 'sing', 'very', 'with', 
        'these', 'more', 'thought', 'was', 'picture', 'laugh','live',
        'made','time','over', 'many','new','pull','found',
        'sleep','any','those','write','fly','use','food'
    ]
    
const set1 = [
        'two', 'first', 'came', 'them', 'what', 'know', 'are', 'have', 'us', 'her', 'when', 'want',
        'again', 'out', 'animal', 'you', 'of', 'than', 'together', 'just', 'help', 'were', 'their',
        'ask', 'walk', 'off', 'that', 'they', 'was', 'your', 'some', 'stop', 'school', 'his','day',
        'who', 'tell', 'into', 'them', 'there', 'ran', 'this', 'play', 'funny', 'him', 'put',
        'small', 'from', 'has', 'friend'
    ]

const nouns = [
    'noun'
]

const things = [
    'things'
]

const verbs = [
    'verbs'
]

const SightWords = () => {
    const set = set1.concat(set2);
    let length = set.length;
    let index = Math.floor(Math.random() * length);
    let word = index < length ? set[index] : set[length-1];
    console.log('word: ', word);

    return word;
}

export default SightWords;