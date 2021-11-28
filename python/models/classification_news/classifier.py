import pickle
import json
import scipy.sparse as sp


class ClassificationNews:
    train_dataset = []
    train_dataset_target = []

    test_dataset = []
    test_dataset_target = []

    __model = None
    __cv = None

    def __init__(self):
        with open('python/models/classification_news/model.pkl', 'rb') as f:
            self.model, self.cv = pickle.load(f)
        self.collectDataset()

    def collectDataset(self):
        with open("python/dataset/news/dataset.json") as json_file:
            dataset = json.load(json_file)
        self.train_dataset, self.train_dataset_target = self.normalizeData(dataset)

    def collectTestData(self):
        with open("python/dataset/news/dataset_test.json") as json_test:
            test_data = json.load(json_test)
        self.test_dataset, self.test_dataset_target = self.normalizeData(test_data)

    def retrainModel(self):
        self.model.fit(self.train_dataset, self.train_dataset_target)

    def convertVector(self, data_document):
        return self.cv.transform(data_document)

    def getScoreByTestData(self):
        return self.model.score(self.test_dataset, self.test_dataset_target)

    def normalizeData(self, data):
        title = []
        score = []
        for i in range(0, len(data)):
            title.append(data[i]['title'].lower())
            score.append(data[i]['score'])
        title_vector = self.convertVector(title)

        return title_vector, score

    def mergeDataTrain(self, data, target):
        self.train_dataset = sp.vstack((self.train_dataset, data))
        self.train_dataset_target = self.train_dataset_target + target

    """
    Если переобучение повлияло на результат, то перезапись модели и тестовых данных
    """

    def analyzeRetrain(self, before_score, after_score):
        if after_score > before_score:
            # with open('python/models/classification_news/model.pkl', 'wb') as f:
            #     pickle.dump((self.model, self.cv), f)
            return True
        return False

    def saveTrainResult(self, data_save):
        with open("python/dataset/news/dataset.json", "r") as file:
            data = json.load(file)
        data = [*data, *data_save]

        with open("python/dataset/news/dataset.json", "w") as file:
            json.dump(data, file)
