import time
from sklearn.feature_extraction.text import CountVectorizer
from sklearn import svm
import json
import math
import pickle

from flask import Flask
from flask import jsonify
from flask import request

from python.models.classification_news import classifier

app = Flask(__name__)


@app.route('/classification/train', methods=['POST'])
def trainClassificationNews():
    news_classifier = classifier.ClassificationNews()

    news_classifier.collectTestData()
    before_train_score = news_classifier.getScoreByTestData()

    retrain_request = request.get_json()
    retrain_data, retrain_data_target = news_classifier.normalizeData(retrain_request)
    news_classifier.mergeDataTrain(retrain_data, retrain_data_target)

    news_classifier.retrainModel()
    after_score = news_classifier.getScoreByTestData()

    result_retrain = news_classifier.analyzeRetrain(before_train_score, after_score)
    news_classifier.saveTrainResult(retrain_request)
    return jsonify(result=str(result_retrain), before=before_train_score, after=after_score)

    # return jsonify(score=len(before_train_score))

    # data =
    #
    # with open("python/dataset/news/dataset.json") as json_file:
    #     data_train_file = json.load(json_file)
    #
    # data_train = []
    # data_train_target = []
    # for i in range(0, len(data_train_file)):
    #     data_train.append(data_train_file[i]['title'].lower())
    #     data_train_target.append(data_train_file[i]['score'])
    #
    # for i in range(0, len(data)):
    #     data_train.append(data[i]['title'].lower())
    #     data_train_target.append(data[i]['score'])
    #
    # features = cv.transform(data_train)
    # model.fit(features, data_train_target)
    #
    # with open("python/dataset/news/dataset_test.json") as json_test:
    #     test_data = json.load(json_test)
    #
    # dataset_test = []
    # dataset_test_target = []
    # for i in range(0, len(test_data)):
    #     dataset_test.append(test_data[i]['title'].lower())
    #     dataset_test_target.append(test_data[i]['score'])
    #
    # score_test = model.score(cv.transform(dataset_test), dataset_test_target)


@app.route('/classification/test-score')
def classificationModelTest():
    news_classifier = classifier.ClassificationNews()
    news_classifier.collectTestData()
    score = news_classifier.getScoreByTestData()

    return jsonify(score=str(score))


@app.route('/news/predict')
def predictNews():
    with open("python/dataset/news/dataset_test.json") as json_test:
        test_data = json.load(json_test)

    with open("python/dataset/news/dataset.json") as json_file:
        data = json.load(json_file)

    dataset_train = []
    dataset_target = []

    for i in range(0, len(data)):
        text = data[i]['title']
        dataset_train.append(text.lower())
        dataset_target.append(data[i]['score'])

    cv = CountVectorizer()
    features = cv.fit_transform(dataset_train)

    tuned_parameters = {'kernel': ['rbf', 'linear'], 'gamma': [1e-3, 1e-4],
                        'C': [1, 10, 100, 1000]}
    model = svm.SVC(kernel='linear', gamma=0.001, C=1)

    #     with open('python/models/classification_news/model.pkl', 'rb') as f:
    #         model = pickle.load(f)
    # model = GridSearchCV(svm.SVC(), tuned_parameters)

    model.fit(features, dataset_target)

    with open('python/models/classification_news/model.pkl', 'wb') as f:
        pickle.dump((model, cv), f)
    dataset_test = []
    dataset_test_target = []
    for i in range(0, len(test_data)):
        dataset_test.append(test_data[i]['title'].lower())
        dataset_test_target.append(test_data[i]['score'])

    result = model.score(cv.transform(dataset_test), dataset_test_target)
    #     predict = model.predict(cv.transform(predict_news)).tolist()
    return jsonify(score=str(result))
