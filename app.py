import pandas as pd
import scipy.sparse as sp
from flask import Flask
from flask import jsonify
from flask import request

from python.models.classification_news.classifier import ClassificationNews

app = Flask(__name__)


@app.route('/classification/train', methods=['POST'])
def trainClassificationNews():
    news_classifier = ClassificationNews()
    data, target = news_classifier.getCollectDataSet()
    test_data, test_target = news_classifier.getCollectDataSet(is_test=True)
    before_score = news_classifier.f1Score(test_data, test_target)
    retrain_request = request.get_json()
    data_retrain = pd.DataFrame.from_dict(retrain_request)
    retrain_data, retrain_target = news_classifier.normalizeDataSet(data_retrain)
    combine_data, combine_target = sp.vstack((data, retrain_data)), target.tolist() + retrain_target.tolist()

    news_classifier.trainModel(combine_data, combine_target)

    after_score = news_classifier.f1Score(test_data, test_target)
    news_classifier.saveReTrainResult(retrain_request)
    return jsonify(before=before_score, after=after_score)


@app.route('/classification/get/score')
def classificationModelTest():
    news_classifier = ClassificationNews()
    test_data, test_target = news_classifier.getCollectDataSet(is_test=True)
    score = news_classifier.f1Score(test_data, test_target)

    return jsonify(score=str(score))


@app.route('/classification/predict-news', methods=['POST'])
def classificationPredictNews():
    news_classifier = ClassificationNews()
    news = request.get_json()
    predict_vector = news_classifier.convertToVector(news)
    predict_data = news_classifier.predictNews(predict_vector)
    return jsonify(predict_data.tolist())


@app.route('/classification/test')
def test():
    news_classifier = ClassificationNews()
    data, target = news_classifier.getCollectDataSet()
    news_classifier.trainModel(data, target)
    news_classifier.is_new = False
    test_data, test_target = news_classifier.getCollectDataSet(is_test=True)
    score = news_classifier.f1Score(test_data, test_target)
    return jsonify(score)
