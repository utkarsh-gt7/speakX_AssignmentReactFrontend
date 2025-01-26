import { QuestionServiceClient } from './proto/question_grpc_web_pb';
import { TitleRequest, TypeRequest } from './proto/question_pb';

const grpcClient = new QuestionServiceClient('https://speakxgrpcproxy.onrender.com:1000');

export const fetchQuestionsByTitle = (title, pageNumber = 1, pageSize = 10) => {
  return new Promise((resolve, reject) => {
    const request = new TitleRequest();
    request.setTitle(title);
    request.setPagenumber(pageNumber);
    request.setPagesize(pageSize);

    grpcClient.getQuestionsByTitle(request, {}, (err, response) => {
      if (err) {
        reject(err.message);
      } else {
        console.log(response.toObject());
        resolve(response.toObject());
      }
    });
  });
};

export const fetchQuestionsByType = (type, pageNumber = 1, pageSize = 10) => {
  return new Promise((resolve, reject) => {
    const request = new TypeRequest();
    request.setType(type);
    request.setPagenumber(pageNumber);
    request.setPagesize(pageSize);

    grpcClient.getQuestionsByType(request, {}, (err, response) => {
      if (err) {
        reject(err.message);
      } else {
        console.log(response.toObject());
        resolve(response.toObject());
      }
    });
  });
};
