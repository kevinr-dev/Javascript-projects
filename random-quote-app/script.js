const quotes = [
    "The unexamined life is not worth living. – Socrates",
    "Wisdom begins in wonder. – Socrates",
    "To find yourself, think for yourself. – Socrates",
    "Knowing yourself is the beginning of all wisdom. – Aristotle",
    "It is the mark of an educated mind to be able to entertain a thought without accepting it. – Aristotle",
    "Happiness depends upon ourselves. – Aristotle",
    "The greatest wealth is to live content with little. – Plato",
    "Courage is knowing what not to fear. – Plato",
    "He who has health has hope; and he who has hope has everything. – Arabian Proverb",
    "The journey of a thousand miles begins with one step. – Laozi",
    "It does not matter how slowly you go as long as you do not stop. – Confucius",
    "Real knowledge is to know the extent of one's ignorance. – Confucius",
    "He who learns but does not think, is lost. – Confucius",
    "A man who moves a mountain begins by carrying away small stones. – Confucius",
    "When we see men of a contrary character, we should turn inwards and examine ourselves. – Confucius",
    "The wise find pleasure in water; the virtuous find pleasure in hills. – Confucius",
    "To be wronged is nothing unless you continue to remember it. – Confucius",
    "The best time to plant a tree was twenty years ago. The second best time is now. – Chinese Proverb"
];

function generateRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    document.getElementById('result').innerHTML = randomQuote;
}