import pickle
import string
from typing import Union
from sklearn.metrics import f1_score
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.feature_extraction.text import CountVectorizer
from sklearn import svm
from pandas import DataFrame
import pandas as pd
import json
from sklearn.model_selection import cross_validate
from scipy.sparse.csr import csr_matrix
from sklearn.model_selection import GridSearchCV


class ClassificationNews:
    """
    Classification Market News - Классификатор рыночных новостей
    Parameters
    ----------
    is_new_model: bool, default=False
        Создаёт новую модель, а не использует уже существующую
    type_vector: {'tfidf', 'count'}
        Название векторайзера, который будет использоваться при нормализации текста в векторы
    """

    model: Union[svm.SVC] = None
    vector_model: Union[TfidfVectorizer, CountVectorizer]
    is_new: bool
    __type_model = {
        "tfidf": TfidfVectorizer(lowercase=True),
        "count": CountVectorizer(lowercase=True)
    }

    def __init__(self, is_new_model: bool = False, type_vector: str = 'tfidf'):
        if is_new_model:
            self.model = svm.SVC(kernel='linear', gamma=0.001, C=1)
            self.vector_model = self.__type_model[type_vector]
        else:
            with open('python/models/classification_news/model.pkl', 'rb') as f:
                self.model, self.vector_model = pickle.load(f)
        self.is_new = is_new_model

    def getCollectDataSet(self, is_test=False):
        file_path = "python/dataset/news/dataset.json"
        if is_test:
            file_path = "python/dataset/news/dataset_test.json"
        test_data = pd.read_json(file_path, orient='columns')
        return self.normalizeDataSet(test_data)

    def normalizeDataSet(self, data: DataFrame):
        translator = str.maketrans('', '', string.punctuation)
        title = [str(x).translate(translator) for x in data['title']]  #
        score = data['score']
        title_vector = self.convertToVector(title)
        return title_vector, score

    def trainModel(self, data_set: csr_matrix, data_set_target: list):
        self.model.fit(data_set, data_set_target)

    def convertToVector(self, document: list):
        if self.is_new:
            return self.vector_model.fit_transform(document)
        else:
            return self.vector_model.transform(document)

    """
    Если переобучение повлияло на результат, то перезапись модели и тестовых данных
    """

    def analyzeRetrain(self, before_score, after_score):
        if after_score > before_score:
            # with open('python/models/classification_news/model.pkl', 'wb') as f:
            #     pickle.dump((self.model, self.cv), f)
            return True
        return False

    @staticmethod
    def saveReTrainResult(data_save):
        with open("python/dataset/news/dataset.json", "r") as file:
            data = json.load(file)
        data = [*data, *data_save]

        with open("python/dataset/news/dataset.json", "w") as file:
            json.dump(data, file)

    def saveModel(self):
        with open('python/models/classification_news/model.pkl', 'wb') as f:
            pickle.dump((self.model, self.vector_model), f)

    def predictNews(self, data: list): # csr_matrix
        return self.model.predict(self.vector_model.transform(data))

    def f1Score(self, data, target):
        result = self.model.predict(data)
        return f1_score(target, result, average='weighted')

    @staticmethod
    def searchBestParams(train, target):
        """
        Ищет наилучшие параметры для модели оценивания результатов
        :return: объект с наилучшими параметрами
        """
        tuned_parameters = {'kernel': ['rbf', 'linear'], 'gamma': [1e-3, 1e-4],
                            'C': [1, 10, 100, 1000]}
        model = GridSearchCV(svm.SVC(), tuned_parameters)
        model.fit(train, target)
        return model.best_params_
