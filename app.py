import time
from sklearn.feature_extraction.text import CountVectorizer
from sklearn import svm
import json
import math
import pickle

from flask import Flask
from flask import jsonify

app = Flask(__name__)

@app.route('/')
def scoreNewsModel():
    with open("python/dataset/news/dataset.json") as json_file:
        data = json.load(json_file)

    with open("python/dataset/news/dataset_test.json") as json_test:
        test_data = json.load(json_test)

#     training_data_len = math.ceil(len(data) * 1)
#     data_train, data_target = data[0:training_data_len], data[0:training_data_len]
#     data_test, test_target = data[training_data_len:], data[training_data_len:]
#     train_data = data[0:training_data_len]

    dataset_train = []
    dataset_target = []

    for i in range(0, len(data)):
        text = data[i]['title']
#         text_tokens = word_tokenize(text)
#         tokens_without_sw = [word for word in text_tokens if not word in stopwords.words()]
#         result_text = " ".join(tokens_without_sw)

        dataset_train.append(text.lower())
        dataset_target.append(data[i]['score'])

    cv = CountVectorizer()
    features = cv.fit_transform(dataset_train)
#     cv_predict = CountVectorizer()
#     predict_data = cv_predict.fit_transform(predict)

    tuned_parameters = {'kernel': ['rbf', 'linear'], 'gamma': [1e-3, 1e-4],
                        'C': [1, 10, 100, 1000]}
    model = svm.SVC(kernel='linear', gamma=0.001, C=1)
    # model = GridSearchCV(svm.SVC(), tuned_parameters)

    model.fit(features, dataset_target)
    dataset_test = []
    dataset_test_target = []
    for i in range(0, len(test_data)):
        dataset_test.append(test_data[i]['title'].lower())
        dataset_test_target.append(test_data[i]['score'])

    result = model.score(cv.transform(dataset_test), dataset_test_target)
    predict = model.predict(cv.transform(dataset_test))
    return jsonify(score=str(result))
