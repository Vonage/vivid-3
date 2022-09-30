@ECHO OFF
docker run -it --name vivid-visual-tests --env task=%1 --rm -v %cd%:/usr/src/app drizzt99/vonage:1.2.0