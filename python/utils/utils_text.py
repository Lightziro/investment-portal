from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import re
import string
from nltk.stem import WordNetLemmatizer
import nltk


class TransformText(object):
    def __init__(self):
        nltk.download('punkt')
        nltk.download('stopwords')
        nltk.download('wordnet')
        nltk.download('omw-1.4')
        self.stopwords = stopwords.words('english')
        self.punc_translator = str.maketrans('', '', string.punctuation)
        self.lemmatizer = WordNetLemmatizer()

    def processText(self, text):
        text = text.lower().replace('\n', ' ').replace('\r', '').strip()
        text = re.sub(r'\d+', '', text)
        text = text.translate(self.punc_translator)
        text = re.sub(r'[^a-zA-Z\s]+', '', text)

        stop_words = set(stopwords.words('english'))
        word_tokens = word_tokenize(text)
        filtered_sentence = []

        for word in word_tokens:
            if word not in stop_words:
                filtered_sentence.append(self.lemmatizer.lemmatize(word, pos='v'))

        text = " ".join(filtered_sentence)
        return text
