from flask import Flask
from flask import jsonify
from flask import request
import pika
import nltk
import json
from transformers import AutoModelForSequenceClassification, AutoConfig, BertForSequenceClassification
from python.utils.utils_text import TransformText

from python.models.classification_news.classifier import ClassificationNews
from python.models.classification_news_v2.finbert import predict

import logging

logging.basicConfig(format='%(asctime)s - %(levelname)s - %(name)s -   %(message)s',
                    datefmt='%m/%d/%Y %H:%M:%S',
                    level=logging.INFO)
logger = logging.getLogger(__name__)
nltk.download('punkt')
nltk.download('stopwords')
nltk.download('wordnet')
app = Flask(__name__)
connection = pika.BlockingConnection(pika.ConnectionParameters(host='host.docker.internal', port=5672))
channel = connection.channel()

model = BertForSequenceClassification.from_pretrained('./python/models/classification_news_v2/', num_labels=3,
                                                      cache_dir=None)
transformer_text = TransformText()
channel.queue_declare(queue='predict-idea', durable=True)
channel.queue_declare(queue='analyze-idea', durable=True)


def callback(ch, method, properties, body):
    data = json.loads(body)
    news_list = data['news']
    data_predict = []
    for item in news_list:
        result_text = transformer_text.processText(item)
        if result_text != result_text:
            continue
        data_predict.append(result_text)

    data_classifier = predict('. '.join(data_predict), model).squeeze()
    predict_data = json.dumps({'idea_id': data['idea_id'], 'news_predict': data_classifier.to_json(orient='records')})
    channel.basic_publish(exchange='',
                          routing_key='predict-idea',
                          body=predict_data)
    # logger.info(data['idea_id'])
    # logger.info(body)
    # ch.basic_ack(delivery_tag=method.delivery_tag)


channel.basic_consume(queue='analyze-idea',
                      auto_ack=False,
                      on_message_callback=callback)
channel.start_consuming()


@app.route('/classification-news', methods=['POST'])
def predictRes():
    news_list = request.get_json()
    data_predict = []
    for item in news_list:
        result_text = transformer_text.processText(item)
        if result_text != result_text:
            continue
        data_predict.append(result_text)
    #     return jsonify(data_predict)
    #     requests.get('http://host.docker.internal:8000/api/test')
    str_predict = predict('. '.join(data_predict), model).to_json(orient='records')
    data = json.loads(str_predict)
    predict_data = {'idea_id'}
