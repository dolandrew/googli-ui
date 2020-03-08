FROM python

RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -;
RUN apt-get install -y nodejs \
    npm
RUN apt-get install -y build-essential;

RUN mkdir app
WORKDIR /app/

COPY . /app/

RUN cd /app/

RUN npm install;

EXPOSE 3000
CMD npm start
