import pandas as pd
import scipy.sparse as sp
from flask import Flask
from flask import jsonify
from flask import request
from sklearn.model_selection import train_test_split

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
    news_classifier = ClassificationNews(is_new_model=True, type_vector='count')
    data, target = news_classifier.getCollectDataSet()
    x_train, x_test, y_train, y_test = train_test_split(data, target, shuffle=False, train_size=.8, random_state=42)
    news_classifier.trainModel(x_train, y_train)
    score = news_classifier.f1Score(x_test, y_test)
    news_classifier.is_new = False
    # transform = news_classifier.convertToVector()
    # news_classifier = ClassificationNews()
    # test_data, test_target = news_classifier.getCollectDataSet(is_test=False)
    # score = news_classifier.f1Score(test_data, test_target)
    return jsonify(news_classifier.vector_model.transform(['Alibaba']).toarray().tolist())
    # return jsonify(score=str(score))



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
