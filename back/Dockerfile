FROM python

RUN useradd -ms /bin/bash notroot

USER notroot

WORKDIR /home/notroot

COPY . .

RUN export PATH=$PATH:/home/notroot/.local/bin && \
    pip install --upgrade pip && \
    pip install -r requirements.txt

EXPOSE 8000

ENTRYPOINT ["python", "./manage.py"]

CMD ["runserver"]