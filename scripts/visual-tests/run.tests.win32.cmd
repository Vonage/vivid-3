@ECHO OFF
docker run -it --name vivid-visual-tests --env task=%1 --rm -v %cd%:/usr/src/app vivid3/vonage:2.0.1
